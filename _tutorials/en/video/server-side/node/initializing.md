---
title: Initializing SDK
description: Initializing SDK
---

### Initializing SDK

Import the module to get back a constructor function, then call it with the `new` keyword to create an OpenTok object with using your **App ID** and **Private Key**.

```js
const OpenTok = require("opentok");
const opentok = new OpenTok(appId, privateKey);
```

**Increasing Timeouts**

The library currently has a 20 second timeout for requests. If you're on a slow network, and need to increase the timeout, you can pass it (in milliseconds) when instantiating the OpenTok object.

```js
const OpenTok = require("opentok");
const opentok = new OpenTok(appId, privateKey, { timeout: 30000});
```

In the next section you will learn how to [create a session](/video/tutorials/server-side-setup/video/server-side/node/creating-sessions/node).