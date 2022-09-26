---
title: Guidelines
description: "Learn best practices about developing for Android. Learn which permissions the Vonage Video API Android SDK requires, and find links to useful articles about Android development."
product: video
navigation-weight:
---

# Mobile Guidelines

This topic addresses considerations when developing for an Android device:

* [Permissions](#permissions)
* [Creating a VoIP app using the Android ConnectionService](#creating-a-voip-app-using-the-android-connectionservice)
* [More Information](#more-information)

## Permissions

The Vonage Video Android SDK uses following permissions:

* `android.permission.CAMERA` — If your app does not use the default video capturer and does not access the camera, you can remove this permission.
* `android.permission.INTERNET` — Required.
* `android.permission.RECORD_AUDIO` — If your app does not use the default audio device and does not access the microphone, you can remove this permission.
* `android.permission.MODIFY_AUDIO_SETTINGS` — If your app does not use the default audio device and does not access the microphone, you can remove this permission.
* `android.permission.BLUETOOTH` — The default audio device supports Bluetooth audio. If your app does not use the default audio device and does not use Bluetooth, you can remove this permission.
* `android.permission.BROADCAST_STICKY` — We have determined that this is unused by the Vonage Video Android SDK, and we will remove this permission from an upcoming release.
* `android.permission.READ_PHONE_STATE` — We have determined that this is unused by the Vonage Video Android SDK, and we will remove this permission from an upcoming release.

You do not need to add these to your app manifest. The Vonage Video Android SDK adds them automatically. However, if you use Android 21+, certain permissions require you to prompt the user.

Your app can remove any permissions requested by the SDK that it does not use. See [this post](https://stackoverflow.com/a/31616472) and [this Android documentation](https://developer.android.com/studio/build/manifest-merge). For example, this removes the `android.permission.CAMERA` permission:

```java
<uses-permission android:name="android.permission.CAMERA" tools:node="remove"/>
```

## Creating a VoIP app using the Android ConnectionService

Use the Android [ConnectionService](https://developer.android.com/reference/android/telecom/ConnectionService) class to create a VoIP app that uses the audio-video capabilities of the Vonage Video Android SDK.

At a minimum, follow these guidelines to create a basic VoIP app:

* Register the `android.telecom.ConnectionService` in the AndroidManifest.xml file.

```java
<service android:name="com.example.package.MyConnectionService"
    android:label="@string/some_label_for_my_connection_service"
    android:permission="android.permission.BIND_TELECOM_CONNECTION_SERVICE">
    <intent-filter>
        <action android:name="android.telecom.ConnectionService" />
    </intent-filter>
</service>
```

* Create a class that extends the `android.telecom.ConnectionService` class. Implement methods of the `ConnectionService` class, including `onCreateIncomingConnection()`, `onCreateOutgoingConnection`, `onCreateIncomingConnectionFailed()`, and `onCreateOutgoingConnectionFailed()`.
* Create a class that extends the `android.telecom.Connection` class. Implement methods of the `Connection` class, including `onAnswer()` and `onDisconnect`. In the implementation of the `onAnswer()` method, you can connect to a Vonage Video session, publish a stream to the session, and enable code to subscribe to streams created in the session. In the implementation of the `onDisconnect()` method, you can disconnect from the session (and stop publishing and subscribing to streams).
* You can use service like Google Firebase to implement push notifications for the app. You can set up notifications to know when your app is in the background or closed. This way, your app can receive a VoIP call while the app is in the closed state.

See the [sample VOIP app](https://github.com/opentok/opentok-android-sdk-samples/tree/main/Basic-VoIP-Call-Java) in the `opentok-android-sdk-samples` repo. It shows how to implement the ConnectionService class to create a VoIP app that uses the Vonage Video Android SDK.

## More Information

For more information, see:

* [Vonage Video Android SDK](/video/client-sdks/android)

<!-- OPT-TODO: * [Vonage Video Android SDK release notes](/developer/sdks/android/release-notes.html) -->

* [Vonage Video Android SDK reference](/sdk/stitch/video-android-reference/)
* [Joining sessions](/video/tutorials/joining-a-session/introduction/android)
* [Publishing streams](/video/tutorials/publish-streams/introduction/android)
* [Subscribing to streams](/video/tutorials/subscribe-streams/introduction/android)
* [Adjusting audio and video](/video/tutorials/audio-video/introduction/android)
* [Customizing the UI](/video/tutorials/video-ui-customization/introduction/android)
* [Screen Sharing](/video/tutorials/video-screen-sharing/introduction/javascript)
* [Signaling](/video/tutorials/video-signaling/introduction/javascript)
