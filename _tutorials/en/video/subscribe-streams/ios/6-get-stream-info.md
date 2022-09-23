---
title: Getting information about a stream
description: Learn how to subscribe to a Vonage Video API stream in your iOS application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Getting information about a stream

The OTStream object has the following properties that define the stream:

* `connection`—The OTConnection object corresponding to the connection that is publishing the stream. You can compare this to the `connection` property of the OTSession object to see if the stream is being published by your client.
* `creationTime`—The NSDate timestamp for the creation time of the stream.
* `hasAudio`—(Boolean) Whether the stream has audio.
* `hasVideo`—(Boolean) Whether the stream has video.
* `name`—(NSString) The name of the stream. This is set when you initialize the Publisher of the stream (see [Initializing an OTPublisher object](/video/tutorials/publish-streams/video/publish-streams/ios/2-initialize-publisher-object/objective_c)).
* `session`—(OTSession) The Vonage Video session to which the stream is bound.
* `streamId`—(NSString) The unique ID for the stream.
* `videoDimensions`—A CGSize object defining the current dimensions of the video media track on this stream.
* `videoType`—(OTStreamVideoType) Whether the stream uses a camera video source (`OTStreamVideoTypeCamera`), a screen-sharing video source (`OTStreamVideoTypeScreen`), or a custom video source (`OTStreamVideoTypeCustom`).

<!-- OPT-TODO: See [Screen sharing](/developer/guides/screen-sharing/ios/). -->

You can set a `OTSubscriberKitNetworkStatsDelegate` object for the OTSubscriberKit object to monitor the following statistics for a subscriber's stream:

* The total number of audio and video packets lost
* The total number of audio and video packets received
* The total number of audio and video bytes received

See the [SubscriberKit.networkStatsDelegate](/sdk/stitch/video-ios-reference/Classes/OTSubscriberKit.html#//api/name/networkStatsDelegate) property.

To get statistics for a stream published by the local client, you must use a session that uses the Vonage Video Media Router (sessions with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to routed).

To get more detailed stream statics, use the [`[OTSubscriberKit getRtcStatsReport:]`](/sdk/stitch/video-ios-reference/Classes/OTSubscriberKit.html#//api/name/getRtcStatsReport) method. This provides an RTC stats report for the media stream.

This is an asynchronous operation. Set the [`[OTSubscriberKit rtcStatsReportDelegate]>`](/sdk/stitch/video-ios-reference/Classes/OTSubscriberKit.html#//api/name/rtcStatsReportDelegate) property and implement the [>`[OTSubscriberKitRtcStatsReportDelegate subscriber:rtcStatsReport:]>`](/sdk/stitch/video-ios-reference/Protocols/OTSubscriberKitRtcStatsReportDelegate.html#//api/name/subscriber:rtcStatsReport:) method prior to calling `[OTSubscriberKit getRtcStatsReport:]`.

When the stats are available, the implementation of the [>`[OTSubscriberKitRtcStatsReportDelegate subscriber:rtcStatsReport:]>`](/sdk/stitch/video-ios-reference/Protocols/OTSubscriberKitRtcStatsReportDelegate.html#//api/name/subscriber:rtcStatsReport:) message is sent. The message includes an a `jsonArrayOfReports` parameter.

This is a JSON array of RTC stats reports, which are similar to the format the RtcStatsReport object implemented in web browsers (see [these Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport)).

Also see [this W3C documentation](https://w3c.github.io/webrtc-stats/#summary).
