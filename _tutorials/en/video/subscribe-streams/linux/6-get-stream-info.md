---
title: Getting information about a stream
description: Learn how to subscribe to an Vonage Video API stream in your Linux application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Getting information about a stream

Call the following functions to get information about a stream:

* `otc_stream_get_connection()`— Returns the `otc_connection` instance corresponding to the connection that is publishing the stream. You can compare the connection ID for this to the connection ID for the `otc_connection` instance returned by the `otc_session_get_connection()` function to see if the stream is being published by your client.
* `otc_stream_get_creation_time()`— Returns the timestamp for the creation time of the stream.
* `otc_stream_has_audio()`— Whether the stream is currently publishing audio.
* `otc_stream_has_video()`— Whether the stream is currently publishing video.
* `otc_stream_has_audio_track()`— Whether the stream has an audio track.
* `otc_stream_has_video_track()`— Whether the stream has a video track.
* `otc_stream_get_name()`— Returns the name of the stream. This is set when you initialize the Publisher of the stream (see [Initializing an otc_publisher struct and setting publisher callbacks](/video/tutorials/publish-streams/introduction/linux)).
* `otc_stream_get_id()`— Returns the unique ID for the stream.
* `otc_stream_get_video_height()`— The height of the stream, in pixels.
* `otc_stream_get_video_type()`— Whether the stream uses a camera video source (`OTC_STREAM_VIDEO_TYPE_CAMERA`) or a screen-sharing video source (`OTC_STREAM_VIDEO_TYPE_SCREEN`).
* `otc_stream_get_video_width()`— The width of the stream, in pixels.

Use the `on_audio_stats()` and `on_video_stats()` callback functions of the `otc_subscriber_callbacks` to monitor the following statistics for a subscriber's stream:

* The total number of audio and video packets lost
* The total number of audio and video packets received
* The total number of audio and video bytes received

To get more detailed stream statics, use the [`otc_subscriber_get_rtc_stats_report()`](/sdk/stitch/video-linux-reference/subscriber_8h.html#a92a80d96d2086f43718ff21c023711f3) function. This provides an RTC stats report for the media stream.

This is an asynchronous operation. Create an [`otc_subscriber_rtc_stats_report_cb`](/sdk/stitch/video-linux-reference/structotc__subscriber__rtc__stats__report__cb.html) struct and pass it into the [`otc_subscriber_set_rtc_stats_report_cb`](/sdk/stitch/video-linux-reference/subscriber_8h.html#a68123e089b7db330a463d8c8a55b2468) function prior to calling `otc_subscriber_get_rtc_stats_report()`. When the stats are available, the [`otc_subscriber_rtc_stats_report_cb.on_rtc_stats_report`](/sdk/stitch/video-linux-reference/structotc__subscriber__rtc__stats__report__cb.html#ab72f12decea5df65adbc777ff94d5f89) callback function is called.

This callback function includes a `json_array_of_reports` parameter. This is a JSON array of RTC stats reports, which are similar to the format the RtcStatsReport object implemented in web browsers (see [these Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport)).

Also see [this W3C documentation](https://w3c.github.io/webrtc-stats/#summary).
