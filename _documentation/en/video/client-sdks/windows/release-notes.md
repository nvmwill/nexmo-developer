---
title: Release notes
description: Learn what new features are available in the latest version of the Vonage Video API Windows SDK. Find out any known issues, API changes, and more, as well as past release notes.
product: video
---

# Windows Client SDK Release Notes

The Vonage Video API Windows SDK allows you use Vonage Video API-powered video sessions in Windows apps.

## New features and changes

### Version 2.23.2 -- August 2022

* This version adds support for integration with Windows OS audio settings.
  See the documentation for the `OpenTok.AudioDevice.Notifications` class.
  This is a _beta_ feature.

* This version fixes an issue that caused excessive bandwidth usage by streams in relayed sessions.

* This version fixes an issue where an app may crash when connected to a headset.

### Version 2.23.1 -- July 2022

* This version adds support for accessing audio data for individual subscribed streams. This is a <i>beta</i> feature.  
  See the docs for the `Subscriber.AudioData` event.
 
* This version adds support for an audio output device selection. This is a <i>beta</i> feature. See the docs for the
 `AudioDevice.SetOutputAudioDevice()` method.

### Version 2.23.0 -- June 2022

* This version adds support for the Custom Dispatcher API. See the reference documentation for the Context class. 

* In this version, scalable video in H.264 routed sessions is no longer hardcoded.

* Adding support for Full High Definition (1920x1080-pixel) resolution. You can specify `High1080p` as the
  `resolution` value you pass into the `OpenTok.VideoCapturer.VideoDevice.CreateVideoCapturer()` method.
  This was previously a beta feature.

* This version adds support for Universal Windows Platform in desktop applications.
  This was previously a beta feature. 

* This version adds the ability to enable per-subscriber audio levels. This was previously a beta feature.
  See the docs for the `Subscriber.AudioVolume` property.

* This version implements [scalable video](/video/guides/scalable-video) support for screen sharing. 
  This was previously a beta feature. See the `Publisher.Builder.ScalableScreenshare` property. 

* This version fixes an issue where publishers of 1080p or 720p streams to
  [routed sessions](/video/guides/create-session#the-media-router-and-media-modes)
  published two [scalable video](/video/guides/scalable-video)
  layers instead of three.

* This version fixes an issue where the camera LED was not turned off when the video was muted.

* This version fixes an issue where UTF8 strings in signals were garbled.

* This version fixes an issue where `VideoCapturer.EnumerateDevices()` does not list all the physical USB cameras.