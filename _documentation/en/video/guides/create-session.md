---
title: Create a session
meta_title: Create a video session. You specify how clients in the session send audio-video streams when you create a session.
description: The Vonage Video API platform allows you to create video sessions. You specify how clients in the session send audio-video streams when you create create it.
product: video
navigation_weight: 3
---

# Create a session

To connect to a session, you specify the session you want to connect to by using a session ID.

Each session ID identifies a unique session. You can think of a session as a room in which participants meet and chat.


The number of sessions you create and how clients connect to them depend on the requirements of your app.

If your app connects users with one another for a one-time meeting, create a unique session for that meeting.

However, if your app connects users over various days in the same "room," then you can create one session and reuse it. If one group of users meet with each other, while other groups meet independently, create unique sessions for each group.

Sessions do not expire. However, authentication tokens do expire. Also note that sessions cannot explicitly be destroyed.

When you create a session, you can specify the following options, which are described in the sections that follow:

* The media mode (whether or not to use the Media Router).
* The archiving preference (whether to automatically archive the session).
* A location hint (to specify the geolocation of the session).

## The Media Router and media modes

When you create a session, you specify how clients in the session will send audio-video streams, known as the media mode. There are two options:

* **Relayed** — In a relayed session, clients will attempt to send audio-video streams directly between each other (peer-to-peer). However, if clients cannot connect due to firewall restrictions, the session uses the TURN server to relay audio-video streams. (Prior to version 2.2, the server SDKs referred to these sessions as peer-to-peer sessions. However, even when using those SDKs, sessions will still use the TURN server to relay streams if firewall restrictions block peer-to-peer streaming.)

* **Routed** — The session uses the Media Router to route audio-video streams between clients. The Media Router provides the following benefits:
The Media Router can decrease bandwidth usage in multiparty sessions. (When the media mode property is set to relayed, each client publishing a stream must send it separately to each client subscribing to it. With the Media Router, a publisher sends one stream once to the router and it forwards it to each subscribing client.)

  * The Media Router can improve the quality of the user experience through audio fallback and video recovery. With these features, if a client's connectivity degrades to a degree that it does not support video for a stream it's subscribing to, the video is dropped on that client (without affecting other clients), and the client receives audio only. If the client's connectivity improves, the video returns.

  * The Media Router supports the archiving feature, which lets you record, save, and retrieve sessions.

  * In sessions that use the Media Router, lowering the frame rate for a published video proportionally reduces the bandwidth the stream uses.

  * The Media Router supports the scalable video feature. Scalable video can greatly improve the quality of video in multi-party sessions.

<!-- OPT-TODO: * In clients using the iOS and Android SDKs, relayed sessions support only two clients connected to the session. The Media Router supports additional clients for multiparty sessions on mobile devices. -->

  * The Media Router supports the SIP interconnect feature, which lets you connect sessions to SIP gateways.

<!-- OPT-TODO-REMOVE? > **Note:** In version 2.2 of the server SDKs, the default media mode is relayed. In earlier versions, the default was to use Media Router. -->

## Archive mode

When you create a session, you can set the archive mode so that the session is archived automatically.

This only applies to routed sessions (sessions that use the Media Router).

By default, sessions are not automatically archived.

## Location hints

When you create a session, you can set the IP address that the Vonage video platform will use to situate the session in its global network.

If no location hint is set when you create the session (which is recommended), the session uses a media server based on the location of the first client connecting to the session.

Set location hint in only if you know the general geographic region (and a representative IP address) and you think the first client connecting may not be in that region.

Specify an IP address that is representative of the geographical location for the session.

## Best practices when creating sessions

### Session ID reuse

When possible, do not reuse session IDs between different video chat conversations.

Instead, generate new session IDs for each distinct video chat on your application.


This is important, especially when using the [Session inspector](/video/developer-tools/inspector).

In Inspector, session quality scores and data are indexed by session ID.

A session ID that is reused for multiple conversations is more difficult to debug using Inspector, and sessions with re-used session IDs tend to report lower aggregate quality scores than the actual experienced call quality.

### Choosing Relayed vs. Routed session type

Use a relayed instead of a routed session, if you have only two participants (or maybe even three) and you are not using archiving.

Using relayed sessions reduces the latency between participants, reduces the points of failure and you can get better quality video and audio in most cases.

Routed sessions are required if you want to archive your session.

They are recommended if you have more than two or three participants in the session.

For more information, see The Media Router and media modes.

## Creating sessions

While working on a test version of your app, you can obtain a test session ID from the Project Page of your Vonage Account.


Learn how to create a session by following our [step-by-step tutorial](/video/tutorials/create-session/introduction).

You can also use one of the [server-side SDKs](/video/server-sdks/overview).

If you need to dynamically generate multiple session IDs, use the [server-side SDKs](/video/server-sdks/overview) not the Project Page.


Use the session ID with a [client SDK](/video/client-sdks/overview) to connect to a video session.

You will also need to [generate a token](/video/tutorials/create-token) for each user connecting to the session. 

<!-- OPT-TODO: See Connection Token Creation for information on the `generateToken()` or `generate_Token()` (depending on programming language) method. -->

The [Media Router](https://www.vonage.com/communications-apis/video/features/) provides the following benefits:

* The Media Router can decrease bandwidth usage in multiparty sessions. (When the mediaMode property is set to MediaMode.RELAYED, each client must send a separate audio-video stream to each client subscribing to it.)
* The Media Router can improve the quality of the user experience through [audio fallback and video recovery](https://www.vonage.com/communications-apis/video/features/). With these features, if a client's connectivity degrades to a degree that it does not support video for a stream it's subscribing to, the video is dropped on that client (without affecting other clients), and the client receives audio only. If the client's connectivity improves, the video returns.
* The Media Router supports the [recording feature](https://www.vonage.com/communications-apis/video/features/), which lets you record, save, and retrieve sessions.

## Creating a relayed session

In a relayed session, clients will attempt to send streams directly between each other.

However, if clients cannot connect due to firewall restrictions, the session uses the TURN server to relay audio-video streams.

> **Important:** Some features, such as archiving, are only available in routed (not relayed) sessions.

Follow our [step-by-step](/video/tutorials/create-session/video/create-a-session/node/create-relayed-session/node) tutorials to learn how to generate relayed sessions

## Creating an automatically recorded session

You can create a session that is automatically recorded.

> Note: Archived sessions must use the routed media mode.

For more information, see the [archiving](/video/guides/archiving/overview) guide.
There is also a tutorial on how to setup an [automatically recorded session]()

## Using sessions in client applications

Use the session ID in the [client SDK](/video/client-sdks/overview) to connect to a session.

You will also need to [generate a token](/video/tutorials/create-token) for each user connecting to the session.
