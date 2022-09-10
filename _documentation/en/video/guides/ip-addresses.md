---
title: IP addresses
meta_title: Use the allowed IP list feature for projects using the Enterprise environment to know IP addresses of Vonage Video API servers
description: The allowed IP list feature lets projects using the Enterprise environment know IP addresses of Vonage Video API servers
navigation_weight: 
---
## IP addresses

The allowed IP list feature is available as an [add-on feature](https://www.vonage.com/communications-apis/video/pricing/).

Vonage maintains a list of IP address blocks associated with the Video API platform components. Vonage shares this information with partners using the Enterprise environment who need to know IP addresses of Vonage Video API servers in order limit exposure of their network to trusted end-points only. This list includes the following components:

* Media servers &mdash; In [routed sessions](/video/guides/create-session#the-media-router-and-media-modes), clients send audio and video to our media server for intelligent and efficient routing.

* TURN servers &mdash; In [relayed sessions](/video/guides/create-session#the-media-router-and-media-modes), if strict network conditions prevent direct connectivity between clients, clients use these servers to relay audio and video.

* API server &mdash; Clients connect to this server for session initialization and signaling.

* Logging servers &mdash; Our logging server collects anonymized data about quality and possible errors. 

<!--alex ignore whitelist-->

Vonage will support partners using the allowed IP whitelist feature with the above-mentioned requirements by sharing the published list of IP address blocks. Vonage will also have a process in place to manage updates to the IP address blocks without disrupting service. 

Vonage will provide a 90-day advance notice to customers using the published IP address blocks. But in case of an unexpected event where additional capacity needs to be added immediately to handle a surge in traffic or other business and operational decisions that result in a change in IP address blocks, Vonage will not adhere to the 90-day advance notice. In these cases, Customers would be expected to use the updated list of IP address blocks published by Vonage. Failure to stay up-to-date with the latest IP address blocks published by Vonage will lead to disruption of service. 

## Requirements
<!--alex ignore whitelist-->
The above guarantee is only available to customers using Vonage Video API Enterprise environment. See
[Using the Enterprise environment](/video/guides/enterprise-environment).
Make sure to configure the Vonage Video API client to use the Allowed IP list (previously referred to as the IP whitelist &mdash; see the next section).

## Client SDK settings

To use the allowed IP list, you need to set an option in the Vonage Video API client SDK:

* *OpenTok.js* &mdash; Set the `ipWhitelist` property of the `options` parameter of [`OT.initSession()`](/sdk/stitch/video-js-reference/OT.html#initSession) to `true` when instantiating a Session object.

* *Vonage Video API iOS SDK* &mdash; Set the `[OTSessionSettings ipWhitelist]` property to `YES` when instantiating an OTSession object.

* *Vonage Video API Android SDK* &mdash; Call the `Session.Builder.setIpWhitelist()` method (passing in `true`) when instantiating a Session object.

* *Vonage Video API Windows SDK* &mdash; Set the `ipWhitelist` parameter of the `Session()` constructor to `true` when instantiating a Session object.

* *Vonage Video API Linux SDK* &mdash; Call the `otc_session_settings_set_ip_whitelist()` function, passing in the `otc_session_settings` struct (as the `settings` parameter) and `true` (as the `ip_whitelist` parameter). Then use the `otc_session_settings` struct in the call to the `otc_session_new_with_settings()` function.

These options are available in version 2.15.0+ of the Vonage Video API client SDKs.

## Getting the Vonage Video API Allowed IP list

The Vonage Video API Allowed IP list is available as an [add-on feature](https://www.vonage.com/communications-apis/video/pricing/). Projects must use the [Enterprise environment](/video/guides/enterprise-environment):
 
1. View your [Vonage Video API account](https://tokbox.com/account/) page.

2. Click the **Account Settings** link in the left-hand menu.

3. Under **Account add-ons**, see the **Allowed IPs** section, which includes the list of allowed IP addresses used by Vonage.

Please go ahead and allow the IP addresses listed in your firewalls.

[Contact us](https://video-api.support.vonage.com/hc/en-us/requests/new) if you have any questions.