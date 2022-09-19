---
title: Scalable video
meta_title: About the Vonage Video API scalable video feature
description: About the Vonage Video API scalable video feature
navigation_weight:
---

# Scalable video

Scalable video can greatly improve the quality of video in multi-party sessions. Using this feature, a client automatically publishes a multi-quality video stream, composed of multiple video resolutions and frame rates. This allows simultaneous subscribing endpoints to consume different video resolutions and frame rates.

The scalable video feature is only available in routed sessions (sessions that use the Media Router). See [The Media Router and media modes](/video/guides/create-session#the-media-router-and-media-modes).

The Media Router dynamically switches between different video resolutions and frame rates for a subscriber's stream, as network conditions on the subscribing endpoint change.

You do not need to add any code to use the scalable video feature. The Media Router handles the switching of subscriber stream resolutions and frame rates automatically. The Media Router turns on this feature when it determines the session will benefit from it based on the topology of clients connected to the session.

Scalable video is only available in streams published by [client SDKs](/video/client-sdks/overview).

> The [Web SDK](/video/client-sdks/web) in Chrome and Safari (with beta support in desktop versions of Opera and Chromium-based versions of Edge) only supports VP8 streams. It does not support [H.264 streams](/video/guides/codecs).

For screen-sharing streams, you need to enable scalable video for the published stream:

* For the Web SDK, streams that have the video source set to "screen", set the `scalableScreenshare` option for the [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initPublisher) method.

<!-- OPT-TODO: * In the OpenTok Android SDK, for streams that have the video type set to `PublisherKitVideoTypeScreen`, use the [PublisherKit.Builder.scalableScreenshare()](/sdk/stitch/video-android-reference/com/opentok/android/PublisherKit.Builder.html#scalableScreenshare-boolean-) method.
* In the OpenTok iOS SDK, for streams that have the `OTStreamVideoType` set to `OTStreamVideoTypeScreen`, use the [OTPublisherKitSettings.scalableScreenshare](/sdk/stitch/video-ios-reference/Classes/OTPublisherKitSettings.html#//api/name/scalableScreenshare) property.
* In Windows SDK, for streams that have the `VideoSourceType` set to `Screen`, use the [Publisher.Builder.ScalableScreenshare](/sdk/stitch/video-windows-reference/class\_open\_tok\_1\_1\_publisher\_1\_1\_builder.html#aa4e5d1436b5f758f3e8ec37a10e3bc25) property.
* In the Linux SDK, for streams that have the video type set to `OTC\_PUBLISHER\_VIDEO\_TYPE\_SCREEN`, use the [otc\_publisher\_settings\_set\_scalable\_screenshare()](/developer/sdks/linux/reference/publisher\_8h.html#adcf56ed4ef26c0c61a429c6c4729953d) function. -->

> **Note:** scalable video for screen-sharing streams is a _beta_ feature.

By default, scalable video is disabled for screen-sharing streams.

All clients can subscribe to scalable video streams. The client SDKs include methods or properties for setting the preferred frame rate and resolution for the stream a subscribing client receives from the Media Router:

* Web SDK — [Subscriber.setPreferredFrameRate()](/sdk/stitch/video-js-reference/Subscriber.html#setPreferredFrameRate) and [Subscriber.setPreferredResolution()](/sdk/stitch/video-js-reference/Subscriber.html#setPreferredResolution)

* In the Android SDK — [SubscriberKit.setPreferredFrameRate()](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.html#setPreferredFrameRate-float-) and [OSubscriberKit.setPreferredResolution()](/sdk/stitch/video-android-reference/com/opentok/android/SubscriberKit.html#setPreferredResolution-com.opentok.android.VideoUtils.Size-)
* In the iOS SDK — [OTSubscriberKit.preferredFrameRate](/sdk/stitch/video-ios-reference/Classes/OTSubscriberKit.html#//api/name/preferredFrameRate) and [SubscriberKit.preferredResolution](/sdk/stitch/video-ios-reference/Classes/OTSubscriberKit.html#//api/name/preferredResolution)
* In the Windows SDK — [Subscriber.PreferredFramerate](/sdk/stitch/video-windows-reference/class\_open\_tok\_1\_1\_subscriber.html#a16e8ad605d0e543d5051b85d4f9ad76d) and [Subscriber.PreferredResolution](/sdk/stitch/video-windows-reference/class\_open\_tok\_1\_1\_subscriber.html#aaa7ba29740b752418ad71b336155b44b).

For more information, see [this article](https://video-api.support.vonage.com/hc/en-us/articles/360029733831-TokBox-Scalable-Video-Simulcast-FAQ).