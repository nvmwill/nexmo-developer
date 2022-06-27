---
title: Getting started with a template
description: Getting started with a template
---

### Getting started with a template
Copy and paste the code snippet below into an HTML file for example, `index.html`. This snippet contains the video express SDK, HTML, some Javascript and optional CSS stylings.

In order to connect to a video session, you will need to set the authentication credentials. This is discussed in the [next section](/video/tutorials/create-video-conferencing-app-express/video/create-video-conferencing-app-express/javascript/auth-setup/javascript).

```html
<html>
    <head>
        <title>OpenTok Getting Started</title>
    </head>
    <style>
        body {
            margin: 0;
        }
        /* Assuming the name of the Room's container is roomContainer */
        #roomContainer {
            width: 100vw;
            height: calc(100vh - 90px);
            background-color: #ddd;
            position: relative;
        }
        #roomContainer > .OT_publisher {
            top: 25px;
            right: 25px;
            position: absolute;
            border-radius: 10px;
        }
        #roomContainer > .OT_screenshare {
            top: 25px;
            left: 25px;
            position: absolute;
            border-radius: 10px;
        }
    </style>
    <body>
        <!-- video feed container   -->
        <div id="roomContainer"></div>

        <!-- video express SDK -->
        <script src="https://static.opentok.com/v1/js/video-express.js"></script>
        <script type="text/javascript">
            // Creating a room
            const room = new VideoExpress.Room({
                apiKey: "YOUR_API_KEY",
                sessionId: "YOUR_SESSION_ID",
                token: "YOUR_TOKEN",
                roomContainer: "roomContainer",
            });

            room.join();
        </script>
    </body>
</html>
```
