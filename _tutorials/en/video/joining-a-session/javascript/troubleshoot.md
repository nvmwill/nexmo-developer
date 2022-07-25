--- 
title: Troubleshooting sessionconnection issues 
description: Learn how to connect to an Vonage Video API session so that participants can use audio, video, and messaging functionality in your web application.
product: video 
---

# Troubleshooting session connection issues

The `Session.connect()` method has a callback function which is passed an optional `error` parameter. If this parameter is present and defined (not `null` or undefined), then there was an error when connecting. Looking for this error in your code will help you decipher why the end-user was unable to connect:

```js
    session.connect(token, function(err) {
      if (err) {
        // handle error
      } else {
        // connection succeeded
      }
    });
```

A large number of errors that come back when attempting to connect are due to either invalid or expired tokens.

Another common reason for connecting to a session failing is due to the end user's internet connection. Examples of this include:

* The end user has lost their internet connection
* The end user has common ports blocked because they're on a restrictive network.

This will result in an error with the code 1006. We recommend you handle this using the code below. Other reasons for connecting to a session failing include the OpenTok servers being down, or that some kind of unexpected error happened (such as a 500-level error in the server). While this doesn't happen often, it is good practice to handle these errors.

If you follow these instructions your error handling code should look something like:

```js
    session.connect(token, function(err) {
      if (err) {
        if (err.name === "OT_NOT_CONNECTED") {
          showMessage('Failed to connect. Please check your connection and try connecting again.');
        } else {
          showMessage('An unknown error occurred connecting. Please try again later.');
        }
      }
    });
```

You can lose your connection after you have already successfully connected to a Session. You can handle this case by listening for the `sessionDisconnected` event with a reason of **"networkDisconnected"**:

```js
    session.on({
      sessionDisconnected: function(event) {
        if (event.reason === 'networkDisconnected') {
          showMessage('You lost your internet connection.'
            + 'Please check your connection and try connecting again.');
        }
      }
    });
```
