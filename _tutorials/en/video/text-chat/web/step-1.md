---
title: Exploring the Code
description: Follow this tutorial to build basic text chat from scratch using the Vonage Video API. It is the quickest way to build a proof of concept for this functionality on the video platform. 
product: video
---

## Exploring the Code

In our application, when the user enters text in the input text field, the following code is executed:

```js
form.addEventListener('submit', function(event) {
  event.preventDefault();

    session.signal({
        type: 'msg',
        data: msgTxt.value
      }, function(error) {
      if (error) {
        console.log('Error sending signal:', error.name, error.message);
      } else {
        msgTxt.value = '';
      }
    });
  });
});
```

This method calls the `signal()` method of the Session object, which sends a signal to all clients connected to the session. Each signal is defined by a `type` property identifying the type of message (in this case `"msg"`) and a `data` property containing the message. The text entered is sent in the data property of the signal method.

When another client connected to the session (in this app, there is only one) sends a message, the session's `signal` event handler is invoked:

```js
session.on('signal:msg', function(event) {
  var msg = document.createElement('p');
  msg.innerText = event.data;
  msg.className = event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
  msgHistory.appendChild(msg);
  msg.scrollIntoView();
});
```

This method checks to see if the signal was sent by the local web client or by the other client connected to the session:

```js
event.from.connectionId === session.connection.connectionId ? 'mine' : 'theirs';
```

The Session object represents your session. It has a `connection` property, which has a `connectionId` property. The event object represents the event associated with this signal. It has a `from` property (which is a Connection object) with a `connectionId` property. This represents the connection ID of the client sending the signal. If these match, the signal was sent by the local web client.

The data associated with the event is then appended as a child of the `history` DOM element.

This app uses the Vonage Video signaling API to implement text chat. However, you can use the signaling API to send messages to other clients (individually or collectively) connected to the session.
