#import "Plugins/PluginStates.h"
#import "Plugins/PluginManifest.h"
#import "Bridge.h"
#import "ViolytraCore.h"
#import "ViolytraCoreBridge.h"
#import "Logger.h"

NSDictionary *PluginStatePayloadForFlags(NSInteger flags) {
    return @{
        @"enabled": @((flags & PluginFlagEnabled) != 0),
        @"requiredByUser": @((flags & PluginFlagRequiredByUser) != 0),
        @"pendingReload": @((flags & PluginFlagPendingReload) != 0),
        @"startedLate": @((flags & PluginFlagStartedLate) != 0),
    };
}

static id ParseJSONObjectOrEmpty(NSString *json) {
    if (json.length == 0) return @{};
    NSData *data = [json dataUsingEncoding:NSUTF8StringEncoding];
    id parsed = data ? [NSJSONSerialization JSONObjectWithData:data options:0 error:nil] : nil;
    return parsed ?: @{};
}

@implementation PluginsStates

- (BOOL)isPluginEnabled:(NSString *)pluginId {
    if (PluginStatesStore.sharedStore.defaultsOnly) return NO;
    int mask = ViolytraCore_PluginStatesBootFlags(pluginId.UTF8String, NULL);
    return mask >= 0 && (mask & PluginFlagEnabled) != 0;
}

- (BOOL)hasPlugin:(NSString *)pluginId {
    if (PluginStatesStore.sharedStore.defaultsOnly) return NO;
    return ViolytraCore_PluginStatesBootFlags(pluginId.UTF8String, NULL) >= 0;
}

- (BOOL)isPluginEnabledInSaved:(NSString *)pluginId {
    int mask = ViolytraCore_PluginStatesActiveFlags(pluginId.UTF8String, NULL);
    return mask >= 0 && (mask & PluginFlagEnabled) != 0;
}

- (BOOL)hasPluginInSaved:(NSString *)pluginId {
    return ViolytraCore_PluginStatesActiveFlags(pluginId.UTF8String, NULL) >= 0;
}

- (void)setPluginFlags:(NSString *)pluginId flags:(NSInteger)pluginFlags {
    ViolytraCore_PluginStatesSetActiveFlags(pluginId.UTF8String, (int)pluginFlags, NULL);
}

- (void)removePlugin:(NSString *)pluginId {
    ViolytraCore_PluginStatesRemoveAll(pluginId.UTF8String, NULL);
}

@end

@interface PluginStatesStore ()
@property (nonatomic, strong, readwrite, nullable) PluginsStates *states;
@property (nonatomic, assign, readwrite) BOOL defaultsOnly;
@end

@implementation PluginStatesStore

+ (instancetype)sharedStore {
    static PluginStatesStore *store;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{ store = [[PluginStatesStore alloc] init]; });
    return store;
}

- (PluginsStates *)ensureLoaded {
    if (self.states) return self.states;
    @synchronized(self) {
        if (self.states) return self.states;
        self.states = [[PluginsStates alloc] init];
        self.defaultsOnly = ViolytraCore_PluginStatesDefaultsBoot() == 1;
        if (self.defaultsOnly) ViolytraLog(@"Booting with default plugins only");
        return self.states;
    }
}

- (void)requestDefaultsOnlyBoot {
    ViolytraCore_PluginStatesSetActiveSlot(":defaults", 1, NULL);
}

- (void)writeNow {}

- (void)updatePluginFlags:(PluginManifest *)manifest flags:(NSInteger)flags {
    ViolytraCore_PluginStatesSetActiveFlags(manifest.id.UTF8String, (int)flags, NULL);
}

- (void)batchSave:(void (^)(void))block {
    block();
}

- (NSNumber *)loadPluginFlags:(NSString *)pluginId {
    if (self.defaultsOnly) return nil;
    int mask = ViolytraCore_PluginStatesActiveFlags(pluginId.UTF8String, NULL);
    return mask < 0 ? nil : @(mask);
}

@end

void RegisterPluginStatesMethods(void) {
    bridgeHandlers()[@"violytra.plugins.states.read"] = ^NSDictionary *(NSArray *args) {
        [[PluginStatesStore sharedStore] ensureLoaded];
        return @{@"result": ParseJSONObjectOrEmpty(ViolytraCore_ConsumeString(ViolytraCore_PluginStatesRead(NULL)))};
    };

    bridgeHandlers()[@"violytra.plugins.states.getSlots"] = ^NSDictionary *(NSArray *args) {
        return @{@"result": ParseJSONObjectOrEmpty(ViolytraCore_ConsumeString(ViolytraCore_PluginStatesGetSlots(NULL)))};
    };

    bridgeHandlers()[@"violytra.plugins.states.setActiveSlot"] = ^NSDictionary *(NSArray *args) {
        NSString *slot = argString(args, 0, nil);
        if (!slot) return @{@"error": @"Expected a slot ID"};
        char *error = NULL;
        if (ViolytraCore_PluginStatesSetActiveSlot(slot.UTF8String, argBool(args, 1, NO) ? 1 : 0, &error) != 0) {
            return @{@"error": ViolytraCore_ConsumeError(error)};
        }
        return @{@"result": [NSNull null]};
    };

    bridgeHandlers()[@"violytra.plugins.states.update"] = ^NSDictionary *(NSArray *args) {
        NSString *slot = argString(args, 0, nil);
        NSString *pluginId = argString(args, 1, nil);
        id state = argPresent(args, 2);
        if (!slot || !pluginId || ![state isKindOfClass:[NSDictionary class]]) {
            return @{@"error": @"Expected a slot ID, plugin ID and state"};
        }
        NSData *stateData = [NSJSONSerialization dataWithJSONObject:state options:0 error:nil];
        NSString *stateJson = stateData ? [[NSString alloc] initWithData:stateData encoding:NSUTF8StringEncoding] : nil;
        char *error = NULL;
        char *result = ViolytraCore_PluginStatesUpdate(slot.UTF8String, pluginId.UTF8String, stateJson.UTF8String, &error);
        if (!result) return @{@"error": ViolytraCore_ConsumeError(error)};
        return @{@"result": ParseJSONObjectOrEmpty(ViolytraCore_ConsumeString(result))};
    };
}
