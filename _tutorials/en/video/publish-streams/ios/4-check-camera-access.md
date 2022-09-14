---
title: Check for camera access
description: Learn how to publish Vonage Video API streams in your iOS application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Checking for camera access

We recommend that you check for camera access app permissions prior to publishing and, if access is denied, give feedback to the end-user about setting app access permissions. (An end-user can enable access to the camera via the iOS Settings: Privacy > Camera.)

The end-user is prompted to grant access to the camera for any app requesting it. You may control when this prompt is shown by calling `[AVCaptureDevice requestAccessForMediaType:completionHandler:]` with `AVMediaTypeVideo`, which will give the prompt on first run. Subsequent calls will execute the completion handler with the user's stored preference.

```objective-c
[AVCaptureDevice requestAccessForMediaType:AVMediaTypeVideo completionHandler:^(BOOL granted) {
        if(granted){
            // Access to the camera is granted. You can publish.
        } else {
            // Access to the camera is not granted.
        }
    }];
```
