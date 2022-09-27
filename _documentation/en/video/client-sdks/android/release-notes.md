---
title: Release notes
description: Learn what new features are available in the latest version of the Android Vonage Video API library. Find out any known issues, API changes, and more, as well as past release notes.
product: video
---

# Android SDK Release Notes

## New features and changes

**Version 2.23.1 -- August 2022**

* This version fixes an issue that caused excessive bandwidth usage by streams in relayed sessions.

* This version fixes an issue where an app may crash when Bluetooth permissions are not enabled.

* This version fixes an issue where the Bluetooth connection is lost after a session reconnection.

**Version 2.23.0 -- July 2022**

* Adding support for Full High Definition (1920x1080-pixel) resolution. You can specify `High1080p` as the
  resolution value you pass into the `Publisher.CameraCaptureResolution()`method.

* ​​This version adds the ability to enable per-subscriber audio levels. See the docs for the
  `SubscriberKit.setAudioVolume()` and `SubscriberKit.getAudioVolume()` methods. This was previously a beta feature.

* This version implements [scalable video](/video/guides/scalable-video) support
  for screen sharing. See the `PublisherKit.Builder.scalableScreenshare()` method. This was previously a beta feature.

* This version fixes an issue where publishers of 1080p or 720p streams to
  [routed sessions](/video/guides/create-session#the-media-router-and-media-modes)
  published two [scalable video](/video/guides/scalable-video)
  layers instead of three.

* This version fixes an issue in Android 12 where apps may crash if Bluetooth permissions are not included.

* This version fixes an issue where the app crashes if an unregistered audio device is used. 