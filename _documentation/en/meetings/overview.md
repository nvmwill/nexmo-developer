---
title: Overview
meta_title: Provides an out of the box video solution for low tech users
description: The Meetings API allows you to integrate real-time, high-quality interactive video meetings into your web apps
product: meetings
navigation_weight: 1
---

# Meetings API Overview

The Meetings API allows you to integrate real-time, high-quality interactive video meetings into your web apps.

> You can try out the Meetings API in the [Vonage API Dashboard](https://dashboard.nexmo.com).

## Contents

* [Meetings API or Video API?](#meetings-api-or-video-api): Determine which API is more suited to your project.
* [Terminology](#terminology): Key terms and definitions for the Meetings API.
* [Room Types](#room-types): Defines the types of rooms available.
* [Website Embed](#website-embed): Use an iFrame to embed a Meeting into a website.
* [Code Snippets](#code-snippets): Code and instructions for using the Meetings API.
* [Reference](#reference): Further information about the Meetings API.

## Meetings API or Video API?

Both the Meetings API and the Video API allow you to use high-quality interactive video meetings in your web applications. The Meetings API is ideal for those who want plug and play meetings with limited customization; it takes only a few lines of code to generate a meeting and embed it into your application. The Video API is ideal for those who want more customization and flexibility, but it will take more development effort.

Take a look at the [Video API](https://tokbox.com/developer/) documentation for more information.

## Terminology

* **Room**: the virtual space in which the video meeting takes place. See [Room Types](#room-types) below.
* **Participants**:
  * **Owner**: usually the creator of the room, this person has special administration capabilities.
  * **Guest**: people attending meeting. Guests have access to standard meeting features.
* **Set up and Configuration**:
  * **Request**: the code snippet you submit to set up a room.
  * **Response**: the data that is returned from your request.
  * **Meeting Room ID**: the ``ID`` is a session identifier which is returned in the response to a meeting request.
  * **Session**: defined as all events that occur during this time, from when the first participant joins, until the last to leave.
  * **Guest URL**: meeting room URL used by guests.
  * **Host URL**: meeting room URL with meeting administration capabilities used by the host.
  * **Theme**: the set of colors, logos and styles to apply to given rooms in the account.
* **Features**:
  * **Whitelabel**: ability to create rooms with specific branding or color schemes.
  * **Chat**: space for sending written messages that are visible to all attendees in the room.
  * **Recording**: you can start a recording manually during a meeting, or set the meeting to record automatically when sending a request. You can also choose to only record the owner of the room.
  * **Room Management**: you can delete, update or retrieve information about rooms.
  * **Callbacks**: allow you to receive information about a session.

## Room Types

There are two room types:

* **Instant Room**:
  * Created for a meeting happening now.
  * Active for ten (10) minutes until the first participant joins the room.
      If no one joins the room within the ten minutes, the room is deleted.
  * Active for ten minutes after the last participant leaves, then it is deleted.
* **Long Term Room**:
  * Remains alive until the expiration date you specify (maximum one year).
  * Typically linked to a recurring meeting, person, or resource.
  * Will require you to specify an expiration date (in ISO format).
  * Enables you to request that a room is automatically deleted ten minutes after the last participant leaves the room.

## Website Embed

A meeting created through the API can be embedded into your website. To do this, generate the meeting link and create an iFrame using that link:

``` HTML
<iframe src="Meeting link here" title="Embedded Meeting" allow="camera;microphone"></iframe>
```

This is currently supported both desktop and mobile using the following browsers:

* Desktop - Supported on Firefox and Chrome based browsers.
* iOS 14+ - Supported on Safari, Edge or Firefox.
* Android - Supported on Chrome or Samsung browser v14+.

The meeting can be displayed in any size above 360PX, however the number of features available depends on the size of the iFrame:

Feature | 360-500PX | 500-600PX | 600PX+
-- | :--: | :--: | :--:
Microphone | ✅ | ✅ | ✅
Video | ✅ | ✅ | ✅
Record | ❌ ¹ | ✅ | ✅
Share Screen | ❌ | ✅ | ✅
Reactions | ❌ | ❌ | ✅
Privacy | ❌ | ✅ | ✅
Whiteboard | ❌ | ❌ | ✅
Watch Together | ❌ | ❌ | ✅
Round Table | ❌ | ❌ | ✅
End Meeting | ✅ | ✅ | ✅

¹ Recording is still available in 360-500PX meetings by setting the ``auto_record`` parameter in the API call.

> You will also need to send an email request to the [Meetings API team](mailto:meetings-api@vonage.com) to whitelabel the domain of the website the iFrame is used in.

## Code Snippets

* [Before You Begin](code-snippets/before-you-begin)
* [Create an Instant Room](code-snippets/create-instant-room)
* [Create a Long Term Room](code-snippets/create-long-term-room)
* [Theme Management](code-snippets/theme-management)
* [Meeting Room Management](code-snippets/room-management)
* [Callbacks](code-snippets/callbacks)

## Reference

* [Meetings API Reference](/api/meetings)
