---
title: Subscribe to a stream
description: Learn how to subscribe to an Vonage Video API stream in your iOS application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Subscribing to a stream

To subscribe to a stream, call the `[OTSubscriber initWithStream:]` method, passing in an OTStream object and a delegate object to receive subscriber-related messages. Then call the`[OTSession subscribe:error]` method to start subscribing to the stream:

```objective-c
- (void)session:(OTSession*)session streamCreated:(OTStream*)stream
{
    subscriber = [[OTSubscriber alloc] initWithStream:stream delegate:self];
    OTError* error = nil;
    [session subscribe:subscriber error:&error]
    if (error) {
      NSLog(@"subscribe failed with error: (%@)", error);
    }
}
```

The `[OTSubscriberDelegate subscriberDidConnectToStream:]` message is sent when the app starts receiving the subscriber's stream. At this point, you can add the subscriber's view (represented by the `OTSubscriber.view` property) to the app:

```objective-c
- (void)subscriberDidConnectToStream:(OTSubscriber*)subscriber
{
    [subscriber.view setFrame:CGRectMake(0, 300, 400, 300)];
    [self.view addSubview:subscriber.view];
}
```

## Unsubscribing from a stream

To stop playing a stream you are subscribed to, call the `[OTSession unsubscribe:error:]` method:

```objective-c
OTError* error = nil;
[session unsubscribe:_subscriber error:&error]
if (error) {
  NSLog(@"unsubscribe failed with error: (%@)", error);
}
```

The Subscriber is disconnected. Next, remove its view from its superview:

```objective-c
[subscriber.view removeFromSuperview:];
```
