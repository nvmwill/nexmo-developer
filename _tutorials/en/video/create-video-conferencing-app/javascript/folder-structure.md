---
title: Creating the project folders and HTML template
description: Creating the project folders and HTML template
---

### Creating the project folders and HTML template

In this tutorial, you will be creating different folders containing an HTML file, a JavaScript file, and a CSS file.

1. Before you get started with code, go ahead and create a new project folder on your computer to house these files (the example below is called myproject but you can name it whatever you like).

    Then add a **/js** and **/css** folder along with blank files named `index.html`, `app.js`, and `app.css` in the following structure:

    ```
    /myproject
    /js
        app.js
    /css
        app.css
    index.html
    ```

    Once you have your project set up, open the main project folder in your code editor and go to the `index.html` file.

2. Copy the following code (using the copy button) and add it to your `index.html` file in the code editor:

    ```html
        <html>
        <head>
            <title> OpenTok Getting Started </title>
            <link href="css/app.css" rel="stylesheet" type="text/css">
            <script src="https://static.opentok.com/v2/js/opentok.min.js"></script>
        </head>
        <body>

            <div id="videos">
                <div id="subscriber"></div>
                <div id="publisher"></div>
            </div>

            <script type="text/javascript" src="js/app.js"></script>
        </body>
        </html>
    ```

    The code above includes references to the video client SDK as well as the JS and CSS files you just created. The code also includes publisher and subscriber divs, which will contain the video streams — we'll use these classes to customize the layout later.

    > The code also uses the video client SDK directly from [static.opentok.com](static.opentok.com). The SDK is also available as an NPM package. For instructions on using the NPM package, see [https://www.npmjs.com/package/@opentok/client](https://www.npmjs.com/package/@opentok/client).

Next step is [setting up authentication](/video/tutorials/create-video-conferencing-app/video/create-video-conferencing-app/javascript/auth-setup/javascript)