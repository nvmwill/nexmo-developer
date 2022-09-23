---
title: Getting information about a stream
description: Learn how to subscribe to a Vonage Video API stream in your Windows application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Getting information about a stream

The Stream object has the following properties that define the stream:

* `Connection`— (Connection) The Connection object corresponding to the connection that is publishing the stream. You can compare this to the `Connection` property of the Session object to see if the stream is being published by your client.
* `CreationTime`— (DateTime) The DateTime timestamp for the creation time of the stream.
* `HasAudio`— (bool) Whether the stream has audio.
* `HasVideo`— (bool) Whether the stream has video.
* `Name`— (string) The name of the stream. This is set when you initialize the Publisher of the stream (see [Initializing a Publisher object](/video/tutorials/publish-streams/introduction/windows)).
* `Id`— (string) The unique ID for the stream.
* `Height`— (int) The height of the stream, in pixels.
* `VideoSourceType`— (VideoSourceType) Whether the stream uses a camera video source (`VideoSourceType.StreamVideoTypeCamera`), a screen-sharing video source (`VideoSourceType.StreamVideoTypeScreen`), or a custom video source (`VideoSourceType.StreamVideoTypeCustom`).

<!-- OPT-TODO: See [Screen sharing](/tutorials/screen-sharing). -->

* `Width`— (int) The width of the stream, in pixels.

You use the `Subscriber.AudioStatsUpdated` and `Subscriber.VideoStatsUpdated` events to monitor the following statistics for a subscriber's stream:

* The total number of audio and video packets lost
* The total number of audio and video packets received
* The total number of audio and video bytes received

To get more detailed stream statics, use the [`Subscriber.GetRtcStatsReport()`](/sdk/stitch/video-windows-reference/class_open_tok_1_1_subscriber.html#a7b6a167ca6431f75747650dbc8e4dc63) method. This provides an RTC stats report for the media stream.

This is an asynchronous operation. When the stats are available, the RtcStatsReport event is sent. The [`RtcStatsReportArgs`](/sdk/stitch/video-windows-reference/class_open_tok_1_1_subscriber_1_1_rtc_stats_report_args.html) object includes a `JsonArrayOfReports` property. This is a JSON array of RTC stats reports, which are similar to the format the RtcStatsReport object implemented in web browsers (see [these Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport)).

Also see [this W3C documentation](https://w3c.github.io/webrtc-stats/#summary).
