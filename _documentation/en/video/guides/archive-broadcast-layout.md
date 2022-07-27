---
title: Layouts for composed archives and live streaming broadcasts
description: Video layouts for composed archives and live streaming broadcasts
product: video
---

# Video layouts for composed archives and live streaming broadcasts

There are a number of predefined layout types that you can use with composed archives and live streaming broadcasts. And you can use CSS to define custom layouts.


These layout options apply to composed archives (not individual archives) and live streaming broadcasts (not interactive broadcasts).

See [Customizing the video layout for composed archives](/video/guides/layout-control)

<!-- * OPT-TODO: See [Configuring video layout for live streaming broadcasts](/developer/guides/broadcast/live-streaming/#configuring-video-layout-for-opentok-live-streaming-broadcasts) -->

You can assign layout classes to streams to affect how they are displayed in an archive or broadcast's layout. This page includes the following sections:

* [Predefined layout types](#predefined-layout-types)

* [Assigning layout classes to streams](#assigning-layout-classes-to-vonage-video-streams)

* [Layout types for screen sharing](#layout-types-for-screen-sharing)

* [Stream prioritization rules](#stream-prioritization-rules)

* [Defining custom layouts](#defining-custom-layouts)

## Predefined layout types

There are four predefined layout types available: best fit, picture-in-picture, vertical presentation, and horizontal presentation. 

### Best Fit

This is the default initial layout type. This is a tiled layout, which scales according to the number of videos.

The number of columns and rows of varies depending on the number of streams in the broadcast.

For example, the following illustrates the layout when there are 1, 2, 4, or 5 streams in a session:

<img src="/images/video/bestFit1.png" alt="Vonage video API default layout 1" style="width: 20%;">
<img src="/images/video/bestFit2.png" alt="Vonage video API default layout 2" style="width: 20%;">
<img src="/images/video/bestFit4.png" alt="Vonage video API default layout 4" style="width: 20%;">
<img src="/images/video/bestFit5.png" alt="Vonage video API default layout 5" style="width: 20%;">

Layout classes on these streams will have no effect on the layout. Each position in the list will be translated to a position in the grid.

This layout supports up to 16 streams (in a grid).

Streams are included in the layout based on [stream prioritization rules](#stream-prioritization-rules).

To choose this layout, set the the `type` property to `"bestFit"`.

For archives, see [Specifying the initial layout type](/video/guides/layout-control#specifying-the-initial-layout-type) and [Dynamically changing the layout type during an archive recording](/video/guides/layout-control#dynamically-changing-the-layout-type-during-a-recording).

<!-- * OPT-TODO: For broadcasts, see [Specifying the initial layout type](/developer/guides/broadcast/live-streaming/#initial-layout-type) and [Dynamically changing the layout type during a live streaming broadcast](/developer/guides/broadcast/live-streaming/#changing-layout-type). -->

### Picture-in-Picture

This is a picture-in-picture layout, where a small stream is visible over a full-size stream.

<img src="/images/video/pip.png" alt="Vonage video API pip layout" style="width: 20%;">

**C = corner**

Set the layout class of the full-size stream to `"full"`. (See [Assigning layout classes to streams](#assigning-layout-classes-to-vonage-video-streams).)

The first stream without this class occupies the corner position.

If more than two streams are present in the archive or broadcast, only the first two streams will be visible in the output. 

To choose this layout, set the `type` property to `"pip"`.

For archives, see [Specifying the initial layout type](/video/guides/layout-control#specifying-the-initial-layout-type) and [Dynamically changing the layout type during an archive recording](/video/guides/layout-control#dynamically-changing-the-layout-type-during-a-recording).

<!-- OPT-TODO * For broadcasts, see [Specifying the initial layout type](/developer/guides/broadcast/live-streaming/#initial-layout-type) and [Dynamically changing the layout type during a live streaming broadcast](/developer/guides/broadcast/live-streaming/#changing-layout-type). -->

### Vertical Presentation

This is a layout with one large stream on the right edge of the output, and several smaller streams along the left edge of the output.

<img src="/images/video/verticalPresentation.png" alt="Vonage video API vertical layout" style="width: 20%;">

Set the layout class of the focus stream to `"focus"`. (See [Assigning layout classes to streams](#assigning-layout-classes-to-vonage-video-streams).) The streams without the focus class will occupy the left edge and divide the space evenly.

For landscape orientation videos (640x480, 1280x720, 1920x1080), this layout supports 1 focus stream and up to 5 other streams (or up to 7 for 1920x1080 videos).

For portrait orientation videos (480x640, 720x1280, and 1080x1920), this layout supports 1 focus stream and up to 8 other streams (or 10 other streams for 1080x1920).

To choose this layout, set the the `type` property to `"verticalPresentation"`:

* For archives, see [Specifying the initial layout type](/video/guides/layout-control#specifying-the-initial-layout-type) and [Dynamically changing the layout type during an archive recording](/video/guides/layout-control#dynamically-changing-the-layout-type-during-a-recording).

<!-- OPT-TODO: * For broadcasts, see [Specifying the initial layout type](/developer/guides/broadcast/live-streaming/#initial-layout-type) and [Dynamically changing the layout type during a live streaming broadcast](/developer/guides/broadcast/live-streaming/#changing-layout-type). -->

### Horizontal Presentation

This is a layout with one large stream on the top edge of the output, and several smaller streams along the bottom edge of the output.

<img src="/images/video/horizontalPresentation.png" alt="Vonage video API vertical layout" style="width: 20%;">

There is one layout class used to specify the position of streams in this layout: `focus`. (See [Assigning layout classes to streams](#assigning-layout-classes-to-vonage-video-streams)).

The streams without this class will occupy the bottom edge and divide the space evenly.

The positions can be visualized as such:

For landscape orientation videos (640x480, 1280x720, and 1920x1080), this layout supports 1 focus stream and up to 5 other streams (or up to 7 for 1920x1080 videos).

For portrait orientation videos (480x640, 720x1280, and 1080x1920), this layout supports 1 focus stream and up to 3 other streams.

To choose this layout, set the the `type` property to `"horizontalPresentation"`:

For archives, see [Specifying the initial layout type](video/guides/layout-control#specifying-the-initial-layout-type) and [Dynamically changing the layout type during an archive recording](/video/guides/layout-control#dynamically-changing-the-layout-type-during-a-recording).

<!-- OPT-TODO: * For broadcasts, see [Specifying the initial layout type](/developer/guides/broadcast/live-streaming/#initial-layout-type) and [Dynamically changing the layout type during a live streaming broadcast](/developer/guides/broadcast/live-streaming/#changing-layout-type). -->

## Assigning layout classes to Vonage Video streams

When using a layout type other than the default Best Fit, you must set the layout class for the Vonage Video streams to use, based on the layout type:

* If you use the Picture-in-Picture layout, set one stream to use the `full` layout class.
* If you use the Horizontal-Presentation layout, set one stream to use the `focus` layout class.
* If you use the Vertical-Presentation layout, set one stream to use the `focus` layout class.

### Setting the initial layout class list for a client's streams

When you create a token for a client to connect to the session, you can (optionally) specify the initial layout class list for streams published by the client.

To do this, generate a token that includes the initial layout class list setting.

<!-- The following examples use the OpenTok Java, Node, PHP, Python, Ruby, and .NET SDKs.  -->

The following examples use the Node, and PHP SDKs. 

<!-- Java:

```java
import com.opentok.OpenTok;
import com.opentok.TokenOptions;

OpenTok opentok = new OpenTok(appId, apiSecret)
List<String> classList = List.of("focus", "bar", "inactive");
String token = session.generateToken(new TokenOptions.Builder()
  .initialLayoutClassList(classList)
  .build());
``` -->

Node:

```js
var OpenTok = require('opentok'),
    opentok = new OpenTok(appId, apiSecret);

opentok.createSession({mediaMode:"routed"}, function(err, session) {
  if (err) return console.log(err);

  token = session.generateToken({
    expireTime : (new Date().getTime() / 1000)+(7 * 24 * 60 * 60), // in one week
    data :       'name=Johnny',
    initialLayoutClassList : ['focus', 'inactive']
  });
});
```

PHP:

```php
use Vonage\Video\Role;

// Generate a Token from just a sessionId (fetched from a database)
$token = $client->video()->generateToken($sessionId);
// Generate a Token by calling the method on the Session (returned from createSession)
$token = $session->generateToken();

// Set some options in a token
$token = $session->generateToken(array(
    'initialLayoutClassList' => ['focus']
));
```
<!-- 
Python:

```python
from opentok import OpenTok
from opentok import MediaModes
from opentok import Roles

opentok = OpenTok(app_id, api_secret)
session = opentok.create_session(media_mode=MediaModes.routed)
token = session.generate_token(expire_time=int(time.time()) + 10,
                               data=u'name=Johnny'
                               initial_layout_class_list=[u'focus'])
```

Ruby:

```ruby
opentok = OpenTok::OpenTok.new app_id, api_secret

session = opentok.create_session :media_mode => :routed
token = session.generate_token({
    :role                      => :moderator
    :expire_time               => Time.now.to_i+(7 * 24 * 60 * 60) # in one week
    :data                      => 'name=Johnny',
    :initial_layout_class_list => ['focus', 'inactive']
});
```

.NET:

```csharp
List< string >  initialLayoutClassList = new List<string>()
{
    "focus"
};
string token = session.GenerateToken(initialLayoutClassList: initialLayoutClassList);
``` -->

### Modifying the layout class list for a stream

You can dynamically change the layout class list for a stream by calling the  `/session/{sessionId}/stream` REST API.

Make a PUT request to the following URL:

```
https://api.opentok.com/v2/project/{appId}/session/{sessionId}/stream
```

Set the Content-Type to `"application/json"` and include the layout class list as a property of the JSON data in the PUT request:

```json
{
  "items": [
    {
      "id": "8b732909-0a06-46a2-8ea8-074e64d43422",
      "layoutClassList": ["full"]
    }
  ]
}
```

The `id` property is the stream ID. Note that you can update the layout class list for multiple streams by passing in multiple JSON objects in the items array.

The request returns a 400 response code if you specify an invalid layoutClassList value. The value must be an array of strings.

You can also modify the layout class list for a stream using the server SDKs:

<!-- * Java — OPT-TODO: [`OpenTok.setStreamLayouts()`](/developer/sdks/java/reference/com/opentok/OpenTok.html#setStreamLayouts-java.lang.String-com.opentok.StreamListProperties-) -->

* Node — [`OpenTok.setStreamClassLists()`](https://github.com/opentok/opentok-node/blob/fc4538b606901bf7f3f902cd48fd7e3267f473e9/lib/client.js#L412)
* PHP — [`OpenTok->updateStream()`](https://github.com/opentok/OpenTok-PHP-SDK/blob/97028cca81f75e34f92c3bb998ed6941d2707472/src/OpenTok/OpenTok.php#L808)

<!-- * Python — [`opentok.set_stream_class_lists()`](/developer/sdks/python/reference/opentok.html#opentok.opentok.OpenTok.set\_stream\_class\_lists) -->

<!-- * Ruby — [`Streams.layout()`](/developer/sdks/ruby/reference/OpenTok/Streams.html#layout-instance\_method) -->

<!-- * .NET — [`OpenTok.SetStreamClassLists()`](/developer/sdks/dot-net/reference/class\_open\_tok\_s\_d\_k\_1\_1\_open_tok.html#ae46ea344652e7d82eb5c681be5d5c2fd) -->

### Getting the layout class list for a stream

<!-- OPT-TODO [/session/{sessionId}/stream/{streamId} REST API](/developer/rest/#get-stream-info) -->

You can get the layout class list for a stream by calling the REST API `/session/{sessionId}/stream/{streamId}`. Make a GET request to the following URL:

```
https://api.opentok.com/v2/project/{appId}/session/{sessionId}/stream/{streamId}
```

The response includes JSON data, which includes a `layoutClassList` array:

```json
{
  "id": "8b732909-0a06-46a2-8ea8-074e64d43422",
  "videoType": "camera",
  "name": "",
  "layoutClassList": ["full"]
}
```

* The `layoutClassList` property is an array of the layout classes for the stream.
* The `id` property is the stream ID.
* The `videoType` property is set to "camera", "screen", or "custom". A "screen" video uses screen sharing on the publisher as the video source; a "custom" video is published by a web client using an HTML VideoTrack element as the video source.
* The `name` property is the stream name (if one was set when the client published the stream).

The request returns a 408 error response code if you specify an invalid stream ID.

You can also get the layout class list for a stream using the server SDKs:

<!-- * Java — [`OpenTok.listStreams()`](/developer/sdks/java/reference/com/opentok/OpenTok.html#listStreams-java.lang.String-) (call the `getLayoutClassList()` method of each Stream object) -->

* Node — [`OpenTok.getStream()`](/developer/sdks/node/reference/OpenTok.html#getStream) (call the `getLayoutClassList()` method of the Stream object)
* PHP — [`OpenTok->getStream()`](/developer/sdks/php/reference/classes/OpenTok.OpenTok.html#method\_getStream) (check the `layoutClassList` property of the Stream object)

<!-- * Python — [`opentok.get_stream()`](/developer/sdks/python/reference/opentok.html#opentok.opentok.OpenTok.get\_stream) (check the `layoutClassList` property of the Stream object) -->

<!-- * Ruby — [`opentok.streams.find()`](/developer/sdks/ruby/reference/OpenTok/Streams.html#find-instance\_method) (check the `layoutClassList` property of the Stream object) -->

<!-- * .NET — [`OpenTok.GetStream()`](/https://tokbox.com/developer/sdks/dot-net/reference/class\_open\_tok\_s\_d\_k\_1\_1\_open_tok.html#abf1fcf82065ee5068d439455a75fbadb) (check the `LayoutClassList` property of the Stream object) -->

### Getting the layout class list for multiple streams

<!-- OPT-TODO [/session/{sessionId}/stream REST API](/developer/rest/#get-stream-info) -->

You can get the layout class list for all streams in a session by calling the REST API `/session/{sessionId}/stream`. Make a GET request to the following URL:

```
https://api.opentok.com/v2/project/{appId}/session/{sessionId}/stream/
```

The response includes JSON data, which includes an `items` property, which is array containing layout information for streams in the session:

```json
{
  "count": 2
  "items": [
    {
      "id": "8b732909-0a06-46a2-8ea8-074e64d43422",
      "videoType": "camera",
      "name": "",
      "layoutClassList": ["full"]
    },
    ...
  ]
}
```

* The `layoutClassList` property is an array of the layout classes for the stream.
* The `id` property is the stream ID.
* The `videoType` property is set to "camera", "screen", or "custom". A "screen" video uses screen sharing on the publisher as the video source; a "camera" video is published by a web client using an HTML VideoTrack element as the video source.
* The `name` property is the stream name (if one was set when the client published the stream).

## Layout types for screen sharing

You can specify a layout type to use when there is a screen-sharing stream live in the session.

For a composed archive, set the `screenshareType` option when [specifying the initial layout type](video/guides/layout-control#specifying-the-initial-layout-type) and when [dynamically changing the layout type during an archive recording](/video/guides/layout-control#dynamically-changing-the-layout-type-during-a-recording).

<!-- OPT-TODO: * For broadcasts, set the `screenshareType` option when [specifying the initial layout type](/developer/guides/broadcast/live-streaming/#initial-layout-type) and when [dynamically changing the layout type during a live streaming broadcast](/developer/guides/broadcast/live-streaming/#changing-layout-type). -->

You can set this screen-sharing layout type (`screenshareType`) to one of the following layout types:

* `bestFit` — This uses the [best fit](#best-fit) layout. However, only screen-sharing streams are included in the layout.
* `horizontalPresentation` — This uses the [horizontal presentation](#horizontal-presentation) layout. However, the screen-sharing stream (not a stream with a `focus` class applied) will occupy the focus position in the layout.
* `verticalPresentation` — This uses the [vertical presentation](#vertical-presentation) layout. However, the screen-sharing stream (not a stream with a `focus` class applied) will occupy the focus position in the layout.
* `pip` — This uses the [Picture-in-Picture](#picture-in-picture) layout. However, the screen-sharing stream (not a stream with a `full` class applied) will occupy the full position in the layout. The smaller video in the layout will be determined based on [stream prioritization rules](#stream-prioritization-rules). For example, if the client that publishes the screen-sharing stream is also publishing a stream with a camera video source, that video will occupy the smaller video position (unless another stream has a higher prioritization, for example because it has been assigned a layout class).

When there is a screen-sharing stream live in the session, the archive or broadcast uses the screen-sharing layout type you specify. When there is no screen-sharing video in the session, the archive or broadcast uses the best fit layout. (When you specify a `screenshareType`, you must set the main `layout type` to `bestFit`.

## Stream prioritization rules

Composed archives and live streaming broadcasts can include up to 16 video streams at a time.

The layout composer uses the following rules to determine the prioritization of which video streams are included in the archive or broadcast, and to determine how the streams will be ordered and added to the virtual DOM.

Streams are categorized into two tiers:

* Upper-tier streams — Streams that have been [assigned a layout class](#assigning-layout-classes-to-vonage-video-streams)
* Lower-tier streams — Streams that have no associated layout classes

The stream prioritization is determined:

* Upper-tier streams (streams that have been assigned layout classes) are prioritized in this order:
  * Screen-sharing streams
  * Non-screen-sharing streams that are published by clients that are also publishing screen-sharing streams
  * All other streams (ordered by the time they are added to the list of streams to be included in the archive or broadcast)
* Lower-tier streams (streams that have *not* been assigned layout classes) are then prioritized next in this order:
  * Screen-sharing streams
  * Non-screen-sharing streams that are published by clients that are also publishing screen-sharing streams
  * Streams that are published by clients that are also publishing upper-tier streams (streams that have been assigned layout classes)
  * All other streams (ordered by the time they are added to the list of streams to be included in the archive or broadcast)
  
The video streams included in the composed archive or broadcast are chosen based on their prioritization.

The streams will always be ordered according to these rules. As long as there are two or more streams, they will be added to the virtual DOM based on this order.

When a client stops streaming video, it is removed from the composed video. When it resumes streaming video, it is added back to the composed video if it is prioritized higher than other clients (based on these prioritization rules).

Composed videos can include up to 16 client video streams.

If a composed archive or broadcast reaches the maximum capacity for included streams and a client publishing an included stream disconnects, space is freed up for a new stream.

The next highest priority video stream will be included and rendered.

**Notes:**

* These stream prioritization rules apply regardless of whether the `streamMode` of the archive or broadcast is set to `"auto"` or `"manual"`.

<!-- OPT-TODO: See [Selecting streams to be included in composed archives](/developer/guides/broadcast/live-streaming#selecting-streams-to-be-included-in-live-streaming-broadcasts) and [Selecting streams to be included in live streaming broadcasts](/developer/guides/broadcast/live-streaming#selecting-streams-to-be-included-in-live-streaming-broadcasts) -->

* Composed archives and live streaming broadcasts can include up to 50 *audio* streams. The first 50 published streams that include audio are mixed into the output audio for the archive or broadcast.

## Defining custom layouts

In addition to the [predefined layouts](#predefined-layout-types), you can use CSS to define your own custom layout for composed archives and live streaming broadcasts. To use a custom layout, set the type property for the layout to "custom" and set an additional property, `stylesheet`, which is set to the CSS:

* For archives, see [Specifying the initial layout type during an archive recording](/video/guides/layout-control#specifying-the-initial-layout-type) and [Dynamically changing the layout type during an archive recording](/video/guides/layout-control#dynamically-changing-the-layout-type-during-a-recording).)

<!-- OPT-TODO * For broadcasts, see [Specifying the initial layout type](/developer/guides/broadcast/live-streaming/#initial-layout-type) and [Dynamically changing the layout type during a live streaming broadcast](/developer/guides/broadcast/live-streaming/#changing-layout-type).) -->

CSS used in the `stylesheet` property of the layout resource will apply to a virtual DOM, which can be described in the following format:

For a broadcast:

   ```html
   <broadcast class="container">
   <stream class="{layoutClassList}" />
   <stream class="{layoutClassList}" />
   <stream class="{layoutClassList}" />
   ...
   </broadcast>
   ```

For an archive:

   ```html
   <archive class="container">
   <stream class="{layoutClassList}" />
   <stream class="{layoutClassList}" />
   <stream class="{layoutClassList}" />
   ...
   </archive>
   ```

**Note:** By default, the composed archive or broadcast resolution is 640x480 pixels (SD landscape). You can also set a composed archive or broadcast to use a 480x640 (SD portrait), 1280x720 (HD landscape), 720x1280 (HD portrait), 1920x1080 (FHD landscape), or 1080x1920 (FHD portrait) resolution.

<!-- OPT-TODO:[start archive](/developer/rest/#start_archive)
[start broadcast](/developer/rest/#start_broadcast) -->

when you call the start archive or the start broadcast method of the REST API. 640x480-pixel and 480x640-pixel (SD) archives have 4:3 and 3:4 aspect ratios. 1280x720-pixel, 720x1280-pixel, 1920x1080-pixel, and 1080x1920-pixel (HD and FHD) archives have 16:9 and 9:16 aspect ratios. 

Keep these aspect ratios in mind when defining the CSS for a custom layout.

### Rules

The following default rules are applied to the `<archive>` element:

```css
archive {
  position: relative;
  margin:0;
  width: 640px;
  height:480px;
  overflow: hidden;
}
```

Similarly, the following default rules are applied to the `<broadcast>` element:

```css
broadcast {
  position: relative;
  margin:0;
  width: 640px;
  height:480px;
  overflow: hidden;
}
```

<!-- OPT-TODO:[start archive](/developer/rest/#start_archive)
[start broadcast](/developer/rest/#start_broadcast) -->

The default dimensions are 640x480 pixels (SD landscape). You can also set a composed archive or broadcast to use a 480x640 (SD portrait), 1280x720 (HD landscape), 720x1280 (HD portrait), 1920x1080 (FHD landscape), or 1080x1920 (FHD portrait) resolution when you call the start archive or start broadcast method of the REST API.

The following default rules are applied to elements:

```css
stream {
  display: block;
  margin: 0;
}
```

> Note: The container resolution is fixed and cannot be overridden by CSS.

### Selectors

The following CSS selectors are supported:

* Type selectors are supported for only stream elements (stream).
* Class selectors (such as `.instructor`) are supported (and preferred), and can be used to select any group of streams or individual stream.
* Adjacent sibling and general sibling combinators are supported (`sibling-one + sibling-two`, `sibling-one ~ sibling-two`).

The following pseudo-class selectors are supported:

* `:first-child`
* `:last-child`
* `:nth-child(n)`
* `:nth-last-child(n)`

The following CSS selectors are not supported:
* The universal selector is not supported (`*`).
* Descendent selectors are not supported (`parent ancestor`, `parent * ancestor`).
* Child selectors are not supported (`parent > child`).
* ID selectors are not supported (for example, `#myidentifier`).
* Attribute selectors are not supported (for example, `[data-title*="my-title"]`).
* Pseudo-element selectors are not supported.

### Properties

The following table describes the supported CSS properties and their possible values:

| Name | Value |
| --- | --- |
| `width`, `height` | positive number ( `px`/ `%`) |
| `min-width`, `min-height` | positive number ( `px`/ `%`) |
| `max-width`, `max-height`] | positive number ( `px`/ `%`) |
| `left`, `right`, `top`, `bottom` | number ( `px`/ `%`) |
| `margin`, `margin-left`, `margin-right`, `margin-top`, `margin-bottom` | number ( `px`/ `%`) |
| `z-index` | positive number |
| `position` | `'relative'`, `'absolute'` |
| `display` | `'inline'`, `'block'`, `'inline-block'` |
| `float` | `'none'`, `'left'`, `'right'` |
| `object-fit` | `'contain'` (the default), `'cover'` |
| `overflow` | `'hidden'` |
| `clear` | `'none'`, `'left'`, `'right'`, `'both'`, `'initial'`, `'inherit'` |

### Sample CSS

The following CSS arranges two streams with class names `main` and `lower-left`:

```css
stream.main {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}
stream.lower-left {
  position: absolute;
  left: 10%;
  bottom: 10%;
  width: 20%;
  height: 20%;
  z-index: 200;
}
```

The following CSS is based on the best fit [predefined layout](#predefined-layout-types):

```css
stream {
  float: left;
}
stream:first-child:nth-last-child(1) {
  width: 100%;
  height: 100%;
}

stream:first-child:nth-last-child(2),
stream:first-child:nth-last-child(2) ~ stream {
  width: 50%;
  height: 100%;
}
stream:first-child:nth-last-child(3),
stream:first-child:nth-last-child(3) ~ stream,
stream:first-child:nth-last-child(4),
stream:first-child:nth-last-child(4) ~ stream {
  width: 50%;
  height: 50%;
}
stream:first-child:nth-last-child(5),
stream:first-child:nth-last-child(5) ~ stream,
stream:first-child:nth-last-child(6),
stream:first-child:nth-last-child(6) ~ stream,
stream:first-child:nth-last-child(7),
stream:first-child:nth-last-child(7) ~ stream,
stream:first-child:nth-last-child(8),
stream:first-child:nth-last-child(8) ~ stream,
stream:first-child:nth-last-child(9),
stream:first-child:nth-last-child(9) ~ stream
{
  width: 33.33%;
  height: 33.33%;
}
```

The following CSS is based on the horizontal presentation [predefined layout](#predefined-layout-types):

```css
stream {
  float:left;
  margin-top: 60%;
  width: 20%;
  height: 20%;
}
stream.focus {
  position: absolute;
  top: 0;
  left: 0;
  margin-top: 0px;
  height: 80%;
  width: 100%;
}
```

The following CSS is based on the vertical presentation [predefined layout](#predefined-layout-types):

```css
stream {
  float: left;
  left: 0px;
  clear: left;
  width: 20%;
  height: 20%;
}
stream.focus {
  position: absolute;
  top: 0;
  left: 0;
  margin: 0px;
  left: 20%;
  height: 100%;
  width: 80%;
}
```

The following CSS is based on the picture-in-picture [predefined layout](#predefined-layout-types):

```css
stream.full {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 100;
}
stream {
  position: absolute;
  right: 10%;
  top: 10%;
  width: 20%;
  height: 20%;
  z-index: 200;
}
```

> **Note:** The CSS used by the predefined layouts are subject to change.