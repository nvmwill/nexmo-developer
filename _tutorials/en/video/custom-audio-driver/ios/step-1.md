---
title: Setting up the audio device and the audio bus
description: Add a custom audio driver to your application using the Vonage Video API.
product: video
---
## Setting up the audio device and the audio bus

<!-- alex ignore white -->

This sample application uses the custom audio driver to publish white noise (a random audio signal) to its audio stream. It also uses the custom audio driver to capture the audio from subscribed streams and save it to a file.

In using a custom audio driver, you define a custom audio driver and an audio bus to be used by the app.

The OTKBasicAudioDevice class defines a basic audio device interface to be used by the app. It implements the OTAudioDevice protocol, defined by the Vonage Video iOS SDK. To use a custom audio driver, call the `[OTAudioDeviceManager setAudioDevice:]` method. This sample sets the audio device to an instance of the OTKBasicAudioDevice class:

```objc
[OTAudioDeviceManager setAudioDevice:[[OTKBasicAudioDevice alloc] init]];
```

Use the OTAudioFormat class, defined in the Vonage Video iOS SDK, to define the audio format used by the custom audio driver. The `[OTKBasicAudioDevice init]` method creates an instance of the OTAudioFormat class, and sets the sample rate and number of channels for the audio format:

```objc
- (id)init
{
    self = [super init];
    if (self) {
        self = [super init];
        if (self) {
            _otAudioFormat = [[OTAudioFormat alloc] init];
            _otAudioFormat.sampleRate = kSampleRate;
            _otAudioFormat.numChannels = 1;
        }

        // ...
    }
    return self;
}
```

The `init` method also sets up some local properties that report whether the device is capturing, whether capturing has been initialized, whether it is rendering and whether rendering has been initialized:

```objc
_isDeviceCapturing = NO;
_isCaptureInitialized = NO;
_isDeviceRendering = NO;
_isRenderingInitialized = NO;
```

The `init` method also sets up a file to save the incoming audio to a file. This is done to illustrate a use of the custom audio driver's audio renderer:

```objc
NSArray *paths = NSSearchPathForDirectoriesInDomains(NSDocumentDirectory,
                                                        NSUserDomainMask,
                                                        YES);
NSString *path = [paths[0] stringByAppendingPathComponent:kOutputFileSampleName];

[[NSFileManager defaultManager] createFileAtPath:path
                                        contents:nil
                                        attributes:nil];
_outFile = [NSFileHandle fileHandleForReadingAtPath:path];
```

The `[OTKBasicAudioDevice setAudioBus:]` method (defined by the OTAudioDevice protocol) sets the audio bus to be used by the audio device (defined by the OTAudioBus protocol). The audio device uses this object to send and receive audio samples to and from a session. This instance of the object is retained for the lifetime of the implementing object. The publisher will access the OTAudioBus object to obtain the audio samples. And subscribers will send audio samples (from subscribed streams) to the OTAudioBus object. Here is the OTKBasicAudioDevice implementation of the `[OTAudioDevice setAudioBus:]` method:

```objc
- (BOOL)setAudioBus:(id<OTAudioBus>)audioBus
{
    self.otAudioBus = audioBus;
    return YES;
}
```

The `[OTKBasicAudioDevice setAudioBus:]` method (defined by the OTAudioDevice protocol) method sets the audio rendering format, the OTAudioFormat instance that was created in the the `init` method:

```objc
- (OTAudioFormat*)renderFormat
{
    return self.otAudioFormat;
}
```
