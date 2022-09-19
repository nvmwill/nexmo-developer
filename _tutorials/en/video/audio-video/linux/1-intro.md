---
title: Adjusting audio and video
description: Learn more about manipulating audio and video of Vonage Video API streams for your Linux application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

# Adjusting audio and video

You can make audio and video adjustments to [published](/video/tutorials/publish-streams/introduction/linux) and [subscribed](/video/tutorials/subscribe-streams/introduction/linux) streams

## Publishing audio or video only

You can toggle audio and video on or off, by calling the `otc_publisher_set_publish_audio()` and `otc_publisher_set_publish_video()` functions, passing in \`OTC\_FALSE\` or `OTC_FALSE` as the `publish_audio` and `publish_audio` parameters. For example, the following code turns audio off:

```c
otc_publisher_set_publish_audio(publisher, OTC_FALSE);
```

## Publishing in a voice-only session

To set up a [voice-only](/video/guides/voice-only/) session, instantiate an `otc_publisher_settings` struct, call the `otc_publisher_settings_set_video_track()` function, passing in `OTC_FALSE` as the `enabled` parameter.

Then use the `otc_publisher_new_with_settings()` function to create. For example, the following code creates a publisher for a voice-only session:

```c
otc_publisher_settings publisher_settings = otc_publisher_settings_new();
otc_publisher_settings_set_video_track(publisher_settings, OTC_FALSE);
otc_publisher_callbacks publisher_callbacks = {0};
// Set callbacks for the publisher. Then:
otc_publisher publisher = otc_publisher_new_with_settings(publisher_callbacks, publisher_settings);
```
