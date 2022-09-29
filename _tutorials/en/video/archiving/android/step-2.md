---
title: Setting up your project
description: Follow this tutorial to build basic archiving for a web application from scratch using the Vonage Video API. It is the quickest way to build a proof of concept for this functionality on the Vonage Video API platform.
product: video 
---

## Setting up your project

To follow this tutorial, clone Vonage Video's [Android sample app](https://github.com/opentok/opentok-android-sdk-samples) repo on GitHub:

```bash
$ git clone https://github.com/opentok/opentok-android-sdk-samples.git
```

Then open the **Archiving-Java** project in Android Studio.

**Note:** This tutorial discusses the Java version of the Android sample app. For a Kotlin version with documentation, see the [Android sample app repo](https://github.com/opentok/opentok-android-sdk-samples).

**Important:** You can only archive sessions that use the [Vonage Video Media Router](/video/guides/create-session#the-media-router-and-media-modes) (sessions with the media mode set to routed). The default [learning-opentok-php](https://github.com/opentok/learning-opentok-php) code used by this tutorial app uses routed sessions.
