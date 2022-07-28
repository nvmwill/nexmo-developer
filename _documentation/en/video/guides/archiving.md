---
title: Archive a session
meta_title: Use the Vonage Video API to record, save, and retrieve sessions.
description: The Vonage Video API allows you to record, save and retrieve sessions.
product: video
navigation_weight: 2
---

# Archiving

The Vonage Video API allows you to archive, save and retrieve sessions.

This topic includes the following sections:

  - [Basic workflow](#basic-workflow)
  
  - [Archive duration](#archive-duration)
  
  - [Archive storage](#archive-storage)
  
  - [Audio-only and video-only archives](#audio-only-and-video-only-archives)
  
  - [Individual stream and composed archives](#individual-stream-and-composed-archives)
  
  - [Working with individual stream archives](#working-with-individual-stream-archives)

  - [Selecting streams to be included in a archives](#selecting-streams-to-be-included-in-a-archives)

  - [Automatically archived sessions](#automatically-archived-sessions)

  - [Simultaneous archives](#simultaneous-archives)

  - [Archive status change](#archive-status-changes)

  - [Archive security](#archive-security)

  - [Sample apps](#sample-applications)


## Basic workflow

> **Important:** You can only archive sessions that use the Media Router (sessions with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to routed).

You can create an archive for a session using one of the [Server SDKs](/video/server-sdks/overview). When you create an archive, the recording starts.

You can only create an archive for sessions that have at least one client connected. (A client must start publishing a stream within one minute or the archive stops.)

As clients start and stop publishing streams, the streams are recorded.

> **Important**: You can record up to 16 video streams with composed archiving, or 50 with individual stream archiving. (Both composed and individual stream archives can include up to 50 audio streams.) See [Individual stream and composed archives](#individual-stream-and-composed-archives). After this limit is reached, if additional streams are published to the session, they are not recorded. The maximum recorded length of an archive (the cumulative length of time when streams are published in the session) is 4 hours (14,400 seconds). See [Archive duration](#archive-duration) for more details.

There is no limit to the number of archives you can record; however, [automatically archived sessions](#automatically-archived-sessions) will restart a new recording every 4 hours until the recording stops.

The Server SDKs include methods for the following:

* Starting an archive recording
* Stopping an archive recording
* Listing archives
* Retrieving archive information
* Deleting an archive

When you stop recording an archive, the Vonage video platform creates an MP4 file or (in the case of individual stream archives) a ZIP file. (See [Individual stream and composed archives](#individual-stream-and-composed-archives).)

When an archive recording starts and stops, events are sent in the clients. For example, the [OpenTok.js](/video/client-sdks/web) library includes `archiveStarted` and `archiveStopped` events dispatched by the Session object.

## Archive duration

The maximum recorded length of an archive is 4 hours (14,400 seconds). This recorded length refers to the cumulative time in which streams are published (and being recorded).

While streams are published (and recorded), the archive's status is set to `"started"`. (See [Archive status changes](#archive-status-changes)).

While an archive is recording without any streams published, the status is set to `"paused"`.

The maximum total length of an archive, including "started" and "paused" states, is 12 hours (43,200 seconds). Recordings automatically time out (and stop recording) after 1 hour (3,600 seconds) of inactivity (when no clients are publishing streams).

> **Note:** [Automatically archived sessions](#automatically-archived-sessions) result in one or more consecutive recordings, which have a maximum length of 4 hours each.

## Archive storage

Use your [Vonage Account](https://identity.nexmo.com/login?icid=nexmocustomer_api-developer-adp_nexmodashbdsigin_nav) to specify a target for completed archive files to be uploaded to.

This can be your own Amazon S3 bucket, a bucket at an S3-compliant storage provider other than Amazon, or a Windows Azure container. 

For S3-compliant storage providers other than Amazon S3, we support Cloudian and Google Cloud Storage (accessed using the AWS S3 API). Other S3-compatible services may have feature limitations.

See [using S3 storage with Vonage Video API archiving](/video/guides/using-s3) and [using an Windows Azure container with Vonage Video API archiving](/video/guides/using-azure).

If you do not set an S3 bucket or an Azure container, or if uploading to the specified bucket or container fails, recorded archives are available for retrieval by download from the Vonage cloud.

Archives made available on the Vonage cloud are available for 72 hours from the time they are created.

To prevent this fallback storage, log in to your [Vonage Account](https://identity.nexmo.com/login?icid=nexmocustomer_api-developer-adp_nexmodashbdsigin_nav), select the project, and set the option to disable the archive storage fallback.

## Audio-only and video-only archives

When you create an archive using one of the Vonage Video Server SDKs, you can specify whether the archive will record audio, video, or both. (The default is to record both.)

## Individual stream and composed archives

Archive output file can be of one of the following formats:

**Composed archives**

The archive is a single MP4 file composed of all streams. This is the default setting. It is also used for [automatically archived sessions](#automatically-archived-sessions).

The MP4 file uses H.264 video and AAC audio (at 128 Kbps and a 48-Khz sample rate).

You can customize the layout of a composed archive, adjusting the visual arrangement of streams and which streams are displayed. See [Customizing the video layout for composed archives](/video/guides/layout-control).

By default, composed archives have a 640x480-pixel (SD landscape) resolution. To set a composed archive to have a 480x640 (SD portrait), 1280x720 (HD landscape), 720x1280 (HD portrait), 1920x1080 (FHD landscape), 1080x1920 (FHD portrait) resolution, set the `resolution` property to `480x640`, `1280x720`, `1920x1080`, `720x1280`, or `1080x1920` when calling the start archive method of the Vonage Video server SDK.

You may want to use a portrait aspect ratio when recording archives that include video streams from mobile devices (which often use the portrait aspect ratio). 

> Note that support for FHD resolutions, "1920x1080" and "1080x1920", is currently a beta feature.

**Individual stream archives** 

The archive is a ZIP container file with multiple individual media files for each stream, and a JSON metadata file for video synchronization.

You can specify this format when you use one of the Vonage Video server SDKs to start the archive. This format is not available for [automatically archived sessions](#automatically-archived-sessions).

> Note: In a composed archive, if archiving is started and no data is streamed during the duration of the archive (no audio or video is published), the size of archive file will be 0 bytes.

## Working with individual stream archives

Individual stream archive mode is intended for use with a post-processing tool, to produce customized content generated by your application. There are some considerations that developers should evaluate when choosing to use the feature.

### Individual stream containers

Individual stream archive media is delivered as a ZIP archive, containing files for each audio-video stream:

* Each stream container in the archive corresponds to a stream published to Vonage video platform. The publisher's stream ID matches its corresponding file name, and each stream ID is declared in the [archive manifest](#individual-stream-recording-manifest).

When a stream is interrupted and resumed because of automatic reconnection or when a stream is added and removed repeatedly in a [manual stream mode archive](#selecting-streams-to-be-included-in-a-archives), the ZIP archive will include separate files for each of the stream's individual segments.

* Stream containers are either of type `.webm`, or `.mkv`, depending on your project's configuration. Archives for projects that have VP8 set as the [preferred video codec](/video/guides/codecs#setting-the-preferred-video-codec-for-a-project) have `webm` containers, and projects that have H.264 set as the preferred video codec use the `mkv` format.

* Individual stream archive containers are a capture of all the video and audio received by the archive server. This media is not processed, and therefore in most cases the container is not be suitable for direct playback.

The stream container is treated like a transport stream — all media received at the archive server is written directly to file, without inspection or post-processing. This design has implications for downstream consumption of stream containers. In most cases, direct playback of of an individual stream archive container will not be possible, or will have issues because of the contents of the container:

* The declared dimensions for the stream header are seldom correct. Currently, the headers for the container will show a video track with 640x480-pixel dimensions, regardless of the dimensions of encoded video frames.

* Video frames will change in dimensions over time. This can also include aspect ratio changes, particularly with screen-sharing streams.

* Audio and video frames may not arrive with monotonic timestamps; frame rates are not always consistent. This is especially relevant if either the video or audio track is disabled for a time, using one of `publishVideo` or `publishAudio` publisher properties.

Frame presentation timestamps (PTS) are written based on NTP timestamps taken at the time of capture, offset by the timestamp of the first received frame. Even if a track is muted and later unmuted, the timestamp offset should remain consistent throughout the duration of the entire stream. When decoding in post-processing, a gap in PTS between consecutive frames will exist for the duration of the track mute: there are no "silent" frames in the container.

To produce viewable content from individual stream archiving files, you need to run the media through a post processor to repair individual stream containers or multiplex/composite multiple containers into a final product. Suggestions for getting started with downstream processing are outlined in our archiving-composer GitHub repository: [https://github.com/opentok/archiving-composer](https://github.com/opentok/archiving-composer).



### Individual stream recording manifest

Individual stream archives include a JSON metadata file, which provides information on the stream recordings included in the archive. It is of the following format:

```json
{
  "createdAt" : 1429305105162,
  "files" : [
    {
      "connectionData" : "connection data for this stream's connection",
      "filename" : "a1475893-99f5-4f02-b697-5d69e8e30d19.webm",
      "size" : 5558064,
      "startTimeOffset" : 3119,
      "stopTimeOffset" : 48765,
      "streamId" : "a1475893-99f5-4f02-b697-5d69e8e30d19",
      "videoType": "camera"
    },
    {
      "connectionData" : "connection data for this stream's connection",
      "filename" : "5ab71b7b-d998-4683-ad2b-7769d6533666.webm",
      "size" : 5396527,
      "startTimeOffset" : 2799,
      "stopTimeOffset" : 48764,
      "streamId" : "5ab71b7b-d998-4683-ad2b-7769d6533666",
      "videoType": "screen"
    }
  ],
  "id" : "297b9c62-78b3-4152-9e98-7e167354c9e6",
  "name" : "archive name",
  "partnerId" : 123456,
  "sessionId" : "2_MX4xMDB-fjE0MjkzMDQ3NzY3NTZ-WUpRUGVFUmhFSkRmVGljeU5zVnJpaXYxfn4"
}
```

Name | Description |
-- | -- | -- |
``id`` | The unique identifier of this archive.
``partnerId`` | The partner/project ID of this archive.
``sessionId`` | The unique identifier of this archive.
``name`` | The name of this archive. This field is empty if `name` was not specified in the call to start archive..
``createdAt`` | The Unix time in milliseconds for when the archive started.
``files`` | An array of files included in the ZIP container. Each file has the following properties:
| ``streamId`` | The corresponding stream ID for the stream recorded to this file. When a stream is interrupted and resumed because of automatic reconnection or when a stream is added and removed repeatedly in a manual stream mode archive, the individual stream archive will include separate files for each of the stream's individual segments.
| ``filename`` | The name of the recorded media file. This will be a .webm for an archive of a session in a project that uses VP8 as the prefered video codec, and it will be a .mkv for an archive of a session in a project that uses H.264 as the preferred video codec. If a stream is interrupted and resumed because of automatic reconnection or when a stream is added and removed repeatedly in a manual stream mode archive, several files may be present for the same stream (corresponding to each segment), and the filename for each stream segment will be appended with an index number (such as "1" or "2") after the stream ID to identify the order of the segment.
| ``startTimeOffset`` | The offset, in milliseconds, for when this file started recording (from the createdAt time for the archive)—see the important note below.
| ``stopTimeOffset`` | The offset, in milliseconds, for when this file stopped recording (from the createdAt time for the archive)—see the important note below.
| ``connectionData`` | The connection data for the publishing client.
| ``videoType`` |  Either `camera`, `screen`, or `custom`. A `screen` video uses screen sharing on the publisher as the video source; a `custom` video is published by a web client using an HTML VideoTrack element as the video source. For a stream published from a mobile device, the screen type can change from a camera to a screen-sharing video type. However, the property in the recording manifest only indicates the initial video type.

> **Important:** In an [individual stream recording](#working-with-individual-stream-archives), if there is a short period where no streams are published during the recording, the `startTimeOffset` and `stopTimeOffset` values can be off by a bit. This is a known issue.

### Post processing individual archives

A sample post processor application is available at [https://github.com/opentok/archiving-composer](https://github.com/opentok/archiving-composer).

## Selecting streams to be included in a archives

When you start an archive, if you set the ``streamMode`` to `manual`, you can choose the streams to include in the archive.

You can add and remove streams during the archive recording. And you can specify whether the archive will include a stream's audio or video (or both).

Otherwise, with the ``streamMode`` set to `auto` (the default), all streams are included (with audio and video) in the archive. See Starting an archive and Selecting streams to be included in an archive.

However, in a composed archive there is a limit of 16 video streams and 50 audio streams included at one time (for both automatic and manual stream modes), and streams are included based on stream prioritization rules.

## Automatically archived sessions

You can have a session be automatically archive by specifying this when you create the session, using one of the Vonage Video server SDKs.

The archive for an automatically archived session starts as soon as a client connects to the session.

> Note: If archiving is started and no data is streamed during the duration of the archive (no audio or video is published), the size of archive file will be 0 bytes.

Automatically archived sessions include both audio and video, and they record all streams to the same (composed) MP4 file.

However, if the recording lasts longer than 4 hours (14,400 seconds), the session is recorded to multiple, consecutive MP4 files, of up to 4 hours each in length, until the recording is stopped.

You can call the Vonage Video server-side SDK method for listing archive and pass in the ``sessionID`` parameter to list archives for a specified session ID. 

You can then determine the sequence of the separate MP4 files, by looking at the ``createdAt`` property of each archive listed in the JSON data returned.

You cannot stop an automatic archive using the server SDKs. Automatic archives stop 60 seconds after the last client disconnects from the session or 60 minutes after the last client stops publishing a stream to the session.

> **Important:** If you expect to have long periods during which archiving will be paused, you should consider starting and stopping archives using the methods in one of the Vonage Video Server SDKs (instead of having the session be archived automatically).
You should strictly avoid reusing session IDs if you will be using automatic archiving. Reusing a session ID can cause automatic archives to fail if a previous automatic archive for the session has timed out.

## Simultaneous archives

To record multiple archives for the same session simultaneously, set the `multiArchiveTag` option when starting each archive. You must set this to a unique string for each simultaneous archive of an ongoing session.

You can use different layouts and assign different streams to each simultaneous archive recording.

In [automatically archived sessions](#automatically-archived-sessions), set the `multiArchiveTag` option to start a new simultaneous archive that is archives simultaneously with the automatic archives. Automatic archives start and end when the session starts and stops on its own (following the rules for automatic archives), while you stop manually started separately.

## Archive status changes

You can register a callback URL for notification when an archive's status changes. The status of an archive is set to one of the following:

Name | Description |
-- | -- | -- |
``started`` | The archive started and is in the process of being recorded.
``paused`` | When an archive is paused, nothing is recorded. The archive is paused if no clients are publishing streams to the session (in this case, there is a timeout of 60 minutes, after which the archive stops and the archive status changes to `stopped`) or all clients disconnect the session (in which case, the recording stops after 60 seconds and the status changes to `stopped`). If a client resumes publishing while the recording is in the `paused` state, then the recording resumes and the status changes back to `started`.
``stopped`` | Recording has stopped.
``uploaded`` | The archive is available for download from the S3 bucket or Azure container you specified in your Vonage Account. Note that for very small archives, the `uploaded` status event may occur before the `stopped` status event.
``available`` | The archive is available for download from the Vonage cloud.
``expired`` | The archive is no longer available for download from the Vonage cloud. Recordings on the Vonage cloud are only available for 72 hours from the time they are created.
``failed`` | The recording failed.

Use your Vonage Account to specify a callback URL. When an archive status changes, the server sends HTTP POST requests to the URL you specify. The `Content-Type` for the request is `application/json`. The data of the request is a JSON object of the following form:

```json
{
    "id" : "b40ef09b-3811-4726-b508-e41a0f96c68f",
    "event": "archive",
    "createdAt" : 1384221380000,
    "duration" : 328,
    "name" : "Foo",
    "partnerId" : 123456,
    "reason" : "",
    "resolution" : "640x480",
    "sessionId" : "2_MX40NzIwMzJ-flR1ZSBPY3QgMjkgMTI6MTM6MjMgUERUIDIwMTN-MC45NDQ2MzE2NH4",
    "size" : 18023312,
    "status" : "available",
    "url" : "https://tokbox.com.archive2.s3.amazonaws.com/123456/b40ef09b-3811-4726-b508-e41a0f96c68f/archive.mp4"
}
```
The JSON object includes the following properties:

Property | Description |
-- | -- | -- |
``createdAt`` | The timestamp for when the call to start the archive occurred, expressed in milliseconds since the Unix epoch (January 1, 1970, 00:00:00 UTC). Note that this value is rounded to the nearest second. Also note that this value differs from the `createdAt` value in the method for retrieving archive and the `createdAt` value in the manifest for an individual stream archive. In those, the `createdAt` value is set to the time the recording effectively started on the Vonage servers (not the time when the call to start the recording occurred). Note that even if a call to start an archive is issued, the recording will not effectively start on the Vonage server until at least one client publishes a stream in the session.
``duration`` | The duration of the archive in seconds. For archive that are in progress (with the status property set `started`), this value is set to 0.
``id`` | The archive's unique ID.
``name`` | The name of the archive you supplied (this is optional).
``partnerId`` | Your Vonage App ID.
``resolution`` | The resolution of the archive (either `640x480`, `480x640`, `1280x720`, `720x1280`, `1920x1080`, or `1080x1920`). This property is only set for composed archives. You can set the resolution of a composed archive when calling the start archive method of the Vonage Video server-side SDK.
``reason`` | For archives with the status `stopped` or `failed`, this string describes the reason the archive stopped (such as "maximum duration exceeded") or failed.
``sessionId`` | The session ID of the Vonage Video session that was archived.
``size`` | The size of the archive file. For archive that have not been generated, this value is set to 0.
``status`` | The status of the archive:
| `available` | The archive is available for download from Vonage.
| `expired` | The archive is no longer available for download from the Vonage cloud. Recordings on the Vonage cloud are only available for 72 hours from the time they are created.
| `failed` | The archive recording failed.
| `paused` | When an archive is paused, nothing is recorded. The archive is paused if no clients are publishing streams to the session (in this case, there is a timeout of 60 minutes, after which the archive stops and the archive status changes to `stopped`) or all clients disconnect the session (in which case, the recording stops after 60 seconds and the status changes to `stopped`). If a client resumes publishing while the archive is in the `paused` state, then the recording resumes and the status changes back to `started`.
| `started` | The archive started and is in the process of being recorded.
| `stopped` | Recording has stopped.
| `uploaded` | The archive is available for download from the S3 bucket or Azure container you specified in your Vonage Account. Note that for very small archives, the `uploaded` status event may occur before the `stopped` status event.
``streamMode`` | Whether all streams are included in the archive (`auto`) or you select streams to include in the archive (`manual`). See [Selecting streams to be included in an archive](#selecting-streams-to-be-included-in-a-archives).
``streams`` | An array of objects corresponding to streams currently being archived. This is only set for an archive with the status set to `started`. Each object in the array includes the following properties:
| `streams` | The stream ID of the stream included in the archive.
| `hasAudio` | Whether the stream's audio is included in the archive.
| `hasVideo` | Whether the stream's video is included in the archive.
``url`` | The download URL of the available archive file. This is only set for an archive with the status set to `available`; for other archives, (including archives with the status `uploaded`) this property is set to `null`. The download URL is obfuscated, and the file is only available from the URL for 10 minutes. To generate a new URL, use the server SDK method for retrieving archive information or listing archives.

You can also view the status of archives in your Vonage Account:

1. Navigate to your Vonage Account dashboard.
2. From the list of projects in the left of the page, select the project that will contain sessions that you are archiving.
3. In the archiving section, click the Archive List tab. Details on archives in the project are listed.

## Archive security

You can secure your archives in the following ways:

* **Turn off archive storage fallback** — By default, Vonage stores an archive file on Vonage servers if it was unable to upload the file to your specified S3 or Azure server. To prevent this fallback storage, log in to your Vonage Account, select the project, and set the option to disable archive storage fallback.
* **Use Vonage encryption** — This allows you to create Vonage archives where the data is never at rest in an unencrypted state. Of the available methods of securing your Vonage recordings, this provides the highest level of security. This is available as an add-on feature. For more information, see the Vonage encryption documentation.
* **Use Amazon S3 server-side encryption** — This uses Amazon S3-managed encryption keys for encryption. Learn about Amazon S3 server-side encryption [here](/video/guides/amazon-s3-encryption).


<!-- ## More Information

See the documentation for the archiving-related methods in the API references for the server SDKs. Also, each of the server SDKs includes a sample archiving application. -->

<!-- OPT-TODO: add link to API/method reference page -->