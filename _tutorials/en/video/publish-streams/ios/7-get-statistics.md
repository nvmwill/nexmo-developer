---
title: Get statistics about a publisher's stream
description: Learn how to publish Vonage Video API streams in your iOS application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Getting statistics about a publisher's stream

Set the `networkStatsDelegate` property of an `OTPublisherKit` to an object implements the [`OTPublisherKitNetworkStatsDelegate`](/video/client-sdks/overview) protocol. 

This protocol includes an `[OTPublisherKitNetworkStatsDelegate publisher: audioNetworkStatsUpdated:]` message and an `[OTPublisherKitNetworkStatsDelegate publisher: videoNetworkStatsUpdated:]` message, which are periodically sent to report publisher audio and video quality statistics. 

The second parameter of each of these — `audioNetworkStatsUpdated` and `videoNetworkStatsUpdated` — is an array of stats objects that include properties defining the network statistics (audio and video).

For a publisher in a routed session (one that uses the [Vonage Video Media Router](/video/guides/create-session#the-media-router-and-media-modes)), the stats array includes one object, defining the statistics for the single audio or video media stream that is sent to the Vonage Video Media Router. In a relayed session, the stats array includes an object for each subscriber to the published stream. The object includes the following properties:

* The total number of audio or video packets sent
* The total number of audio or video packets lost
* The total number of audio or video bytes sent
* The timestamp for when the stats were gathered
* The timestamp from which the cumulative totals started accumulating

Additionally, for a publisher in a relayed session, each stats object in the array contains the following two properties:

* `connectionId` — The connection ID of the client subscribing to the stream
* `subscriberId` — The subscriber ID of the client subscribing to the stream

These two properties are undefined for a publisher in a routed session.

To get more detailed stream statics, use the [`[OTPublisherKit getRtcStatsReport:]`](/sdk/stitch/video-ios-reference/Classes/OTPublisherKit.html#//api/name/getRtcStatsReport) method. This provides RTC stats reports for the media stream. 

This is an asynchronous operation. Set the [>`[OTPublisherKit rtcStatsReportDelegate]>`](/sdk/stitch/video-ios-reference/Classes/OTPublisherKit.html#//api/name/rtcStatsReportDelegate) property and implement the [>`[OTPublisherKitRtcStatsReportDelegate publisher:rtcStatsReport:]>`](/sdk/stitch/video-ios-reference/Protocols/OTPublisherKitRtcStatsReportDelegate.html#//api/name/publisher:rtcStatsReport:) method prior to calling `[OTPublisherKit getRtcStatsReport:]`. 

When the stats are available, the implementation of the [>`[OTPublisherKitRtcStatsReportDelegate publisher:rtcStatsReport:]>`](/sdk/stitch/video-ios-reference/Protocols/OTPublisherKitRtcStatsReportDelegate.html#//api/name/publisher:rtcStatsReport:) message is sent. The message includes an array of [`OTPublisherRtcStats`](/sdk/stitch/video-ios-reference/Classes/OTPublisherRtcStats.html) objects, which includes a `jsonArrayOfReports` property. 


This is a JSON array of RTC stats reports, which are similar to the format the RtcStatsReport object implemented in web browsers (see [these Mozilla docs](https://developer.mozilla.org/en-US/docs/Web/API/RTCStatsReport)). Also see [this W3C documentation](https://w3c.github.io/webrtc-stats/#summary).
