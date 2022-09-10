---
title: Voice-Only
description: Learn how to create a voice-only session in the Vonage Video API. Some use-cases require voice-only sessions, and this guide describes best practices with enabling these.
product: video
navigation-weight: 
---

# Voice-Only

You can set up a voice-only session when instantiating a Publisher object.

<!-- * [Web](/developer/guides/audio-video/js/#voice) -->

<!-- TODO: opentok * [Android](/developer/guides/audio-video/android/#voice)
* [iOS](/developer/guides/audio-video/ios/#voice)
* [iOS (Swift)](/developer/guides/audio-video/ios-swift/#voice)
* [Windows](/developer/guides/audio-video/windows/#voice) -->

There are a number of user interface optimizations that you can make in a voice-only session:

* **Getting audio levels** — The Vonage Video client libraries include events that report the audio level of a subscriber or publisher. For more information, see  [OpenTok.js](/video/tutorials/video-ui-customization/video/video-ui-customization/js/audio-ui-level/javascript).

<!-- TODO: opentok [iOS](/developer/guides/customize-ui/ios/index.html#audio_levels), [iOS (Swift)](/developer/guides/customize-ui/ios-swift/index.html#audio_levels), [Android](/developer/guides/customize-ui/android/index.html#audio_levels). -->

* **Speaker detection** — You can use the audio level events to detect active speakers in a session. For an example using OpenTok.js, see [this topic](/video/tutorials/video-ui-customization/video/video-ui-customization/js/audio-ui-level/javascript).
* **Displaying a custom volume indicator** — You can use the audio level events to display a volume indicator (such as a meter). For an example using OpenTok.js, see [this topic](video/tutorials/video-ui-customization/video/video-ui-customization/js/audio-ui-level/javascript).
* **Setting an image to display in audio-only mode** — You can display an image in a Publisher or Subscriber that is in audio-only mode. In OpenTok.js, see [this topic](/video/tutorials/video-ui-customization/video/video-ui-customization/js/image-display/javascript). In iOS and Android, you can add an image to the view hierarchy of the app.

<!-- TODO: opentok * In the Vonage Video Android SDK, you can have the audio played back using the headset speaker (which is preferable in a voice-only session). See [Setting the audio output mode for a voice session](/developer/guides/audio-video/android/index.html#audio_output_mode). -->

When archiving a voice-only session, you can specify that the archive include audio only (not video) when you create the archive. See the [archiving](/video/guides/archiving/overview) developer guide.