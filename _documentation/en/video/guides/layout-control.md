---
title: Customizing the video layout for composed archives
meta_title: Adjust the visual arrangement of streams and which streams are displayed.
description: You can customize the video layout for composed archives including adjusting the visual arrangement of streams and which streams are displayed.
product: video
navigation_weight: 4
---

# Customizing the video layout for composed archives

You can use the Vonage Video REST API to customize the layout of videos in an archive.

This feature applies to composed archives, not individual archives. For general information on archives, see the [Archiving](/video/guides/archiving/overview) guide.

## Overview

By default, archives arrange videos from the session in a tiled layout. For example, the following illustrates the layout when there are 1, 2, 4, or 5 streams in a session:

<img src="/images/video/bestFit1.png" alt="Vonage video API default layout 1" style="width: 20%;">
<img src="/images/video/bestFit2.png" alt="Vonage video API default layout 2" style="width: 20%;">
<img src="/images/video/bestFit4.png" alt="Vonage video API default layout 4" style="width: 20%;">
<img src="/images/video/bestFit5.png" alt="Vonage video API default layout 5" style="width: 20%;">

This is known as the "best fit" layout. Alternately, you can select from a number of other predefined layouts.

For the other layouts, you assign a class name to each Vonage Video streams to determine how it will appear in the layout. (See [Predefined layout types](video/guides/archive-broadcast-layout/#predefined-layout-types ).)


You can also define your own custom layouts using CSS. See [Defining custom layouts](/video/guides/archive-broadcast-layout/#custom-layouts).

By default, the composed archive is 640x480 pixels (SD landscape, 4:3 aspect ratio). Individual Vonage videos are arranged in container rectangles within the recorded video.

If the aspect ratio of an individual stream's video does not match that of the container (for example, if it is an HD video or screen-sharing video), it is letterboxed to fit within the container. For example, the following illustration shows a best-fit layout with two SD landscape (4:3) videos (1 and 4) and two HD landscape (16:9) videos (2 and 3):

<img src="/images/video/aspect-ratios.png" alt="Vonage Video API layout aspect ratios" style="width: 20%;">

You can also set a composed archive to use a 480x640 (SD portrait, 3:4 aspect ratio), 1280x720 (HD landscape, 16:9 aspect ratio), 720x1280 (HD portrait, 9:16 aspect ratio), 1920x1080 (FHD landscape, 16:9 aspect ratio), or 1080x1920 (FHD portrait, 9:16 aspect ratio) resolution when you call the start archive method of the Vonage Video REST API. You may want to use a portrait aspect ratio when recording archives that include video streams from mobile devices (which often use the portrait aspect ratio).

<!-- OPT-TODO: Add a link to start recording text https://tokbox.com/developer/rest/#start_archive  -->

To use this feature:

* Specify the layout type for the composed archive - see [Specifying the initial layout type](#specifying-the-initial-layout-type) and [Dynamically changing the layout type](#dynamically-changing-the-layout-type-during-a-recording) while the session is being recorded.

* [Assign layout classes to Vonage Video streams](/video/guides/archive-broadcast-layout/#assign-layout-classes-to-streams).

You can also define your own [custom layouts](/video/guides/archive-broadcast-layout/#custom-layouts).

## Specifying the initial layout type

When you start the recording for a session, using the Vonage Video REST API, you can optionally, specify the initial archive layout type.

Set the request URL for the POST request to the following:

`https://api.opentok.com/v2/project/{appId}/archive`

Set the `Content-Type` to `application/json` and set the `layout` `type` as a property of the JSON data sent in the POST request:

```json
{
  "sessionId": "2_MX44NTQ1MTF--bm1kTGQ0RjVHeGNQZE51VG5scGNzdVl0flB-",
  "layout": {
    "type": "pip"
  },
  "name" : "archive_name",
  "outputMode" : "composed"
}
```

If you are using a custom layout - see [Defining custom layouts](/video/guides/archive-broadcast-layout/#custom-layouts) - set the `type` property to `custom` and pass in the stylesheet as an additional property — `stylesheet`:

```json
{
  "sessionId": "2_MX44NTQ1MTF--bm1kTGQ0RjVHeGNQZE51VG5scGNzdVl0flB-",
  "layout": {
    "type": "custom",
    "stylesheet": "stream.instructor {position: absolute; width: 100%;  height:50%;}"
  },
  "name" : "archive_name",
  "outputMode" : "composed"
}
```

You can also specify a layout type to use when there is a screen-sharing stream in the session by setting the `screenshareType` property of the `layout` property - [see screen-sharing layouts](/video/guides/archive-broadcast-layout/#screen-sharing-layouts):

```json
{
  "sessionId": "2_MX44NTQ1MTF--bm1kTGQ0RjVHeGNQZE51VG5scGNzdVl0flB-",
  "layout": {
    "type": "bestFit",
    "screenshareType": "pip"
  },
  "name" : "archive_name",
  "outputMode" : "composed"
}
```

Authenticate the REST call using a JWT token.

<!-- - see [Vonage Video REST API authentication](): -->

<!-- OPT-TODO: Add an Authentication guide? https://tokbox.com/developer/rest/#authentication  -->

```sh
X-OPENTOK-AUTH: <token>
```

The request returns a 400 error response code if you specify an invalid type.

You can also specify the initial layout type when starting a recording using the server SDKs:

Language | Description |
-- | -- | -- |
Node | [OpenTok.startArchive()](https://github.com/opentok/opentok-node#working-with-archives) (set the `layout` property of the `options` parameter).
PHP | [OpenTok->startArchive()](https://github.com/opentok/Opentok-PHP-SDK#working-with-archives) (call the `OpenTok->setArchiveLayout()` method after starting the recording).

If you do not specify an initial layout type, the composed archive uses the Best Fit layout type.

If you specify any other layout type, be sure to apply appropriate layout classes for streams in the Vonage Video session

See [Assigning layout classes to Vonage Video streams](/video/guides/archive-broadcast-layout/#assign-layout-classes-to-streams) and
[Predefined layout types](/guides/archive-broadcast-layout/#predefined-layout-types ).

## Dynamically changing the layout type during a recording

You can dynamically change the layout type by calling the `/archive/layout` REST API. 

Make a PUT request to the following URL:

`https://api.opentok.com/v2/project/{appId}/archive/{archiveId}/layout`

Set the `Content-Type` to `application/json` and include the layout `type` as a property of the JSON data in the PUT request:

```json
{
  "type": "pip"
}
```

If you are using a [custom layout](/video/guides/archive-broadcast-layout/#custom-layouts) set the `type` property to `custom` and pass in the stylesheet as an additional property — `stylesheet`:

```json
{
  "type": "custom",
  "stylesheet": "stream.instructor {position: absolute;  width: 100%;  height:50%;}"
}
```