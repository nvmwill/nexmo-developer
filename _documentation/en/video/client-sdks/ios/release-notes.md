---
title: Release notes
description: Learn what new features are available in the latest version of the iOS Vonage Video API library. Find out any known issues, API changes, and more, as well as past release notes.
product: video
---

# iOS Client SDK release notes

## New features and changes

### Version 2.23.1 -- August 2022

* This version fixes an issue that caused excessive bandwidth usage by streams in relayed sessions.

* This version fixes an issue where the app would occasionally crash due to audio issues.

### Version 2.23.0 -- July 2022

* This version provides support for iOS 12 or higher.

* Adding support for Full High Definition (1920x1080-pixel) resolution. You can specify 
  `OTCameraCaptureResolutionHigh1080p` as the `cameraResolution` property of 
  the `OTPublisherSettings` object you pass into the `[OTPublisher initWithDelegate:settings:]` method. 
  This was previously a private beta feature.

* This version implements [scalable video](/video/guides/scalable-video) support
  for screen sharing. See the `OTPublisherKitSettings.scalableScreenshare` property. This was previously a beta feature.

* This version adds the ability to enable per-subscriber audio levels. See the docs for the 
  `OTSubscriberKit.audioVolume` property.  This was previously a beta feature.  

* This version fixes an issue where publishers of 1080p or 720p streams to
  [routed sessions](/video/guides/create-session#the-media-router-and-media-modes)
  published two [scalable video](/video/guides/scalable-video)
  layers instead of three.