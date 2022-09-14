---
title: Get statistics about a publisher's stream
description: Learn how to publish Vonage Video API streams in your Windows application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Getting statistics about a publisher's stream

To register callbacks methods for periodic reports of audio and video statistics for a publisher, set an event handler for the [`Publisher`](/sdk/stitch/video-windows-reference/class_open_tok_1_1_publisher.html#events) `AudioStatsUpdated` and `VideoUpdated` events.

These events are sent periodically to report audio and video statistics for the publisher. The event handlers for these are passed in an array of [`AudioNetworkStats`](/sdk/stitch/video-windows-reference/class_open_tok_1_1_publisher_1_1_audio_network_stats.html) and [`VideoNetworkStats`](/sdk/stitch/video-windows-reference/class_open_tok_1_1_publisher_1_1_video_network_stats.html) Each method is passed in two objects: the publisher and an array of stats objects. For a publisher in a routed session (one that uses the [Vonage Video Media Router](/developer/guides/create-session/#media-mode)), the array includes one object, defining the statistics for the single audio or video media stream that is sent to the Vonage Video Media Router. In a relayed session, the array includes an object for each subscriber to the published stream. The `stats` object includes the following properties:

* The total number of audio or video packets sent
* The total number of audio or video packets lost
* The total number of audio or video bytes sent
* The timestamp for when the stats were gathered

Additionally, for a publisher in a relayed session, each object in the array contains the following two properties:

* `ConnectionId` — The connection ID of the client subscribing to the stream
* `SubscriberId` — The subscriber ID of the client subscribing to the stream

These two properties are undefined for a publisher in a routed session.

To get more detailed stream statics, use the [`Publisher.GetRtcStatsReport()`](/sdk/stitch/video-windows-reference/class_open_tok_1_1_publisher.html#a67ce46344825e399ee62dcc171d7267e) method. This provides RTC stats reports for the media stream. This is an asynchronous operation. When the stats are available, the RtcStatsReport event is sent. The `RtcStatsReportArgs` object includes an array of [`PublisherRtcStats`](/sdk/stitch/video-windows-reference/class_open_tok_1_1_publisher_1_1_publisher_rtc_stats.html) objects, which includes a `JsonArrayOfReports` property. This is a JSON array of RTC stats reports, which are similar to the format the RtcStatsReport object implemented in web browsers (see [these Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport)). Also see [this W3C documentation](https://w3c.github.io/webrtc-stats/#summary).
