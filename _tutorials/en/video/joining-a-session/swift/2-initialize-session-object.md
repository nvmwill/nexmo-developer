--- 
title: Initialize session object 
description: Learn how to connect to a Vonage Video API session so that participants can use audio, video, and messaging functionality in your ios application.
product: video 
---

## Initializing an OTSession object

Before you can connect to a session, instantiate an OTSession object by calling the `OTSession init(apiKey:sessionId:delegate:)` method with your Vonage Video API key and the appropriate session ID:

```swift
// Replace kApiKey with your OpenTok API key:
// Replace kSessionId with an OpenTok session ID:
session = OTSession(apiKey: kApiKey, sessionId: kSessionId, delegate: self)
```

Note that calling the `OTSession init(apiKey: sessionId: delegate:)` method does not _create_ a Vonage Video session; it creates the Swift OTSession object, which represents an existing Vonage Video session. You create a Vonage Video session using the Vonage Video server-side libraries.

See [Creating a Vonage Video session](/video/tutorials/create-session/introduction).

Implement the methods of the `OTSessionDelegate` protocol in the object you specify as the delegate object. These methods are called when session-related events occur.
