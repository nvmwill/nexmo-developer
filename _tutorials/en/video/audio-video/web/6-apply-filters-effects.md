---
title: Applying filters and effects
description: Learn more about manipulating audio and video of Vonage Video API streams for your web application. Publish only video or audio, adjust the frame rate, and more. 
product: video
---

## Applying filters and effects to published audio and video

You can use an [audio MediaStream track](/video/tutorials/publish-streams/introduction/javascript) or a [video MediaStream track](/video/tutorials/publish-streams/introduction/javascript) as the source audio or video for a published stream. Using this feature, you can apply filters and effects to the published audio or video.

You can use the [OT.getUserMedia()](/sdk/stitch/video-js-reference/OT.html#getUserMedia) method to get a reference to a MediaStream that uses the camera selected by the user. You can then use the video MediaStreamTrack obtained from that MediaStream object as the source for a Video element.

You can then add that Video element to an HTML Canvas element, apply filters or effects to the canvas, and use the filtered video MediaStreamTrack object obtained from the canvas as the video source for a published stream.

<!-- OPT-TODO: For an example, see the Stream-Filter sample [Vonage Video-web-samples repo](https://github.com/opentok/opentok-web-samples) on GitHub. -->

You can use the [OT.getUserMedia()](/sdk/stitch/video-js-reference/OT.html#getUserMedia) method to get a reference to a MediaStream that uses the microphone selected by the user.

You can then use the audio MediaStreamTrack obtained from that MediaStream object as the as the `audioSource` when calling [OT.initPublisher()](/sdk/stitch/video-js-reference/OT.html#initPublisher).

You can then create an [AudioContext](https://developer.mozilla.org/en-US/docs/Web/API/AudioContext) object and call its `createMediaStreamSource()` object, passing in the MediaStream object to to create a [MediaStreamAudioSourceNode](https://developer.mozilla.org/en-US/docs/Web/API/MediaStreamAudioSourceNode) object. You can then apply audio filters to the MediaStreamAudioSourceNode object, which will result in the filters being applied to the published stream.
