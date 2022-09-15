---
title: Subscribe to a stream
description: Learn how to subscribe to an Vonage Video API stream in your Linux application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Subscribing to a stream

The `on_stream_received` callback function (see the previous section) includes a `stream` parameter, which is a pointer to an `otc_stream` struct representing the new stream. To subscribe to the stream, instantiate a `otc_subscriber_callbacks` instance, set some callback functions for subscriber-related events, and then call the `otc_subscriber_new()` function passing in the `otc_stream` and `otc_subscriber_callbacks` instances

```c
char *user_data = strdup("Session user data");

static void on_subscriber_connected(otc_subscriber *subscriber,
                                    void *user_data,
                                    const otc_stream *stream) {
  // Called when the subscriber connects to the stream.
}

static void on_render_frame(otc_subscriber *subscriber,
                            void *user_data,
                            const otc_video_frame *frame) {
  // Called when the the subscriber is ready to render a new video frame
}

static void on_error(otc_subscriber *subscriber,
                      void *user_data) {
  // Called when there is an error.
}

struct otc_subscriber_callbacks subscriber_callbacks = {0};
subscriber_callbacks.user_data = user_data;
subscriber_callbacks.on_connected = on_subscriber_connected;
subscriber_callbacks.on_render_frame = on_subscriber_render_frame;
subscriber_callbacks.on_error = on_subscriber_error;

otc_subscriber *subscriber = otc_subscriber_new(stream,
                                                &subscriber_callbacks);
if (subscriber == NULL) {
  printf("Could not create OpenTok subscriber successfully");
  return;
}

if (otc_session_subscribe(session, subscriber) != OTC_SUCCESS) {
  printf("Could not subscribe successfully.");
}
```

Use the `user_data` member of the `otc_subscriber_callbacks` structure to set data you may want to reference in the callback functions. In this example, we set it to a pointer to a string object. But it could be a pointer to an instance of some other type that contains meaningful information.

The other members of the `otc_subscriber_callbacks` structure are each callback functions that are invoked when events related to the subscriber occur:

* `on_connected` — Called when the subscriber connects to the audio-video stream.
* `on_render_frame` — Called each time the subscriber is ready to render a new video frame.
* `on_error` — Called when a subscriber error occurs.

All callbacks will not be made on the application or main thread but on an internal thread. The application should return the callback as quickly as possible to avoid blocking the internal thread.

See [otc\_subscriber\_callbacks](/sdk/stitch/video-linux-reference/structotc__subscriber__callbacks.html) in the Vonage Video Linux SDK reference for details on each of the callback functions.

## Unsubscribing from a stream

To stop playing a stream you are subscribed to, call the `otc_session_unsubscribe()` function, passing in the `otc_session` and `otc_subscriber` instances:

```c
if (session.unsubscribe(session, subscriber) ==  OTC_SUCCESS) {
  printf("Unsubscribed from the stream successfully.");
  otc_subscriber_delete(subscriber);
} else {
  printf("Could not unsubscribe successfully.");
};
```

Call the `otc_subscriber_delete()` function to release the subscriber instance, including all hardware and UI resources bound to it.
