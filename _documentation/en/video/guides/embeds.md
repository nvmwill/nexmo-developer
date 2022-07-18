---
title: "Video Chat Embeds | Vonage Video API Developer"
h1: "Video Chat Embeds"
p: "Quickly add Vonage Video API functionality to your website with a simple embeddable widget."
---

Overview
--------

The Video Chat Embed is the easiest way to quickly add basic OpenTok functionality to your website using an embeddable HTML snippet.

Once implemented on your site, you can click the embed to connect to a "video chat room." Other users can then click on the embed in their own browser and join the same chat room. You can even create separate rooms with the same embed using the [room parameter](#creating-additional-rooms).

Video chat embeds are supported on all [browsers supported by the OpenTok.js library](/video/resources#supported-browsers).

**Limitations**

Currently video chat embeds only work on the web and provide basic audio-video chat functionality. Mobile app integration and advanced features such as archiving, screen sharing, and text chat are not included in video chat embed functionality.

To utilize advanced OpenTok features and mobile browser/app support, you will need to create a project in your [Video API account](https://tokbox.com/account/) and follow our [tutorials](/video/tutorials/) and developer guides.

**Quick links:**

* [Creating a Video Chat Embed](#creating-a-video-chat-embed)
* [Adding a Video Chat Embed to your web page](#adding-a-video-chat-embed-to-your-web-page)
* [Creating additional rooms](#creating-additional-rooms)
* [Use cases for multiple rooms](#use-cases-for-multiple-rooms)
* [Supported website platforms](#supported-website-platforms)
* [Sample app](#sample-app)
* [Support](#support)

Creating a Video Chat Embed
---------------------------

1.  Go to your [Video API account](https://tokbox.com/account) and **Create a Project** (either from the side menu or your Account Overview.)
    
2.  Select the **Embed** project option.
    
3.  Name your embed.
    
    You will use this name later to find the embed in your Video API account.
    
4.  Specify the width and height of the embed.
    
5.  Specify the website domain where you plan to use the embed.
    
    For example, if you will be adding the embed to your web page at example.com/test, enter `https://example.com`. Be sure to enter `http://` or `https://` followed by the domain name. (If you will be using localhost for testing, you can just enter `http://localhost` or `http://localhost:[port number]` for ports other than port 80.)
    
    **Important:** You should use an https (not http) URL. Browsers do not allow camera access on http pages. However, they do allow you to use http for local testing, such as `http://localhost` or `http://localhost:8080`.
    
6.  If you will be using a site builder such as Squarespace, Weebly, or Wordpress to host the site, select it in the **Built using** menu (optional).
    
7.  Click the **Create Embed** button.

After completing these steps, your embed code will be generated on the page. Copy this code and save it so you can add it to your website. You can get this code at any time by selecting an existing video chat embed in your Vonage Video API Account and clicking the **Copy Embed Code** button at the top of the Embed Overview.

#### Iframe vs. Script embeds

You can choose between using an **iframe** or **script** embed code. See the next two sections.

Adding a Video Chat Embed to your web page
------------------------------------------

What you'll need:

* Access to the HTML of your web page for editing
    
* The unique embed code from your Video API account (see [Creating a Video Chat Embed](#creating-a-video-chat-embed)).
    
Adding and testing the embed on your web page:

1.  With your web page HTML open in an editor, copy the embed code from your Video API account and paste it in the body of your HTML. The location where you paste it depends on where you want it to appear, but it must be somewhere between the `<body>` and `</body>` tags to show up on the page.
    
2.  Save the HTML and load it in your browser. You should now see a box with a **Click to Start Call** button.
    
3.  Click the button and you should connect to the video chat room. If necessary allow access to your camera and microphone. You should now see a video of yourself in the browser.
    
4.  To make sure video chat is working, mute your audio then open the same URL in another tab, browser or computer and click to start the call. You should now see two video streams in the embed.
    

Creating additional rooms
-------------------------

There are two types of embeds — **iframe** and **script** (see [above](#iframe-vs-script-embeds) for more on these). The two types have the following base formats:

**iframe**

**script**

In both cases, the end of the `src` URL is a parameter `room=DEFAULT`. This parameter specifies the "room" used by the embed — if multiple users access an embed with the same `embedId` and `room` parameters, they will begin a video chat session, where each user can view the other users' video stream(s). If the rooms do not match, they will not join the same room.

If you would like to use the same embed to create multiple separate rooms, you can change the "room" parameter to establish a new room. For example, you could create an embed with `room=group1` and another with `room=group2` — any user who accesses the "group1" room will be able to view streams from anyone else accessing the "group1" room, but will not be able to see users accessing the "group2" room.

Keep in mind that the maximum number of participants in any single **room** is three.

Use cases for multiple rooms
----------------------------

While the [room parameter](#creating-additional-rooms) is not required for creating a production app with embeds, there are several ways to leverage this feature to create a much more robust video application. Here are a few examples of how it can be used:

* **Programmatic room creation** — if you have an application that needs to dynamically connect individuals in private video chat rooms (for example a doctor and patient), your server-side application could generate unique "room" IDs for each meeting. You could then construct a video chat embed iframe or script snippet using that ID as the `room` parameter — the users would then load the dynamically created embed in their browser, joining the same room as any other users with the same room ID.
* **User generated rooms** — you could give users the ability to submit a room name via a form on your site before "creating" a chat room for others to join. You could then pass this room name to an embed as the `room` parameter. Other users could then enter the same room name to join the same video chat session.
* **Passing room IDs through a website URL** — if you would like to pass a room name via a url (ex. `www.example.com?room=group1`), you would simply need some client-side code to parse the URL and construct an embed when the user loads the page, passing the `room` parameter into the embed `src` URL.

Supported website platforms
---------------------------

Video Chat Embeds can currently be integrated into websites built with any of the following platforms:

* Wordpress hosted account (paid)
* Squarespace
* Zoho Sites

The following platforms are currently **not** compatible with embeds:

* Wordpress free account
* Weebly
* Wix

Additionally, embeds will not work properly with the following online code editors:

* Codepen.io
* JSFiddle
* JSBin

Sample app
----------

[This sample web app](https://github.com/opentok/opentok-video-embed-demo/) shows you how to generate dynamic video chat embed rooms for a 1-to-1 appointment workflow using Node.js. This can be used for a doctor-patient, student-teacher, or any other 1-to-1 scheduling application for the web.

Support
-------

If you're having trouble implementing your embed and can't find the answer on this page, you can [contact our support team](https://video-api.support.vonage.com/hc/en-us/requests/new).