---
title: Logging to the console
description: Learn about useful tools for debugging issues in your web application. Use our Inspector tool, as well as methods to send yourself session information for further investigation.
product: video api
---

## Logging to the console

When you're developing your application, place the code below somewhere in your application. Doing so will produce more logging output to your console, allowing you to better trace your program and understand what is happening behind the scenes.

```js
OT.setLogLevel(OT.DEBUG);
```

You can also log messages to the console by calling the `OT.log()` method:

```js
OT.log("my session ID: " + session.sessionId);
```

(Call `OT.setLogLevel(OT.DEBUG)` or `OT.setLogLevel(OT.LOG)` before calling `OT.log()`.)

## Testing multiple client connections on one machine

You cannot subscribe to a stream you publish in the same browser page. However, you can open the page in a second tab (or browser window) and subscribe to a stream published in the other tab (or window).
