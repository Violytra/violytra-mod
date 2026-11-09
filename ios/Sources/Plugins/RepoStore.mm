#import "Plugins/RepoStore.h"
#import "Logger.h"
#import "ViolytraCoreBridge.h"

@implementation UserRepo

+ (instancetype)repoWithURL:(NSString *)url enabled:(BOOL)enabled {
    UserRepo *r = [[UserRepo alloc] init];
    r->_url = [url copy];
    r->_enabled = enabled;
    return r;
}

@end

@implementation RepoStore

+ (instancetype)sharedStore {
    static RepoStore *store;
    static dispatch_once_t onceToken;
    dispatch_once(&onceToken, ^{ store = [[RepoStore alloc] init]; });
    return store;
}

- (NSArray<UserRepo *> *)ensureLoaded {
    return [self list];
}

- (NSArray<UserRepo *> *)list {
    char *error = NULL;
    char *json = ViolytraCore_RepoStoreList(&error);
    if (!json) {
        ViolytraLog(@"Failed to read repos config: %@", ViolytraCore_ConsumeError(error));
        return @[];
    }

    NSData *data = [ViolytraCore_ConsumeString(json) dataUsingEncoding:NSUTF8StringEncoding];
    NSArray *raw = data ? [NSJSONSerialization JSONObjectWithData:data options:0 error:nil] : nil;
    if (![raw isKindOfClass:[NSArray class]]) return @[];

    NSMutableArray<UserRepo *> *repos = [NSMutableArray arrayWithCapacity:raw.count];
    for (NSDictionary *entry in raw) {
        if (![entry isKindOfClass:[NSDictionary class]]) continue;
        NSString *url = entry[@"url"];
        if (![url isKindOfClass:[NSString class]]) continue;
        id enabled = entry[@"enabled"];
        [repos addObject:[UserRepo repoWithURL:url enabled:enabled == nil || [enabled boolValue]]];
    }
    return repos;
}

- (nullable NSString *)setEntries:(NSArray<UserRepo *> *)entries {
    NSMutableArray *payload = [NSMutableArray arrayWithCapacity:entries.count];
    for (UserRepo *repo in entries) {
        [payload addObject:@{@"url": repo.url, @"enabled": @(repo.enabled)}];
    }
    NSData *data = [NSJSONSerialization dataWithJSONObject:payload options:0 error:nil];
    if (!data) return @"Failed to encode repositories";
    NSString *json = [[NSString alloc] initWithData:data encoding:NSUTF8StringEncoding];

    char *error = NULL;
    if (ViolytraCore_RepoStoreSet(json.UTF8String, &error) != 0) {
        return ViolytraCore_ConsumeError(error);
    }
    return nil;
}

- (NSURL *)cacheDirForURL:(NSString *)url {
    return [self fileURLFor:ViolytraCore_RepoStoreCacheDir(url.UTF8String, NULL) label:url];
}

- (NSURL *)cachedIndexFileForURL:(NSString *)url {
    return [self fileURLFor:ViolytraCore_RepoStoreCachedIndexFile(url.UTF8String, NULL) label:url];
}

- (NSURL *)cachedETagFileForURL:(NSString *)url {
    return [self fileURLFor:ViolytraCore_RepoStoreCachedETagFile(url.UTF8String, NULL) label:url];
}

- (nullable RepoIndex *)cachedIndexForURL:(NSString *)url {
    NSURL *file = [self cachedIndexFileForURL:url];
    if (![[NSFileManager defaultManager] fileExistsAtPath:file.path]) return nil;
    NSString *text = [NSString stringWithContentsOfURL:file encoding:NSUTF8StringEncoding error:nil];
    if (!text) {
        ViolytraLog(@"Failed to read cached index for '%@'", url);
        return nil;
    }
    RepoIndex *index = ParseRepoIndex(text, url);
    if (!index) ViolytraLog(@"Failed to read cached index for '%@': invalid index", url);
    return index;
}

- (NSURL *)fileURLFor:(char *)path label:(NSString *)label {
    if (!path) {
        ViolytraLog(@"Failed to resolve repository path for '%@'", label);
        return [NSURL fileURLWithPath:@""];
    }
    return [NSURL fileURLWithPath:ViolytraCore_ConsumeString(path)];
}

@end
