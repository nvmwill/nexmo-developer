--- 
title: Video codecs 
meta_title: The Vonage Video platform leverages the WebRTC protocol and the real-time video codecs that are supported by WebRTC.
description: Information on video codecs supported in the Vonage Video API.
product: video
navigation weight: 
---

# Video codecs

The OpenTok platform leverages the WebRTC protocol and the real-time video codecs that are supported by WebRTC. In particular the OpenTok platform supports the VP8 and the H.264 video codecs. 

You can select which video codec you want to assign as your preferred codec for a particular OpenTok project. Across the broad ecosystem of devices and browsers that OpenTok supports there are varying levels of support for the VP8 and H.264 real-time video codecs. 

Some endpoints support both video codecs, and some support one video codec. Depending on the type of application you are building and the types of browsers and devices your end users will use, your choice of preferred codec will change.

## What is a video codec?

A video codec has two parts, an encoder and a decoder. It has the ability to encode (compress) incoming digital video frames from a webcam into a stream of binary data that can be sent over a network. 

It also has the ability to ingest a stream of binary data and decode (decompress) it into a flow of raw video frames that can be displayed on a screen. The mechanism for encoding and decoding the video is the codec standard and for the purpose of this page we are going to talk about two popular ones, VP8 and H.264.

## VP8 vs H.264

The VP8 real-time video codec is a software codec. It can work well at lower bitrates and is a mature video codec in the context of WebRTC. As a software codec it can be instantiated as many times as is needed by the application within the limits of memory and CPU. The VP8 codec supports the OpenTok Scalable Video feature, which means it works well in large sessions with supported browsers and devices.

<!-- [OpenTok Scalable Video](/developer/guides/scalable-video) -->

<!-- OPT-TODO: add link to scalable video guide -->

The H.264 real-time video codec is available in both hardware and software forms depending on the device. It is a relatively new codec in the context of WebRTC although it has a long history for streaming movies and video clips over the internet.

Hardware codec support means that the core CPU of the device doesn’t have to work as hard to process the video, resulting in reduced CPU load. The number of hardware instances is device-dependent with iOS having the best support.

Given that H.264 is a new codec for WebRTC and each device may have a different implementation, the quality can vary. As such, H.264 may not perform as well at lower bit-rates when compared to VP8. H.264 is not well suited to large sessions since it does not support the OpenTok Scalable Video feature.

## Setting the preferred video codec for a project

You can set the preferred video codec for a project on the Project page of your [Video API account](https://tokbox.com/account/). 

In [routed sessions](/video/guides/create-session#the-opentok-media-router-and-media-modes) (sessions that use the OpenTok Media Router), the preferred video codec is used for all clients in the session.

In [relayed sessions](/video/guides/create-session/#the-opentok-media-router-and-media-modes), clients send streams directly to one another, and each publishing-subscribing pair tries to find a common video codec that they can both use. In this regard, the video codec used by the pair may be different to the preferred video codec setting.

## OpenTok codec coverage

The following tables list the real-time video codec capabilities of the supported OpenTok endpoints.

> Note that almost all devices have H.264 decoder support for streamed movies, however the tables below are focused on the real-time video codec (encode and decode) capabilities of the devices.

| Desktop browsers | VP8 | H.264 |
| --- | --- | --- |
| Chrome | Yes | Yes |
| Firefox | Yes | Yes |
| Safari | Yes 1 | Yes |
| Internet Explorer (Plugin) | Yes 2 | Yes 2 |
| Edge | Yes | Yes |

1 VP8 is available in Safari 12.1+, which ships on macOS 10.14.4 and is also available for macOS 10.13.6 and 10.12.6.

2 Support for the OpenTok plugin for Internet Explorer is removed in OpenTok 2.17.

| Mobile browsers | VP8 | H.264 |
| --- | --- | --- |
| Chrome on Android | Yes | Partial 1 |
| Firefox on Android | Yes | Yes |
| Mobile Safari | Yes 2 | Yes |
| Chrome/Firefox on iOS 3 | -   | -   |

1 Chrome on Android only supports H.264 on devices that contain the Qualcomm and Exynos chipsets and require Chrome 65 or higher.

2 VP8 is available in Safari on iOS 12.2+.

3 Non-Safari browsers running in iOS (for example, Chrome and Firefox) use a Safari webview under the hood. The Safari webview does not support WebRTC and the OpenTok SDK.

| Native SDKs | VP8 | H.264 |
| --- | --- | --- |
| iOS SDK (2.12+) | Yes | Yes |
| Android SDK (2.13+) | Yes | Yes for most devices * |
| Windows SDK (2.13+) | Yes | Yes |
| Linux SDK | Yes | No  |
| macOS SDK (beta) | Yes | No  |

\* Hardware H.264 is supported on devices that contain the Qualcomm and Exynos chipsets, in addition to a subset of HiSilicon and MediaTek chipsets. Fallback to software H.264 is supported on Android M or higher.

## Codec feature support across OpenTok endpoints

<img src="/images/video/video-codec-overview.png" alt="Vonage video codec coverage" style="width: 70%;">

* Percentage of Android devices that support the codec

** Support for the OpenTok plugin for Internet Explorer is removed in OpenTok 2.17.

## Detecting codec support in clients

Not all Android devices support the H.264 codec, and older versions of Safari do not support VP8. OpenTok.js and the OpenTok Android SDK include methods for checking the supported codecs available to the client. 

### Detecting supported codecs in the browser

<!-- [OT.getSupportedCodecs()](tokbox.com/developer/sdks/js/reference/OT.html#getSupportedCodecs) -->

<!-- OPT-TODO: Link to JS SDK methods reference page -->

The `OT.getSupportedCodecs()` method returns a Promise that is resolved (on success) with an object that has two properties: `videoDecoders`, an array of supported video codecs for decoding, and `videoEncoders`, an array of supported video codecs for encoding. The following example gets the list of supported codecs for encoding and decoding video streams:

```js
    (async () => {
      try {
        const supportedCodecs = await OT.getSupportedCodecs();
        if (supportedCodecs.videoEncoders.indexOf('H264') < 0 && supportedCodecs.videoDecoders.indexOf('H264') < 0) {
          // They do not support encoding or decoding H264 let's tell them to use a different browser
        }
      } catch(err) {
        console.log(err);
      }
    })();
 ```   

### Detecting supported codecs using the Android SDK 

<!-- [MediaUtils.SupportedCodecs.getSupportedCodecs(context)](/developer/sdks/android/reference/com/opentok/android/MediaUtils.html#getSupportedCodecs-android.content.Context-) -->

<!-- OPT-TODO: Link to JS SDK methods reference page -->

<!-- [MediaUtils.SupportedCodecs](/developer/sdks/android/reference/com/opentok/android/MediaUtils.SupportedCodecs.html) -->

<!-- [MediaUtils.VideoCodecType](/developer/sdks/android/reference/com/opentok/android/MediaUtils.VideoCodecType.html) -->

The `MediaUtils.SupportedCodecs.getSupportedCodecs(context)` returns a `MediaUtils.SupportedCodecs` object that that has two properties: `videoDecoders`, an **ArrayList** of supported video codecs (defined by the `MediaUtils.VideoCodecTyp`e class) for decoding, and `videoEncoders`, an **ArrayList** of supported video codecs (defined by the` MediaUtils.VideoCodecType` class) for encoding. 

The following example gets the list of supported codecs for encoding and decoding video streams:

```java
    MediaUtils.SupportedCodecs supportedCodecs =
        MediaUtils.SupportedCodecs.getSupportedCodecs(context);
    if (supportedCodecs.videoEncoders.indexOf(MediaUtils.VideoCodecType.VIDEO_CODEC_H264) < 0
        && supportedCodecs.videoDecoders.indexOf(MediaUtils.VideoCodecType.VIDEO_CODEC_H264) < 0)
    {
        // The device does not support encoding or decoding H264.
    }
```

## Issues to consider when selecting your preferred real-time video codec

### Interoperability

The main interoperability conflict is around Android devices, older versions of Safari, and Linux. VP8 works on all Android devices, both on Android Chrome and the OpenTok Android SDK, but H.264 codec support on Android is not ubiquitous. Older versions of Safari do not have VP8 codec support.

The Linux SDK does not support H.264. In OpenTok Routed sessions, the preferred video codec set in the Project settings is used for all clients in the session. In OpenTok Relayed sessions, clients send streams directly to one another, and each publishing-subscribing pair tries to find a common video codec that they can both use.

In this regard, the video codec used by the pair may be different to the preferred video codec setting.

### Session size

Both H.264 and VP8 can work well for endpoints in small sessions (for example, 1-3 participants). However, since there is no Scalable Video support with H.264, we do not recommend H.264 for large sessions. 

### Video quality

Since the same VP8 video codec implementation is used on almost all endpoints the quality is roughly the same. VP8 works well at lower bitrates. In addition, OpenTok Scalable Video is available with VP8. Scalable Video significantly improves the video quality in larger sessions. The quality of H.264 will vary across devices since the implementation of H.264 varies. In addition we have encountered differences in quality depending on the operating system version running on the device. The quality of H.264 at lower bitrates is generally not as good as VP8. H.264 works well on iOS devices since they have good support for H.264 hardware acceleration. This reduces the CPU load and improves battery life.

## Example scenarios

Here are the recommended video codec to use in some example scenarios:

* In OpenTok sessions with 2-3 participants where interoperability with older versions of Safari is critical, use the H.264 video codec.
* In OpenTok sessions with 2-3 participants where only iOS devices are involved, use the H.264 video codec to take advantage of the hardware acceleration.
* Webinars and Large Classroom sessions should use the VP8 codec to take advantage of the OpenTok Scalable Video feature.
* In OpenTok Sessions where support for all Android devices is critical, use the VP8 codec.