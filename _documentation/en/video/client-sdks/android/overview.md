---
title: Overview
description: Use the Vonage Video API Android library to build Vonage Video API-powered WebRTC video apps for the Android operating system. Use video, voice, messaging, and more in your Android application with our SDK. 
keywords: Vonage, Vonage Video API, Vonage Video for Android, mobile, mobile WebRTC, interoperability, Android, WebRTC, Real-time communications, Developer, Developer Center, SDKs, tutorials, WebRTC tutorials, Developer Guides, Components 
product: video
---

# Android SDK

The Vonage Video API Android SDK lets you use Vonage Video API-powered video sessions in apps you build for Android devices.

> **Important:** Applications targeting API level 31 and above now require permission `READ_PHONE_STATE` in addition to the [other required permissions](#permissions).

## Overview

The Android SDK provides the following functionalities:

* Connecting to a Vonage Video session.
* Publishing streams to a session.
* Subscribing to streams in a session.

You can learn more about the basics of Vonage Video clients, servers, sessions, and more on the [Video API Basics](/video/overview) page.

## Building with the Android SDK

Once you understand the basics of building with the Vonage Video iOS SDK, you can get more detailed information and learn how to customize your application with the Vonage Video [developer guides](/video/guides/create-token).

To investigate specific API classes and methods, see the [Vonage Video Android SDK API reference](/sdk/stitch/video-android-reference).

## Code samples

For sample code, visit our [vonage-video-android-sdk-samples repo](https://github.com/opentok/opentok-android-sdk-samples) on GitHub.

## Interoperability

Apps written with the Vonage Video Android SDK 2.23.1 can interoperate with Vonage Video written with version 2.21+ of the Vonage Video client SDKs:

* OpenTok.js (Web)
* Android SDK
* iOS SDK
* Windows SDK
* Linux SDK

## Installation

The library (an aar file) is included in the root of the SDK bundle. A Maven version is available at [https://search.maven.org/artifact/com.opentok.android/opentok-android-sdk](https://search.maven.org/artifact/com.opentok.android/opentok-android-sdk).

The artifact ID is `"opentok-android-sdk"`. For more information, see [Creating your own app using the Vonage Video Android SDK](#creating-your-own-app-using-the-opentok-android-sdk).

## Developer and client requirements

The Vonage Video Android SDK supports one published audio-video stream, one subscribed audio-video stream, and up to five additional subscribed audio-only streams simultaneously (this is the baseline support on a Samsung Galaxy S3).

To connect more than two clients in a session using the Vonage Video Android SDK, create a session that uses the Vonage Video Media Router (a session with the media mode set to routed).See [The Vonage Video Media Router and media modes](/video/guides/create-session#the-media-router-and-media-modes).

The SDK is supported on high-speed Wi-Fi and 4G LTE networks. The Vonage Video Android SDK is supported on armeabi-v7a, armeabi64-v8a, x86, and x86_64 architectures.

The Vonage Video Android SDK works with any Android 4.1+ device (Jelly Bean, API Level 16) that has a camera (for publishing video) and adequate CPU and memory support.

## Creating your own app using the Android SDK

The library is provided in the vonage-video-android-sdk-2.22.3.aar file. You no longer need to include architecture-dependent .so files (which was required in previous versions).

This file is included in the root of the SDK package. Place the aar file into your project in Android Studio. Then modify the gradle file for your project to reference the aar file.

A Maven version is available at [https://search.maven.org/artifact/com.opentok.android/opentok-android-sdk](https://search.maven.org/artifact/com.opentok.android/opentok-android-sdk).

The artifact ID is `"opentok-android-sdk"`. Modify your app to download the Vonage Video Android SDK from [https://search.maven.org/artifact/com.opentok.android/opentok-android-sdk](https://search.maven.org/artifact/com.opentok.android/opentok-android-sdk). For example:

1. Edit the build.gradle for your project and add the following code snippet to the `allprojects/repositories` section: `mavenCentral()`
2. Modify the app's build.gradle file and add the following code snippet to the `dependencies` section: `implementation 'com.opentok.android:opentok-android-sdk:2.22.3'`
3. Make sure the app's build.gradle file contains the following code snippet within `android` section (starting from Android Studio 4.1 this snippet is present when creating a new project).
For Android SDK 2.22.3 and above:
  
```java
compileOptions {
   sourceCompatibility JavaVersion.VERSION_1_11
   targetCompatibility JavaVersion.VERSION_1_11
}
```

For Android SDK below 2.22.0:
  
```java
compileOptions {
   sourceCompatibility JavaVersion.VERSION_1_8
   targetCompatibility JavaVersion.VERSION_1_8
}
```
  
Your app needs to use a session ID and token generated with your Vonage Video API key, which you can get by logging into your [Vonage Video API account](https://tokbox.com/account/user/signup).

For test purposes, you can generate a session ID and token by logging into your [Vonage Video API account](https://tokbox.com/account/user/signup). For a production app, generate unique tokens (and session IDs, if you need to support multiple sessions) using the [Vonage Video server-side libraries](/video/server-sdks/overview).

## Permissions

The Vonage Video Android SDK uses following permissions:

* `android.permission.BLUETOOTH_CONNECT` -- You need to enable this for API level 31 and above.
* `android.permission.READ_PHONE_STATE` -- The Vonage Video Android SDK requests this permission in API level 22 and lower, and 31 and above.
* `android.permission.CAMERA` -- If your app does not use the default video capturer and does not access the camera, you can remove this permission.
* `android.permission.INTERNET` -- Required.
* `android.permission.RECORD_AUDIO` -- If your app does not use the default audio device and does not access the microphone, you can remove this permission.
* `android.permission.MODIFY_AUDIO_SETTINGS` -- If your app does not use the default audio device and does not access the microphone, you can remove this permission.
* `android.permission.BLUETOOTH` -- The default audio device supports Bluetooth audio. If your app does not use the default audio device and does not use Bluetooth, you can remove this permission.
* `android.permission.BROADCAST_STICKY` -- We have determined that this is unused by the Vonage Video Android SDK, and we will remove this permission from an upcoming release.

You do not need to add these to your app manifest. The Vonage Video Android SDK adds them automatically. However, if you use Android 21+, certain permissions require you to prompt the user.

Your app can remove any of these permissions that will not be required. See [this post](https://stackoverflow.com/a/31616472) and [this Android documentation](https://developer.android.com/studio/build/manifest-merge). For example, this removes the `android.permission.CAMERA` permission:

```xml
<uses-permission android:name="android.permission.CAMERA" tools:node="remove"/>
```

## ProGuard rules needed by the Vonage Android SDK

The Vonage Android SDK uses the following packages:

* com.opentok
* com.vonage (v2.22.1+)
* org.webrtc * org.otwebrtc (v2.17+)

The recommended ProGuard configuration is:

<!-- not really js but provides the best highlighting -->
```js 
-keeppackagenames
-keep class com.opentok.** { *; }
-keep class com.vonage.** { *; }
-keep class org.webrtc.** { *; }
-keep class org.otwebrtc.** { *; }
```

When using Android Studio 3.4 or Android Gradle plugin 3.4.0+, shrinking, obfuscation and optimization are, by default, automatically enabled. Shrinking and obfuscating the Vonage Android SDK is not recommended.

The configuration above forces the Vonage Android SDK source code to be kept, not disallowing the rest of the app to be shrunk. Don't obfuscate the Vonage Android SDK to prevent conflicts with other libraries. Preserve the Vonage Android SDK package names with the flag -keeppackagenames.

The compiler automatically performs a set of optimizations by default. Any other optimizations are not recommended, but it is possible to enable additional optimizations, which may require to include additional ProGuard rules to avoid runtime issues, by adding the following in the project’s gradle.properties file:

```java
android.enableR8.fullMode=true
```

The Vonage Android SDK supports 32-bit and 64-bit architectures for both ARM and x86 platforms. See [this Android documentation](https://developer.android.com/studio/build/shrink-code) to have a better understanding of the overall ProGuard rules and its functionalities.
