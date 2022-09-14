---
title: Publishing a stream
description: Learn how to publish Vonage Video API streams in your Linux application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Publishing a stream

When the application connects to a session, the `on_connected()` callback function of the `otc_session_callbacks` struct is called (see [Joining a Session](/video/tutorials/joining-a-session)). In response to this, you can call the `otc_session_publish()` function to publish a stream to the OpenTok session:

```c
if (otc_session_publish(session, publisher) != OTC_SUCCESS) {
  printf("Could not publish successfully.");
}
```

The `otc_session_publish()` function takes two arguments:

* The pointer to the `otc_session` structure.
* The `otc_publisher` structure.

It returns `OTC_SUCCESS` when it successfully starts publishing a stream to the session. Or it returns an error, and the `otc_error` callback is called.
