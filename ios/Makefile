TARGET := iphone:clang:latest:14.0
SDK = iPhoneOS16.5
ARCHS = arm64
INSTALL_TARGET_PROCESSES = Discord
THEOS_PACKAGE_SCHEME = rootless
FINALPACKAGE = 1
VERSION_CODE = 1.0.0

THEOS ?= $(HOME)/theos
export THEOS

include $(THEOS)/makefiles/common.mk

TWEAK_NAME = ViolytraTweak

ViolytraTweak_FILES = $(wildcard Sources/*.x Sources/*.xm Sources/*.m Sources/*.mm Sources/**/*.x Sources/**/*.xm Sources/**/*.m Sources/**/*.mm)
ViolytraTweak_CFLAGS = -fobjc-arc -DPACKAGE_VERSION='@"$(THEOS_PACKAGE_BASE_VERSION)"' -DVERSION_CODE='@"$(VERSION_CODE)"' -I$(THEOS_PROJECT_DIR)/Headers
ViolytraTweak_CCFLAGS = -std=c++17 -Wno-c++11-narrowing -I$(THEOS_PROJECT_DIR)/Headers
ViolytraTweak_FRAMEWORKS = Foundation UIKit CoreGraphics CoreText CoreFoundation UniformTypeIdentifiers
ViolytraTweak_LDFLAGS = -undefined dynamic_lookup -lz

ifneq ($(VIOLYTRA_CORE_LIB),)
ViolytraTweak_LDFLAGS += -Wl,-force_load,$(VIOLYTRA_CORE_LIB)
else
ViolytraTweak_FRAMEWORKS += ViolytraCore
ViolytraTweak_CFLAGS += -F$(VIOLYTRA_CORE_FW)
ViolytraTweak_CCFLAGS += -F$(VIOLYTRA_CORE_FW)
ViolytraTweak_LDFLAGS += -F$(VIOLYTRA_CORE_FW) -Wl,-force_load,$(VIOLYTRA_CORE_FW)/ViolytraCore.framework/ViolytraCore
endif

ifneq ($(VIOLYTRA_BUNDLE_DIR),)
ViolytraTweak_LDFLAGS += -Wl,-sectcreate,__DATA,__vbundle,$(VIOLYTRA_BUNDLE_DIR)/violytra.bundle
ViolytraTweak_LDFLAGS += -Wl,-sectcreate,__DATA,__vmanifest,$(VIOLYTRA_BUNDLE_DIR)/manifest.json
endif

include $(THEOS_MAKE_PATH)/tweak.mk

after-stage::
	$(ECHO_NOTHING)find $(THEOS_STAGING_DIR) -name ".DS_Store" -delete$(ECHO_END)
ifneq ($(VIOLYTRA_BUNDLE_DIR),)
	$(ECHO_NOTHING)cp $(VIOLYTRA_BUNDLE_DIR)/violytra.bundle $(THEOS_STAGING_DIR)/Library/MobileSubstrate/DynamicLibraries/$(ECHO_END)
	$(ECHO_NOTHING)cp $(VIOLYTRA_BUNDLE_DIR)/manifest.json $(THEOS_STAGING_DIR)/Library/MobileSubstrate/DynamicLibraries/violytra.manifest.json$(ECHO_END)
	$(ECHO_NOTHING)mkdir -p $(THEOS_STAGING_DIR)/Library/MobileSubstrate/DynamicLibraries/ViolytraManifest.bundle$(ECHO_END)
	$(ECHO_NOTHING)cp $(VIOLYTRA_BUNDLE_DIR)/manifest.json $(THEOS_STAGING_DIR)/Library/MobileSubstrate/DynamicLibraries/ViolytraManifest.bundle/violytra.manifest.json$(ECHO_END)
endif
