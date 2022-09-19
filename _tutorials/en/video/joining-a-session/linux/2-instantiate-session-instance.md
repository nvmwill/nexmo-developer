--- 
title: Instantiate a session instance 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your Linux application.
product: video 
---

## Instantiating an otc_session instance and session-related callbacks

Create a structure of type `otc_session_callbacks`, and function pointers to it callback function members. For example:

```c
char *session_user_data = strdup("Session user data");

static void on_session_connected(otc_session *session, void *user_data) {
    // You could publish a stream once you connect to the session.
}
    
static void on_session_stream_received(otc_session *session,
                                       void *user_data,
                                       const otc_stream *stream) {
    // You could call otc_subscriber_new() to subscribe to this stream
       // in response to this event.
}

static void on_session_stream_dropped(otc_session *session,
                                      void *user_data,
                                      const otc_stream *stream) {
    // If you have subscribed to this stream, you should
    // call otc_subscriber_delete() to delete the subscriber in response to this event.
    }
    
static void on_disconnected(otc_session *session, void *user_data) {
    // Handle the on_disconnected event.
}

static void on_session_error(otc_session *session,
                             void *user_data,
                             const char *error_string,
                             enum otc_session_error_code error) {
    // Handle the error.
}

struct otc_session_callbacks session_callbacks = {0};
session_callbacks.user_data = session_user_data;
session_callbacks.on_connected = on_session_connected;
session_callbacks.on_stream_received = on_session_stream_received;
session_callbacks.on_stream_dropped = on_session_stream_dropped;
session_callbacks.on_disconnected = on_session_disconnected;
session_callbacks.on_error = on_session_error;
```

Use the `user_data` member of the `otc_session_callbacks` structure to set data you may want to reference in the callback functions. In this example, we set it to a pointer to a string object. But it could be a pointer to an instance of some other type that contains meaningful information.

The other members of the `otc_session_callbacks` structure are callback functions that are called when events related to the Vonage Video session occur. The previous example includes callbacks for the following:

* `on_connected\` -- Called when the `otc_session_connect()` function (see below) successfully connects the instance to an Vonage Video session.
* `on_stream_received` -- Called when there is a new stream in the Vonage Video session (when another client publishes a stream to the session).
* `on_stream_dropped` -- Called when another client's stream is dropped from the Vonage Video session. This can happen when the client stops publishing the stream or if the client's network connection drops.
* `on_disconnected` -- Called when a the application disconnects from the Vonage Video session (see below).
* `on_error` -- Called when an error occurs in connecting to the session. This function includes parameters for an error string and an error code that is defined by the `otc_session_error_code` enum.

All callbacks will not be made on the application or main thread but on an internal thread. The application should return the callback as quickly as possible to avoid blocking the internal thread.

See [otc_session_callbacks](/sdk/stitch/video-linux-reference/structotc__session__callbacks.html) in the Vonage Video Linux SDK reference for details on each of the callback functions.

After initializing the the `otc_session_callbacks` structure, call the `otc_session_new()` function, passing in your Vonage Video API key string, the Vonage Video session ID string, and a pointer to the `otc_session_callbacks` structure:

```c
otc_session *session = NULL;
session = otc_session_new(API_KEY, SESSION_ID, &session_callbacks);
```

The `otc_session_new()` function returns an `otc_session` structure, which represents an Vonage Video session.

To use advanced session settings, call the `otc_session_new_with_settings()`, instead of the `otc_session_new()` function. This function takes an `settings` parameter that is a pointer to an `otc_session_settings` struct that defines the advanced settings. For example, the following code uses the `otc\_session_settings_new ()` function to instantiate an `otc_session_settings` struct and calls `otc_session_settings_set_connection_events_suppressed(OTC_TRUE)` to have the SDK suppress connection events, to support large interactive video sessions. It then passes the `otc_session_settings` struct into the `otc_session_new_with_settings()` function:

```c
// Populate the session_callbacks struct, as in the previous example. Then...

otc_session_settings *session_settings = otc_session_settings_new();
otc_session_settings_set_connection_events_suppressed(session_settings, OTC_TRUE);
otc_session *session = otc_session_new_with_settings(API_KEY,
                                                     SESSION_ID,
                                                     &session_callbacks,
                                                     session_settings);
```

In addition to `otc_session_settings_set_connection_events_suppressed()`, the following functions let you set advanced settings for a session:

* `otc_session_settings_set_custom_ice_config()` — Enables custom ICE sever configuration. This is part of the [configurable TURN feature](/video/guides/configurable-turn-servers).
* `otc_session_settings_set_ip_whitelist()` — This supports the [allowed IP address feature](/video/guides/ip-addresses) available as an [add-on feature](https://www.vonage.com/communications-apis/video/pricing).
* `otc_session_settings_set_proxy_url()` — Sets an IP proxy URL. See the [IP Proxy developer guide](/video/guides/ip-proxy).
