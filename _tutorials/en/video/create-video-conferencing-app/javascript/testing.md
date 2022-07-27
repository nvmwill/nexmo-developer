---
title: Testing your code in a browser
description: Testing your code in a browser
---

### Testing your code in a browser

At this point, your `app.js` file should look something like this (with a few adjustments):

```js
// replace these values with those generated in your Video API account
var appId = "YOUR_API_KEY";
var sessionId = "YOUR_SESSION_ID";
var token = "YOUR_TOKEN";

// Handling all of our errors here by alerting them
function handleError(error) {
  if (error) {
    alert(error.message);
  }
}

// (optional) add server code here
initializeSession();

function initializeSession() {
  var session = OT.initSession(appId, sessionId);

  // Subscribe to a newly created stream
  session.on('streamCreated', function(event) {
    session.subscribe(event.stream, 'subscriber', {
      insertMode: 'append',
      width: '100%',
      height: '100%'
    }, handleError);
  });

  // Create a publisher
  var publisher = OT.initPublisher('publisher', {
    insertMode: 'append',
    width: '100%',
    height: '100%'
  }, handleError);

  // Connect to the session
  session.connect(token, function(error) {
    // If the connection is successful, initialize a publisher and publish to the session
    if (error) {
      handleError(error);
    } else {
      session.publish(publisher, handleError);
    }
  });
}
```

In your completed code, you should have hard coded values to replace **YOUR_API_KEY**, **YOUR_SESSION_ID** and **YOUR_TOKEN**. If you haven't done this, see [Setting up authentication](/video/tutorials/create-video-conferencing-app/video/create-video-conferencing-app/javascript/auth-setup/javascript).

1. If everything checks out, go ahead and test your code by loading the `index.html` file in Chrome, Firefox or any other [supported browser](/video/resources#supported-browsers).

    When you load the page, you may need to allow the browser to access your webcam and microphone. After that, you should see a video stream of yourself (or whatever your webcam is looking at) displaying on the page.

2. If that worked, mute your audio then open another tab (keeping the original open) and load the same   URL. You should now be able to scroll down and see a second video. If you right-click on either video and "Inspect Element", you should see that one of the videos is filling the `subscriber` div, and the other is filling the `publisher` div.

>**Troubleshooting tip:** If there's no video showing up on the page, open the "console" tab in your browser tools (command+option+i on Mac, CTRL+i on Windows) and check for errors. The most likely issue is that your **App ID**, **session ID**, or **token** is not set up properly. Since you hard coded your credentials, it's also possible that your token has expired.

In the next step we will take a look at ways we can [style the video app with css](/video/tutorials/create-video-conferencing-app/video/create-video-conferencing-app/javascript/css-customization/javascript)