---
title: IP Proxy routing
description: Learn how to route Vonage Video API traffic via an IP proxy server.
prouct: video
navigation-weight:
---

# IP Proxy

With the IP proxy feature, clients route all internet traffic (except for media streams) via your proxy server.

Non-media traffic includes communication to the Video API servers and logging infrastructure.

The IP proxy feature is available as [an add-on feature](https://www.vonage.com/communications-apis/video/pricing/).

There is also a [configurable TURN server](/video/guides/configurable-turn-servers/) add-on feature that lets you route media streams via your own custom TURN servers.

## Configuring the IP proxy server

You set the URL or your proxy server when you initiate an session in the client SDKs.

Vonage concatenates the destination URL for all internet traffic (except media streams) to the proxy URL you provide. This traffic includes Video API calls, WebSocket connections, and log traffic made by OpenTok.js.

For example, the client SDK logs data periodically to `https://hlg.tokbox.com/prod/logging/ClientEvent`. If you set the proxy URL to `"https://123.123.123.123:8080"`, the client will post this data to `https://123.123.123.123:8080/hlg.tokbox.com/prod/logging/ClientEvent`.

You should secure the proxy server so that it will be used by Vonage clients only and not by unauthorized clients. For example, you can put the proxy server within a firewall or authenticate requests in some other way.

Here is sample code that sets up a basic proxy server for this feature: [https://github.com/robjperez/simple\_reverse\_proxy](https://github.com/robjperez/simple_reverse_proxy).

**Note:** If clients will connect to Vonage sessions in a geographical region other than that of your proxy server and you are not using the [configurable TURN server feature](/guides/configurable-turn-servers/), be sure to set the location hint when you [create Vonage sessions](/guides/create-session/).

### In OpenTok.js

Call the `OT.setProxyUrl()` method to set the proxy server URL:

``` js
OT.setProxyUrl('https://123.123.123.123:8080');
```

You must call this method before calling any other Vonage methods. This ensures that the proxy server is used for Vonage traffic.

**Note:** This method was added as an undocumented method in 2.17.4. In previous versions, you set the proxy server URL using an undocumented option when calling the `OT.initSession()` method. However, this is option now deprecated and replaced with the `OT.setProxyUrl()` method.

### In the Android SDK

Set the proxy server URL by calling the `setProxyUrl()` method of the `Session.Builder` object you use to instantiate a Session object:

```
mSession = new Session.Builder(context, API_KEY, SESSION_ID)
  .setProxyUrl("https://123.123.123.123:8080")
  .build();
```

### In the  iOS SDK

Set the proxy server URL by setting the `proxyURL` property of the `OTSessionSettings` object you pass into the `[OTSession initWithApiKey:sessionId:delegate:settings:]` method:

```objective-c
OTSessionSettings *settings = [[OTSessionSettings alloc] init];
settings.proxyURL = @"https://123.123.123.123:8080";

session = [[OTSession alloc] initWithApiKey:kApiKey
                                       sessionId:kSessionId
                                       delegate:self
                                       settings:settings];
```

### In the Windows SDK

Set the proxy server URL by setting the `proxyUrl` parameter of the `Session()` constructor:

``` vb
Session = new Session.Builder(Context.Instance, API_KEY, SESSION_ID)
{
  ProxyUrl = "https://123.123.123.123:8080"
}.Build();
```

### In the Linux SDK

Set the proxy server URL by calling the `otc_session_settings_set_proxy_url` function:

```
otc_session_settings_set_proxy_url(settings, "https://123.123.123.123:8080");
otc_session *session = otc_session_new_with_settings(API_KEY,
                                                     SESSION_ID,
                                                     &session_callbacks,
                                                     session_settings);
```

The first parameter is the `otc_session_settings` instance you will pass into the `otc_session_new_with_settings ()` function to initialize an `otc_session` instance. The second parameter is the proxy server URL. For more information on the `otc_session_settings` struct the `otc_session\_new\_with\_settings()\` function and connecting to the session, see [Instantiating an otc_session instance and session-related callbacks](/video/tutorials/joining-a-session)