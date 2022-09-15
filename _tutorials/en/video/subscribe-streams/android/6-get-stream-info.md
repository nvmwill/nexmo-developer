---
title: Getting information about a stream
description: Learn how to subscribe to an Vonage Video API stream in your Android application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Getting information about a stream

The Stream object has the following methods that return values that define the stream:

* `getConnection()`— (Connection) Returns the Connection object corresponding to the connection that is publishing the stream. You can compare this to the value returned by the `getConnection()` method of the Session object to see if the stream is being published by your client.
* `getCreationTime()`— (Date) The Date timestamp for the creation time of the stream.
* `hasAudio()`— (boolean) Whether the stream has audio.
* `hasVideo()`— (boolean) Whether the stream has video.
* `getName()`— (String) Returns the name of the stream. This is set when you initialize the Publisher of the stream (see [Initializing a Publisher object](/video/tutorials/publish-streams/video/publish-streams/android/2-initialize-publisher-object/android)).
* `getStreamId()`— (String) The unique ID for the stream.
* `getVideoHeight()`— (int) The height of the stream, in pixels.
* `getVideoType()`— (StreamVideoType) Whether the stream uses a camera video source (`StreamVideoTypeCamera.StreamVideoTypeCamera`), a screen-sharing video source (`StreamVideoTypeScreen.StreamVideoTypeScreen`), or a custom video source (`StreamVideoTypeScreen.StreamVideoTypeScreen`). 

<!-- OPT-TODO: See [Screen sharing](/developer/guides/screen-sharing/android/). -->

* `getVideoWidth()`— (int) The width of the stream, in pixels.

You can set listeners to monitor the following statistics for a subscriber's stream:

* The total number of audio and video packets lost
* The total number of audio and video packets received
* The total number of audio and video bytes received

See the [SubscriberKit.setAudioStatsListener(AudioStatsListener listener)](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.html#setAudioStatsListener(com.opentok.android.SubscriberKit.AudioStatsListener)) and [SubscriberKit.setVideoStatsListener(VideoStatsListener listener)](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.html#setVideoStatsListener(com.opentok.android.SubscriberKit.VideoStatsListener)) methods.

To get statistics for a stream published by the local client, you must use a session that uses the Vonage Video Media Router (sessions with the [media mode](/developer/guides/create-session/#media-mode) set to routed).

To get more detailed stream statics, use the [`SubscriberKit.getRtcStatsReport()`](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.html#getRtcStatsReport--) method. This provides an RTC stats report for the media stream.

This is an asynchronous operation. Call the [`SubscriberKit.setRtcStatsReportListener(SubscriberKit.SubscriberRtcStatsReportListener listener)`](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.html#setRtcStatsReportListener-com.opentok.android.SubscriberKit.SubscriberRtcStatsReportListener-) method, and then implement the [`SubscriberKit.SubscriberRtcStatsReportListener.onRtcStatsReport(SubscriberKit subscriber, java.lang.String jsonArrayOfReports)`](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.SubscriberRtcStatsReportListener.html#onRtcStatsReport-com.opentok.android.SubscriberKit-java.lang.String-) method prior to calling `SubscriberKit.getRtcStatsReport()`.

When the stats are available, the implementation of the [`SubscriberKit.SubscriberRtcStatsReportListener.onRtcStatsReport(SubscriberKit subscriber, java.lang.String jsonArrayOfReports)`](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.SubscriberRtcStatsReportListener.html#onRtcStatsReport-com.opentok.android.SubscriberKit-java.lang.String-) method is called. The `jsonArrayOfReports` parameter is a JSON array of RTC stats reports, which are similar to the format of the RtcStatsReport object implemented in web browsers (see [these Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport)).

Also see [this W3C documentation](https://w3c.github.io/webrtc-stats/#summary).
