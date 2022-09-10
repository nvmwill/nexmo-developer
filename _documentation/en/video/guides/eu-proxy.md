---
title: EU Proxy routing
meta_tile: Learn how to route Vonage Video API traffic within the EU
description: With the EU proxy feature, Vonage Video API clients route all internet traffic (except for media streams) via proxy servers hosted inside the EU.
navigation_weight:
---

# EU Proxy routing

Non-media traffic includes Video API calls, WebSocket connections,
and log traffic.

The EU proxy feature is available when you purchase a European Regional Media Zone [add-on feature](https://www.vonage.com/communications-apis/video/pricing/), which lets you restrict all media stream traffic within the EU. Combined, these features let you restrict all Vonage Video API traffic (both media and non-media) within the EU.

Vonage provides you with a URL for the EU proxy server, which you will set in client applications that use the Vonage Video API. This URL may change Contact your Vonage sales representative to obtain the EU proxy server URL.

## Setting up a web service to provide the EU proxy server URL

If you will be using the EU proxy feature in applications that use the
Vonage Video API client SDKs for Android, iOS, Windows, or Linux, you will need to create a web service that the client app can call to obtain the EU proxy URL. Vonage may change this URL, so you should not hard code it into a compiled client app.

## Configuring the EU proxy server in client apps

You set the URL for the EU proxy server when you initiate a session in the Vonage Video API client SDKs.

### OpenTok.js

Call the `OT.setProxyUrl()` method to set the EU proxy server URL:

```javascript
const euProxyUrl = ''; // Set this to the EU proxy URL provided by Vonage
OT.setProxyUrl(euProxyUrl);
  ```

You must call this method before calling any other OpenTok.js methods.
This ensures that the proxy server is used for Vonage traffic.

### Vonage Video API Android SDK

Set the proxy server URL by calling the `setProxyUrl()` method of the
`Session.Builder` object you use to instantiate a Session object:

```java
// Before executing this code, call a function that obtains
// the EU proxy server URL from the web service you set up.

mSession = new Session.Builder(context, API_KEY, SESSION_ID)
  .setProxyUrl(mEuProxyUrl)
  .build();
```

See [Setting up a web service to provide the EU proxy server URL](#setting-up-a-web-service-to-provide-the-eu-proxy-server-url).

### Vonage Video API iOS SDK

Set the proxy server URL by setting the `proxyURL` property of the
`OTSessionSettings` object you pass into the
`[OTSession initWithApiKey:sessionId:delegate:settings:]` method:

```
// Before executing this code, call a function that obtains
// the EU proxy server URL from the web service you set up.

OTSessionSettings *settings = [[OTSessionSettings alloc] init]; settings.proxyURL = euProxyUrl;

session = [[OTSession alloc] initWithApiKey:kApiKey
                                  sessionId:kSessionId
                                  delegate:self
                                  settings:settings];
```

See [Setting up a web service to provide the EU proxy server URL](#setting-up-a-web-service-to-provide-the-eu-proxy-server-url).

### Vonage Video API Windows SDK

Set the proxy server URL by setting the `proxyUrl` parameter of the `Session()` constructor:

```csharp
// Before executing this code, call a function that obtains
// the EU proxy server URL from the web service you set up.

Session = new Session.Builder(Context.Instance, API_KEY, SESSION_ID)
{
  ProxyUrl = EU_PROXY_URL
}.Build();
```

See [Setting up a web service to provide the EU proxy server URL](#setting-up-a-web-service-to-provide-the-eu-proxy-server-url).

### Vonage Video API Linux SDK

Set the proxy server URL by calling the `otc_session_settings_set_proxy_url` function:

```c
// Before executing this code, call a function that obtains
// the EU proxy server URL from the web service you set up.

otc_session_settings_set_proxy_url(settings, euProxyUrl);
otc_session *session = otc_session_new_with_settings(API_KEY,
                                                     SESSION_ID,
                                                     &session_callbacks,
                                                     session_settings);
```

The first parameter is the `otc_session_settings` instance you will pass into the `otc_session_new_with_settings ()` function to initialize an `otc_session` instance. The second parameter is the EU proxy server URL string.

See [Setting up a web service to provide the EU proxy server URL](#setting-up-a-web-service-to-provide-the-eu-proxy-server-url).