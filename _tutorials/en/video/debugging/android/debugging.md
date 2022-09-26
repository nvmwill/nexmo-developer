---
title: Debugging
description: "Learn about useful tools for debugging issues in your Android application. Use our Inspector tool, as well as methods to send yourself session information for further investigation."
product: video
navigation-weight:
---

# Debugging

This topic includes the following sections:

* [Troubleshooting sessions with Inspector](#troubleshooting-sessions-with-inspector)
* [Reporting an Issue](#reporting-an-issue)

## Troubleshooting sessions with Inspector

[Inspector](/video/developer-tools/inspector) provides post-mortem diagnostic information about Vonage Video sessions. Enter a session ID or a reported issue ID (see the [next section](#reporting-an-issue)) into Inspector to view raw information at stream and user levels to help pinpoint errors, failures, and quality issues.

## Reporting an Issue

You can call the [Session.reportIssue()](/sdk/stitch/video-android-reference/com/opentok/android/Session.html#reportIssue()) method to programmatically report when your app experiences an issue. This method provides you with an issue ID, which you can use with the [Inspector](/video/developer-tools/inspector) or when discussing the issue with the Vonage API support team.

```java
String issueId = session.reportIssue();
```

You may want to send the issue ID to a server that can store it in a database for later reference.
