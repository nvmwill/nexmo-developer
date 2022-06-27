---
title: Code walkthrough
description: Code walkthrough
---

### Code walkthrough

**Installing and loading video express**

The code snippet provided for the tutorial pulled in the video express SDK using a [CDN](https://static.opentok.com/v1/js/video-express.js), however, you can also do this using NPM

```sh
 npm i --save @vonage/video-express
```
You can read more about using the SDK through NPM on the [npmjs website](https://www.npmjs.com/package/@vonage/video-express)

**Creating a room**

```js
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
```
The code snippet contained the code above which allowed the client to connect to a session, by filling out **YOUR_API_KEY**, **YOUR_SESSION_ID**. and **YOUR_TOKEN**. The session id identifies a specific room and clients using the same session id will be present in the video stream.

Visit the [overview](/video/overview) page to learn more about tokens and sessions.

**CSS customization**

The CSS code in the snippet targeted the `div` with the id `roomContainer` which resized the container to fit the screen.

It also provided styling to `.OT_publisher` and `.OT_screenshare` classes within the `roomContainer` `div` which are embedded by the video express SDK.