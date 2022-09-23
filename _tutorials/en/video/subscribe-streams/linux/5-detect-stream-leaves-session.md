---
title: Detecting when streams end and a subscriber's video is disabled
description: Learn how to subscribe to a Vonage Video API stream in your Linux application. Once you have connected to a session, you can subscribe to a stream to view video, audio, and signalling data.
product: video
---

## Detecting when streams leave a session

The `on_stream_dropped` callback function of the `otc_session_callbacks` struct is called when another client's stream is dropped from the Vonage Video session. The `stream` parameter passed into this function is a pointer to an `otc_stream` struct for the stream. Call the `otc_stream_get_id()` method, passing in the `otc_stream` struct, to get the stream ID.

## Detecting when a stream's video is disabled

The `on_stream_has_video_changed` callback function of the `otc_session_callbacks` struct is called when another client's stream is dropped from the Vonage Video session. The `stream` parameter passed into this function is a pointer to an `otc_stream` struct for the stream. Call the `otc_stream_get_id()` method, passing in the `otc_stream` struct, to get the stream ID.
