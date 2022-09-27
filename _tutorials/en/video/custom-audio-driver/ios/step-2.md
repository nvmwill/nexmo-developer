---
title: Rendering audio from subscribed streams
description: Add a custom audio driver to your application using the Vonage Video API.
product: video
---
## Rendering audio from subscribed streams

The `[OTAudioDevice startRendering:]` method is called when the audio device should start rendering (playing back) audio from subscribed streams. The OTKBasicAudioDevice implementation of this method calls the `[self consumeSampleCapture]` method after 0.1 seconds:

```objc
- (BOOL)startRendering
{
    self.isDeviceRendering = YES;
    dispatch_after(
        dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.1 * NSEC_PER_SEC)),
        dispatch_get_main_queue(),
        ^{
        [self consumeSampleCapture];
    });
    return YES;
}
```

The `[OTKBasicAudioDevice consumeSampleCapture]` method gets 1000 samples from the audio bus by calling the `[OTAudioBus readRenderData:buffer numberOfSamples:]` method (defined by the OpenTok iOS SDK). It then writes the audio data to the file (for sample purposes). And, if the audio device is still being used to render audio samples, it sets a timer to call `consumeSampleCapture` method again after 0.1 seconds:

```objc
- (void)consumeSampleCapture
{
    static int num_samples = 1000;
    int16_t *buffer = malloc(sizeof(int16_t) * num_samples);

    uint32_t samples_get = [self.otAudioBus readRenderData:buffer numberOfSamples:num_samples];

    NSData *data = [NSData dataWithBytes:buffer
                                    length:(sizeof(int16_t) * samples_get)];
    [self.outFile seekToEndOfFile];
    [self.outFile writeData:data];

    free(buffer);

    if (self.isDeviceRendering) {
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW,
            (int64_t)(0.1 * NSEC_PER_SEC)),
            dispatch_get_main_queue(),
            ^{
            [self consumeSampleCapture];
        });
    }
}
```

This example is intentionally for instructional purposes -- it writes the audio data to a file. In a more practical use of a custom audio driver, you could use the custom audio driver to play back audio to a Bluetooth device or to process audio before playing it back.

### Capturing audio to be used by a publisher

The `[OTAudioDevice startCapture:]` method is called when the audio device should start capturing audio to be published. The OTKBasicAudioDevice implementation of this method calls the `[self produceSampleCapture]` method after 0.1 seconds:

```objc
- (BOOL)startCapture
{
    self.isDeviceCapturing = YES;
    dispatch_after(
        dispatch_time(DISPATCH_TIME_NOW, (int64_t)(0.1 * NSEC_PER_SEC)),
        dispatch_get_main_queue(),
        ^{
        [self produceSampleCapture];
    });

    return YES;
}
```
<!-- alex ignore white -->

The `[OTKBasicAudioDevice produceSampleCapture]` method produces a buffer containing samples of random data (white noise). It then calls the `[OTAudioBus writeCaptureData: numberOfSamples:]` method of the OTAudioBus object, which sends the samples to the audio bus. The publisher in the application uses the samples sent to the audio bus to transmit as audio in the published stream. Then if a capture is still in progress (if the app is publishing), the method calls itself again after 0.1 seconds.

```objc
- (void)produceSampleCapture
{
    static int num_frames = 1000;
    int16_t *buffer = malloc(sizeof(int16_t) * num_frames);

    for (int frame = 0; frame < num_frames; ++frame) {
        Float32 sample = ((double)arc4random() / 0x100000000);
        buffer[frame] = (sample * 32767.0f);
    }

    [self.otAudioBus writeCaptureData:buffer numberOfSamples:num_frames];

    free(buffer);

    if (self.isDeviceCapturing) {
        dispatch_after(dispatch_time(DISPATCH_TIME_NOW,
            (int64_t)(0.1 * NSEC_PER_SEC)),
            dispatch_get_main_queue(),
            ^{
            [self produceSampleCapture];
        });
    }
}
```

### Other notes on the app

The OTAudioDevice protocol includes other required methods, which are implemented by the OTKBasicAudioDevice class. However, this sample does not do anything interesting in these methods, so they are not included in this discussion.
