---
title: Setting Up Your Project
description: Follow this tutorial to build basic text chat from scratch using the Vonage Video API. It is the quickest way to build a proof of concept for this functionality on the video platform. 
product: video
---

## Setting Up Your Project

To follow this tutorial:

1. Clone the Vonage Video [iOS sample apps](https://github.com/opentok/opentok-ios-sdk-samples) repo on GitHub:

```sh
git clone https://github.com/opentok/opentok-ios-sdk-samples.git
```

2. In terminal, `cd` to the Signaling subdirectory of the project, and then run `pod install`.
3. Open your project in Xcode by double-clicking the new Signaling.xcworkspace file in the Signaling directory.
4. Open the Config.h file, and set the `SAMPLE_SERVER_BASE_URL` string to the base URL of the server that implements the [learning-opentok-php](https://github.com/opentok/learning-opentok-php) project. This server provides a Vonage Video session ID and tokens to the iOS sample app. For more information, see [Server SDKs](/video/server-sdks/overview).

To send text chat messages between two clients connected to the session, you can run the app in the XCode Simulator and in an iOS device.
