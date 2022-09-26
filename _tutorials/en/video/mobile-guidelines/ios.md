---
title: Guidelines
description: "Learn best practices about developing applications for iOS. Learn about background state management for iOS applications, and find links to useful articles about iOS development."
product: video
navigation-weight:
---

# Mobile Guidelines

This topic addresses considerations when developing for an iOS device:

* [Background State Management](#background-state-management)
* [More Information](#more-information)

## Background State Management

iOS supports multitasking for all apps, however there are a few steps a developer must go through in order to get the Vonage Video iOS SDK to work well with different app states. This document covers a set of practices we have found work well with most Vonage Video apps. However it is not a substitute for reading through the [Apple documentation](https://developer.apple.com/library/ios/documentation/iphone/conceptual/iphoneosprogrammingguide/) on the subject — specifically the sections on "Strategies for Handling App State Transitions," "Background Execution," and "Tips for Developing a VoIP App". Although Apple does not consider most Vonage Video apps to be VoIP apps, the content on configuring audio sessions and socket configuration is relevant and useful for understanding this document.

### Quick Start — Setting App Permissions

In the `Info.plist` file for your app, set up the background mode permissions as described in the Apple documentation for creating VoIP apps. The key is `UIBackgroundModes`. _Do_ add the `audio` value to this dictionary. _Do not_ add `voip` to this dictionary. We have seen applications rejected from the App Store specifically for the use of the `voip` flag, so it is important not to skip this step.

There is also a UI for setting app background modes in XCode 5. Under the app build settings, open the "Capabilities" tab. In this tab, turn on "Background Modes" and set the "Audio and AirPlay" checkbox to set the audio background mode as in the method for editing Info.plist, above. For completeness, we describe both methods, but the results are identical — you only need to use one of the methods.

### What Vonage Video Can (and Cannot) Do in the Background

Using the Vonage Video SDK, an app _can_ do each of the following while in the background state:

* Keep a Vonage Video session active.
* Sustain an audio-only session.
* Set audio/video flags for publishers and subscribers. For example, setting the `OTPublisher.publishAudio` property to `YES` is allowed.
* Publish with a custom video capture implementation that does not acquire the camera (for example, publishing from a file or synthesized video source).

An app can resume using the camera as soon as the app returns to the active state.

However, apps _cannot_ do the following while in the background state:

* Use the camera as a video source for a publisher.
* Set up new views with video from Vonage Video streams.
* Keep an active audio session if a phone or FaceTime call is received.
* Prevent other apps from acquiring system audio resources.
* Maintain a connection to a Vonage Video session without an active publisher or subscriber.

### Active Vonage Video Sessions in the Background

The configuration described above allows apps to run an active Vonage Video session even while the app is in the background, presumably as a result of the end-user pressing the home button, locking the screen, or opening URL content in another process. The `audio` permission allows the app process to stay unsuspended while in the background, if an audio session is active. This means that audio capturing and rendering can continue in your Vonage Video session, as long as another process does not request audio resources.

When correctly configured, iOS provides an indicator that your app is running in the background with an active audio session. This is seen as a red background of the status bar, as well as an additional bar indicating the name of the app holding the active audio session — in this case, your app.

![](ios-background-audio.png)

The `voip` option of the background mode is meant for sustaining long-lived signaling connections to an application server. If your app needs to be notified for application events, we recommend using [Apple Push Notifications](https://developer.apple.com/library/ios/documentation/NetworkingInternet/Conceptual/RemoteNotificationsPG/) with your application server to wake the app and conduct a workflow. In our testing, we found that the extra overhead of maintaining an active socket with Vonage Video was both too expensive from an energy-consumption perspective and too unreliable to guarantee service. For this reason, we are recommending that app developers not request this permission, unless a long-lived socket is being provided by an implementation other than the Vonage Video SDK. Additionally, the [App Store submission guidelines](https://developer.apple.com/app-store/review/) call for rejection of apps that needlessly request this permission.

### Losing Control

Incoming phone and FaceTime calls are likely the first events you will see that completely interrupt your application. When this happens, your app will be suspended, regardless of whether there is an active audio session.

If your app is suspended because the audio session yielded to another process, there is no need for additional logic to handle this. If the app is suspended for a long period of time, the connection to the Vonage Video session will end. Other clients connected to the session will receive `connectionDestroyed` events for the device connection, and an eventual cleanup will be necessary once the app is not suspended. As long as your controller is processing the error and disconnected delegate events for the session, this should be no different from a voluntary, or any other, disconnect workflow. Clients may reconnect as soon as the disconnect cleanup is processed.

## More Information

For more information, see:

* [Vonage Video iOS SDK](/video/client-sdks/ios)

<!-- OPT-TODO: * [Vonage Video iOS SDK release notes](/developer/sdks/ios/release-notes.html) -->

* [Vonage Video iOS SDK reference](/sdk/stitch/video-ios-reference/)
* [Joining sessions](/video/tutorials/joining-a-session/introduction/swift/)
* [Publishing streams](/video/tutorials/publish-streams/introduction/swift/)
* [Subscribing to streams](/video/tutorials/video-signaling/introduction/swift/)
* [Adjusting audio and video](/video/tutorials/audio-video/introduction/swift/)
* [Customizing the UI](//video/tutorials/video-ui-customization/introduction/swift/)
* [Screen Sharing](/video/tutorials/video-screen-sharing/introduction/swift/)
* [Signaling](/video/tutorials/video-signaling/introduction/swift)
