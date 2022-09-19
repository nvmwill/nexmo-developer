--- 
title: Detecting when clients have connected and disconnected 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your Linux application.
product: video 
---

## Detecting when other clients have connected and disconnected

Once you have connected to a session, the `on_connection_created` callback function of the `otc_session_callbacks` struct is called when a new client (other than your own) connects to the session. The `connection` parameter of that function is a pointer to an instance of an `otc_connection` struct corresponding to the client connecting to the session.

The `on_connection_dropped` callback function of the `otc_session_callbacks` struct is called when a client (other than your own) disconnects from the session. The `connection` parameter of that function is a pointer to the `otc_connection` struct corresponding to the client disconnecting from the session.
