---
title: Troubleshooting
description: Learn about useful tools for debugging issues in your web application. Use our Inspector tool, as well as methods to send yourself session information for further investigation.
product: video api
---

## Troubleshooting sessions with Inspector

The [Session Inspector](/video/developer-tools/inspector) tool provides post-mortem diagnostic information about Vonage Video sessions. Enter a session ID or a reported issue ID into Inspector to view raw information at stream and user levels to help pinpoint errors, failures, and quality issues.


<!-- OPT-TODO: ## Reproducing issues with Vonage Video Playground

[Playground](https://tokbox.com/developer/tools/playground/) uses the OpenTok.js SDK to access the Vonage Video platform and helps you recreate issues experienced in deployment.

For details, see the [Playground documentation](/developer/tools/playground_doc/). -->

## Reporting an issue

You can call the `OT.reportIssue()` method to programmatically report when your app experiences an issue. This method provides you with an issue ID, which you can use with the [Session Inspector](/video/developer-tools/inspector) or when discussing the issue with the Vonage API support team.

```js
OT.reportIssue(function(error, issueId) {
  if (error) {
    console.log(error);
  } else {
    console.log(issueId);
    // You may want to use XMLHttpRequest to report this issue ID to a server
    // that can store it in a database for later reference.
  }
});
```

The `OT.reportIssue()` method takes one parameter, a completion handler function, which is called when the call to `OT.reportIssue()` succeeds or fails. The completion handler function has two parameters.

The first parameter is an error object that is set when the call to the `reportIssue()` method fails (for example, if the client is not connected to the network) or `null` when the call to the `reportIssue()` method succeeds. The second parameter is set to the reported issue ID (a unique string) when the call succeeds.
