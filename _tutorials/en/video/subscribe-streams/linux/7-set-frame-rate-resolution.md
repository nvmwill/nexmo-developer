---
title: Setting frame rate and resolution
description: Learn how to subscribe to an Vonage Video API stream in your Linux application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Setting the preferred frame rate and resolution

When subscribing to a stream that uses the [scalable video feature](/video/guides/scalable-video), you can set the preferred frame rate and resolution for the stream the subscribing client receives from the Vonage Video Media Router.

Use the `otc_subscriber_set_preferred_framerate()` and `otc_subscriber_set_preferred_resolution` functions.
