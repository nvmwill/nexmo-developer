---
title: Creating the Project Folders and HTML Template
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Creating the Project Folders and HTML Template

For this project, you will be creating an HTML file, a JavaScript file, and a CSS file.

1. Before you get started with code, go ahead and create a new project folder on your computer to house these files (the example below is called **myproject** but you can name it whatever you like). Then add a **/js** and **/css** folder along with blank files for **index.html**, **app.js**, and **app.css** in the following structure:

```bash
/myproject
    /js
        app.js
    /css
        app.css
    index.html
```

Once you have your project set up, open the main project folder in your code editor and go to the **index.html** file.

2. Copy the following code (using the ![](/developer/img/icons/copy-icon-gray.svg) copy button) and add it to your index.html file in the code editor:

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

The above code includes references to the **Vonage Video.js** library as well as the JS and CSS files you created. The code also includes **publisher** and **subscriber** divs, which will contain the video streams — we'll use these classes to customize the layout later.

This sample loads Vonage Video.js directly from static.opentok.com. Vonage Video.js is also available as a NPM package. For instructions on using the NPM package, see [https://www.npmjs.com/package/@opentok/client](https://www.npmjs.com/package/@opentok/client).
