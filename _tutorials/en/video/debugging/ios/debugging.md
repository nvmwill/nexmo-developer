---
title: Debugging
description: "Learn about useful tools for debugging issues in your iOS application. Use our Inspector tool, as well as methods to send yourself session information for further investigation."
product: video
navigation-weight:
---

# Debugging

This topic includes the following sections:

* [Troubleshooting sessions with Inspector](#troubleshooting-sessions-with-inspector)
* [Reporting an Issue](#reporting-an-issue)

## Troubleshooting sessions with Inspector

[Inspector](/video/developer-tools/inspector) provides post-mortem diagnostic information about Vonage Video sessions. Enter a session ID or a reported issue ID (see the [next section](#reporting-an-issue)) into Inspector to view raw information at stream and user levels to help pinpoint errors, failures, and quality issues.

For details, see the [Inspector documentation](/video/developer-tools/inspector).

## Reporting an Issue

You can call the [[OTSession reportIssue:]](/sdk/stitch/video-ios-reference/Classes/OTSession.html#//api/name/reportIssue:) method to programmatically report when your app experiences an issue. This method provides you with an issue ID, which you can use with the [Inspector](/video/developer-tools/inspector) or when discussing the issue with the Vonage API support team.

```objective-c
OTError* issueId = nil;
[mySession reportIssue:&issueId];
if (issueId) {
  NSLog(@"Report issue ID: %@", issueId);
}
```

The `issueId` parameter is a pointer to a string that will be set the unique identifier for the reported issue. If the call to the method fails (for example, because of no network connection), this value is set to nil.

You may want to send the issue ID to a server that can store it in a database for later reference.
