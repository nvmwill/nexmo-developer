---
title: Web
description: Use the OpenTok.js library to build Vonage Video API-powered WebRTC video, voice & messaging communications apps for the web.
product: video
---

# Vonage Video Web Client SDK

This page covers the following topics:

* [Overview](#overview)
* [Loading OpenTok.js](#loading-opentok-js)
* [Browser Support](#browser-support)
* [Version numbers](#version-numbers)

> **Important**<br>
**Issues fixed in Safari 15.4 and 15.5.** Safari versions 15.4 and 15.5 (which ship with iOS 15.4 and 15.5 and macOS 12.3 and 12.4) fix the following issues, which could affect apps that use OpenTok.js (in Safari):<br>
**Audio issues when using certain models of Bluetooth headsets.** On certain models of Bluetooth headsets, audio could drop out. This [WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=237203) is fixed in Safari 15.4.<br>
**Echo issues when switching microphones in macOS Safari.** Switching the microphone used by a publisher could result in an echo of the publisher's audio. The echo did not appear on the subscriber's side. This [WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=235544) is fixed in Safari 15.5.<br>
**Critical bug publishing H.264 video in routed sessions in iOS 15.1.** In iOS 15.1, publishing H.264 video in routed sessions would fail. This [WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=231505) was fixed in Safari 15.4.
**Low audio volume is iOS Safari.** This [WebKit bug](https://bugs.webkit.org/show_bug.cgi?id=230902) is fixed in Safari 15.4.

## Overview

All applications that use the Vonage Video API are composed of two parts:

* The client side, which uses the Vonage Video client SDKs and runs in a user’s browser or mobile app
* The server side, which uses the [Vonage Video server SDKs](/video/server-sdks/overview) and runs on your server to pass authentication information to the client

The client SDK for building web-based applications that use the Vonage Video API is **OpenTok.js**. This JavaScript library provides most of the core functionality for your app, including:

* Connecting to a session
* Publishing streams to a session
* Subscribing to streams in a session

In subsequent releases, client SDKs will also be available for iOS and Android. All Vonage Video client SDKs will be able to interact with one another. You can learn more about the basics of Vonage Video clients, servers, sessions and more on our [Video API Overview](/video/overview) page.

## Loading OpenTok.js

To load OpenTok.js in your web page, add the following script tag:

`<script src="https://static.opentok.com/v2/js/opentok.min.js"></script>` 

You can also install OpenTok.js using the [@opentok/client](https://www.npmjs.com/package/@opentok/client) npm package.

<!-- OPT-TODO: The current version of the OpenTok.js library can interoperate with Vonage Video apps written with version 2.21+ of the Vonage Video client SDKs:

* OpenTok Android SDK (coming soon)
* OpenTok iOS SDK (coming soon)
* [Vonage Video web client SDK](URL)
* OpenTok Windows SDK (coming soon)
* OpenTok Linux SDK (coming soon) -->

## Browser support

The OpenTok.js library is currently supported in:

* Google Chrome (latest release version)
* Google Chrome for Android (latest release version)
* Beta support for Google Chrome for iOS (latest release version)
* Firefox (latest release version)
* Firefox for Android (latest release version)
* Beta support for Firefox for iOS (latest release version)
* Microsoft Edge versions 79+ for Windows and macOS (Chromium-based versions of Edge)
* Safari 11+ on macOS and iOS. For information on video interoperability and other issues, see the [Safari browser support](#safari-support) page.
* Opera (latest release of desktop version only)
* Electron (latest release version)

### Safari support

Apple added support for WebRTC in Safari 11 for macOS and Safari on iOS 11, and you can now use OpenTok.js apps on Safari.

Additionally, Safari 12.1 supports the VP8 video codec, in addition to H.264. VP8 support in Safari 12.1 ships on macOS 10.14.4, and it is also available for macOS 10.13.6 and 10.12.6. And it is available in the latest iOS 12.2 release.

You must use version 2.16.0 or later of OpenTok.js to use the VP8 video codec in Safari.

For more information on video codec support, see this [developer guide](/video/guides/codecs).

**Limitations**

The following are limitations with OpenTok.js on Safari:

- Publishing screen-sharing videos is not supported in Safari on iOS and in Safari 12 and older on macOS. It is supported in Safari 13+ on macOS.
- Safari does not support camera access (or stream publishing) in pages loaded using the http: (insecure) or file: (file system) URI schemes. You must serve the page over https: (secure). However, you can toggle a flag to support HTTP (for testing).
- Safari does not support camera access on localhost. You must use 0.0.0.0:xx (where xx is the port number, such as 80).

**Older versions**

Older versions of Safari use the H.264 video codec exclusively, and as such do not support the VP8 video codec.

In [routed sessions](/video/guides/create-session#the-media-router-and-media-modes) (sessions that use the  Media Router), you must use a project with the preferred codec set to H.264, to have older versions of Safari be able to publish and subscribe to video. Set the preferred video codec for a project on the Project page of your Video API account.

In a [routed session](/video/guides/create-session#the-media-router-and-media-modes) (a session that uses the OpenTok Media Router) in a project that has the preferred video codec set to VP8 (not H.264), clients using older versions of Safari can use the Vonage video platform but without video support.

## Version numbers

You can include the OpenTok.js library in your web page using a `<script>` tag:

`<script src="https://static.opentok.com/v2/js/opentok.min.js"></script>`

The OpenTok.js version number consists of three parts:

* The major version number — This number (the first number) is incremented when there is a new version that includes an API change that is not backward compatible.
* The minor version number — This number (the second number) is incremented when there is a new version that adds new functionality.
* The patch number — This number (the third) is incremented when there is a new version that fixes bugs or improves performance without adding new functionality.

For example, v2.4.0 is major version 2, minor version 4 (of major version 2), and revision 0 (of v2.4). As revision versions are released, changes are included in the root minor revision. For example, when v2.2.3 is released, its changes are included in v2.2.

To reference a specific revision, you can include the complete version number (such as "v2.4.0") in the `src` attribute. However, we recommend that you specify only the major version number. Vonage officially supports the current version of the library. If you are loading an older version, we ask that you upgrade to take advantage of the latest bug fixes and features on the Vonage video platform.

>_Important:_ Always use the libraries we provide unmodified. This ensures that you use the latest up-to-date, tested code. The Vonage Video API does not support the use of modified libraries.

To learn when new versions of OpenTok.js become available, subscribe to the the Vonage Video API [Announcements](https://video-api.support.vonage.com/hc/en-us/categories/360001844012-Announcements) forum.