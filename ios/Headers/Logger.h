#import <Foundation/Foundation.h>

#define LOG_PREFIX         @"[Violytra]"
#define ViolytraLog(fmt, ...) NSLog((LOG_PREFIX @" " fmt), ##__VA_ARGS__)