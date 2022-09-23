---
title: iOS
description: Use the Vonage Video API iOS library to build Vonage Video API-powered WebRTC video apps for the iOS operating system. Use video, voice, messaging, and more in your iOS application with our SDK.
keywords: Vonage, Vonage Video API, Vonage Video for iOS, mobile, mobile WebRTC, interoperability, iOS, iPhone, iPad, WebRTC, Real-time communications, Developer, Developer Center, SDKs, tutorials, WebRTC tutorials, Developer Guides, Components
product: video
---

Vonage Video iOS SDK

The iOS SDK lets you use Vonage Video API-powered video sessions in apps built for iPad, iPhone, and iPod touch devices.

**Important notes:**

* **Version 2.23+ of the SDK will only support iOS 12 or higher.**
* **Changes to iOS 14 networking affecting relayed sessions** — see the list of [known issues](/developer/sdks/ios/release-notes.html#known-issues) in the release notes.
* **Issues using Simulator to preview your app on a Mac with an M1 chip** — See the list of [known issues](/developer/sdks/ios/release-notes.html#issues-using-xcode-simulator-to-preview-your-app-on-a-mac-with-an-m1-chip) in the release notes.

## Overview

The iOS client SDK provides the following functionalities:

* Connecting to session
* Publishing streams to a session
* Subscribing to streams in a session

You can learn more about the basics of Vonage Video clients, servers, sessions, and more on the [Video API Basics](/video/overview) page.

## Building with the Vonage Video iOS SDK

<!-- OPT-TODO: The best way to learn how to use the Vonage Video iOS SDK is to follow the [Vonage Video Basic Video Chat tutorial](/developer/tutorials/ios/). -->

Once you understand the basics of building with the Vonage Video iOS SDK, you can get more detailed information and learn how to customize your application with the Vonage Video [developer guides](/video/guides/create-token).

To investigate specific API classes and methods, see the [Vonage Video iOS SDK API reference](/sdk/stitch/video-ios-reference/).

## Code samples

For samples using Swift, visit our [Swift sample app repo](https://github.com/opentok/opentok-ios-sdk-samples-swift) on GitHub. For samples using Objective-C, visit our [Objective-C sample app repo](https://github.com/opentok/opentok-ios-sdk-samples) on GitHub.

## Interoperability

Apps written with the Vonage Video iOS SDK 2.23.1 can interoperate with Vonage Video apps written with version 2.21+ of the Vonage Video client SDKs:

* OpenTok.js (Web)
* Android SDK
* Windows SDK
* Linux SDK

## Using the SDK

The OpenTok.framework directory contains the Vonage Video iOS SDK.

The Vonage Video iOS SDK is available as the Pods "OpenTok" and "OTXCFramework", for use with [CocoaPods](http://cocoapods.org/). The OTXCFramework pod supports XCFramework artifacts.

The iOS SDK requires Xcode 7 or higher. The iOS SDK requires the following frameworks:

* AudioToolbox.framework
* AVFoundation.framework
* CoreGraphics.framework
* CoreMedia.framework
* CoreTelephony.framework
* CoreVideo.framework
* Foundation.framework
* GLKit.framework
* libc++.dylib (libc++.tbd in Xcode 7+)
* libsqlite3.dylib (libsqlite3++.tbd in Xcode 7+)
* OpenGLES.framework
* QuartzCore.framework
* SystemConfiguration.framework
* UIKit.framework
* VideoToolbox.framework

The Vonage Video iOS SDK links to the libc++ standard library. If another library that links to the libc++ standard library was compiled in a version of Xcode older than 6.0.0, it may result in segfaults at run time when using it with the Vonage Video iOS SDK.

Known incompatible libraries include, but are not limited to, Firebase (versions earlier than 2.1.2 -- see [https://code.google.com/p/webrtc/issues/detail?id=3992](https://code.google.com/p/webrtc/issues/detail?id=3992) and Google Maps (versions earlier than 1.9.0). To fix this issue, download a version of the other library that was compiled using XCode 6.0.0 or later.

If you are using a version of Xcode prior to 7.2.0, do not use the `-all_load` linker flag. Instead, use the `-force_load` linker flag to load specific libraries that require it.

In order to access the camera and microphone, iOS 10 requires you to set values for the `NSCameraUsageDescription` and `NSMicrophoneUsageDescription` keys in the Info.plist file. These define strings that appear in the app installer to inform the user why your app uses the camera and microphone.

For more information see [the Apple documentation on Cocoa keys](https://developer.apple.com/library/content/documentation/General/Reference/InfoPlistKeyReference/Articles/CocoaKeys.html).

See the [release notes](/developer/sdks/ios/release-notes.html) for information on the latest version of the SDK and for a list of known issues.

See [this document](/developer/sdks/ios/background-state.html) for information on using the SDK in apps running in the background mode.

## System requirements

The iOS SDK is supported on the following devices:

* iPhone -- iPhone 5s and later
* iPad -- iPad Pro 1st generation and later, iPad (2017), iPad Air (all models), iPad 4th generation, iPad mini 2 and later
* iPod touch 6th generation and later

The iOS SDK is supported in iOS 12 or higher.

The iOS SDK is supported on Wi-Fi, 4G/LTE, and 5G connections.

The Vonage Video iOS SDK supports one published audio-video stream, one subscribed audio-video stream, and up to three additional subscribed audio-only streams simultaneously on the iPhone 5s (the lowest-end device supported).

On the iPhone 7, tests have shown support for subscribing to as many as 20 simultaneous low-resolution (200x200-pixel, 15-frame-per-second) streams.

To connect more than two clients in a session using the Vonage Video iOS SDK, create a session that uses the Vonage Video Media Router (a session with the media mode set to routed). See [The Vonage Video Media Router and media modes](/video/guides/create-session#the-media-router-and-media-modes).

## Sample apps

For samples using Swift, visit our [Swift sample app repo](https://github.com/opentok/opentok-ios-sdk-samples-swift) on GitHub.

For samples using Objective-C, visit our [Objective-C sample app repo](https://github.com/opentok/opentok-ios-sdk-samples) on GitHub.

## Documentation

You can find detailed documentation of each iOS method in the  [reference guide](/sdk/stitch/video-ios-reference/)

<!-- OPT-TODO: ## More information -->

<!-- For a list of new features and known issues, see the [release notes](/developer/sdks/ios/release-notes.html). -->
