---
title: Create a token
description: Use the our server libraries to learn how to create a token. Tokens allow participants to use audio, video, and messaging functionality in your application.
product: video
navigation_weight: 2 
---

# Token Creation Overview

In order to authenticate a user connecting to a session, the user's page must pass a token along with the App ID. You generate a token for each user connecting to a session. For more information on connecting, see the documentation on [joining a session](/video/tutorials/create-session).

## Roles

Each token is assigned a _role_, which determines the capabilities of the client that connects with that token. There are three roles:

* **Subscriber** — Clients that connect with a subscriber token can connect to sessions and subscribe to other clients' streams. They cannot publish their own streams to a session.
* **Publisher** — Clients that connect with a publisher token can connect to sessions, publish audio-video streams to the session, and subscribe to other clients' streams.
* **Moderator** — In addition to publishing and subscribing to streams, moderators connected in a client using the [Web SDK ](/video/client-sdks/web) can force other clients to disconnect from a session or to stop publishing audio-video streams. (Any client can be forced to disconnect or stop publishing, but only a moderator using the Web SDK can perform these moderation functions.) Additionally, moderators connected can force one or more streams in the session to mute published audio.

## Expiration dates

Tokens expire after a set period of time (up to 30 days). You can specify the expiration period when you generate the token.

## Connection data

For each token, you can add a string containing metadata describing the client. For example, you can pass the user ID, name, or other data describing the client. You may obtain this data from a server-side database or from data provided to you by the client, depending on your application. The length of the string is limited to 1000 characters. This data cannot be updated once it is set.

**Do not use personal information in token data** — token metadata is passed to all users in the session and is also readable through the Vonage video client logs, so you should never use unencrypted sensitive or personal information in the token data.

<!--OPT-TODO See [security best practices](/developer/guides/security/#best-practices). -->

The Vonage Video client SDKs include properties for inspecting the connection data for a client connected to a session.

## Best practices when generating tokens

Tokens are cheap to generate. They are generated with a hashing function and your secret. There is no API call to our servers used when generating a token. We recommend:

* Generating a new token for every user at the time they try to connect. Tokens have an expiration time, which by default is 24 hours after the token is created. After the expiration time, you cannot use the token to connect to the session.
* Not storing tokens or trying to reuse them.
* Using connection data to identify users. Connection data is a secure way to store information about your users (such as a user ID, which can help you identify your users in your application).

## Generating tokens

While working on a test version of your app, you can obtain a test token on from the application page of your [Vonage account](https://ui.idp.vonage.com/ui/auth/login). However, in a final production version of an app, you will want to use one of the Vonage Video [server-side SDKs](/video/server-sdks/overview), not the application page, to generate tokens.