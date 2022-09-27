---
title: Subscribing to Other Clients' Streams
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Subscribing to Other Clients' Streams

Finally, we want clients to be able to **subscribe** to (or view) other clients' streams in the session:

1. Add a `subscriber` property to the ViewController class:

```swift
class ViewController: UIViewController {
    var session: OTSession?
    var publisher: OTPublisher?
    var subscriber: OTSubscriber?
```

The OTSubscriber class is defined in the Vonage Video iOS SDK. It uses the device's camera and microphone, to subscribe a stream Vonage Video session.

2. Modify the implementation of the `session(_: streamCreated)` method (one of the OTSessionDelegate callbacks) to include code to subscribe to other clients' streams the session:

```swift
func session(_ session: OTSession, streamCreated stream: OTStream) {
    subscriber = OTSubscriber(stream: stream, delegate: self)
    guard let subscriber = subscriber else {
        return
    }

    var error: OTError?
    session.subscribe(subscriber, error: &error)
    guard error == nil else {
        print(error!)
        return
    }

    guard let subscriberView = subscriber.view else {
        return
    }
    subscriberView.frame = UIScreen.main.bounds
    view.insertSubview(subscriberView, at: 0)
}
```

When another client publishes a stream to a session, this method is called, and an OTStream object is passed in. The OTStream class is defined in the Vonage Video iOS SDK, and it represents an audio-video stream in the session. The code initializes an instance of the OTSubscriber class, defined in the Vonage Video iOS SDK. The `OTSubscriber()` constructor takes two parameters: The OTStream object (for the stream you want to view) and the object that implements the OTSubscriberDelegate protocol.

3. Next we will implement methods of the OTSubscriberDelegate protocol. This protocol includes methods for handling events related to the subscriber. Add the following code to the end of the ViewController.swift file, after the closing bracket of the OTPublisherDelegate extension:

```swift
// MARK: - OTSubscriberDelegate callbacks
extension ViewController: OTSubscriberDelegate {
    public func subscriberDidConnect(toStream subscriber: OTSubscriberKit) {
        print("The subscriber did connect to the stream.")
    }

    public func subscriber(_ subscriber: OTSubscriberKit, didFailWithError error: OTError) {
        print("The subscriber failed to connect to the stream.")
    }
}
```

* When the client connects to the session, the `subscriberDidConnect(_:)` method is called.
* If the client fails to connect to the session, an OTError object is passed into the `subscriber(_: didFailWithError:)` method.
