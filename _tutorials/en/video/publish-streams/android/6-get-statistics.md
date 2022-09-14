---
title: Get statistics about a publisher's stream
description: Learn how to publish Vonage Video API streams in your Android application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Getting statistics about a publisher's stream

To register callbacks methods for periodic reports of audio and video statistics for a publisher, call the [`PublisherKit.setAudioStatsListener(listener)`](/sdk/stitch/video-android-reference/com/opentok/android/PublisherKit.html#setAudioStatsListener-com.opentok.android.PublisherKit.AudioStatsListener-) and [`PublisherKit.setVideoStatsListener(listener)`](/sdk/stitch/video-android-reference/com/opentok/android/PublisherKit.html#setVideoStatsListener-com.opentok.android.PublisherKit.VideoStatsListener-) methods. 

Pass in objects that implement the [`PublisherKit.AudioStatsListener`](/sdk/stitch/video-android-reference/com/opentok/android/PublisherKit.AudioStatsListener.html) and [`PublisherKit.VideoStatsListener`](/sdk/stitch/video-android-reference/com/opentok/android/PublisherKit.VideoStatsListener.html) interfaces.

The implementations of the [`PublisherKit.AudioStatsListener.onAudioStats(publisher, stats)`](/sdk/stitch/video-android-reference/com/opentok/android/PublisherKit.AudioStatsListener.html#onAudioStats-com.opentok.android.PublisherKit-com.opentok.android.PublisherKit.PublisherAudioStats:A-) and [`PublisherKit.VideoStatsListener.onVideoStats(publisher, stats)`](/sdk/stitch/video-android-reference/com/opentok/android/PublisherKit.VideoStatsListener.html#onVideoStats-com.opentok.android.PublisherKit-com.opentok.android.PublisherKit.PublisherVideoStats:A-) methods are called periodically to report audio and video statistics for the publisher. Each method is passed in two objects: the publisher and an array of stats objects. 

For a publisher in a routed session (one that uses the [Vonage Video Media Router](video/guides/create-session#the-media-router-and-media-modes)), the stats array includes one object, defining the statistics for the single audio or video media stream that is sent to the Vonage Video Media Router. In a relayed session, the stats array includes an object for each subscriber to the published stream. 

The `stats` object includes the following properties:

* The total number of audio or video packets sent
* The total number of audio or video packets lost
* The total number of audio or video bytes sent
* The timestamp for when the stats were gathered

Additionally, for a publisher in a relayed session, each object in the array contains the following two properties:

* `connectionId` — The connection ID of the client subscribing to the stream
* `subscriberId` — The subscriber ID of the client subscribing to the stream

These two properties are undefined for a publisher in a routed session.

To get more detailed stream statics, use the [`PublisherKit.getRtcStatsReport()`](/sdk/stitch/video-android-reference/com/opentok/android/PublisherKit.html#getRtcStatsReport--) method. This provides RTC stats reports for the media stream. This is an asynchronous operation. Call the [`PublisherKit.setRtcStatsReportListener(PublisherKit.PublisherRtcStatsReportListener listener)`](/sdk/stitch/video-android-reference/com/opentok/android/PublisherKit.html#setRtcStatsReportListener-com.opentok.android.PublisherKit.PublisherRtcStatsReportListener-) method, and then implement the [`PublisherKit.PublisherRtcStatsReportListener.onRtcStatsReport(PublisherKit publisher, PublisherKit.PublisherRtcStats[] stats)`](/sdk/stitch/video-android-reference/com/opentok/android/PublisherKit.PublisherRtcStatsReportListener.html#onRtcStatsReport-com.opentok.android.PublisherKit-com.opentok.android.PublisherKit.PublisherRtcStats:A-) method prior to calling `PublisherKit.getRtcStatsReport()`. 

When the stats are available, the implementation of the [`PublisherKit.PublisherRtcStatsReportListener.onRtcStatsReport(PublisherKit publisher, PublisherKit.PublisherRtcStats[] stats)`](/sdk/stitch/video-android-reference/com/opentok/android/PublisherKit.PublisherRtcStatsReportListener.html#onRtcStatsReport-com.opentok.android.PublisherKit-com.opentok.android.PublisherKit.PublisherRtcStats:A-) method is called. 

An array of [`PublisherRtcStats`](/sdk/stitch/video-android-reference/com/opentok/android/PublisherKit.PublisherRtcStats.html) objects is passed into that method. The `PublisherRtcStats` object includes a `jsonArrayOfReports` property. This is a JSON array of RTC stats reports, which are similar to the format of the RtcStatsReport object implemented in web browsers (see [these Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport)). Also see [this W3C documentation](https://w3c.github.io/webrtc-stats/#summary).
