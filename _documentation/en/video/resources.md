---
title: Resources
meta_title: Use these tools to improve your Video API experience. You can jump into any of our tools to start
description:  Use these tools to improve your Video API experience. You can jump into any of our tools to start
---

## Developer Tools
___

| Tool     |Description      |  
|----------|:-------------:|------:|
| [Video Playground](https://tokbox.com/developer/tools/playground) |  A tool for exploring video platform capabilities without writing code|
| [General Inspector](https://tokbox.com/developer/tools/inspector)|   A post-call diagnostic tool for your Video  sessions|
| [Archive Inspector](https://tokbox.com/developer/tools/archive-inspector) | A diagnostic tool for video archiving|
| [Pre-call Test](https://tokbox.com/developer/tools/archive-inspector) |A tool to test connectivity, call quality, client hardware and software setup|
| [Insights Explorer](https://insights.opentok.com) | A tool for exploring the video insights using GraphQL.  Follow this [quick start guide](https://developer.vonage.com/blog/2020/04/07/getting-started-with-advanced-insights) to get started with advanced insights|

## SDKs
___

#### Client SDKs

- **Video SDK:**
The video SDK provides methods for connecting to and managing client video streams.
You can integrate the video SDK into your client app using
[NPM](https://www.npmjs.com/package/@opentok/client) or through a [CDN](https://static.opentok.com/v2/js/opentok.min.js)

- **Video Express SDK:**
The video express SDK lets you quickly create a multiparty web video conferencing web application.
You can integrate the express SDK into your client app using
[NPM](https://www.npmjs.com/package/@vonage/video-express) or through a [CDN](https://static.opentok.com/v1/js/video-express.js).

Follow this [guide](#) to get started with the video express SDK.
#### Server SDKs
The server SDKs handles authentication and permissions through [token](/video/overview#token) generation. Its also responsible for [session](/video/overview#session) management.

- **PHP SDK:**
The PHP SDK is available on [GitHub](https://github.com/opentok/Opentok-PHP-SDK).

- **NodeJS SDK:**
The NodeJS SDK can be found on [GitHub](https://github.com/opentok/opentok-node)

### Supported Browsers
___
The web client SDK is currently supported by the following browsers:

- Google Chrome (latest release version)
- Google Chrome for Android (latest release version)
- Beta support for Google Chrome for iOS (latest release version)
- Firefox (latest release version)
- Firefox for Android (latest release version)
- Beta support for Firefox for iOS (latest release version)
- Microsoft Edge versions 79+ for Windows and macOS (Chromium-based versions of Edge)
- Safari 11+ on macOS and iOS. For information on video interoperability and other issues, see the Safari browser support page.
- Opera (latest release of desktop version only)
- Electron (latest release version)

>**NB:** OpenTok.js version 2.16 was the last version to support the OpenTok Plugin for Internet Explorer. OpenTok.js version 2.16 was deprecated in May 2020 for the Standard environment and June 2020 for the Enterprise environment.


<!-- remove later -->
<style>
td {
    text-align:left !important;
}
</style>