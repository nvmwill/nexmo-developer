---
title: Subscribe to a stream
description: Learn how to subscribe to an Vonage Video API stream in your iOS application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Subscribing to a stream

To subscribe to a stream, call the `OTSubscriber init(stream:delegate:)` method, passing in an OTStream object and a delegate object to receive subscriber-related messages. Then call the`OTSession subscribe(_:error:)` method to start subscribing to the stream:

```swift
func session(_ session: OTSession, streamCreated stream: OTStream) {
    subscriber = OTSubscriber(stream: stream, delegate: self)
    var error: OTError?
    session.subscribe(subscriber!, error: &error)
    
    if error {
        print("subscribe failed with error: \(error)")
    }
}
```

The `OTSubscriberDelegate subscriberDidConnect(toStream:)` message is sent when the app starts receiving the subscriber's stream. At this point, you can add the subscriber's view (represented by the `OTSubscriber view` property) to the app:

```swift
func subscriberDidConnect(toStream subscriber: OTSubscriberKit) {
    if let subscriberView = self.subscriber?.view {
        subscriberView.frame = CGRect(x: 0, y: 300, width: 400, height: 300)
        self.view.addSubview(subscriberView)
    }
}
```

## Unsubscribing from a stream

To stop playing a stream you are subscribed to, call the `OTSession unsubscribe(_:error:)` method:

```swift
var error: OTError?
session.unsubscribe(subscriber, error: &error)
if (error) {
    print("unsubscribe failed with error: \(error)")
}
```

The Subscriber is disconnected. Next, remove its view from its superview:

```swift
subscriber.view?.removeFromSuperview()
```
