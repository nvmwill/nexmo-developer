---
title: Testing your code in a browser
description: Testing your code in a browser
---

### Testing your code in a browser

In your completed code, you should have hard coded values to replace **YOUR_API_KEY**, **YOUR_SESSION_ID** and **YOUR_TOKEN**. If you haven't done this, see [Getting your API credentials](/video/tutorials/create-video-conferencing-app-express/video/create-video-conferencing-app-express/javascript/auth-setup/javascript).

1. If everything checks out, go ahead and test your code by loading your HTML file in Chrome, Firefox or any other [supported browser](/video/resources#supported-browsers).

    When you load the page, you may need to allow the browser to access your webcam and microphone. After that, you should see a video stream of yourself (or whatever your webcam is looking at) displaying on the page.

2. If that worked, mute your audio then open another tab (keeping the original open) and load the same   URL. You should now be able to scroll down and see a second video.

>**Troubleshooting tip:** If there's no video showing up on the page, open the "console" tab in your browser tools (command+option+i on Mac, CTRL+i on Windows) and check for errors. The most likely issue is that your **API key**, **session ID**, or **token** is not set up properly. Since you hard coded your credentials, it's also possible that your token has expired.

You can visit the [next section]() to learn about the different options the video express SDK provides.