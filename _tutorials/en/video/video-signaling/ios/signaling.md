---
title: Signaling
description: "Learn how to use Vonage Video API signaling to build messaging into your iOS application. With signaling, users can send messages to each other, control robots, and more!"
product: video
navigation-weight:
---

# Signaling

Use the Vonage Video signaling API to send text and data between clients connected to a session.

For conceptual information on the API, see the [Signaling overview](/video/guides/signaling) developer guide.

This topic includes the following sections:

* [Sending a Signal to a Specific Client in a Session](#sending-a-signal-to-a-specific-client-in-a-session)
* [Sending a Signal to All Clients in a Session](#sending-a-signal-to-all-clients-in-a-session)
* [Receiving Signals in a Session](#receiving-signals-in-a-session)
* [Preventing Signals From Being Sent During Automatic Reconnection](#preventing-signals-from-being-sent-during-automatic-reconnection)

## Sending a Signal to a Specific Client in a Session

To send a signal to a specific client in a session, call the `[OTSession signalWithType:data:connection:error:]` method of the Session object:

```objective-c
OTError* error = nil;
[session signalWithType:type string:@"hello" connection:_connection error:&error];
if (error) {
    NSLog(@"signal error %@", error);
} else {
    NSLog(@"signal sent");
}
```

The `type` parameter is a string value that clients can filter on when [receiving signals](#receiving-signals-in-a-session). Set this to an empty string if you do not need to set a type.

The `string` parameter is the data payload (a string) you send with the message. The limit to the size of data is 8KB.

The `connection` parameter is an [OTConnection](/sdk/stitch/video-ios-reference/Classes/OTConnection.html) object corresponding to a client connected to the session that you want to signal. You obtain references to OTConnection objects in the [[OTSessionDelegate:session:connectionCreated:]](/sdk/stitch/video-ios-reference/Protocols/OTSessionDelegate.html) message.

The `error` parameter is set to an OTError object when the call to the method fails. In the case of success, the error parameter is set to nil.

## Sending a Signal to All Clients in a Session

To send a signal to specific clients in a session, call the `[OTSession signalWithType:string:connection:error:]` method of the OTSession object:

```objective-c
OTError* error = nil;
[session signalWithType:type string:@"hello" connection:nil error:&error)];
if (error) {
    NSLog(@"signal error %@", error);
} else {
    NSLog(@"signal sent");
}
```

The `type` parameter is a string value that clients can filter on when [receiving signals](#receiving-signals-in-a-session). Set this to an empty string if you do not need to set a type.

The `string` parameter is the data payload (a string) you send with the message. The limit to the size of data is 8KB.

The `error` parameter is set to an OTError object when the call to the method fails. In the case of success, the error parameter is set to nil.

## Receiving Signals in a Session

When a signal is sent in a session, the `[OTSessionDelegate session:receivedSignalType:fromConnection:withString:]` message is sent. The first parameter is set to the type string of the signal. The second parameter identifies the sender of the signal. The third parameter is the data string of the signal.

Note that you can use a [REST API call](/video/guides/signalingrest/) to send a signal from your server, instead of from a client connected to the session. In this case, the `fromConnection` parameter is set to `null`.

## Preventing Signals From Being Sent During Automatic Reconnection

Clients will attempt to automatically reconnect to a session they disconnect unexpectedly (for example, due to a drop in network connectivity). By default, any signals you send while the client is temporarily disconnected from a session are queued and sent when (and if) it successfully reconnects.

You can use the `[OTSession signalWithType:string:connection:retryAfterReconnect:error:]` method and set the `retryAfterReconnect` parameter to `NO` to prevent signals from being queued while the client is disconnected. For more information, see [Automatic reconnection](/developer/guides/connect-session/ios/#automatic_reconnection).
