---
title: SIP interconnect
description: You can use the REST API to connect your SIP platform to sessions. 
product: video
navigation_weight: 8
---


You can use the REST API to connect your SIP platform to sessions. This lets you add audio (and, optionally, video) from a SIP call as a stream in the session. The audio from other streams in the session are mixed together and sent to your SIP endpoint. If you include video in the SIP call, the video from the other participant's streams (up to 9) are arranged in a grid layout and sent as as a single video stream to your SIP endpoint.

The SIP interconnect feature is only supported in routed sessions (sessions that use the [Media Router](/video/guides/create-session#the-media-router-and-media-modes)).


## Intro to SIP

Vonage SIP Interconnect enables interoperability between WebRTC endpoints and existing telephony systems so that users can make in-context SIP-based calls, while simultaneously browsing the website or mobile application.

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

- SIP `headers​` (optional) — This object defines custom headers to be added to the SIP INVITE request initiated from Vonage to your SIP platform.

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

- `video` (optional) — A Boolean flag that indicates whether the SIP call will include video (`true`) or not (`false`, the default). With video included, the SIP client's video is included in the Vonage stream that is sent to the session. The SIP client will receive a dynamic composed video stream of the published streams in the session.

- `observeForceMute` (optional) — A boolean flag that indicates whether the SIP end point observes `force mute moderation` (`true`) or not (`false`, the default). Also, with `observeForceMute` set to `true`, the caller can press "*6" to unmute and mute the published audio. For the "*6" mute toggle to work, the SIP caller MUST negotiate RFC2833 DTMFs (RFC2833/RFC4733 digits). The mute toggle is not supported with SIP INFO or in-band DTMFs. A message (in English) is played to the caller when the caller mutes and unmutes, or when the SIP client is muted through a force mute action.

The JSON object includes the following properties:

- `id` — A unique ID for the SIP call.

- `connectionId` — The connection ID for the SIP call's connection in the session. You can use this connection ID to terminate the SIP call, using the REST API. See [the next section](#terminating-a-sip-call).

`streamId` — The stream ID for the SIP call's stream in the session.

The SIP gateway sends a standard SIP `INVITE` to the address you provide in the REST call. When your SIP endpoint connects, it is added as a new Connection to the session, and its audio (and video, if included) is added to a new stream in the session. The new connection is added immediately to the session without waiting for the SIP endpoint to receive or accept the call. In clients connected to the session, the client SDK dispatches events indication the new connection and stream (same as it would for other connections and streams). Clients can subscribe to the stream, same as they would subscribe to any other stream in the session.

## Terminating a SIP call

<!-- OPT-TODO: disconnect a client  -->

The call ends when your SIP server sends a BYE message (to terminate the call). You can also end a call using the REST API method to [disconnect a client](/api/video) from a session. Use the connection ID of the SIP call when calling this method. (The REST method for [initiating the SIP](#initiating-a-sip-call) call returns the connection ID as part of the response data.)

When the SIP call ends, the connection and stream for the SIP call also ends. In each client connected to the session, the client-side SDK dispatches events indicating the connection and stream ended (same as it would when other clients disconnect from the session).

The Vonage SIP gateway automatically ends a call after 5 minutes of inactivity (5 minutes without media received). Also, as a security measure, the Vonage SIP gateway closes any SIP call that lasts longer than 6 hours.

## Sending DTMF signals

<!-- OPT-TODO: Sending DTMF digits to SIP clients -->

You can send DTMF (Dual-tone multi-frequency) signals to SIP endpoints using the REST API. See [Sending DTMF digits to SIP clients](/api/video).

Telephony events are negotiated over SDP and transmitted as RFC4733/RFC2833 digits to the remote endpoint.

## Monitoring call progress

Register to receive real-time event callbacks for your SIP call on your app server.

Developers can use the Vonage REST API to connect their SIP platform to sessions. This lets you add audio (and video, if included) from a SIP call as a stream in the session. 

With SIP call monitoring, developers can monitor the progress of the SIP call, from within their app server. By registering for callbacks, your callback URL will receive HTTP POST requests with information about the progress of the SIP call.


## Registering callbacks

SIP call events information can be registered to HTTP endpoints within your server. Whenever registered activity occurs, an HTTP request is issued from the Vonage infrastructure to your endpoint.

To register a callback URL:

1. Visit your [Vonage Video API account](https://tokbox.com/account) page.

2. Select the project for which you want to register a callback.

3. Set the callback URL in the SIP Monitoring section.


## Monitoring SIP call activity

Once properly registered, the infrastructure sends HTTP requests for all SIP calls for a specific project. This is useful for tracking progress of SIP calls and taking action if an error occurs. You should expect:

- At least one `callCreated` event per call

- At least one `callDestroyed` event per call

- An undefined number of `callUpdated` events per call

- An undefined number of `muteForced` events per call


## Call Created

Your endpoint will receive the following JSON for each SIP call created:

```json
{
  "sessionId":  "2_MX4xMzExMjU3MX5-MTQ3MDI1NzY3OTkxOH45QXRr",
  "projectId":  "123456", 
  "event":  "callCreated",
  "timestamp":  1470257688309,
  "call": {
    "id":  "<conference-id>",
    "connectionId":  "<sip-ot-connection-id>",
    "createdAt":  1470257688143
  }
}
```

See [JSON properties](#json-property) below for descriptions.

## Call Updated

Your endpoint will receive the following JSON when the state of each SIP call updates:

```json
{
  "sessionId":  "2_MX4xMzExMjU3MX5-MTQ3MDI1NzY3OTkxOH45QXRr",
  "projectId":  "123456",
  "event":  "callUpdated",
  "state":  "HANGUP",
  "timestamp":  1470257688309,
  "call": {
     "id":  "<conference-id>",
     "connectionId":  "<sip-ot-connection-id>",
     "createdAt":  1470257688143
  }
}
```

See [JSON properties](#json-property) below for descriptions.

## Call Destroyed

Your endpoint will receive the following JSON when each SIP call ends:

```json
{
  "sessionId":  "2_MX4xMzExMjU3MX5-MTQ3MDI1NzY3OTkxOH45QXRr",
  "projectId":  "123456",
  "event":  "callDestroyed",
  "reason_code":  "400",
  "reason_message":  "Bad Request",
  "timestamp":  1470257688309,
  "call": {
    "id":  "<conference-id>",
    "connectionId":  "<sip-ot-connection-id>",
    "createdAt":  1470257688143
  }
}
```

See [JSON properties](#json-property) below for descriptions.


## Mute Forced

Your endpoint will receive the following JSON when a SIP call is muted due to a force mute moderation event:

```json
{
  "sessionId":  "2_MX4xMzExMjU3MX5-MTQ3MDI1NzY3OTkxOH45QXRr",
  "projectId":  "123456",
  "event":  "muteForced",
  "timestamp":  1470257688309,
  "call": {
    "id":  "<conference-id>",
    "connectionId":  "<sip-ot-connection-id>",
    "createdAt":  1470257688143
  }
```

See [JSON properties](#json-property) below for descriptions.

Note that you must set the `observeForceMute` option (to `true`) when creating the SIP connection to have it observe a force mute moderation event.

<a id="json-property"></a>
## JSON properties of SIP monitoring events

The JSON object includes the following properties:

* `sessionId` -- The session ID associated with this event
    
* `projectId` -- The project ID associated with this event
    
* `event` -- callCreated | callUpdated | callDestroyed | muteForced
    
* `reason_code` -- For a `callDestroyed` event, `reason_code` is set to one of the following:
    
    * A [standard SIP response code](https://en.wikipedia.org/wiki/List_of_SIP_response_codes) to capture errors in the SIP handshake
        
    * 700 -- "Normal Clearing" -- This cause indicates that the call is being cleared because one of the users involved in the call has requested that the call be cleared.
        
    * 703 -- "Unexpected Clearing" -- This cause indicates that call is being cleared unexpectedly.
        
    * 704 -- "Media Timeout" -- This code indicates that our SIP bridge was not able to receive any RTP traffic from the other SIP endpoint.
        
    * 705 -- "Max Duration" -- The call reached the maximum duration.
        
    * 706 -- "Max Inactive" -- The call reached the maximum inactive duration.
        
* `reason_message` -- For a `callDestroyed` event, `reason_message` is a string describing the reason the call was destroyed.
    
* `state` -- For a `callUpdated` event, `state` is set to one of the following:
    
    * `DIALING` -- SIP call has been initiated
        
    * `RINGING` -- SIP call is currently ringing
        
    * `ON_HOLD` -- SIP call is on hold
        
    * `ACTIVE` -- A SIP call was answered and is currently in progress
        
    * `HANGUP` -- A SIP call completed
        
* `timestamp` -- The timestamp of the event, in milliseconds since the Unix epoch
    
* `call` -- An object defining the connection, containing the following properties:
    
    * `id` —- The conference ID
        
    * `connectionId` —- The connection ID of the SIP client
        
    * `createdAt` —- The timestamp value, in milliseconds since the Unix epoch, for when the call was created
        
## Security considerations

There are some best practices recommended by Vonage when using the SIP Interface with your SIP Servers. They try to mitigate the possible attacks by providing the mechanisms to authenticate and authorize that the SIP calls received in your server are legitimate and to encrypt all the signaling and media:

* Use TLS and enable secure calls (SRTP) for signaling to avoid the possibility of intercepting the communications.
    
* Enable SIP authentication on your server. Otherwise, anyone who knows your SIP URI could send calls to your server.
    

[Contact us](https://video-api.support.vonage.com/hc/en-us/requests/new) if you have additional questions.

Technical details
-----------------

**RFC3550 (RTP/RTCP) support:** Media traffic can be encrypted (SRTP) or non-­encrypted (plain RTP). In case of encryption, both DTLS and SDES protocols are supported.

**Codec support:** The Vonage SIP gateway supports the OPUS, G.711, and G.722 audio codecs; and the H.264 and VP8 video codecs.

**Signaling:** The Vonage SIP gateway supports RFC 3261 (SIP) over UDP, TCP, and TLS. Contact Vonage if you need information or support for any specific extension.

The Vonage SIP gateway will not accept any SIP message coming from the a third-party SIP platform unless it is part of a SIP dialog initiated by the Vonage SIP gateway. Calls initiated with the Vonage SIP gateway can be put on ­hold using either a `re-­INVITE` with the `sendonly/inactive` direction in the SDP or a `re-­INVITE` with port 0 in the SDP.

**Other considerations:** Early media is disabled.

<!-- OPT-TODO: Sample applications
-------------------

The OpenTok server SDKs for Node and PHP have sample OpenTok Dial API calls using the OpenTok SIP interconnect functionality. See examples at: -->
<!-- alex ignore master -->
<!-- *   [https://github.com/opentok/opentok-node/tree/master/sample/SipInterconnect](https://github.com/opentok/opentok-node/tree/master/sample/SipInterconnect)
*   [https://github.com/opentok/OpenTok-PHP-SDK/tree/master/sample/SipCall](https://github.com/opentok/OpenTok-PHP-SDK/tree/master/sample/SipCall)

Below, you will find sample SIP Integrations using OpenTok SIP Interconnect with Nexmo:

*   [Dial-Out](https://github.com/opentok/opentok-nexmo-sip)
*   [Dial-In-Conference](https://github.com/opentok/opentok-nexmo-sip) -->

FAQ
---

##### What is SIP? Why is SIP important?

The Session Initiation Protocol (SIP) is a communications protocol for signaling and controlling multimedia communication sessions. The most common applications of SIP are in Internet telephony for voice and video calls, as well as instant messaging, over Internet Protocol (IP) networks.

In our case it is used to establish a call from sessions to a third-party SIP server. Once the call is established, the audio (and video, if included) is sent using the RTP protocol.

##### What is the difference between SIP and PSTN? Does Vonage provide a PSTN gateway?

The PSTN is the traditional telephone network. PSTN is not an IP network and doesn’t use SIP, but many providers, such as Nexmo, have gateways to convert SIP protocols to PSTN protocols. That way a SIP call over IP is converted to a phone call.

In practical terms, even if the Vonage Video API doesn’t support PSTN calls, we enable it by supporting SIP calls. From there it is a matter of finding a provider to convert SIP calls to PSTN calls.

##### Can I call regular telephones with SIP Interconnect feature?

Vonage SIP Interconnect allows partners to initiate calls to any SIP endpoints. To make/receive calls to/from a regular phone, customers need a gateway on their side to convert the SIP call to the protocols used in mobile/fixed telephony networks.

##### Is there a way to handle dial-out to or dial-in from a regular phone number (PSTN)?

With SIP Interconnect, customers can dial-out from a session to any SIP destination. Furthermore, customers can configure a SIP gateway (their own or 3rd-party) to dial-out to a regular phone number.

Although the SIP Interconnect API does not support incoming SIP calls, customers can implement dialing in from a regular phone (PSTN) by using a SIP gateway (their own or 3rd-party) to bridge the incoming call received from regular phones with the dial-out SIP call coming from Vonage.

##### Does SIP Interconnect support sending video?

Yes. Set the `video` flag to `true` when initiating the SIP call using the [REST API method](/api/video).

<!-- OPT-TODO: [REST API method](/developer/rest/#sip_call) -->

##### Is there a noticeable difference in the perceived audio quality on the WebRTC endpoint vs. the SIP endpoint?

The expectation is to have the same quality, albeit with additional latency on the SIP endpoint.

##### How does the Archiving feature work with SIP Interconnect?

The archiving capability works exactly as it does today for a WebRTC session. Up to 16 video streams and the first 50 audio streams, including SIP audio and video streams, will be part of the archive.

##### How does the user navigate the IVR? Will there be a dial pad in the web/mobile app?

You can use the REST API to send DTMF signals to SIP clients to support Interactive Voice Response (IVR) systems. See [Sending DTMF signals](#sending-dtmf-signals).

##### What SIP servers is SIP Interconnect compatible with?

We have tested interoperability with some of the most popular telco equipment (ACME packet, Broadsoft), some popular SIP platforms (Nexmo, and others), and the most popular open-source SIP server (freeswitch). It is impossible to ensure interoperability with every single SIP server, but we try to limit the use of SIP extensions/features to reduce the chances of failure. So far, we never had to change our solution to interoperate with any new SIP server.

##### How can one disconnect a call to a SIP client connected to a session?

* Using existing Client API — A Web (JavaScript) client connected to an OpenTok session with moderator privileges can force other clients, including SIP clients, to disconnect from a session.
    
<!-- OPT-TODO: [REST API for server-side moderation](/developer/guides/moderation/rest/) -->

* Using the REST API for server-side moderation — If the WebRTC clients are on mobile devices or the customer does not want to give moderator privileges to clients, application servers may issue an HTTP DELETE to a connected client to force a disconnect from the server side.