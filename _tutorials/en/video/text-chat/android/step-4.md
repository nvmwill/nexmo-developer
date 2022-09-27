---
title: Setting the SignalListener
description: Follow this tutorial to build basic text chat from scratch using the Vonage Video API. It is the quickest way to build a proof of concept for this functionality on the video platform. 
product: video
---

## Setting the SignalListener

Now we need to set the `signalListener` property as the SignalListener. In the `onCreate()` method of `MainActivity` class, we added:

```java
session.setSignalListener(signalListener);
```

This sets the `signalListener` object as the implementor of the `SubscriberKit.SignalListener` interface. This interface defines the `onSignalReceived(session, type, data, connection)` method, which is called when the client receives a signal from the session.
