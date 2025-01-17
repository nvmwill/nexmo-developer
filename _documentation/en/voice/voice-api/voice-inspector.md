---
title: Voice Inspector (Beta)
meta_title: A post-call diagnostics tool for Voice calls. 
navigation_weight: 0
description: A post-call diagnostics tool for Voice calls. 
---

# Voice Inspector (Beta)

This is the Beta version of Voice Inspector, built to help understand what happened during In-App Calls (WebRTC), Phone Calls (PSTN), SIP, and WebSocket calls. The Voice Inspector Beta can be accessed [here](http://tools.vonage.com/voice/inspector).

Users can either enter a to or from phone number, [call leg ID or a conversation ID](#call-leg-id-vs-conversation-id) to access the following information for *specific call legs*:

Information | In-app (WebRTC calls) | SIP/PSTN or websocket calls
-- | :--: | :--: | :--:
High-level Statistics | ✅ | ✅
Quality Metrics | ✅ | ❌
Key Events in the Call | ✅ | ✅

In future releases, Users will be able access more information about a specific call leg, including:

* High-level statistics
* Final call status
* List of NCCOs used along with status
* All events that occurred during a call
* Quality Metrics
* Chronological list of all conversations that a call belonged to

## Overview

Voice Inspector (Beta) is made up of two main sections: a [Search page](#search-page) and a [Call Information page](#call-information-page).

### Search Page

![Search Options](/images/voice-inspector/voice-inspector-search-page-1.png)

Information about a call leg can be found by searching **to or from Phone Number**, a **Call Leg ID** or a **Conversation ID**. Call Leg IDs (`uuid`) and Conversation IDs (`conversation_uuid`) can be found in the [callbacks](/voice/voice-api/webhook-reference#answer-webhook). Only calls made within the past 21 days can be found through Voice Inspector.

Searching using phone numbers only allows searching for voice calls, while searching using Conversation ID allows only searches for in app voice calls. Searching using Call Leg ID allows searches for In app, voice calls and web sockets.

Searching by Call Leg ID will lead directly to the [Call Information Page](#call-information-page) showing data and metrics for that specific call leg ID.

![Search Results](/images/voice-inspector/voice-inspector-search-page-2.png)

Searching by conversation ID will return a Conversation Summary component along with a list of call legs belonging to that conversation ID.

* The Conversation Summary provides basic details about the conversation including the time range of the conversation along with the number of call legs belonging to the conversation and the status of the call.
* The call leg list shows:
  * Application ID of the application that the call leg belongs to
  * Start and end times of the call leg along with the duration
  * The final status of the call leg

### Call Information Page

The call information page provides in-depth information relevant to a specific call leg and is made up of various sections as outlined below:

* Call Summary
* Quality Metrics (only available for WebRTC calls)
* Any Errors that occurred
* Any important Events

#### Call Summary

![Call Summary Information](/images/voice-inspector/voice-inspector-call-summary.png)

At the top of the page is the Call Summary section. This section provides a high-level overview of what occurred during the call. This section is helpful in understanding general information about the call such as call channel, start and end times along with duration, as well as a quick glance at the quality experienced during the call (Quality Index QI). This is helpful in determining whether or not issues occurred during the call or verifying that you’re looking at the correct call when debugging. 

#### Quality Metrics

![Quality Metrics Information](/images/voice-inspector/voice-inspector-quality-metrics.png)

The Quality Metrics section is useful for understanding bitrate, jitter, packet loss, and latency over time for the call leg. While these statistics can not directly determine subjective quality experienced during the call, they can help to understand what may have contributed to poor quality. 

Call quality is presented in both an average quality over the entire duration of the call as well as in quality graphs showing call quality experienced in one-second increments. Quality metrics for bitrate, jitter, and packet loss are presented in both sent and received cases. A brief explanation of each of these concepts can be found below:

* **Quality Index (QI)** — An objective measure of the overall call quality experienced by the user. The scale ranges from 1 representing bad call quality to 5 meaning excellent call quality. Most calls should have a QI falling between 3 and 4.  The QI is calculated based on a combination of the quality metrics captured and experienced during the call.

* **Bitrate** - The number of bits (data) being sent over the user’s connection. While the bitrate can’t be directly linked to quality, a higher bitrate generally correlates to higher call quality. A bitrate less than 64 Kbps may result in degraded audio quality.

![Bitrate](/images/voice-inspector/voice-inspector-bitrate.png)

* **Jitter** -  The inconsistency in the order of packets received by the recipient. A high level of jitter could result in degraded call quality and cause distortion, echoes, or choppy audio. A jitter of over 50 ms may result in incoherent conversations.

![Jitter](/images/voice-inspector/voice-inspector-jitter.png)

* **Packet Loss** — Data is sent in units called packets during a call. In many situations, some of these packets are lost in transit, meaning they are not received by the user endpoint. Packet loss is calculated as a percentage of packets lost out of packets sent. For example, if 100 packets are sent and only 99 are received, there is a 1% packet loss. A packet loss of over 1% could result in clipped words or entire missed phrases.

![Packet Loss](/images/voice-inspector/voice-inspector-packet-loss.png)

* **Latency** — The amount of time it takes for a packet of data to get from one endpoint to another. Any latency higher than 100ms may result in audio breakdown or overlapping conversations between participants.

![Latency](/images/voice-inspector/voice-inspector-latency.png)

#### Call Events

The call events section details the key events that occurred during the call. Events detailed include call start/end, updates to call leg, members joining or leaving the call, invitations of other members and usage of some other vonage products.  For each event, It includes information such as the exact time and description of the event. The events are also filterable by dates and keywords. This can aid troubleshooting as it allows a user to establish the exact sequence of events in the run up to a failure.

![Event Log](/images/voice-inspector/voice-inspector-event-log.png)

## Data Availability and Latency

Call data can be viewed on Voice Inspector for 21 days from the end of the call. Only completed calls can be found through the Voice Inspector tool.

## Call Leg ID vs. Conversation ID

Within a call exists the concept of a [call leg and a conversation](/voice/voice-api/guides/legs-conversations). In general, the creation of a call leg also creates a corresponding conversation meaning that a call leg ID will always have an associated conversation ID.

#### Call Leg
A leg of a call refers to a single connection either inbound to or outbound from, the Vonage platform. The Call Information page within Voice Inspector presents call information specific to a call leg and is signified by a **call leg ID**.

#### Conversation
A conversation can contain one or more call legs and additional legs can be added to a conversation. A single call leg might also belong to multiple conversations. A conversation is signified by a **conversation ID**. Voice Inspector uses conversation IDs to search for call legs that belong to a specific conversation. 

### Example Call Flows

See [here](/voice/voice-api/guides/call-flow) for more information on call flows.

Two call legs with three conversations:

1. An inbound call is made with the IDs Call Leg ID 1 and Conversation ID 1. 
2. Through an IVR NCCO action, Call Leg 1 joins Conversation 2 and makes a connection with the outbound Call Leg 2
3. Call Leg 2 hangs up and Call Leg 1 leaves Conversation 2 and joins Conversation 3 through another NCCO action 
4. Call Leg 1 hangs up

Two call legs with one conversation:

1. An inbound call is made with the IDs Call Leg ID 1 and Conversation ID 1.
2. Call Leg 2 joins Conversation 1 through NCCO connect action.
3. Call Leg 2 hangs up and completes Conversation 1 closing Call Leg 1
