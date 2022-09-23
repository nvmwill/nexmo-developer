---
title: Screen Sharing
description: Use the Vonage Video API to do screen sharing between users of your web application. Learn how to get screen sharing working by publishing a video stream of your screen others can view.
product: video
navigation-weight:
---

# Screen Sharing

You can publish a stream that uses a video view of your screen (instead of a camera) as the source.

A client connected to the session can subscribe to a screen-sharing stream (and view it) as they would subscribe to a stream that uses a camera as the source. (No browser extension is required to _subscribe_ to a screen-sharing stream.)

**Important:** As of Chrome 72+, Firefox 52+, and Opera 59+, an extension is no longer needed for screen sharing. The browser prompts the end user for access to the screen as it would for access to the camera.

In older versions of Opera and Chrome, to publish a screen-sharing video, the client needs to add an extension that enables publishing screen-sharing streams for your domain. (See [Developing a screen-sharing extension](#developing-a-screen-sharing-extension-deprecated).)

**Note:** On macOS 10.15+ (Catalina), to publish a screen-sharing stream the user must grant the browser access to the screen in macOS System Preferences > Security & Privacy > Privacy > Screen Recording. Otherwise, the Publisher will dispatch an `accessDenied` event.

The Vonage Video plugin for Internet Explorer has screen-sharing support built in. (Note that support for the Vonage Video plugin for Internet Explorer is removed in Vonage Video 2.17.)

In Electron, screen sharing is supported if the `webPreferences.contextIsolation` option of the Electron BrowserWindow is set to `false` or if the app uses a preload script to access the desktop capturer. For details, see [Enabling screen-sharing in Electron](#enabling-screen-sharing-in-electron).

Publishing screen-sharing streams is currently **not** supported in Safari on iOS or in Safari 12 and older on macOS.

In all supported browsers, publishing a screen-sharing stream requires the page to be loaded over HTTPS.

This topic includes the following sections:

* [Quick Start](#quick-start)
* [Developing a screen-sharing extension (deprecated)](#developing-a-screen-sharing-extension-deprecated)
* [Checking for screen-sharing publishing support](#checking-for-screen-sharing-support)
* [Publishing a stream with a screen-sharing source](#publishing-a-stream-with-a-screen-sharing-source)
* [Setting the maximum resolution of the stream](#setting-the-maximum-resolution-of-the-stream)
* [Cropping or letter-boxing screen-sharing videos](#cropping-or-letter-boxing-screen-sharing-videos)
* [Determining the video type ("screen" or "camera") for a stream](#determining-the-video-type-screen-or-camera-for-a-stream)
* [Detecting when video dimensions change](#detecting-when-video-dimensions-change)
* [Determining when the user stops sharing the screen](#determining-when-the-user-stops-sharing-the-screen)
* [Subscribing to screen-sharing streams](#subscribing-to-screen-sharing-streams)
* [Enabling screen-sharing in Electron](#enabling-screen-sharing-in-electron)
* [Optimizing video performance of certain screen-sharing streams](#optimizing-video-performance-of-certain-screen-sharing-streams)

## Quick Start

Publishing screen-sharing videos is supported in Chrome, Firefox, Opera, Chromium-based versions of Edge (versions 79+), and Safari 13+. It is currently _not_ supported in mobile browsers, Safari 12 and older on macOS. Publishing a screen-sharing stream is only supported when the web page is loaded via HTTPS.

**Note:** To support screen-sharing in older versions of Chrome and Opera, you must create a screen-sharing extension. See the following GitHub repository: [https://github.com/opentok/screensharing-extensions](https://github.com/opentok/screensharing-extensions).

No extension is required to subscribe to a screen-sharing video stream, which is possible in all browsers that support the Vonage Video API.

## Developing a Screen-Sharing Extension (Deprecated)

**Important:** Screen sharing extensions are not required in the latest versions of Chrome, Firefox, and Opera.

To support screen-sharing in older versions of Chrome and Opera, you must create a screen-sharing extension. See the following GitHub repository for sample code for screen-sharing extensions:

[https://github.com/opentok/screensharing-extensions](https://github.com/opentok/screensharing-extensions)

## Checking for Screen-Sharing Support

To check if publishing a screen-sharing stream is supported in the client browser, call the `OT.checkScreenSharingCapability()` method. This method takes one parameter: a callback function. The callback function is passed a `response` object. This object has the following properties that indicate support for publishing screen-sharing streams in the client:

* `supported` — (Boolean) Whether sharing is supported.
* `supportedSources`— Deprecated. In older browser versions, you could select a type of screen-sharing source (such as `"application"`, `"screen"`, or `"window"` by setting the `videoSource` property of the options passed into the `OT.initPublisher()` method. However, in current browsers that support screen sharing, passing in any of these values results in the same behavior — the browser displays a dialog box in which the end user selects the screen-sharing source (which can be the entire screen or a specific window). In Electron, screen sharing captures the entire screen, without prompting the user for permission.

The options parameter also includes the following properties, which apply to screen-sharing support in older versions of Chrome and Opera, which require screen-sharing extensions — in other browsers, they are undefined:

* `extensionRequired` (String) — Set to "chrome" in older versions of Chrome (prior to Chrome 72) and Opera (prior to Opera 59), which require a screen sharing extension to be installed.
* `extensionRegistered` (Boolean) — In older versions of Chrome (prior to Chrome 72) and Opera (prior to Opera 59), this property is set to `true` if a screen-sharing extension is registered; otherwise it is set to `false`. Use the `OT.registerScreenSharingExtension()` method to register an extension in Chrome or Opera.
* `extensionInstalled` (Boolean) — If an extension is required, this is set to `true` if the extension is installed (and registered, if needed); otherwise it is set to `false`.

_Note:_ Screen sharing is only supported when the web page is loaded via HTTPS.

The following example shows how to check for screen-sharing support:

```javascript
OT.checkScreenSharingCapability(function(response) {
  if(!response.supported || response.extensionRegistered === false) {
    // This browser does not support screen sharing
  }
});
```

## Publishing a Stream with a Screen-Sharing Source

The `videoSource` property of the options parameter of the `OT.initPublisher()` method defines the video source for the stream to be published. For screen-sharing, set this property to `"screen"`. In older browser versions, you could also pass in `"application"` or `"window"` to specify a type of screen-sharing source. However, in current browsers that support screen sharing, passing in any of these values results in the same behavior — the browser displays a dialog box in which the end user selects the screen-sharing source (which can be the entire screen or a specific window). In Electron, screen sharing captures the entire screen, without prompting the user for permission.

The following code shows how to publish a stream that uses screen sharing as the source:

```html
<div id="publisher"></div>
<div id="screen-preview"></div>
<script>
OT.checkScreenSharingCapability(function(response) {
  if(!response.supported || response.extensionRegistered === false) {
    // This browser does not support screen sharing.
  } else if (response.extensionInstalled === false) {
    // Prompt to install the extension.
  } else {
    // Screen sharing is available. Publish the screen.
    var publisher = OT.initPublisher('screen-preview',
      {videoSource: 'screen'},
      function(error) {
        if (error) {
          // Look at error.message to see what went wrong.
        } else {
          session.publish(publisher, function(error) {
            if (error) {
              // Look error.message to see what went wrong.
            }
          });
        }
      }
    );
  }
});
</script>
```  

Upon error, the completion handler for the `OT.initPublisher()` method can be passed an error object with one of the following error codes:

* 1550 — "Screen sharing is not supported."
* 1551 — "Screen sharing requires a _type_ extension, but there is no extension registered for _type_."
* 1552 — "Screen sharing requires a _type_ extension, but it is not installed."

When you publish screen-sharing stream, the following default values are set for the `options` parameter of the `OT.initPublisher()` method:

* `maxResolution` — `{ width: 1920, height: 1920 }`
* `mirror` — `false`
* `fitMode` — `"contain"`
* `publishAudio` — `false`

Additionally, subscribers to the resulting stream also default to using the `"contain" fitMode` setting.

For information on `maxResolution` and `fitMode`, see the next two sections.

By default, [scalable video](/video/guides/scalable-video) is disabled for screen-sharing streams. You can enable scalable video for screen-sharing streams by setting the `scalableScreenshare` option for the `OT.initPublisher()` method. _Note:_ scalable video for screen-sharing streams is a _beta_ feature.

## Setting the Maximum Resolution of the Stream

You can set a `maxResolution` property when you call the `OT.initPublisher()` method. This property sets the maximum resolution to stream. When sharing a window, the resolution of the stream will match the window's dimensions unless the window is larger than the `maxResolution` setting (when the user resizes the window).

The `maxResolution` property is an object with two properties: `width` and `height`. The maximum value for each is 1920, and the minimum value is 10.

```javascript
var publishOptions = {};
publishOptions.maxResolution = { width: 1920, height: 1080 };
publishOptions.videoSource = 'screen';
OT.initPublisher('some-element-id', publishOptions);
```

For screen-sharing, do not set the `resolution` option for the `OT.initPublisher()` method.

You may not want to display the screen-sharing video in the HTML DOM on the page that you publish it from. For example, if you are sharing the entire screen and you include the video in the HTML DOM, you will see a recursive "hall of mirrors" effect. To prevent this, create an HTML DOM element for the publisher element and do not display the element in the HTML DOM:

```javascript
    var publishOptions = {videoSource: 'screen'};
    var screenPublisherElement = document.createElement('div');
    OT.initPublisher(screenPublisherElement, publishOptions);
```

## Cropping or Letter-boxing Screen-Sharing Videos

You can set a `fitMode` property of the `options` parameter you pass into the `OT.initPublisher()` and `Session.subscribe()` methods. The `fitMode` property determines how the video is displayed if the its dimensions do not match those of the DOM element. You can set this property to one of the following values:

* `"cover"` — The video is cropped if its dimensions don't match those of the DOM element. This is the default setting for videos publishing a camera feed.
* `"contain"` — The video is letter-boxed if its dimensions don't match those of the DOM element. This is the default setting for screen-sharing videos.

## Determining the Video Type ("screen" or "camera") for a Stream

The Stream object contains a `videoType` property. This can be set to one of the following values

* `"camera"` — a standard video stream that uses a camera as the video source
* `"screen"` — a screen sharing video stream
* `"custom"` — a stream published by a web client using an HTML VideoTrack element as the video source
* `undefined` — a stream is voice-only (see the [Voice-only guide](/video/guides/voice-only))

This property can change if a stream published from a mobile device changes from a camera to a screen-sharing video type. When the video type changes, the Session object dispatches a `streamPropertyChanged` event.

The following code subscribes to streams and adds them to different HTML DIV container elements, based on the video type:

```html
<div id="people"></div>
<div id="screens"></div>
<script>
session.on('streamCreated', function(event) {
  var subOptions = {insertMode: 'append'};
  if(event.stream.videoType === 'screen') {
    session.subscribe(event.stream, 'screens', subOptions);
  } else {
    session.subscribe(event.stream, 'people', subOptions);
  }
});
</script>
```

## Detecting When Video Dimensions Change

The Publisher object that is publishing a screen-sharing stream and a Subscriber object that is subscribing to a screen-sharing stream can each dispatch a `videoDimensionsChanged` event. The event is dispatched when the publishing client resizes a window being shared.

The `videoDimensionsChanged` event has the following properties:

* `newValue` — An object with width and height properties defining the new width and height of the video.
* `oldValue` — An object with width and height properties defining the previous width and height of the video.
* `target` — The Publisher or Subscriber object.

You may use the `newValue.width` and `newValue.height` properties to adjust the size of the publisher in the HTML DOM:

```javascript
var publisher = OT.initPublisher('some-element',
  {videoSource: 'screen'});

publisher.on('videoDimensionsChanged', function(event) {
  publisher.element.style.width = event.newValue.width + 'px';
  publisher.element.style.height = event.newValue.height + 'px';
});
```

## Determining When the User Stops Sharing the Screen

When the user stops sharing the screen, the Publisher object dispatches a `mediaStopped` event.

If the Publisher was also publishing the stream to a session, it also dispatches a streamDestroyed event with the `reason` property set to `"mediaStopped"`. Also, the Session object on all clients connected to the session dispatches a `streamDestroyed` event with the `reason` property set to `"mediaStopped"`.

The default behavior for both the `mediaStopped` event and the `streamDestroyed` event is to delete the publisher (or the subscriber in the case of a subscribed stream). Call the `preventDefault()` method of the event object to prevent the publisher or subscriber from being deleted.

```javascript
publisher.on('mediaStopped', function(event) {
  // The user clicked stop.
});

publisher.on('streamDestroyed', function(event) {
  if (event.reason === 'mediaStopped') {
    // User clicked stop sharing
  } else if (event.reason === 'forceUnpublished') {
    // A moderator forced the user to stop sharing.
  }
});
```

## Subscribing to Screen-Sharing Streams

You can subscribe to a stream that uses a screen-sharing video source in the same way that you subscribe to a stream that uses a camera as the source. See [Subscribing to streams](/video/tutorials/subscribe-streams).

You can detect that a stream is a screen-sharing stream, by checking the `videoType` property of the Stream object. For a screen-sharing stream, this property is set to "screen".

The following code subscribes to streams, appending them to different HTML DOM container elements, based on the video type ("screen" or "camera"):

```javascript
session.on('streamCreated', function(event) {
  var subOptions = {
    appendMode: 'append'
  };

  var parentElementId = event.stream.videoType === 'screen' ?
    'sub-screen-sharing-container' :
    'sub-camera-container';
  subscriber = session.subscribe(event.stream, parentElement, subOptions);
});
```

The dimensions of a screen-sharing stream can change if user publishing the stream resizes the window that is the source for the stream. When the video dimensions change, the Subscriber object dispatches a `videoDimensionsChanged` event.

The following code resizes a subscriber when the stream's video dimensions change:

```javascript
subscriber.on('videoDimensionsChanged', function(event) {
  subscriber.element.style.width = event.newValue.width + 'px';
  subscriber.element.style.height = event.newValue.height + 'px';
  // You may want to adjust other UI.
});
```

## Enabling Screen Sharing in Electron

In Electron, screen sharing is supported if the `webPreferences.contextIsolation` option of the Electron BrowserWindow is set to `false` or if the app uses a preload script to access the desktop capturer. The default value of `webPreferences.contextIsolation` option is `true` in Electron 12+ and `false` in previous versions. In Electron 17+, a [breaking change](https://www.electronjs.org/docs/latest/breaking-changes#removed-desktopcapturergetsources-in-the-renderer) was introduced, causing screen sharing to only be available after using a preload script.

### Enabling Screen Sharing via Preload Script in Electron Versions 12-16

To enable screen sharing in Electron versions 12-16 using a preload script, add the following to the preload.js file:

```javascript
const {
  contextBridge,
  desktopCapturer
} = require('electron');
// Expose the desktopCapturer so that OpenTok.js can access it
// via window.electron.desktopCapturer
contextBridge.exposeInMainWorld(
  'electron', {
    desktopCapturer,
  }
);
```

Then reference preload.js when instantiating a BrowserWindow in Electron:

```javascript
mainWindow = new BrowserWindow({
  webPreferences: {
    nodeIntegration: true,
    preload: path.join(__dirname, 'preload.js'), // use the preload script
  }
});
```

### Enabling Screen Sharing via Preload Script in Electron Versions 17+

To enable screen sharing in Electron versions 17+, add the following to the preload.js file:

```javascript
const {
  contextBridge,
  ipcRenderer
} = require('electron');

// Event emitter to send asynchronous messages to the main process. The
// corresponding ipcMain handler listens for the 'DESKTOP_CAPTURER_GET_SOURCES'
// channel and returns an array of the available DesktopCapturerSource objects.
const desktopCapturer = {
  getSources: (opts) => ipcRenderer.invoke('DESKTOP_CAPTURER_GET_SOURCES', opts)
};

// Expose desktopCapturer so that the SDK can access it.
contextBridge.exposeInMainWorld(
  'electron', {
    desktopCapturer
  }
);
```

Then reference preload.js when instantiating a BrowserWindow in Electron:

```javascript
    // Event emitter to handle messages sent from the renderer process. This handler
    // will be called whenever a renderer calls
    // ipcRenderer.invoke('DESKTOP_CAPTURER_GET_SOURCES', ...args)
    electron.ipcMain.handle(
      'DESKTOP_CAPTURER_GET_SOURCES',
      (event, opts) => electron.desktopCapturer.getSources(opts)
    );
    
    mainWindow = new BrowserWindow({
      webPreferences: {
        preload: path.join(__dirname, 'preload.js') // use a preload script
      }
    });
```

## Optimizing Video performance of Certain Screen-Sharing Streams

You can set a video content hint to improve the quality and performance of a screen-sharing video that will primarily contain either text or video content. For details, see [Setting video content hints to improve video performance in certain situations](/video/tutorials/publish-streams/video/publish-streams/javascript/11-video-settings/javascript#setting-video-content-hints-to-improve-video-performance-in-certain-situations).
