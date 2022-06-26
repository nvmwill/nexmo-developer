---
title: CSS customization
description: CSS customization
---

### CSS customization

At this point, you have a complete working client. This last step will demonstrate some basic CSS customization to produce a "picture-in-picture" layout.

1. Open up your blank `app.css` file in your code editor and add the following code to it:

    ```css
        body, html {
        background-color: gray;
        height: 100%;
    }

    #videos {
        position: relative;
        width: 100%;
        height: 100%;
        margin-left: auto;
        margin-right: auto;
    }

    #subscriber {
        position: absolute;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        z-index: 10;
    }

    #publisher {
        position: absolute;
        width: 360px;
        height: 240px;
        bottom: 10px;
        left: 10px;
        z-index: 100;
        border: 3px solid white;
        border-radius: 3px;
    }
    ```

2. Once you've saved the CSS, reopen your `index.html` file in two separate browser tabs. You should now see two video streams, but one will be smaller and nested inside the larger video stream.

Taking a look at the CSS above, you can see that we did this by adjusting the **height**, **width**, and **position** of the `#publisher` div. This "picture-in-picture" layout is a common practice in video chat applications. Feel free to edit sizing and position of these divs as much as you like.

The video conferencing frontend implementation is now complete. Checkout the [what's next section](/video/tutorials/create-video-conferencing-app/conclusion/javascript) to learn the next steps to take.