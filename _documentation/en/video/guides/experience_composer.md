---
title: Experience Composer (beta)
meta_title: Vonage Video API Experience Composer lets you capture views of your web application
description: Use the Vonage Video Experience Composer to capture audio and video of a web application. This is a beta feature.
---

# Experience Composer (Beta)

Experience Composer is an API-driven cloud service to capture the entire experience of your web application using the Vonage Video API. You can use Experience Composer for composite recordings, broadcasts, synchronized group viewing, and in the future, SIP connections.

Web applications use UI libraries to build rich UI/UX experiences for end users. This experience entails time-synchronized web elements, custom layouts, and dynamic web components, such as application UI, chat widgets, participant reactions, and whiteboards.

Using Experience Composer, you can capture a view of your web application into a stream published to a Vonage Video session. This composed stream can be used for archive recording, broadcasting, and streaming into other interactive Vonage Video sessions, while keeping the rich UI/UX experiences delivered to users intact.

Experience Composer is only compatible with routed sessions (sessions that use the [Vonage Video Media Router](/video/guides/create-session#the-media-router-and-media-modes)).

Note that this feature is only available as a REST API interface in the current phase. See the [REST documentation](/api/video) for more information.

## Getting Started

To start using Experience Composer, enable the feature for your Vonage Video API account:

1. Go to your [Video API account](https://ui.idp.vonage.com/ui/auth/login) and click **Account Settings** in the left-hand menu.

2. In the list of Account add-ons, find **Experience Composer** and click **Add to account**.

After enabling Experience Composer for the account, enable it for each project that will use Experience Composer:

1. Go to your [Video API account](https://ui.idp.vonage.com/ui/auth/login) and select the project from the list of projects in the left-hand menu.

2. Under **Project settings**, find **Experience Composer** and click **Configure**.

## Configuring callbacks

You can register a callback URL to receive Experience Composer events:

1. Go to your [Video API account](https://ui.idp.vonage.com/ui/auth/login) and select the project from the list of projects in the left-hand menu.

2. Under **Project settings**, find **Experience Composer** and click **Configure**.

3. Submit the URL for callbacks to be sent to.

When the status of an Experience Composer changes, an HTTP POST will be delivered to the URL configured. If no callback URL is configured, no status update will be delivered. The raw data of the HTTP request is a JSON-encoded message of the following form:

```json
{
  "id": "&lt;experience-composer-id&gt;",
  "sessionId": "&lt;session-id&gt;",
  "streamId": "&lt;output-stream-id&gt;",
  "status": "stopped",
  "reason": "Max duration exceeded."
}
```

The JSON object includes the following properties:

* `id`:  The unique ID for the Experience Composer.
* `sessionId`: The Vonage Video session ID.
* `streamId`: The ID of the composed stream being published. The streamId may not be available when the status is `"failed"`.
* `status`: The status of the Experience Composer. This property is set to one of the following:
    * `"started"`: The Vonage Video API platform has successfully connected to the remote application server
      and is publishing the web view to a Vonage Video stream.
    * `"stopped"`: The Experience Composer has stopped.
    * `"failed"`: An error occurred and the Experience Composer could not proceed. This may occur at startup if the Vonage Video
      server cannot connect to the remote application server or republish the stream. It may also occur at any point during
      the process due to a Vonage Video API platform error.
* `reason`: This field is only available when the status is either `"stopped"` or `"failed"`. If the status is "stopped", the reason field will contain either "Max Duration Exceeded" or "Stop Requested." If the status is "failed", the reason will contain a more specific error message.

## Use cases

You can use an Experience Composer stream in a variety of ways. Here are a few possibilities for using Experience Composer to expand on Vonage Video archiving and broadcast features.

### Experience Composer Archive

You can use the Vonage Video [archive](/video/guides/archiving/overview) feature to record audio and video of a Vonage Video session. However, the video layout for the composed archive is limited to supported [video layout options](/video/guides/layout-control).

You can use Experience Composer to use your site's *actual* layout for the archive layout:

1. Create an Experience Composer, with the URL pointing to a web page that subscribes to the streams in a session, applying the appropriate layout.

2. Have the Experience Composer publish the page to a stream in a new Vonage Video session.

3. Use the [Vonage Video REST API](/api/video?#archives) or Vonage Video server SDK method to archive the Experience Composer stream.

   Set the resolution of the archive to match the resolution of the Experience Composer
   (which is set when you start the Experience Composer).

<!-- OPT-TODO: ### Experience Composer Broadcast

With the Vonage Video [live streaming broadcast feature](/guides/broadcast/live-streaming/), you can broadcast a Vonage Video session to an HLS or RTMP stream. However, the video layout for a live streaming broadcast is limited to supported [video layout options](/guides/archive-broadcast-layout).

You can use Experience Composer to use your site's *actual* layout for the broadcast layout:

1. Create an Experience Composer, with the URL pointing to a web page that subscribes to the streams in a session, applying the appropriate layout.

2. Have the Experience Composer publish the page to a stream in a new Vonage Video session.

3. Use the [Vonage Video REST API](/developer/rest/#start_broadcast) or Vonage Video server SDK method to broadcast the Experience Composer stream to an HLS or RTMP stream.

  Set the resolution of the archive to match the resolution of the Experience Composer
  (which is set when you start the Experience Composer).

### Expand live interactive broadcasts to include more participants (up to millions)

Vonage Video live streaming broadcasts let you up to 15,000 clients view an interactive Vonage Video session. The number supported depends on the number of clients publishing streams in the session (see the [Live interactive broadcasts](/developer/guides/broadcast/live-interactive-video/) guide).

You can use Experience Composer to expand the number of viewers:

1. Create an Experience Composer, with the URL pointing to a web page that subscribes to the streams in the main Vonage Video session to be broadcast.

2. Have the Experience Composer publish the page to a new Vonage Video session.

3. Repeat this with a number of other Experience Composer instances — each subscribing to the streams in the first session and publishing them to a new session.

4. Your application server will send the session IDs for the *Experience Composer sessions* to each of the viewing clients (clients that are not publishing to the first session). The application server will need to keep track of how many clients are added to each experience composer session, so that no more than 15,000 connect to any one.

The resulting array of Experience Composer sessions will support up to 15,000 * (15,000 - 2) viewers (224,970,000 viewers) when there are two publishers. For other numbers of publishers, see the table of supported clients in the [Live interactive broadcasts](/guides/broadcast/live-interactive-video/) guide, and this technique will support `15,000 * ([number supported from that table] - [number of publishers]) ` clients.

<img src="/developer/img/docs/experience-composer-live-interactive-broadcast.png"></img> -->

### Other use cases

The first three use cases described here show how to use Experience Composer to enhance the Vonage Video archive and broadcast features. These uses cases have Experience Composer create a stream in a new Vonage Video session, separate from the session being archived or broadcast. However, you can also use Experience Composer to capture any web page and send it as an audio-video stream into a Vonage Video session for others to view. The page may include audio and video from sources other than Vonage Video streams. Or it may include dynamic content with complex UI layout that clients connected to the Vonage Video session can view.

## View data in Insights API

You can use the [Insights API](https://insights.opentok.com) to view Experience Composer usage data:
 
You can track these usage statistics, in line with the use cases mentioned above:

* `experienceComposer` - The total minutes Experience Composer publishes to
  a video session not connected to any archiver or broadcast composer.

* `experienceComposerArchive` - The total minutes Experience Composer publishes to
  a video session connected to an archiver.

* `experienceComposerBroadcast` - The total minutes Experience Composer publishes to
  a video session connected to a broadcast composer.

## Known issues
* Experience Composer can cause sound distortion in some cases, such as when used with music. This issue will be fixed in upcoming versions.
* The option to specify a name for an Experience Composer is currently not available. This will be added in an upcoming version.