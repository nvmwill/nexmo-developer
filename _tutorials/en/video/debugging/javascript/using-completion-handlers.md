---
title: Using completion handlers
description: Learn about useful tools for debugging issues in your web application. Use our Inspector tool, as well as methods to send yourself session information for further investigation.
product: video api
---

## Using completion handlers

For many methods that complete asynchronously, the final parameter you pass in is a completion handler function. This function is called when the method completes or fails. If it fails, the function is passed an error object as a parameter.

For example, the following code calls the `Session.connect()` method, passing in a completion handler:

```js
var session = OT.initSession(apiKey, session);
session.connect(token, function (error) {
  if (error) {
    if (error.name === "OT_NOT_CONNECTED") {
      alert("You are not connected to the internet. Check your network connection.");
    }
    console.log("Failed to connect: ", error.message);
  } else {
    console.log("Connected");
  }
});
```

<!-- OPT-TODO: For more information, see [Handling exceptions](/developer/guides/exception-handling/js/). -->
