---
title: Advanced Media Stream Encryption (AES-256)
meta_title: Learn how to use advanced media encryption in your Vonage Video API sessions.
description: Learn how to use advanced media encryption in your Vonage Video API sessions.
navigation_weight:
---

# Advanced Media Stream Encryption (AES-256)

By default the media streams passing through the Vonage platform are encrypted using AES-128. In routed sessions, the media is encrypted between all clients and the media server. In relayed sessions, the media is encrypted between each pair of clients.

For enhanced security, the AES-256 [add-on feature](https://www.vonage.com/communications-apis/video/pricing/) provides the AES-256 level of encryption on media streams.

**Important:** This feature is available as an [add-on feature](https://www.vonage.com/communications-apis/video/pricing/).

With the AES-256 add-on feature enabled, when a client is connecting to a Media Router or another client, the cipher to use will be negotiated. If the client supports AES-256 then this will be the cipher negotiated for the media traffic. If the client does not support it, then AES-128 will be used. In the case of relayed sessions, both clients must support AES-256, otherwise they will fall back to AES-128.

After you enable the AES-256 Encryption add-on, this feature will be activated automatically for all the projects in your account.

**Important:** To ensure that AES-256 is used, it is recommended that you configure sessions to use the Media Router (sessions with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to routed). In relayed sessions, Chrome, Firefox, Opera, and Chromium-based Edge prioritize AES-128 during DTLS SRTP cipher negotiation, and thus streams sent by these browsers will use AES-128.

In relayed sessions, if the AES-256 is enabled for your project, the Video API client SDKs for Android, iOS, Windows, and Linux prioritize AES-256-bit encryption ciphers during negotiation. However, in relayed sessions web browsers will use AES-128.

## Encryption support on SDK clients

AES-256 is supported (in addition to AES-128) in each of the client SDKs (version 2.18 and later). The client SDKs for Android, iOS, Windows, and Linux each support AES-256 encryption. However, for web apps that use OpenTok.js, AES-256 is not supported in all browsers. The latest versions of following browsers support AES-256:
* Chrome 62+
* Firefox 56+
* Chromium-based Edge
* Opera

**Important notes:**

* Safari does not support AES GCM ciphers and thus will fall back to AES-128 (see [this WebKit bug report](https://bugs.webkit.org/show_bug.cgi?id=214402)).
* Even in versions of Firefox and Chrome that support AES-256, in relayed sessions these browsers prioritize AES-128 during DTLS SRTP cipher negotiation, resulting in use of AES-128. For this reason, we recommend that you configure sessions to use the Media Router (sessions with the [media mode](/video/guides/create-session#the-media-router-and-media-modes) set to routed) to ensure AES-256 encryption in supported browsers.

## FAQs

### What is the AES-256 encryption feature?

AES-256 encryption is a more advanced level of media encryption that can be used with Vonage Video API media streams. By default Vonage Video API media streams use AES-128, offering both, AEAD_AES_128_GCM and AES_CM_128_HMAC_SHA1_80 ciphers for maximum connectivity. The AES-256 bit encryption feature directs media streams to use 256-bit encryption, with a fallback option to AES-128. This feature is available as an [add-on feature](https://www.vonage.com/communications-apis/video/pricing/).

### Can AES-256 bit encryption be used for Relayed and Routed sessions?

Yes, however for relayed sessions, the capability is determined by the priority order of ciphers used during DTLS-SRTP negotiation enabled in the browser implementation. To ensure AES-256 use, routed sessions are highly recommended.

In routed sessions, the media is encrypted between all clients and the Vonage media server. If AES-256 is enabled for your project, the Vonage Media Router will negotiate with AES-256 ciphers to direct 256-bit encryption negotiation for media traffic for all clients connecting to the media server. (However, Safari does not support AES-256 encryption.)

In relayed sessions the media is encrypted between each pair of clients. In the case of relayed sessions, both clients must support and prioritize AES-256 during DTLS-SRTP negotiation, otherwise they will fall back to AES-128. If AES-256 is enabled for your project, the client SDKs for Android, iOS, Windows, and Linux will prioritize the AES-256-bit encryption cipher and not negotiate SRTP_AES128_CM_SHA1_80.

As a result, if AES-256 is enabled, setting up relay media between native SDKs and endpoints not supporting GCM ciphers, such as Safari versions prior to 15.4, will fail. However, for browsers (using OpenTok.js), the capability is determined by the priority order of ciphers enabled in the browser implementation, which currently cannot be modified since there is no standard WebRTC API for managing the cipher priority order. In relayed sessions, Chrome, Firefox, Opera, and Chromium-based Edge prioritize AES-128 during DTLS SRTP cipher negotiation, and thus streams sent by these browsers will use AES-128 in relayed sessions. Additionally, Safari does not support AES-256.

### Is 256-bit encryption supported if media traffic is routed through a TURN server?

Yes. Media encryption is an end-to-end security protocol using DTLS-SRTP and would not be affected by routing through a TURN server. In relayed sessions, media encryption is client-to-client. In routed session media encryption is negotiated between the client and the media server.