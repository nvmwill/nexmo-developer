--- 
title: Connecting to a session 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your Linux application.
product: video 
---

# Connecting to a session

After creating the session and publisher instances, call the `otc_session_connect()` function:

```c
otc_session_connect(session, TOKEN);
```

This function connects the client to the Vonage Video session. It takes two arguments:

* The `otc_session` structure instance.
* The Vonage Video token string.

Upon successfully connecting, the `on_connected` callback function of the `otc_session_callbacks` struct is called. Upon error, the `on_error` callback function of the `otc_session_callbacks` struct is called.
