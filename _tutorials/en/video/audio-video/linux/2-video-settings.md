---
title: Adjusting video settings
description: Learn more about manipulating audio and video of Vonage Video API streams for your Linux application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Using a custom video capturer

The `otc_publisher_new()` function includes a `capturer` parameter. If you set this to `NULL`, the SDK uses the default system camera as the source for the published video stream.

However, you can use a custom video capturer for the publisher by defining a `otc_video_capturer_callbacks` struct and passing it in as the `capturer` parameter of the `otc_publisher_new()` function.

The `otc_video_capturer_callbacks` struct includes function pointers to callback functions that are invoked upon events related to the publisher video, such as when the video capturer needs a new video frame.

<!-- OPT-TODO: To see an example, see the Custom Video Capturer sample of the [Vonage Video-linux-sdk-samples](https://github.com/opentok/opentok-linux-sdk-samples) repo. -->

## Mirroring the local display of a publisher's video

By default, the local renderer for published video mirrors the video. You can set the `mirror_on_local_render` property of the `otc_video_capturer_settings` instance obtained by calling the `get_capture_settings(capturer, settings)` function.

Set it to `true` to have the video mirrored in the local renderer of the publisher. Set it to `false` to have it not be mirrored.

This setting only affects the rendered video in the publisher's client application. It has no effect on the video in subscribing clients.
