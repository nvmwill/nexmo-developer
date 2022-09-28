---
title: Exploring the Code
description: Add custom video rendering to your application using the Vonage Video API.
product: video
---

## Exploring the Code

In this example, the app uses a custom video renderer to display a black-and-white version of the OTPublisher object's video.

In the main ViewController, after initializing the OTPublisher object, the `videoRender` property of the OTPublisher object is set to an instance of OTKBasicVideoRender:

```objc
_publisher = [[OTPublisher alloc] initWithDelegate:self settings:settings];
_renderer = [[OTKBasicVideoRender alloc] init];
_publisher.videoRender = _renderer;
```

OTKBasicVideoRender is a custom class that implements the OTVideoRender protocol (defined in the Vonage Video iOS SDK). This protocol lets you define a custom video renderer to be used by a Vonage Video publisher or subscriber.

The `[OTKBasicVideoRender init:]` method sets a `_renderView` property to a UIView object. This is the UIView object that will contain the view to be rendered (by the publisher or subscriber). In this sample, the UIView object is defined by the custom OTKCustomRenderView class, which extends UIView:

```objc
- (id)init
{
    self = [super init];
    if (self) {
        _renderView = [[OTKCustomRenderView alloc] initWithFrame:CGRectZero];
    }
    return self;
}
```

The OTKCustomRenderView class includes methods (discussed later) that convert a video frame to a black-and-white representation.

The `[OTVideoRender renderVideoFrame:]` method is called when the publisher (or subscriber) renders a video frame to the video renderer. The frame an OTVideoFrame object (defined by the Vonage Video iOS SDK). In the OTKCustomRenderView implementation of this method, it takes the frame and passes it along to the `[renderVideoFrame]` method of the OTKCustomRenderView object:

```objc
- (void)renderVideoFrame:(OTVideoFrame*) frame
{
    [(OTKCustomRenderView*)self.renderView renderVideoFrame:frame];
}
```

The `[OTKCustomRenderView renderVideoFrame]` method iterates through the pixels in the plane, adjusts each pixel to a black-and-white value, adds the value to a buffer. It then writes the buffer to a CGImageRef representing the view's image, and calls `[self setNeedsDisplay]` to render the image view:

```objc
- (void)renderVideoFrame:(OTVideoFrame *)frame
{
    __block OTVideoFrame *frameToRender = frame;
    dispatch_sync(self.renderQueue, ^{
        if (_img != NULL) {
            CGImageRelease(_img);
            _img = NULL;
        }

        size_t bufferSize = frameToRender.format.imageHeight
            * frameToRender.format.imageWidth * 3;
        uint8_t *buffer = malloc(bufferSize);

        uint8_t *yplane = [frameToRender.planes pointerAtIndex:0];

        for (int i = 0; i < frameToRender.format.imageHeight; i++) {
            for (int j = 0; j < frameToRender.format.imageWidth; j++) {
                int starting = (i * frameToRender.format.imageWidth * 3) + (j * 3);
                uint8_t yvalue = yplane[(i * frameToRender.format.imageWidth) + j];
                // If in a RGB image we copy the same Y value for R, G and B
                // we will obtain a Black & White image
                buffer[starting] = yvalue;
                buffer[starting+1] = yvalue;
                buffer[starting+2] = yvalue;
            }
        }

        CGDataProviderRef imgProvider = CGDataProviderCreateWithData(NULL,
                                                                        buffer,
                                                                        bufferSize,
                                                                        release_frame);

        _img = CGImageCreate(frameToRender.format.imageWidth,
                                frameToRender.format.imageHeight,
                                8,
                                24,
                                3 * frameToRender.format.imageWidth,
                                CGColorSpaceCreateDeviceRGB(),
                                kCGBitmapByteOrder32Big | kCGImageAlphaNone,
                                imgProvider,
                                NULL,
                                false,
                                kCGRenderingIntentDefault);


        CGDataProviderRelease(imgProvider);
        dispatch_async(dispatch_get_main_queue(), ^{
            [self setNeedsDisplay];
        });
    });
}
```
