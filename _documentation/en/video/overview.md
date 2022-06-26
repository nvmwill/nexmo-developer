---
title: Overview
meta_title: Learn how to build on the Vonage Video platform.
description: The Vonage Video platform makes it easy to embed high-quality interactive video, voice, messaging, and screen sharing into web and mobile apps.
---

# Video Platform

The Vonage Video platform makes it possible to embed real-time, high-quality interactive video, messaging, screen-sharing, and more into your web and mobile apps.

The platform includes a client library for your web frontend and server-side SDKs to generate and manage the needed credentials.
The Vonage video platform uses WebRTC for audio-video communications.

### Getting Started

Integrating the video functionality into your web app involves a two part integration:

- **Client-side implementation:** In order to create a video stream, you need the [Javascript SDK](/video/resources#client-sdk) to connect the user's browser to the Vonage platform. There is a [step by step tutorial](/video/tutorials/create-video-conferencing-appy) that walks you through the integration process.

- **Server-side implementation:** To create a secure connection between the client side and the Vonage platform, the server side handles the credentials generation using the [server-side SDK](/video/resources#server-sdk).These credentials include the [session ID](/video/overview#session) and [token](/video/overview#token).
Follow the [server side tutorial](/video/tutorials/server-side-setup) to learn how to do this.

### Concepts And Terms

#### Session

You can think of a session as a **"room"** where clients can interact with one another in real-time. Each "room" is identified by a unique session ID that is generated using the [server-side SDKs](/video/resources#server-sdk).

In order to initialize and join a session, clients need the session ID and the unique authentication [token](/video/overview#token) from the server.

#### Token

A token is similar to a session ID, in that it's also needed in other to join a video session, however, tokens expire after a set period (specified by the server). A token is generated for each client connection, which also determines the client's permissions. A client can, for example, have the role of a publisher, subscriber, moderator, or a combination of any or all three.

#### Stream

A stream is a single audio-video signal, which includes a user's published camera and microphone feed. During a session each client publishes their stream whiles subscribing to the stream of others.

#### Subscribe

Once a client is connected to a session, it can subscribe to any audio-video streams published by other clients in the session.

#### Publish

Once a client is connected to a session, it can publish an audio-video stream to the session using the device’s webcam and microphone. The client’s token role (publisher, subscriber, moderator) determines whether that client can publish to the session.

#### Events

Once a client establishes a connection to a session, it is able to listen for events dispatched by the session. Events are dispatched for a variety of reasons, such as a new stream being created or a new client connecting or disconnecting from the session. If you want a client to react to a certain event, you must set up an event listener.
