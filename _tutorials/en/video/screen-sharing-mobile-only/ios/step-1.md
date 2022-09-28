---
title: Exploring the Code
description: Follow this tutorial to add screen sharing to your mobile application using the Vonage Video API.
product: video
---

## Exploring the Code

This sample uses the `initCapture`, `releaseCapture`, `startCapture`, `stopCapture`, and `isCaptureStarted` methods of the OTVideoKit class to manage capture functions of the application.

The ViewController class creates a session, instantiates subscribers and sets up the publisher.

The OTKBasicVideoCapturer class creates a frame, captures a screenshot, tags the frame with a timestamp and saves it in an instance of consumer.

The publisher accesses the consumer to obtain the frame.

The `initCapture` method is used to initialize the capture and sets value for the pixel format of an OTVideoFrame object. In this example, it is set to ARGB.

```objc
- (void)initCapture
{
    self.format = [[OTVideoFormat alloc] init];
    self.format.pixelFormat = OTPixelFormatARGB;
}
```

The `releaseCapture` method clears the memory buffer:

```objc
- (void)releaseCapture
{
    self.format = nil;
}
```

The `startCapture` method creates a separate thread and calls the `produceFrame` method to start screen captures:

```objc
- (int32_t)startCapture
{
    self.captureStarted = YES;
    dispatch_after(kTimerInterval,
                    dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_BACKGROUND, 0),
                    ^{
                        @autoreleasepool {
                            [self produceFrame];
                        }
                    });

    return 0;
}
```

The `produceFrame` method:

* Defines the frame for captured images
* Creates a timestamp to tag a captured image
* Takes a screenshot
* Converts the screenshot to a readable format
* Tags the screenshot with a timestamp
* Calculates the size of the image
* Sets the consumeFrame with the image
* Calls itself 15 times per second once the capture starts

The frame for the captured images is set as an object of OTVideoFrame. Properties of OTVideoFrame define the planes, timestamp, orientation and format of a frame.

```objc
OTVideoFrame *frame = [[OTVideoFrame alloc] initWithFormat:self.format];
```

A timestamp is created to tag the image. Every image is tagged with a timestamp so both publisher and subscriber are able to create the same timeline and reference the frames in the same order.

```objc
static mach_timebase_info_data_t time_info;
uint64_t time_stamp = 0;

time_stamp = mach_absolute_time();
time_stamp *= time_info.numer;
time_stamp /= time_info.denom;
```

The screenshot method is called to obtain an image of the screen.

```objc
CGImageRef screenshot = [[self screenshot] CGImage];
```

The fillPixelBufferFromCGImage method converts the image data of a CGImage into a CVPixelBuffer.

```objc
[self fillPixelBufferFromCGImage:screenshot];
```

The frame is tagged with a timestamp and capture rate in frames per second and delay between captures are set.

```objc
CMTime time = CMTimeMake(time_stamp, 1000);
frame.timestamp = time;
frame.format.estimatedFramesPerSecond = kFramesPerSecond;
frame.format.estimatedCaptureDelay = 100;
```

The number of bytes in a single row is multiplied with the height of the image to obtain the size of the image. Note, the single element array and bytes per row are based on a 4-byte, single plane specification of an RGB image.

```objc
frame.format.imageWidth = CVPixelBufferGetWidth(pixelBuffer);
frame.format.imageHeight = CVPixelBufferGetHeight(pixelBuffer);
frame.format.bytesPerRow = [@[@(frame.format.imageWidth * 4)] mutableCopy];
frame.orientation = OTVideoOrientationUp;

CVPixelBufferLockBaseAddress(pixelBuffer, 0);
uint8_t *planes[1];

planes[0] = CVPixelBufferGetBaseAddress(pixelBuffer);
[frame setPlanesWithPointers:planes numPlanes:1];
```

The frame is saved in an instance of consumer. The publisher accesses captured images through the consumer instance.

```objc
[self.consumer consumeFrame:frame];
```

The pixel buffer is cleared and a background-priority queue (separate from the queue used by the UI) is used to capture images. If image capture is in progress, the `produceFrame` method calls itself 15 times per second.

```objc
    CVPixelBufferUnlockBaseAddress(pixelBuffer, 0);
    if (self.captureStarted) {
        dispatch_after(kTimerInterval,
                        dispatch_get_global_queue(DISPATCH_QUEUE_PRIORITY_BACKGROUND, 0),
                        ^{
                            @autoreleasepool {
                                [self produceFrame];
                            }
                        });
    }
```

The `screenshot` method takes a screenshot and returns an image. This method is called by the `produceFrame` method.

```objc
- (UIImage *)screenshot
{
    CGSize imageSize = CGSizeZero;

    imageSize = [UIScreen mainScreen].bounds.size;

    UIGraphicsBeginImageContextWithOptions(imageSize, NO, 0);
    UIWindow *window = [UIApplication sharedApplication].keyWindow;

    if ([window respondsToSelector:
            @selector(drawViewHierarchyInRect:afterScreenUpdates:)])
    {
        [window drawViewHierarchyInRect:window.bounds afterScreenUpdates:NO];
    }
    else {
        [window.layer renderInContext:UIGraphicsGetCurrentContext()];
    }

    UIImage *image = UIGraphicsGetImageFromCurrentImageContext();
    UIGraphicsEndImageContext();
    return image;
}
```
