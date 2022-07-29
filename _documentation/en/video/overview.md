---
title: Overview
meta_title: Makes it easy to embed real-time, high-quality interactive video, messaging, screen-sharing, and more into web and mobile apps.
description: The Vonage Video API platform makes it easy to embed real-time, high-quality interactive video, messaging, screen-sharing, and more into web and mobile apps.
product: video
navigation_weight: 1
---

# Video API Platform Overview

The Vonage Video API platform makes it possible to embed real-time, high-quality interactive video, messaging, screen-sharing, and more into web and mobile apps. The platform includes client libraries for web as well as server-side SDKs. Vonage Video API uses [WebRTC](https://www.vonage.com/communications-apis/video/) for audio-video communications.

<!-- OPT-TODO: and a REST API -->

**All applications built with the Vonage Video API platform require two primary components:**

* **The Client** — client-side code that runs in a browser or mobile app, set up by the developer using the Vonage Video API client-side libraries, which are available for Web. The client-side handles the majority of Vonage Video API functionality.
* **The Server** — server-side code executed on a web server set up by the developer using the Vonage Video API server SDKs, which are available for [Node JS](http://localhost:3000/video/server-sdks/node) and [PHP](http://localhost:3000/video/server-sdks/php). 

## Contents

* [Functions of the client and server](#functions-of-the-client-and-server)
* [Sessions](#sessions)
* [Connecting, publishing, and subscribing](#connecting-publishing-and-subscribing)
* [Building a Vonage Video API application](#building-a-vonage-video-api-application)
* [Key terms](#key-terms)
* [Vonage API Developer Portal resources](#vonage-api-developer-portal-resources)

## Functions of the client and server
<table>
   <tr>
      <td style="vertical-align:middle;margin:revert">
         <p><strong>Client:</strong></p>
         <ul>
            <li>Utilizes <a href="#client-sdk">client SDKs</a></li>
            <li>Gets <a href="#session">session ID</a> and <a href="#token">token</a> from the <a href="#server">server</a></li>
            <li><a href="#connection">Connects</a> to the session using token</li>
            <li><a href="#publish">Publishes</a> audio-video <a href="#stream">streams</a></li>
            <li><a href="#subscribe">Subscribes</a> to audio-video streams</li>
            <li>Listens for session <a href="#events">events</a></li>
         </ul>
         <br>
         <p><strong>App Server:</strong></p>
         <ul>
            <li>Utilizes <a href="#server-sdk">server SDKs</a></li>
            <li>Creates sessions in the <a href="#vonage-video-api-cloud">Vonage Video API cloud</a></li>
            <li>Generates tokens for <a href="#client">clients</a></li>
            <li>Sends session IDs and tokens to clients</li>
         </ul>
         <br>
         <p><strong>Session:</strong></p>
         <ul>
            <li>&quot;Chat room&quot; in Vonage Video API cloud</li>
            <li>Connects clients to one another</li>
            <li>Sends events to clients</li>
         </ul>
      </td>
      <td>
         <img src="/images/video/opentok-components.png" alt="Vonage video API default layout 1" style="width:100%;">
      </td>
   </tr>
</table>

## Sessions

Every Vonage Video API video chat occurs within a **session**. You can think of a session as a "room" where clients can interact with one another in real-time. Sessions are hosted on the [Vonage Video API cloud](#vonage-video-api-cloud) and manage user [connections](#connection), audio-video [streams](#stream), and user [events](#events) (such as a new user joining). Each session is associated with a unique **session ID**. To allow multiple clients to chat with one another, you would have them connect to the same session (using the same session ID).

The [app server](#server) (which executes the server-side code) is responsible for creating new sessions and generating unique authentication [tokens](#token) for each new client. The client then uses that token to establish a connection to the session. Clients connected to a session can [publish](#publish) streams to the session and [subscribe](#subscribe) to other clients’ streams.

### Debugging Sessions with Inspector

If you want to view information about a specific session, you can use [Inspector](https://tokbox.com/developer/tools/inspector). This tool provides a complete breakdown of the session, including users, quality, events, errors, and more. This is useful for debugging and getting a better understanding of what's happening in your app's sessions.

## Connecting, publishing, and subscribing

This section provides a visual breakdown of the steps required for two clients to initiate a video chat session.

### Step 1: The session is created by your app server

Your [app server](#server), using code from an [Vonage Video API server SDK](#server-sdk), creates a session in the cloud via the [Vonage Video REST API](#vonage-video-rest-api) and receives the session ID. Think of the session as a "room" where the video chat will occur. At this point it is unoccupied.

<video class="infographic" src="/videos/video-api/step1.webm" type="video/x-webm" style="width:50%;" autoplay loop muted></video>

### Step 2: A client loads the app and server creates a token

When a user loads your client-side application, built with an [Vonage Video API Client SDK](#client-sdk), the client (a web page or mobile app) gets session info from the server. This includes a unique authentication [token](#token) (the client’s "key") created by your app server.

<video class="infographic" src="/videos/video-api/step2.webm" type="video/x-webm" style="width:50%;" autoplay loop muted></video>

### Step 3: The client connects and begins streaming to the session

The client uses the session ID and token to establish a [connection](#connection) with the session. The client can then [publish](#publish) an audio-video [stream](#stream) to the session and listen for important [events](#events) (such as a new user joining the session). At this point, the client is the only participant in the session.

<video class="infographic" src="/videos/video-api/step3.webm" type="video/x-webm" style="width:50%;" autoplay loop muted></video>

### Step 4: A new client connects to the session

When a new user loads the client-side application in a separate web page or mobile device (Client 2), the new client receives the session ID and a unique token from your app server. The client uses that info to establish a connection to the session.

<video class="infographic" src="/videos/video-api/step4.webm" type="video/x-webm" style="width:50%;" autoplay loop muted></video>

### Step 5: The clients subscribe to each other’s streams

Now that it’s connected to the session, Client 2 can subscribe to Client 1’s stream. Client 2 then publishes its own video stream to the session, and Client 1 subscribes to it. Both clients are now subscribed to each other's stream in a one-to-one video chat, and both are "listening" for new events (such as a new user connecting the session.)

<video class="infographic" src="/videos/video-api/step5-2.webm" type="video/x-webm" style="width:50%;" autoplay loop muted></video>

Vonage Video API supports one-to-one communication and group communication. Multiple clients can connect to a session and each connected clients can subscribe to each stream in the session. In addition to the basic functionality above, the Vonage Video API platform provides the ability to save [recordings](/video/guides/archiving/overview) of sessions.

## Building a Vonage Video API application

After reviewing the materials above, you should have a basic understanding of how the Vonage Video API works. If you're ready to start building your first application, check out the [Basic Client Tutorial for web](/video/tutorials/create-video-conferencing-app).

You can also find a list of key terms and definitions below, along with a listing of other [Vonage API Developer Portal resources](#vonage-api-developer-portal-resources).

## Key terms

### Session

You can think of a session as a "room" where [clients](#client) can interact with one another in real-time — associated with a unique session ID. New sessions are generated by your [app server](#server) via the [server SDKs](#server-sdk). Clients can obtain the session ID and a unique authentication [token](#token) from the server to initialize and connect to the session, after which they can [publish](#publish) streams and [subscribe](#subscribe) to streams in the session, as well as listen for [events](#events) dispatched by the session (such as a new user connecting).

Check out our developer guides to learn how to create a session with the server SDKs, join a session with the [client SDKs](#client-sdk), and explore more session-related functionality.

### Token

A token is a unique authentication "key" that allows a [client](#client) to join a [session](#session). When a client attempts to join a session, your app server generates a unique token and sends it to the client along with the session ID. Tokens have expiration dates (specified by the server), whereas sessions never expire. Tokens can also be assigned roles — [publisher](#publish), [subscriber](#subscribe), or moderator, which determine the permissions of the client, such as publishing [streams](#stream) and subscribing to streams in the session.

Check out our developer guides to learn how to create a token with the server SDKs and join a session with the client SDKs. When building a demo or proof of concept, you can generate tokens in your [Vonage Account](https://identity.nexmo.com/login?icid=nexmocustomer_api-developer-adp_nexmodashbdsigin_nav) by creating a project, browsing to the Project Overview, and scrolling down to project tools, but a server component must be set up before going to production.

### Client

A client is any browser or mobile app utilizing client-side code from the [Vonage Video API client SDKs](#client-sdk). The client is one of two key components that make up an Vonage Video API application (the other being the server), and is responsible for most Vonage Video API functionality, such as connecting to a session, [publishing](#publish) and [subscribing](#subscribe) to [streams](#stream), listening for session [events](#events), and dispatching events to the session.

Before it can interact with a session, the client must receive the session ID and [token](#token) generated by your app server. Check out our [Basic Client Tutorial](/video/tutorials/create-video-conferencing-app) to learn how to implement client-side functionality, as well as our [developer guides](/video/guides/create-session) for more information.

### Server

The app server, set up by the app developer using the Vonage Video API server SDKs, generates new sessions and tokens, which it then sends to the client. All Vonage Video API applications require both a client and server component. Check out our developer guides to learn how to create a session and create a token with the server SDKs, as well as other functionality handled by the server.

### Connection

A client interacts with the session via a persistent event (or signaling) connection, which uses WebSockets to constantly listen for new events dispatched by the session. This connection is different from the WebRTC media connection(s) established when clients publish and subscribe to streams in the session.

In order to establish a connection to a session, the client must receive a session ID and token from your app server, which are then used for authentication. Each client usually opens a single connection to a given session, and each client connection to the session is associated with a unique connection ID. Check out our developer guides to learn how to connect to a session with the client SDKs.

### Stream

A stream is a single audio-video signal, which includes a user's published camera and microphone feed. During a session, clients publish streams to the session and subscribe to other clients’ streams. When a new stream is created, an event is dispatched by both the Publisher object and Session object.

### Publish

Once a client is connected to a session, it can publish an audio-video stream to the session using the device’s webcam and microphone. The client’s token role (publisher, subscriber, moderator) determines whether that client can publish to the session. This allows for sessions with only one or two publishers but many subscribers (one-to-many). Check out our developer guides to learn how to publish a stream to a session with the client SDKs.

### Subscribe

Once a client is connected to a session, it can subscribe to any audio-video streams published by other clients in the session. Check out our developer guides to learn how to subscribe to streams in a session with the client SDKs.

### Events

Once a client establishes a connection to a session, it is able to listen for events dispatched by the session. Events are dispatched for a variety of reasons, such as a new stream being created or a new client connecting or disconnecting from the session. If you want a client to react to a certain event, you must set up an event listener.

### Client SDK

The client SDKs are a set of code libraries available for web (JavaScript) used to set up the client. The client-side code handles the majority of Vonage Video API functionality, including publishing and subscribing to streams in the session and listening for session events.

### Server SDK

The server SDKs are a set of wrappers for the Vonage Video REST API available for Node and PHP. This code is set up on your app server and is used to generate new sessions and tokens for the client.

<!-- ### Vonage Video REST API

The Vonage Video REST API is an HTTP interface with the Vonage Video API Cloud used to create sessions and handle advanced features such as recording. The Vonage Video API server SDKs implement many of the methods of the REST API. -->

### Vonage Video API Cloud

 Manages sessions, client connections, API calls, signaling, events, and everything else that’s not handled by the client SDKs or server SDKs.

<!-- ## Vonage API Developer Portal resources

There are a number of resources on the Vonage API Developer Portal that provide everything you'll need to successfully build and maintain an Vonage Video API application. -->