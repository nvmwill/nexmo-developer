---
title: "Hardware Setup component"
description: "The Vonage Video API Hardware Setup component provides a user interface for clients using the OpenTok.js library to select the camera and microphone."
h1: "The Vonage Video API Hardware Setup component"
p: "<a href='https://github.com/opentok/opentok-hardware-setup.js'>Source Code</a><a href='https://github.com/opentok/opentok-hardware-setup.js/blob/master/index.html'>Sample</a>"
---
The Hardware Setup component provides a user interface for clients
using the [OpenTok.js] [1] library to select the camera and microphone. The
client can use the camera and microphone to publish a stream to an OpenTok.js
session.

You can add a pre-built version of the hardware setup component to your web page with the following script tag:

```js
<script src="https://static.opentok.com/hardware-setup/v1/js/opentok-hardware-setup.min.js"></script>
```

You can also build (and modify) the component from the
[source code at GitHub](https://github.com/opentok/opentok-hardware-setup.js).

Using the component
-------------------

Use the component along with the [OpenTok.js] [1] SDK.

*Important restriction:* The Hardware Setup component is only available on sites loaded
via HTTPS.

### createOpentokHardwareSetupComponent()

To initialize the Hardware Setup component, call the
`createOpentokHardwareSetupComponent()` method. This method takes the following
parameters:

* `targetElement` -- The DOM element in which to insert the hardware setup
component. (See the insertMode property of the next parameter, options.)

* `options` -- An optional argument that specifies how the component will be
inserted in the HTML DOM, in relation to the targetElement parameter. You can
set this parameter to one of the following values:

  * `"replace"` -- The component replaces contents of the targetElement. This is
the default.
  * `"after"` -- The component is a new element inserted after the targetElement in
the HTML DOM. (Both the component and targetElement have the same parent
element.)
  * `"before"` -- The component is a new element inserted before the targetElement
in the HTML DOM. (Both the component and targetElement have the same parent
element.)
  * `"append"` -- The component is a new element added as a child of the
targetElement. If there are other child elements, the component is appended as
the last child element of the targetElement.

* `completionHandler` -- A function that is called when the component
is rendered on the page or on error in calling to the method. Upon error, this
function is passed an error object which has a `message` property, which can
have one of the following values:

  * "No element provided to place component"
  * "This browser does not support getMediaDevices APIs"
  * "There are no audio or video devices available".

  When the component is rendered on the page successfully, the completion
  handler is called with no error object.

The method returns a HardwareSetup object, which has the following methods:
`audioSource()`, `videoSource()`, and `destroy()`.

Example:

```javascript
// Replace this with the ID of the target DOM element for the component
var element = document.querySelector('#hardware-setup');

var options = {
  insertMode: 'append' // Or use another insertMode setting.
};

var component = createOpentokHardwareSetupComponent(element, options, function(error) {
  if (error) {
    console.error('Error: ', error);
    element.innerHTML = '<strong>Error getting devices</strong>: '
      error.message;
    return;
  }
  // Add a button to call component.destroy() to close the component.
});
```

### HardwareSetup.audioSource()

Returns an object representing the selected audio source. This object has a
`deviceId` property, which is the unique audio device ID (a string). You can
store this string in a cookie for use in a future session. You can pass the
audio source object or its `deviceId` property as a value for the `audioSource`
property of the properties object passed into the `OT.initPublisher()` method.

Example:

```javascript
// component is the object returned by createOpentokHardwareSetupComponent()
var publisherOptions = {
  audioSource: component.audioSource(),
  videoSource: component.videoSource()
};
OT.initPublisher(targetElement, publisherOptions);
```

### HardwareSetup.videoSource()

Returns an object representing the selected video source. This object has a
`deviceId` property, which is the unique video device ID (a string). You can
store this string in a cookie for use in a future session. You can pass the
video source object or its `deviceId` property as a value for the `videoSource`
property of the properties object passed into the `OT.initPublisher()` method.

Example:

```javascript
// component is the object returned by createOpentokHardwareSetupComponent()
var publisherOptions = {
  audioSource: component.audioSource(),
  videoSource: component.videoSource()
};
OT.initPublisher(targetElement, publisherOptions);
```

### HardwareSetup.destroy()

Closes the hardware setup component (if visible) and removes it from the
HTML DOM.

Example:

```javascript
// component is the object returned by createOpentokHardwareSetupComponent()
component.destroy();
```


[1]: /video/client-sdks/web
[2]: http://nodejs.org/
[3]: http://gulpjs.com/