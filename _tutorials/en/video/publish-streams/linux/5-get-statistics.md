---
title: Get statistics about a publisher's stream
description: Learn how to publish Vonage Video API streams in your Linux application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Getting statistics about a publisher's stream

To register callbacks methods for periodic reports of audio and video statistics for a publisher, set the [`on_audio_stats()`](/sdk/stitch/video-linux-reference/structotc__publisher__callbacks.html#a7e5001319973bceb71b5cf24025317bc) and [`on_video_stats()`](/sdk/stitch/video-linux-reference/structotc__publisher__callbacks.html#a3b605adf88294bbb8d16d921ea7b37ae) callback functions when you initialize the `otc_publisher_callbacks` struct to be used by the publisher.

These callback functions are called periodically to report audio and video statistics for the publisher. Each function is passed in the following: A pointer to the `publisher` struct, A pointer to the `user_data` you set for the publisher, an array of stats, and the number of stats in the array. The stats parameter is defined by the [`otc_publisher_audio_stats`](/sdk/stitch/video-linux-reference/structotc__publisher__audio__stats.html) and [`otc_publisher_video_stats`](/sdk/stitch/video-linux-reference/structotc__publisher__video__stats.html) structs. For a publisher in a routed session (one that uses the [Media Router](/developer/guides/create-session/#media-mode)), the array includes one object, defining the statistics for the single audio or video media stream that is sent to the Media Router. In a relayed session, the array includes an object for each subscriber to the published stream. The struct passed in as the stats parameter includes the following properties:

* The total number of audio or video packets sent
* The total number of audio or video packets lost
* The total number of audio or video bytes sent
* The timestamp for when the stats were gathered
* The audio level (for audio stats)

Additionally, for a publisher in a relayed session, each object in the array contains the following two properties:

* `ConnectionId` — The connection ID of the client subscribing to the stream
* `SubscriberId` — The subscriber ID of the client subscribing to the stream

These two properties are undefined for a publisher in a routed session.

To get more detailed stream statics, use the [`otc_publisher_get_rtc_stats_report()`](/sdk/stitch/video-linux-reference/publisher_8h.html#a6a07d2f55cf7c9e7c42cd74690d5c191) function. This provides RTC stats reports for the media stream. This is an asynchronous operation. Create an [`otc_publisher_rtc_stats_report_cb struct`](/sdk/stitch/video-linux-reference/structotc__publisher__rtc__stats__report__cb.html) and pass it into the [`otc_publisher_set_rtc_stats_report_cb`](/sdk/stitch/video-linux-reference/publisher_8h.html#aa6db02ae23972b27d6579eebb939805f) function prior to calling `otc_publisher_get_rtc_stats_report()`. When the stats are available, the `otc_publisher_rtc_stats_report_cb.on_rtc_stats_report()` callback function is called. This function includes a `stats` parameter, which is a pointer to an array of [`otc_publisher_rtc_stats`](/sdk/stitch/video-linux-reference/structotc__publisher__rtc__stats.html) structs. This struct includes a `json_array_of_reports` property. This is a JSON array of RTC stats reports, which are similar to the format the RtcStatsReport object implemented in web browsers (see [these Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport)). Also see [this W3C documentation](https://w3c.github.io/webrtc-stats/#summary).
