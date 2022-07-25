---
title: Troubleshooting
description: "Learn how to publish Vonage Video API streams in your web application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream."
product: video
---

## Troubleshooting

Follow the tips in this section to avoid connectivity issues when publishing. For general information on troubleshooting, see [Debugging — Web](/video/tutorials/video-debugging).

### Handling Errors

There are callback methods for both `Session.publish()` and `OT.initPublisher()`. We recommend handling the error responses to both of these methods. As mentioned earlier, it is best to split up these steps and call `OT.initPublisher()` before you have started connecting to your Session. It also makes error handling easier if you are not calling both of these methods at the same time. This is because both error handlers will fire if there is any error publishing. It is best to wait for `OT.initPublisher()` to complete and `Session.connect()` to complete and then call `Session.publish()`. This way you can handle all hardware related issues in the `OT.initPublisher()` callback and all network related issues in the `Session.publish()` callback.

```js
var connected = false,
  publisherInitialized = false;

var publisher = OT.initPublisher(function(err) {
  if (err) {
    // handle error
  } else {
    publisherInitialized = true;
    publish();
  }
});

var publish = function() {
  if (connected && publisherInitialized) {
    session.publish(publisher);
  }
};

session.connect(token, function(err) {
  if (err) {
    // handle error
  } else {
    connected = true;
    publish();
  }
});
```

### Access Denied

The highest number of failures to `OT.initPublisher()` are a result of the end-user denying access to the camera and microphone. This can either be handled by listening for the `accessDenied` event or by listening for an error response to the OT.initPublisher() method with a `code` property set to 1500 and a `message` property set to "Publisher Access Denied:". We recommend that you handle this case and surface a message to the user indicating that they should try to publish again and allow access to the camera.

```js
publisher.on({
  'accessDenied': function() {
    showMessage('Please allow access to the Camera and Microphone and try publishing again.');
  }
});
```

### Device Access

Another reason for `OT.initPublisher()` to fail is if OpenTok cannot get access to a camera or microphone. This can happen if there is no camera or microphone attached to the machine, if there is something wrong with the driver for the camera or microphone, or if some other application is using the camera or microphone (this only happens in Windows). You can try to minimize the occurrence of these issues by using our Hardware Setup Component or by calling the `OT.getDevices()` method directly. However you should also handle any error when calling `OT.initPublisher()` because something could still go wrong. For example, the user could have denied access to the camera or microphone. In this case, the `error.name` property is set to `"OT_USER_MEDIA_ACCESS_DENIED"`:

```js
publisher = OT.initPublisher('publisher', {}, function (err) {
  if (err) {
    if (err.name === 'OT_USER_MEDIA_ACCESS_DENIED') {
      // Access denied can also be handled by the accessDenied event
      showMessage('Please allow access to the Camera and Microphone and try publishing again.');
    } else {
      showMessage('Failed to get access to your camera or microphone. Please check that your webcam'
        + ' is connected and not being used by another application and try again.');
    }
    publisher.destroy();
    publisher = null;
  }
});
```

### Network Errors

The other reasons for failures in publishing are usually due to some kind of network failure. We handle these in the callback to `Session.publish()`. If the user is not connected to the network, the callback function is passed an error object with the `name` property set to `"OT_NOT_CONNECTED"`. If the user is on a really restrictive network connection that does not allow for WebRTC connections, the Publisher fails to connect, and the Publisher element will just display a spinning wheel. This error has an `name` property set to `"OT_CREATE_PEER_CONNECTION_FAILED"`. In this case recommend that you surface a message to the user indicating that they failed to publish and that they should check their network connection. Handling these errors looks like this:

```js
session.publish(publisher, function(err) {
  if (err) {
    switch (err.name) {
      case "OT_NOT_CONNECTED":
        showMessage("Publishing your video failed. You are not connected to the internet.");
        break;
      case "OT_CREATE_PEER_CONNECTION_FAILED":
        showMessage("Publishing your video failed. This could be due to a restrictive firewall.");
        break;
      default:
        showMessage("An unknown error occurred while trying to publish your video. Please try again later.");
    }
    publisher.destroy();
    publisher = null;
  }
});
```

### Losing Connectivity

Your Publisher can also lose its connection after it has already succeeded in connecting. More often than not, this will also result in the Session losing its connection, but that's not always the case. You can handle the Publisher disconnecting by listening for the `streamDestroyed` event with a `reason` property set to "networkDisconnected" like so:

```js
publisher.on({
  streamDestroyed: function (event) {
    if (event.reason === 'networkDisconnected') {
      showMessage('Your publisher lost its connection. Please check your internet connection and try publishing again.');
    }
  }
});
```
