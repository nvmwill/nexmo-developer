---
title: Initializing SDK
description: Initializing SDK
---

### Initializing SDK

Import the module to get back a constructor function, then call it with the `new` keyword to create an OpenTok object with using your **API Key** and **API Secret**.

```js
const OpenTok = require("opentok");
const opentok = new OpenTok(apiKey, apiSecret);
```

**Increasing Timeouts**

The library currently has a 20 second timeout for requests. If you're on a slow network, and need to increase the timeout, you can pass it (in milliseconds) when instantiating the OpenTok object.

```js
const OpenTok = require("opentok");
const opentok = new OpenTok(apiKey, apiSecret, { timeout: 30000});
```

In the next section you will learn how to [create a session](/video/tutorials/server-side-setup/video/server-side/node/creating-sessions/node).