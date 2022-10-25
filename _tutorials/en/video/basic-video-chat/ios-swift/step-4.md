---
title: Connecting to the Session
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Connecting to the Session

Next, we will connect to the Vonage Video session. You must do this before you can publish your audio-video stream to the session or view other participants streams.

1. Add a `session` property to the ViewController class:

```swift
class ViewController: UIViewController
    var session: OTSession?
```

The OTSession class is defined in the Vonage Video iOS SDK. It represents a session and includes methods for interacting with the session.

2. Add a method to instantiate the OTSession object and call its `[OTSession connectWithToken: error:]` method. Then you can call it in `viewDidLoad`:

```swift
override func viewDidLoad() {
    super.viewDidLoad()
    connectToAnOpenTokSession()
}

func connectToAnOpenTokSession() {
    session = OTSession(apiKey: kApiKey, sessionId: kSessionId, delegate: self)
    var error: OTError?
    session?.connect(withToken: kToken, error: &error)
    if error != nil {
        print(error!)
    }
}
```

The `OTSession()` constructor takes three parameters:

* Your Vonage Video API key
* The session ID
* The object that implements the OTSessionDelegate protocol

The `connect()` method of the `session` object connects the client application to the Vonage Video session. You must connect before sending or receiving audio-video streams in the session (or before interacting with the session in any way). The `connect()` method takes two parameters:

* `token` is the authentication token for this client to connect to the session.
* `error` is set to an OTError object if an error occurs synchronously when calling the method.

3. Next we will implement methods of the OTSessionDelegate protocol. Add the following code to the end of the ViewController.swift file, after the closing bracket of the ViewController class:

```swift
// MARK: - OTSessionDelegate callbacks
extension ViewController: OTSessionDelegate {
    func sessionDidConnect(_ session: OTSession) {
        print("The client connected to the session.")
    }

    func sessionDidDisconnect(_ session: OTSession) {
        print("The client disconnected from the OpenTok session.")
    }

    func session(_ session: OTSession, didFailWithError error: OTError) {
        print("The client failed to connect to the OpenTok session: \(error).")
    }

    func session(_ session: OTSession, streamCreated stream: OTStream) {
        print("A stream was created in the session.")
    }

    func session(_ session: OTSession, streamDestroyed stream: OTStream) {
        print("A stream was destroyed in the session.")
    }
}
```

This protocol includes methods for handling events related to the session:

* When the client connects to the Vonage Video session, the `sessionDidConnect(_:)` method is called.
* If the client fails to connect to the Vonage Video session, an OTError object is passed into the `session(_: didFailWithError:)` method.
* When the client disconnects from the Vonage Video session, the `sessionDidDisconnect(_:)` method is called.
* When another client publishes a stream to the Vonage Video session.
* When another client stops publishing a stream to the Vonage Video session.

For now, the app prints to the debugger console when any of these events occur.

Debug your application. If the app successfully connects to the Vonage Video session, the `sessionDidConnect(_:)` method prints to the debug console.
