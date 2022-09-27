---
title: Publishing a Stream to the Session
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Publishing a Stream to the Session

When the app connects to the Vonage Video session, we want it to publish an audio-video stream to the session, using the device's camera and microphone:

1. Add a `publisher` property to the ViewController class:

```objc
@interface ViewController() <OTSessionDelegate>
@property (nonatomic) OTSession *session;
@property (nonatomic) OTPublisher *publisher;
@end
```

The OTPublisher class is defined in the Vonage Video iOS SDK. It uses the device's camera and microphone, to publish a stream Vonage Video session.

2. Modify the implementation of the `sessionDidConnect(_:)` method to include code to publish a stream to the session:

```objc
- (void)sessionDidConnect:(OTSession*)session
{
    OTPublisherSettings *settings = [[OTPublisherSettings alloc] init];
    _publisher = [[OTPublisher alloc]
                    initWithDelegate:self
                    settings:settings];

    OTError *error = nil;
    [_session publish:_publisher error:&error];
    if (error)
    {
        NSLog(@"Unable to publish (%@)", error.localizedDescription);
        return;
    }

    CGSize screenSize = [UIScreen mainScreen].bounds.size;
    CGRect rect = CGRectMake(screenSize.width - 150 - 20, screenSize.height - 150 - 20, 150, 150);
    [_publisher.view setFrame:rect];
    [self.view addSubview:_publisher.view];
}
```

When the app connects to a session, it initializes an instance of the OTPublisher, defined in the Vonage Video iOS SDK. The `[OTPublisher initWithDelegate:]` method takes two parameters: the object that implements the OTPublisherDelegate protocol and a `settings`object.

The code then passes the OTPublisher object in as a parameter of the `[OTSession publish:]` method. This method publishes an audio-video stream to the Vonage Video session, using the camera and microphone of the iOS device. (Note that in the Xcode simulator, the Vonage Video iOS SDK uses a test video when publishing a stream.)

The OTPublisher object has a `view` property, which is a UIView object. This view displays the video captured from the device's camera. The code adds this view as a subview of the main ViewController's view.

3. Change the ViewController interface declaration to indicate that the class implements the `OTPublisherDelegate` protocol:

```objc
@interface ViewController() <OTSessionDelegate, OTPublisherDelegate>
```

Next we will implement methods of the OTSessionDelegate protocol. Add the following code to the end of the ViewController class (before the class's `@end` statement):

```objc
# pragma mark - OTPublisher delegate callbacks
- (void)publisher:(OTPublisherKit*)publisher
didFailWithError:(OTError*) error
{
    NSLog(@"The publisher failed: %@", error);
} 
```

If the client fails to publish to the Vonage Video session, an OTError object is passed into the `[OTPublisherDelegate publisher:didFailWithError:]` method.

Debug your application. If the app successfully connects to the Vonage Video session, it will publish a stream to the session, and you will see the publisher's video in the app.
