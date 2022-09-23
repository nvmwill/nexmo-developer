--- 
title: Disconnecting from a Session 
description: Learn how to connect to a Vonage Video API session so that participants can use audio, video, and messaging functionality in your Linux application.
product: video 
---

## Disconnecting from a session

To disconnect from a session, call the `otc_session_disconnect()` function:

```c
otc_session_disconnect(session);
```

If you will not be reconnecting to the session, you should call the `otc_session_delete()` and `otc_destroy()` functions:

```c
otc_session_delete(session);
session = NULL;

otc_destroy();
```

## Detecting when you have disconnected

When the client disconnects from the OpenTok session, the `on_disconnected` callback function of the `otc_session_callbacks` struct is called.
