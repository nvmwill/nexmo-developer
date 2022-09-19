--- 
title: Connecting to a session 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your ios application.
product: video 
---

# Connecting to a session

Call the `[OTSession connectWithToken:error:]` method, passing in the token for the client:

```objective_c
OTError* error = nil;
[session connectWithToken:kToken error:&error];
if (error) {
  NSLog(@"connect failed with error: (%@)", error);
}
```

The `[OTSessionDelegate session:didConnect]` message is sent when the client connects to the Vonage Video session.

The `OTSessionDelegate session:didFailWithError:]` is sent when there is an error in connecting. See the documentation for the [OTSessionErrorCode enum](/sdk/stitch/video-ios-reference/Constants/OTSessionErrorCode.html) for descriptions of values of the `code` property of the error object.

## Monitoring the connection status

You can get the connection status by checking the `sessionConnectionStatus` property of the OTSession object:

```objective_c
session.sessionConnectionStatus
```
    
Valid values are defined in the [OTSessionConnectionStatus enum](/sdk/stitch/video-ios-reference/Constants/OTSessionConnectionStatus.html).

You can use a key-value observer to monitor this property. However, the `[OTSessionDelegate sessionDidConnect:]` and `[OTSessionDelegate sessionDidDisconnect:]` messages are sent to the session's delegate when the session connects and disconnects.
