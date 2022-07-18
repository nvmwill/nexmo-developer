---
title: Customizing the video layout for composed recordings
meta_title: Adjust the visual arrangement of streams and which streams are displayed.
description: You can customize the video layout for composed recordings including adjusting the visual arrangement of streams and which streams are displayed.
product: video
navigation_weight: 5
---

# Customizing the video layout for composed recordings

You can use the Vonage Video REST API to customize the layout of videos in a Vonage Video recording.

This feature applies to composed recordings, not individual recordings. For general information on Vonage Video recordings, see the [Vonage Video Recording](recording) guide.

## Overview

By default, Vongate Video recordings arrange videos from the Vonage Video session in a tiled layout. For example, the following illustrates the layout when there are 1, 2, 4, or 5 streams in a session:

<img src="/images/video/CustomLayout.png" alt="Vonage video API default layout" style="width: 75%;">

This is known as the "best fit" layout. Alternately, you can select from a number of other predefined layouts. For the other layouts, you assign a class name to each Vonage Video streams to determine how it will appear in the layout. (See [Predefined layout types].)

You can also define your own custom layouts using CSS. See [Defining custom layouts].

By default, the composed archive is 640x480 pixels (SD landscape, 4:3 aspect ratio). Individual Vonage videos are arranged in container rectangles within the recorded video. If the aspect ratio of an individual stream's video does not match that of the container (for example, if it is an HD video or screen-sharing video), it is letterboxed to fit within the container. For example, the following illustration shows a best-fit layout with two SD landscape (4:3) videos (1 and 4) and two HD landscape (16:9) videos (2 and 3):

<img src="/images/video/aspect-ratios.png" alt="Vonage Video API layout aspect ratios" style="width: 75%;">

You can also set a composed recording to use a 480x640 (SD portrait, 3:4 aspect ratio), 1280x720 (HD landscape, 16:9 aspect ratio), 720x1280 (HD portrait, 9:16 aspect ratio), 1920x1080 (FHD landscape, 16:9 aspect ratio), or 1080x1920 (FHD portrait, 9:16 aspect ratio) resolution when you call the [start recording] method of the Vonage Video REST API. You may want to use a portrait aspect ratio when recording archives that include video streams from mobile devices (which often use the portrait aspect ratio).

To use this feature:

* Specify the layout type for the composed recording - see [Specifying the initial layout type and Dynamically changing the layout type while the session is being recorded].

* [Assign layout classes to Vonage Video streams].

You can also define your own [custom layouts].

## Specifying the initial layout type

When you start the recording for a session, using the Vonage Video REST API, you can optionally, specify the initial archive layout type.

Set the request URL for the POST request to the following:

`https://api.opentok.com/v2/project/{apiKey}/archive`

Set the `Content-Type` to `application/json` and set the `layout` `type` as a property of the JSON data sent in the POST request:

```
{
  "sessionId": "2_MX44NTQ1MTF--bm1kTGQ0RjVHeGNQZE51VG5scGNzdVl0flB-",
  "layout": {
    "type": "pip"
  },
  "name" : "archive_name",
  "outputMode" : "composed"
}
```

If you are using a custom layout - see [Defining custom layouts] - set the `type` property to `custom` and pass in the stylesheet as an additional property — `stylesheet`:

```
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

You can also specify a layout type to use when there is a screen-sharing stream in the session by setting the `screenshareType` property of the `layout` property - [see screen-sharing layouts]:

```
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

Authenticate the REST call using a JWT token - see [Vonage Video REST API authentication]:

```
X-OPENTOK-AUTH: <token>
```

The request returns a 400 error response code if you specify an invalid type.

You can also you can also specify the initial layout type when starting a recording using the Vonage Video server SDKs:

Language | Description |
-- | -- | -- |
Node | [OpenTok.startArchive()](linksToNodeServerSDK) (set the `layout` property of the `options` parameter).
PHP | [OpenTok->startArchive()](linksToPHPServerSDK) (call the `OpenTok->setArchiveLayout()` method after starting the recording).

If you do not specify an initial layout type, the composed recording uses the Best Fit layout type. If you specify any other layout type, be sure to apply appropriate layout classes for streams in the Vonage Video session see [Assigning layout classes to Vonage Video streams](link).

See [Predefined layout types](link).

## Dynamically changing the layout type during a recording

You can dynamically change the layout type by calling the `/archive/layout` REST API. Make a PUT request to the following URL:

https://api.opentok.com/v2/project/{apiKey}/archive/{archiveId}/layout

Set the `Content-Type` to `application/json` and include the layout `type` as a property of the JSON data in the PUT request:

```
{
  "type": "pip"
}
```

If you are using a [custom layout](link) set the `type` property to `custom` and pass in the stylesheet as an additional property — `stylesheet`:

```
{
  "type": "custom",
  "stylesheet": "stream.instructor {position: absolute;  width: 100%;  height:50%;}"
}
```



