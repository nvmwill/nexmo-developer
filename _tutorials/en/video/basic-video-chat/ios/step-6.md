---
title: Subscribing to Other Clients' Streams
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Subscribing to Other Clients' Streams

Finally, we want clients to be able to **subscribe** to (or view) other clients' streams in the session:

1. Add a `subscriber` property to the ViewController class:

```objc
@interface ViewController() <OTSessionDelegate, OTPublisherDelegate>
@property (nonatomic) OTSession *session;
@property (nonatomic) OTPublisher *publisher;
@property (nonatomic) OTSubscriber *subscriber;
@end
```

The OTSubscriber class is defined in the Vonage Video iOS SDK. It uses the device's camera and microphone, to subscribe a stream Vonage Video session.

2. Modify the implementation of the `[OTSessionDelegate session: streamCreated]` method (one of the OTSessionDelegate callbacks) to include code to subscribe to other clients' streams the session:

```objc
- (void)session:(OTSession*)session
streamCreated:(OTStream *)stream
{
    _subscriber = [[OTSubscriber alloc] initWithStream:stream
                                            delegate:self];
    OTError *error = nil;
    [_session subscribe:_subscriber error:&error];
    if (error)
    {
        NSLog(@"Unable to subscribe (%@)", error.localizedDescription);
        return;
    }
    [_subscriber.view setFrame:[UIScreen mainScreen].bounds];
    [self.view insertSubview:_subscriber.view atIndex:0];
}
```

When another client publishes a stream to a session, this method is called, and an OTStream object is passed in. The OTStream class is defined in the Vonage Video iOS SDK, and it represents an audio-video stream in the Vonage Video session. The code initializes an instance of the OTSubscriber class, defined in the Vonage Video iOS SDK. The `OTSubscriber()` constructor takes two parameters: The OTStream object (for the stream you want to view) and the object that implements the OTSubscriberDelegate protocol.

3. Change the ViewController interface declaration to indicate that the class implements the `OTSubscriberDelegate` protocol:

```objc
@interface ViewController() <OTSessionDelegate, OTPublisherDelegate,OTSubscriberDelegate>
```

Next we will implement methods of the OTSessionDelegate protocol. Add the following code to the end of the ViewController class (before the class's `@end` statement):

```objc
# pragma mark - OTSubscriber delegate callbacks
- (void)subscriberDidConnectToStream:(OTSubscriberKit *)subscriber {
    NSLog(@"The subscirber: %@ did connect to the stream", subscriber);
}

- (void)subscriber:(OTSubscriberKit*)subscriber
    didFailWithError:(OTError*)error
{
    NSLog(@"subscriber %@ didFailWithError %@",
            subscriber.stream.streamId,
            error);
}
```

* If the client fails to connect to the Vonage Video session, an OTError object is passed into the `subscriber(_: didFailWithError:)` method.
