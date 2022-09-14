---
title: Initializing an OTPublisher object
description: Learn how to publish Vonage Video API streams in your Linux application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Initializing an otc_publisher struct and setting publisher callbacks

Start by creating a structure of type `otc_publisher_callbacks`:

```c
char *publisher_user_data = strdup("Publisher user data");

static void on_publisher_stream_created(otc_publisher *publisher,
                                        void *user_data,
                                        const otc_stream *stream) {
  // The stream has been created.
}

static void on_publisher_render_frame(otc_publisher *publisher,
                                      void *user_data,
                                      const otc_video_frame *frame) {
  // You can render the frame to the UI.
}

static void on_publisher_stream_destroyed(otc_publisher *publisher,
                                          void *user_data,
                                          const otc_stream *stream) {
  // The stream has been destroyed.
}

static void on_publisher_error(otc_publisher *publisher,
                                void *user_data,
                                const char* error_string,
                                enum otc_publisher_error_code error_code) {
  // Handle the error.
}


struct otc_publisher_callbacks publisher_callbacks = {0};
publisher_callbacks.user_data = publisher_user_data;
publisher_callbacks.on_stream_created = on_publisher_stream_created;
publisher_callbacks.on_render_frame = on_publisher_render_frame;
publisher_callbacks.on_stream_destroyed = on_publisher_stream_destroyed;
publisher_callbacks.on_error = on_publisher_error;
```

Use the `user_data` member of the `otc_publisher_callbacks` structure to set data you may want to reference in the callback functions. In this example, we set it to a pointer to a char array. But it could be a pointer to an instance of some other type that contains meaningful information.

The other members of the `otc_publisher_callbacks` structure are each callback functions that are invoked when events related to the published stream occur:

* `on_stream_created` — Called when the publisher starts streaming to the session.
* `on_render_frame` — Called each time the publisher is ready to render a new video frame to the stream.
* `on_stream_destroyed` — Called when the publisher's stream is destroyed.
* `on_error` — Called when an error occurs in publishing the stream.

All callbacks will not be made on the application or main thread but on an internal thread. The application should return the callback as quickly as possible to avoid blocking the internal thread.

See [otc\_publisher\_callbacks](/sdk/stitch/video-linux-reference/structotc__publisher__callbacks.html) in the OpenTok Linux SDK reference for details on each of the callback functions.

Call the `otc_publisher_new()` to create an `otc_publisher` structure, which represents the OpenTok publisher:

```c
publisher = otc_publisher_new("Bob's video",
                                                    NULL, /* Use the system camera. */
                                                    &publisher_callbacks);
if (publisher == NULL) {
  printf("Could not create OpenTok publisher successfully");
  otc_session_delete(session);
  otc_destroy();
  return EXIT_FAILURE;
}
```

The `otc_publisher_new()` method takes three arguments:

* `name` — A name (optional) identifying the publisher of the stream.
* `capturer` — Use this parameter if you want to provide a custom video capturer. If it is set to `NULL`, the publisher uses the default system camera as the video source.

<!-- OPT-TODO: See [Using a custom video capturer](/developer/guides/audio-video/linux/#custom_capturer) to see how to implement a custom video capturer.) -->

* `callbacks` — The `otc_publisher_callbacks` publisher callback structure, described above.

<!--OPT-TODO: an create a [custom audio driver](/developer/guides/audio-video/linux/#audio_driver) to be used by all publishers and subscribers.

You can use a custom video capturer to publish a stream with a customized video source — see [Using a custom video capturer](/developer/guides/audio-video/linux/#custom_capturer). -->
