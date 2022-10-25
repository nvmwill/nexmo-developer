---
title: Publishing a Stream to the Session
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Publishing a Stream to the Session

When the app connects to the Vonage Video session, we want it to publish an audio-video stream to the session, using the device's camera and microphone:

1. Add a `publisher` property to the ViewController class:

```swift
class ViewController: UIViewController {
    var session: OTSession?
    var publisher: OTPublisher?
```

The OTPublisher class is defined in the Vonage Video iOS SDK. It uses the device's camera and microphone, to publish a stream Vonage Video session.

2. Modify the implementation of the `sessionDidConnect(_:)` method to include code to publish a stream to the session:

```swift
func sessionDidConnect(_ session: OTSession) {
    print("The client connected to the session.")

    let settings = OTPublisherSettings()
    settings.name = UIDevice.current.name
    guard let publisher = OTPublisher(delegate: self, settings: settings) else {
        return
    }

    var error: OTError?
    session.publish(publisher, error: &error)
    guard error == nil else {
        print(error!)
        return
    }

    guard let publisherView = publisher.view else {
        return
    }
    let screenBounds = UIScreen.main.bounds
    publisherView.frame = CGRect(x: screenBounds.width - 150 - 20, y: screenBounds.height - 150 - 20, width: 150, height: 150)
    view.addSubview(publisherView)
}
```

When the app connects to a session, it initializes an instance of the OTPublisher, defined in the Vonage Video iOS SDK. The constructor takes one parameter: the object that implements the OTPublisherDelegate protocol.

The code then passes the OTPublisher object in as a parameter of the `session.publish()` method. This method publishes an audio-video stream to the session, using the camera and microphone of the iOS device. (Note that in the Xcode simulator, the Vonage Video iOS SDK uses a test video when publishing a stream.)

The OTPublisher object has a `view` property, which is a UIView object. This view displays the video captured from the device's camera. The code adds this view as a subview of the main ViewController's view.

3. Next we will implement methods of the OTPublisherDelegate protocol. This protocol includes methods for handling events related to the publisher. Add the following code to the end of the ViewController.swift file, after the closing bracket of the OTSessionDelegate extension:

```swift
// MARK: - OTPublisherDelegate callbacks
extension ViewController: OTPublisherDelegate {
    func publisher(_ publisher: OTPublisherKit, didFailWithError error: OTError) {
        print("The publisher failed: \(error)")
    }
}
```

* If the client fails to publish to the session, an OTError object is passed into the `publisher(_: didFailWithError:)` method.

Debug your application. If the app successfully connects to the session, it will publish a stream to the session, and you will see the publisher's video in the app.
