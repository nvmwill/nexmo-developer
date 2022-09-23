--- 
title: Disconnecting from a Session 
description: Learn how to connect to a Vonage Video API session so that participants can use audio, video, and messaging functionality in your ios application.
product: video 
---

## Disconnecting from a session

To disconnect from a session, call the `OTSession disconnect(_:)` method.

```swift
var error: OTError?
session.disconnect(&error)

if let error = error {
    print("disconnect failed with error: \(error)")
    }
```

## Detecting when you have disconnected

The `OTSessionDelegate sessionDidDisconnect(_:)` message is sent to the session's delegate when the session disconnects.

Note that sessions automatically disconnect when the app is suspended.

If the connection to the session drops due to an error that occurs after a successful connection, the `OTSessionDelegate session(_:didFailWithError:)` message is sent prior to the `OTSessionDelegate sessionDidDisconnect(_:)` message.

The `OTSessionErrorCode` enum defines the `code` property of the OTError object passed into the `OTSessionDelegate session(_:didFailWithError:)` message, and it describes the the reason for the disconnection.
