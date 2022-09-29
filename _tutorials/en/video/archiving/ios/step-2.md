---
title: Setting up your project
description: Follow this tutorial to build basic archiving for a web application from scratch using the Vonage Video API. It is the quickest way to build a proof of concept for this functionality on the Vonage Video API platform.
product: video 
---

## Setting up your project

To follow this tutorial:

1.  Clone the Vonage Video [iOS sample apps](https://github.com/opentok/opentok-ios-sdk-samples) repo on GitHub:

```bash    
$ git clone https://github.com/opentok/opentok-ios-sdk-samples.git
```
    
2.  In terminal, `cd` to the Archiving subdirectory of the project, and then run `pod install`.
3.  Open your project in Xcode by double-clicking the new Archiving.xcworkspace file in the Archiving directory.
4.  Open the Config.h file, and set the `SAMPLE_SERVER_BASE_URL` string to the base URL of the server that implements the [learning-opentok-php](https://github.com/opentok/learning-opentok-php) project. This server provides OpenTok session ID and tokens to the iOS sample app. For more information, see [Setting up the server](#server).

**Important:** You can only archive sessions that use the [Vonage Video Media Router](/video/guides/create-session#the-media-router-and-media-modes) (sessions with the media mode set to routed). The default [learning-opentok-php](https://github.com/opentok/learning-opentok-php) code used by this tutorial app uses routed sessions.
