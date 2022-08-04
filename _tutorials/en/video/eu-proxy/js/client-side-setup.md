---
title: Client Side configuration
description: Configure the EU proxy URL in your client app.
product: video
---

## Configuring the EU proxy server in client apps

Call the [`OT.setProxyUrl()`](/sdk/stitch/video-js-reference/OT.html#setProxyUrl) method to set the EU proxy server URL:

```javascript
const euProxyUrl = ''; // Set this to the EU proxy URL returned from your web service
OT.setProxyUrl(euProxyUrl);
```

You must call this method before calling any other [Web SDK](/video/client-sdks/web) methods. This ensures that the proxy server is used for all traffic.