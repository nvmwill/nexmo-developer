---
title: Exploring the code
description: Follow this tutorial to build basic archiving for a web application from scratch using the Vonage Video API. It is the quickest way to build a proof of concept for this functionality on the Vonage Video API platform.
product: video 
---

## Exploring the code

You use server-side code to start and stop archive recordings. In the config.js file, you set the `SAMPLE_SERVER_BASE_URL` variable to the base URL of the web service the app calls to start archive recording, stop recording, and play back the recorded video. Make sure there is no trailing `/` at the end of the domain.

The archiving application uses the same code available in the Basic Video Chat folder to initialize an Vonage Video session, connect to the session, publish a stream, and subscribe to stream in the session.


To start recording the video stream, the user clicks the Start Recording button which invokes the startArchive() method in app.js. This method in turn sends an XHR (or Ajax) request to server.

The session ID of the session that needs to be recorded is passed in JSON format to the server. As soon as the startArchive() method is called, the Start Recording button is hidden and the Stop Recording button is displayed.

``` js
function startArchive() {
  $.ajax({
    url: SAMPLE_SERVER_BASE_URL + '/archive/start',
    type: "POST",
    contentType: "application/json", // send as JSON
    data: JSON.stringify({"sessionId": sessionId}),

    complete: function() {
      //called when complete
      console.log('startArchive() complete');
    },

    success: function() {
      //called when successful
      console.log('successfully called startArchive()');
    },

    error: function() {
      //called when there is an error
      console.log('error calling startArchive()');
    },
  });

  $('#start').hide();
  $('#stop').show();
}
```

To stop the recording, the user clicks the **Stop Recording** button, which invokes the `stopArchive()` method. This method is similar to the `startArchive()` method in that it sends an Ajax request to the server to stop the archive. The only difference is that this method passes the archive ID of the archive that needs to be stopped as a URL parameter instead of the sessionId. The **Stop Recording** button is hidden and the **View Archive** button is enabled.

``` js
function stopArchive() {
  $.post(SAMPLE_SERVER_BASE_URL + '/archive/' + archiveID + '/stop');
  $('#stop').hide();
  $('#view').prop('disabled', false);
  $('#stop').show();
}
```

To download the archive that has been recorded, the user clicks **View Archive** button which invokes the `viewArchive()` method. This method is similar to the `startArchive()` and `stopArchive()` methods in that it sends an Ajax request to the server. The server code has the logic to check if the archive is available for download or not. If it is available, the application is redirected to the archive page. If not, a new page is loaded which continuously checks whether the archive is available for download or not and loads it when it is available.

**Notes:**

* In most applications, control of the archive recording would not be granted to each end-user.

* You can have automatically archived sessions, which are recorded whenever a client starts publishing a stream.

* You will want to set up an Amazon S3 or Microsoft Azure target for storage of your archive recordings.


For more information on archiving, see the [Vonage Video archiving developer guide](/video/guides/archiving/overview).
