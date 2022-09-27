---
title: Release notes
description: Learn what new features are available in the latest version of the Vonage Video API Linux library. Find out any known issues, API changes, and more, as well as past release notes.
product: video
---

# Linux Client SDK Release Notes

## New features and changes

### Version 2.23.0 -- June 2022

* This version adds support for Debian 11, and removes support for Debian 9.

* Adding support for Full High Definition (1920x1080-pixel) resolution. You can specify  
  `OTC_CAMERA_CAPTURE_RESOLUTION_1080P` (from the `otc_camera_capture_resolution` enum) as the
  `otc_camera_capture_resolution` parameter you pass into the `otc_publisher_settings_set_default_camera_capture_resolution()`
  function.

* This version adds the ability to enable per-subscriber audio levels. See the docs for the
  `otc_subscriber_set_audio_volume()` and `otc_subscriber_get_audio_volume()` functions.  This was previously a beta feature.

* This version implements [scalable video](/video/guides/scalable-video) support for screen sharing. 
  See the `otc_publisher_settings_set_scalable_screenshare()` function. This was previously a beta feature.

* This version fixes an issue where publishers of 1080p or 720p streams to
  [routed sessions](/video/guides/create-session#the-media-router-and-media-modes)
  published two [scalable video](/video/guides/scalable-video)
  layers instead of three.

* This version fixes an issue where the default video renderer fails when the requested resolution is not available.