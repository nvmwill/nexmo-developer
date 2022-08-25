---
title: Getting a snapshot image of a video
description: Getting a snapshot image of a video
product: video
---

# Getting a snapshot image of a video

The following code captures and displays a static image of the Publisher video:

```javascript
var imgData = publisher.getImgData();
var img = document.createElement("img");
img.setAttribute("src", "data:image/png;base64," + imgData);
// Replace with the parent DIV for the img
document.getElementById("containerId").appendChild(img);
```

The following code captures and displays a static image of a Subscriber video:

```javascript
var imgData = subscriber.getImgData();
var img = document.createElement("img");
img.setAttribute("src", "data:image/png;base64," + imgData);

// Replace with the parent DIV for the img
document.getElementById("containerId").appendChild(img);
```