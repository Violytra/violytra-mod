#pragma once

#import <Foundation/Foundation.h>

#import "ViolytraCore.h"

NS_ASSUME_NONNULL_BEGIN

#ifdef __cplusplus
extern "C" {
#endif

NSString *ViolytraCore_ConsumeString(char * _Nullable value);

NSString * _Nullable ViolytraCore_ConsumeStringOrNil(char * _Nullable value);

NSString *ViolytraCore_ConsumeError(char * _Nullable value);

char * _Nullable ViolytraCore_CopyCString(NSString * _Nullable value);

#ifdef __cplusplus
}
#endif

NS_ASSUME_NONNULL_END
