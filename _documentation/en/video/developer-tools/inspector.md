---
title: Session inspector
description: Learn how to use the Inspector tool, a post-call diagnostic tool for your Video API sessions. Identify issues that came up in a session to help understand how to solve them.
product: video
---

# Inspector Overview

This page includes the following sections:

- [Overview](#overview)

- [Searching for Sessions](#searching-for-sessions)

- [Inspector walkthrough](#inspector-walkthrough)

- [Summary and Statistics](#summary-and-statistics)

- [User Data](#user-data)

- [Error Log](#error-log)

- [Quality Metrics](#quality-metrics)

- [Event Log](#event-log)

- [Sessions vs. Meetings](#sessions-vs-meetings)

- [Connections, Users, and Streams](#connections-users-and-streams-in-inspector)

- [Inspecting Large Sessions](#inspecting-large-sessions)

- [Saving Sessions](#saving-sessions)

- [Data retention and latency](#data-retention-and-latency)

## Overview

> **Note:** Please click [here](#data-retention-and-latency) for information on data retention and latency.

Inspector is a tool to help understand what happened in specific Vonage Video [sessions](/video/overview#sessions). Users can either enter a session ID or use the [Session Dashboard](#searching) to access the following information about a session:

* High-level statistics
* User Data
* Errors
* Video and Audio Quality
* Events

Inspector is primarily used for **debugging problematic sessions** that have occurred in your application.

You must be logged into your Vonage Video API account to access the Inspector, and you can only view sessions created from API Keys associated with your account.

## Searching for Sessions

<img src="/images/video/session-dashboard-screenshot-2x.png" alt="Search for sessions with the session dashboard" style="width:70%;">


Before diving into the detailed info about a session, you first need to find the session. The best way to do this is to log the session ID of each session created in your app to help with debugging.

However, if you do not know the ID of the session, you can use the [Session Dashboard](https://tokbox.com/developer/tools/inspector) to view recently active sessions as well as recently inspected sessions.

## Inspector Walkthrough

After selecting or searching for a unique session, you’ll be taken to the session view of Inspector, where you’ll be able to view data about that session.

The session view is broken out into various sections, which are outlined below:

### Summary and Statistics

<img src="/images/video/session-summary-screenshot-2x.png" alt="View a summary of the session or meeting" style="width:70%;">

At the top of the view are the Summary and Statistics sections. These sections provide a high-level overview of what happened in a session.

This data can be helpful for developing a quick understanding of the session topology, length, and diversity.

It’s also helpful for verifying that you’re looking at the correct session when debugging.

In some cases, you may want to drill down to specific [meetings](#sessions-vs-meetings) within a larger session — to do this, click the Meeting Selector in the top right corner and select the meeting segment you’re interested in viewing.

In cases where a session includes many distinct meetings, this can help simplify the view for easier debugging.

The Meetings Statistics panel includes the following information:

<!-- OPT-TODO: [SIP users](/developer/guides/sip) -->

* The call type. This can be multiparty, one-to-one, one-to-zero, or broadcast.
* The number of individual users, connections, published streams, and subscribers to the streams in the meeting. If there are SIP users connected to the meeting, the number of SIP users is also listed.
* The total number of streamed minutes in the meeting.
* The number of issue occurrence in the meeting.
* The number of different Vonage Video SDKs used in the meeting. Mouse over the SDKs entry to see a list of the different SDKs and the number of users for each.
* The number of different endpoints used in the meeting. An endpoint is either a browser version (such as Chrome 98) for clients using OpenTok.js; a Vonage Video SDK, or SIP. Mouse over the endpoints entry to see a list of the different endpoints and the number of users for each.

### User Data

<img src="/images/video/user-data-screenshot-2x.png" alt="View important info about users in the session or meeting" style="width:70%;">

When debugging a problematic session, it’s usually helpful to understand "who is who" in Inspector.

For example, one of the session participants may have experienced connectivity issues, so you would want to view data about that specific user in Inspector to better understand why the issue may have occurred.

To help with this identification, the User Data module provides some high level information about each user, including their location, device, SDK, and the number of errors they experienced.

You can also click on a user to reveal more information about that user, including details about their [connections](/video/overview#connection) and [streams](/video/overview#stream) they published.

This view is especially helpful for understanding **who successfully subscribed** to any given stream, which you can see in the right-most column of the stream list.

<img src="/images/video/user-data-dropdown-screenshot-2x.png" alt="Drill down to more specific data about each user" style="width:70%;">

For more about how clients connect, publish, and subscribe, see [Video API Basics](/video/overview).

### Error Log

<img src="/images/video/error-log-screenshot-2x.png" alt="View errors that occurred in a session" style="width:70%;">

If any errors occurred in the session, they will display in the Error Log section.

This section also displays the failure rate for connection, publish, and subscribe attempts in the session or meeting.

This rate is calculated by dividing the number of failures by the total number of attempts.

### Quality Metrics

<img src="/images/video/quality-metrics-screenshot-2x.png" alt="View quality metrics for the session or meeting" style="width:70%;">

The Quality Metrics module is useful for understanding **bitrate**, **packet loss**, and **latency** over time for each user. While these statistics can not directly determine subjective quality experienced by your app’s users, they can help to understand what may have contributed to poor quality. You can find a brief explanation of each of these concepts below:

**Bitrate** — this represents the amount of bits (data) being sent over the user’s connection. The Quality Metrics chart includes both audio and video bitrate — you can mouse over any point on a plotted line to see each value at any given time. While the bitrate can’t be directly linked to quality, very low bitrates (less than 150kbps for video and less than 25kbps for audio) can generally be associated with poor quality. To get a better understanding of what quality to expect based on these bitrate, see our [Help Center article](https://video-api.support.vonage.com/hc/en-us/articles/360029732311-What-is-the-minimum-bandwidth-requirement-to-use-OpenTok-).

**Packet Loss** — in a video call, data is sent in units called packets. In many situations, some of these packets are lost in transit, meaning they are not received by the user endpoint. Packet loss is calculated as a percentage of packets lost out of packets sent. For example, if 100 packets are sent and only 99 are received, there is a 1% packet loss. A small amount of packet loss is expected in a video call without causing quality issues, but if it exceeds 3-5% there is a good chance that quality may suffer.

**Latency** — this represents the amount of time it takes for a packet of data to get from one endpoint to another. Any latency higher than 300ms is likely to have a negative effect on quality.

You can click and drag on the chart to zoom in on a specific section of the graph. You can filter which data displays based on the checkboxes above the graph: Show Video, Show Audio, Publishers, Subscribers, and SIP (audio only). You can also filter by users using the Filter options in the left-hand side of the page.

<!-- OPT-TODO: [scalable video](/developer/guides/scalable-video/) -->

>**Note:** For a stream that does not use scalable video (such as a stream in a relayed session), the publisher adapts the published video to accommodate the subscriber with the worst network conditions. Inspector will show quality information based on this worst-performing subscriber. So the reported publisher video quality might not reflect the actual video quality experienced by all subscribers to the stream.

For a stream that uses scalable video, Inspector shows video quality information based on the link between the stream's publisher and the Media Router.

Publisher audio quality always reflects what the worst subscriber reports. This means that the reported publisher audio quality might not reflect the actual audio quality experienced by all subscribers to the stream.

Please see [this article](https://video-api.support.vonage.com/hc/en-us/articles/360029733831-TokBox-Scalable-Video-Simulcast-FAQ) for more information on scalable video.

### Event Log

<img src="/images/video/event-log-screenshot-2x.png" alt="View connect, publish, and subscribe events for the session or meeting" style="width:70%;">

The Event Log lists events related to connecting, publishing, and subscribing that occurred in the session or meeting you’re inspecting. This is helpful for understanding the context of connect, publish, or subscribe failures, and can also be useful for quickly seeing why users disconnect, unpublish, or unsubscribe.

You can filter events using the **text filter** in the top left in two ways:

* To view only events that include a specific string, for example "connect", enter that string in the text filter field and click the "+" symbol.
* To exclude all events that include a specific string, enter that string in the text filter field and click the "-" symbol.

You can also filter by user with the Inspector sidebar filters.

## Sessions vs. Meetings

All interactions occur within a session (for more on this, see [Video API Basics](/video/overview)) — you can think of a session as a "room". Sessions are created using the [Server SDKs](/video/server-sdks/node), and every session is associated with a session ID.

Although we recommend generating a new session for every "meeting" between participants — for example, if a team joins together for a group conference — but sometimes session IDs are reused across multiple "meetings."

This reuse of sessions can cause problems when debugging a session in Inspector, as its difficult to pinpoint a user or problem when viewing multiple meetings at once.

### Meetings in Inspector

To make it easier to debug these types of sessions, Inspector automatically breaks down sessions into multiple **meetings**.

When all participants disconnect from a session, a meeting is considered "ended", and if new (or the same) participants join the session at a later time, a new meeting is created and displayed in Inspector.

By default, Inspector shows _all_ meetings when a new session is loaded. In order to drill down to a specific meeting, use the meeting dropdown in the top right-hand corner of Inspector.

## Connections, Users, and Streams in Inspector

Connections and streams are part of the core functionality of the video API platform.

This section will outline how these objects (along with the "user" object) are referenced in Inspector, but if you would like a more comprehensive overview of these concepts, see [Video API Basics](/video/overview).

### Connections

In order to participate in a session, a connection must be made between a client and the video platform (except in a [relayed](/video/guides/create-session#the-media-router-and-media-modes) session, where clients connect directly).

This connection is associated with a unique connection ID. The connection ID is important when debugging a session in Inspector, as any stream published to the session is associated with the connection that it was published from.

For more about how clients connect, publish, and subscribe, see [Video API Basics](/video/overview).

You can view connection IDs and their associated streams in the [User Data](#user-data) section of Inspector.

You can also view the quality of each connection in the [Quality Metrics](#quality-metrics) section of Inspector.

### Users

In order to correlate connections with actual end-users in a session, Inspector also includes a user object.

The user is associated with a unique client endpoint. For example, an end-user’s browser or mobile device — tracked via cookies.

While an end-user can have multiple connections (if they disconnect and reconnect multiple times), they will always be associated with only one user in Inspector.

The user object in Inspector includes a few properties for identifying who is who:

* Location: where the user connected from (e.g. San Francisco, CA)
* System: the browser and/or device the user connected from (e.g. Chrome, MacOS)
* SDK:  the video SDK used by the user’s client app (e.g. JS-2.13.2)

This is especially helpful when trying to debug that affected only a specific user.

After identifying the user in Inspector based on location/device, you can then examine connections and streams for that user to identify quality or connectivity problems.

It’s important to note that a user can have multiple connections, but a connection cannot have multiple users.

You can view user info as well as their associated connections and streams in the [User Data](#user-data) section of Inspector.

### Streams

Once connected to a session, a user can [publish](/video/overview#publish) a [stream](/video/overview#stream) and [subscribe](/video/overview#subscribe) to other streams published in the session.

Each stream is associated with a Stream ID, which can be used in Inspector to see who in a session successfully published and subscribed to a stream. Inspector provides a variety of information about streams:

* The User Data section provides info on who published and subscribed to streams.
* The Quality Metrics section provides quality info and trends regarding streams.
* The Event Log section provides chronological info about streams being published, subscribed to, and destroyed.

## Inspecting Large Sessions

If a session includes more than 100 subscribers, the type of information displayed in Inspector will change, including the addition of two modules, outlined below:

**Connection Summary**  
This section provides a visual timeline of the connection attempts, successes, and failures in the session.


<img src="/images/video/connection-summary-screenshot-2x.png" alt="This connection data is only visible in sessions with over 100 subcribers" style="width:70%;">

**Subscriber Summary**  
This section provides a visual timeline of the subscribe attempts, successes, and failures in the session.

<img src="/images/video/subscriber-summary-screenshot-2x.png" alt="This subscriber data is only visible in sessions with over 100 subcribers" style="width:70%;">

It's also important to note that **subscribers are not viewable in the Quality Metrics section** for large sessions.

This was implemented to improve load time for large sessions — if Inspector attempted to load quality visualizations for 100+ subscribers, the tool would take up to an hour or more to load all of the data, significantly affecting usability.

## Saving Sessions

By default, you can inspect sessions for up to 20 days from the end of a session (see [Data Retention and Latency](#data-retention-and-latency)).

Within this 20-day retention period, you can _save_ a session and continue to inspect the session for up to 24 months.

To save a session, view the session in Inspector and click the <svg  width="20" height="20" class="Vlt-gray-darker">
      <use href="/symbol/volta-icons.svg#Vlt-icon-save"></use>
    </svg> (save) button in the header of the page.

Provide a name for the saved session (required) and provide up to three custom tags (optional).

>**Note:** We recommend using the session name field as a descriptive way to differentiate between your sessions. Use tags to keep track of specific characteristics about sessions. These characteristics could include errors, distinctive network characteristics, and quality attributes experienced during this session.

To view a saved session, go to the Session Dashboard and click the Saved Sessions tab.

You can save up to 1,000 sessions for an account.

To edit the name or tag for a session, view the session in Inspector and click the <svg  width="20" height="20" class="Vlt-gray-darker">
      <use href="/symbol/volta-icons.svg#Vlt-icon-edit"></use>
    </svg>(Edit) button in the header of the page.

If a session is saved and still within Inspector’s 20 day retention period, you can overwrite the previously saved session data with updated information by viewing the Inspector page for that session and clicking the <svg  width="20" height="20" class="Vlt-gray-darker">
      <use href="/symbol/volta-icons.svg#Vlt-icon-save"></use>
    </svg>(Save) button in the header of the page.

To delete a session from the saved sessions list:

* View the session in Inspector and click the <svg  width="20" height="20" class="Vlt-gray-darker">
      <use href="/symbol/volta-icons.svg#Vlt-icon-bin"></use>
    </svg>(Delete) button in the header of the page.
* View the Saved Sessions list in the Session Dashboard and click the  <svg  width="20" height="20" class="Vlt-gray-darker">
      <use href="/symbol/volta-icons.svg#Vlt-icon-bin"></use>
    </svg>(Delete) button for the session you want to delete. Or select multiple sessions and click the Delete Selected button at the top of the Saved Sessions list.

**Note:** Saved sessions are stored for up to 24 months and Vonage reserves the right to delete any saved sessions older than 24 months.

## Data Retention and Latency

**Data retention:** 20 days

**Note:**The retention period is based on the created-at time of a meeting within the session. Meetings can only be queried within a 7-day period within the session. It is [best practice](/video/guides/create-session) to create a new session ID for each distinct video chat in your application.

**Expected Latency:** 5 minutes

<img src="/images/video/inspector-retention-period.svg" alt="Inspector retention period" style="width:70%;">

>**Note:** A single session may have multiple meetings. A new meeting is set when the session is out of use for 10 minutes.

Please refer to the section on [Sessions vs. Meetings](#sessions-vs-meetings) for more information.

You can save a session to view its data after the 20-day data retention period. See [Saving Sessions](#saving-sessions).