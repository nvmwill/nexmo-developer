---
title: SIP interconnect
description: You can use the OpenTok REST API to connect your SIP platform to OpenTok sessions. 
product: video
navigation_weight: 8
---


You can use the OpenTok REST API to connect your SIP platform to OpenTok sessions. This lets you add audio (and, optionally, video) from a SIP call as a stream in the OpenTok session. The audio from other streams in the OpenTok session are mixed together and sent to your SIP endpoint. If you include video in the SIP call, the video from the other participant's streams (up to 9) are arranged in a grid layout and sent as as a single video stream to your SIP endpoint.

The SIP interconnect feature is only supported in routed sessions (sessions that use the [Media Router](/video/guides/create-session#the-media-router-and-media-modes)).


## Intro to SIP

OpenTok SIP Interconnect enables interoperability between WebRTC endpoints and existing telephony systems so that users can make in-context SIP-based calls, while simultaneously browsing the website or mobile application.

![SIP Diagram](/images/video/sip.svg)


## Target Use-cases
Contact center use-case

- Enterprise customers, as part of their omni-channel strategy for communications, are looking at WebRTC so end-users can:

    - Use browsers or mobile applications to connect with contact centers, rather than only using phones, in order to provide a more ubiquitous and contextual experience

    - Use video/collaboration in addition to audio to improve efficiency and increase customer satisfaction and retention

PSTN Fallback

- There are cases when connectivity using the regular SDK clients is not possible:

    - If one of the participants has a browser that does not support WebRTC or
    - If the firewall is too restrictive

- If connectivity over IP/Vonage fails because of the reasons mentioned above, customers will need a fallback mechanism. SIP Interconnect enables customers to make a regular phone call in an session. Customers must set up a SIP-PSTN gateway for this purpose.


## Initiating a SIP call
To start the SIP call, use the REST API. Make an HTTPS POST request to the following URL:

`https://api.opentok.com/v2/project/:app-id/dial`

Replace `:app-id` with your  APP ID.

Set the `Content-Type` header to `application/json`. Set a custom `X-VONAGE-AUTH` header to a JSON Web token that is valid for use with the REST API calls.

Set the body of the request to JSON data of the following format:

```json
{
  "sessionId": "session ID",
  "token": "A valid token",
  "sip": {
    "uri": "sip:user@sip.partner.com;transport=tls",
    "from": "from@example.com",
    "headers": {
      "headerKey": "headerValue"
    },
    "auth": {
      "username": "username",
      "password": "password"
    },
    "secure": true|false,
    "video": true|false,
    "observeForceMute": true|false
  }
}
```

The JSON object includes the following properties:

- `sessionId​` (required) — The session ID for the SIP call to join.

- `token​` (required) — The token to be used for the participant being called. You can add token data to identify that the participant is a SIP endpoint or for other identifying data, such as phone numbers. (The client libraries include properties for inspecting the connection data for a client connected to a session.) See the [Token Creation](/video/guides/create-token) developer guide.

- SIP `uri` ​(required): The SIP URI to be used as destination of the SIP call initiated from Vonage to your SIP platform.

If the SIP `uri` contains a `transport=tls` header, the negotiation between Vonage and the SIP endpoint will be done securely. Note that this will only apply to the negotiation itself, and not to the transmission of audio. If you also desire media transmission of audio (and video, if included) to be encrypted, set the `secure` property to `true`.

This is an example of secure call negotiation:

```
"sip:user@sip.partner.com;transport=tls"
```

This is an example of insecure call negotiation:

```
"sip:user@sip.partner.com"
```

- SIP `from` ​(optional): The number or string that will be sent to the final SIP number as the caller. It must be a string in the form of `from@example.com`, where `from` can be a string or a number. If `from` is set to a number (for example,`"14155550101@example.com"`), it will show up as the incoming number on PSTN phones. If `from` is undefined or set to a string (for example,`"joe@example.com"`), +00000000 will show up as the incoming number on PSTN phones.

- SIP `headers​` (optional) — This object defines custom headers to be added to the SIP INVITE request initiated from OpenTok to your SIP platform.

- SIP `auth` (optional) — This object contains the username and password to be used in the the SIP INVITE request for HTTP digest authentication, if it is required by your SIP platform.

- `secure` (optional) — A Boolean flag that indicates whether the media must be transmitted encrypted (true) or not (false, the default).

A successful call results in a HTTP 200 response, with the connection ID and stream ID included in the JSON response data:

```json
{
  "id": "b0a5a8c7-dc38-459f-a48d-a7f2008da853",
  "connectionId": "e9f8c166-6c67-440d-994a-04fb6dfed007",
  "streamId": "482bce73-f882-40fd-8ca5-cb74ff416036",
}
```

- `video` (optional) — A Boolean flag that indicates whether the SIP call will include video (`true`) or not (`false`, the default). With video included, the SIP client's video is included in the OpenTok stream that is sent to the OpenTok session. The SIP client will receive a dynamic composed video stream of the published streams in the OpenTok session.

- `observeForceMute` (optional) — A boolean flag that indicates whether the SIP end point observes `force mute moderation` (`true`) or not (`false`, the default). Also, with `observeForceMute` set to `true`, the caller can press "*6" to unmute and mute the published audio. For the "*6" mute toggle to work, the SIP caller MUST negotiate RFC2833 DTMFs (RFC2833/RFC4733 digits). The mute toggle is not supported with SIP INFO or in-band DTMFs. A message (in English) is played to the caller when the caller mutes and unmutes, or when the SIP client is muted through a force mute action.

The JSON object includes the following properties:

- `id` — A unique ID for the SIP call.

- `connectionId` — The connection ID for the SIP call's connection in the session. You can use this connection ID to terminate the SIP call, using the OpenTok REST API. See the next section.

`streamId` — The stream ID for the SIP call's stream in the session.

The SIP gateway sends a standard SIP `INVITE` to the address you provide in the REST call. When your SIP endpoint connects, it is added as a new Connection to the session, and its audio (and video, if included) is added to a new stream in the session. The new connection is added immediately to the OpenTok session without waiting for the SIP endpoint to receive or accept the call. In clients connected to the session, the client SDK dispatches events indication the new connection and stream (just as it would for other connections and streams). Clients can subscribe to the stream, just as they would subscribe to any other stream in the session.