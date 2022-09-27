--- 
title: Automatic reconnection 
description: Learn how to connect to a Vonage Video API session so that participants can use audio, video, and messaging functionality in your ios application.
product: video 
---

## Automatic reconnection

Clients will attempt to automatically reconnect to a session they disconnect unexpectedly (for example, due to a drop in network connectivity). You do not need to add any code to have the clients reconnect automatically, unless you want to respond to messages sent when your client disconnects and reconnects. 

<!---For sample code that demonstrates the use of these events, see the [opentok-reconnection](https://github.com/opentok/opentok-reconnection/) repo on GitHub.-->

When the connection is dropped and the client tries to reconnect, the `OTSessionDelegate sessionDidBeginReconnecting(_:)` message is sent to the OTSession object's delegate. When the connection is restored, the `OTSessionDelegate sessionDidReconnect(_:)` message is sent. If the client cannot restore the connection, the `OTSessionDelegate sessionDidDisconnect(_:)` message is sent.

In response to these events, your application can (optionally) display user interface notifications indicating the temporary disconnection, reconnection, and disconnection states.

```swift
// OTSession delegate callbacks:
func sessionDidBeginReconnecting(_ session:OTSession) {
    // Display a user interface notification.
}

func sessionDidReconnect(_ session: OTSession) {
    // Adjust user interface.
}

func sessionDidDisconnect(_ session: OTSession) {
    // Adjust user interface.
}
```

When your client temporarily disconnects from a session, the OKSubscriberKitDelegate objects in clients subscribing to a stream you publish send messages when your published stream drops and when (and if) it resumes automatically.

For more information, see the **Detecting when streams leave a session and reconnection** step in the [Subscribe to streams](/video/tutorials/subscribe-streams/introduction/swift) tutorial.

By default, any signals you send while your client is temporarily disconnected from a session are queued and sent when (and if) you successfully reconnect. You can use the `OTSession signal(withType: string:connection:retryAfterReconnect:error:)` method to prevent signals from being queued while you are disconnected.

For more information, see [Signaling tutorial](/video/tutorials/video-signaling/introduction/).