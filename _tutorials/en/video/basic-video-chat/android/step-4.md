---
title: Requesting permissions
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Requesting permissions

Because our app uses audio and video from the user's device, we’ll need to add some code to request audio and video permissions. We'll use the [EasyPermissions](https://github.com/googlesamples/easypermissions) library to do this.

1. Start by adding the EasyPermissions library to your project — open the **build.gradle** for your module (the app/build.gradle file) and add the following code snippet to the dependencies section:

```groovy
implementation 'pub.devrel:easypermissions:3.0.0'
```

2. In your **AndroidManifest.xml** file, add this code snippet inside the `manifest` tags:

```xml
<uses-permission android:name="android.permission.CAMERA" />
<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.RECORD_AUDIO" />
<uses-permission android:name="android.permission.WAKE_LOCK" />
<uses-permission android:name="android.permission.MODIFY_AUDIO_SETTINGS" />
<uses-permission android:name="android.permission.READ_PHONE_STATE" />
<uses-permission android:name="android.permission.BLUETOOTH_CONNECT" />

<uses-feature android:name="android.hardware.camera" />
<uses-feature android:name="android.hardware.camera.autofocus" />
```

3. In your **MainActivity.java** file, add a new method called `onRequestPermissionsResult`:

```java
@Override
public void onRequestPermissionsResult(int requestCode, @NonNull String[] permissions, @NonNull int[] grantResults) {

    super.onRequestPermissionsResult(requestCode, permissions, grantResults);
    EasyPermissions.onRequestPermissionsResult(requestCode, permissions, grantResults, this);
}
```

This is boilerplate code to use the EasyPermissions library.

**Important:** You will have to add imports manually, by clicking **EasyPermissions** (red text) and pressing the key combination Option + Enter on MacOS or Alt + Enter on Windows. This step may be required when pasting the code. You can also enable "Add unambigous imports on the fly" option (Preferences | Editor | Auto Import) to add imports automatically.

4.  Add the `PERMISSIONS_REQUEST_CODE` property at the top of the **MainActivity.java** file:

```java
private static final int PERMISSIONS_REQUEST_CODE = 124;
```

5.  Next we'll add a `requestPermissions()` method:

```java
@AfterPermissionGranted(PERMISSIONS_REQUEST_CODE)
private void requestPermissions() {
    String[] perms = { Manifest.permission.INTERNET, Manifest.permission.CAMERA, Manifest.permission.RECORD_AUDIO };
    if (EasyPermissions.hasPermissions(this, perms)) {
        // initialize and connect to the session

    } else {
        EasyPermissions.requestPermissions(this, "This app needs access to your camera and mic to make video calls", PERMISSIONS_REQUEST_CODE, perms);
    }
}
```

This checks if the permissions have already been granted. If they haven’t, we prompt the user for camera and mic permissions with the `EasyPermissions.requestPermissions` method.

Once permissions have been granted, this method will fire again due to the `@AfterPermissionGranted(PERMISSIONS_REQUEST_CODE)` annotation. We'll add some code to initialize the session and view objects in the coming steps.

6. Now add `requestPermission();` to call the method inside the `onCreate()` method:

```java
@Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
    
        requestPermissions();
    }
```
