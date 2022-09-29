---
title: Exploring the code
description: Follow this tutorial to build basic archiving for a web application from scratch using the Vonage Video API. It is the quickest way to build a proof of concept for this functionality on the Vonage Video API platform.
product: video 
---

## Exploring the code

The archiving sample adds the following functionality:

* Tap the _Start recording_ button.

This starts recording the audio video streams on the OpenTok Media Server.

* Tap the _Stop recording_ button to stop the recording.

* Tap the _View recording_ button to view the recording in the web browser.


In the Config.h file, you set the following constant to the base URL of the web service the app calls to start archive recording, stop recording, and play back the recorded video:

```c
#define SAMPLE_SERVER_BASE_URL
```

If you do not set this string, the Start Recording, Stop Recording, and View Archive buttons will not be available in the app.

When the user clicks the Start Recording and Stop Recording buttons, the app calls the `[self startArchive:]` and `[self stopArchive:]` methods. These call web services that call server-side code start and stop archive recordings.

When archive recording starts, the implementation of the `[OTSessionDelegate session:archiveStartedWithId:name:]` method is called:

```objective_c
- (void)     session:(OTSession*)session
archiveStartedWithId:(NSString *)archiveId
                name:(NSString *)name
{
    NSLog(@"session archiving started with id:%@ name:%@", archiveId, name);
    _archiveId = archiveId;
    _archiveIndicatorImg.hidden = NO;
    if (SAMPLE_SERVER_BASE_URL) {
        _archiveControlBtn.hidden = NO;
        [_archiveControlBtn setTitle: @"Stop recording" forState:UIControlStateNormal];
        _archiveControlBtn.hidden = NO;
        [_archiveControlBtn removeTarget:self
                                    action:NULL
                        forControlEvents:UIControlEventTouchUpInside];
        [_archiveControlBtn addTarget:self
                                action:@selector(stopArchive)
                        forControlEvents:UIControlEventTouchUpInside];
    }
}
```

This causes the `_archivingIndicatorImg` image (defined in the main storyboard) to be displayed. The method stores the archive ID (identifying the archive) to an `archiveId` property. The method also changes the archiving control button text to change to "Stop recording".

When the user clicks the **Stop Recording** button, the app passes the archive ID along to the web service that stops the archive recording.

When archive recording stops, the implementation of the `[OTSessionDelegate session:archiveStoppedWithId:]` method is called:

```objective_c
- (void)     session:(OTSession*)session
archiveStoppedWithId:(NSString *)archiveId
{
    NSLog(@"session archiving stopped with id:%@", archiveId);
    _archiveIndicatorImg.hidden = YES;
    if (SAMPLE_SERVER_BASE_URL) {
        _archiveControlBtn.hidden = NO;
        [_archiveControlBtn setTitle: @"View recording" forState:UIControlStateNormal];
        [_archiveControlBtn removeTarget:self
                                    action:NULL
                        forControlEvents:UIControlEventTouchUpInside];
        [_archiveControlBtn addTarget:self
                                action:@selector(loadArchivePlaybackInBrowser)
                        forControlEvents:UIControlEventTouchUpInside];
    }
}
```

This causes the `_archivingIndicatorImg` image (defined in the main storyboard) to be displayed. It also changes the archiving control button text to change to "View archive". When the user clicks this button, the `[self loadArchivePlaybackInBrowser:]` method opens a web page (in Safari) that displays the archive recording.

**Notes:**

* In most applications, control of the archive recording would not be granted to each end-user.

* You can have automatically archived sessions, which are recorded whenever a client starts publishing a stream.

* You will want to set up an Amazon S3 or Microsoft Azure target for storage of your archive recordings.


For more information on archiving, see the [Vonage Video archiving developer guide](/video/guides/archiving/overview).
