---
title: Resizing or repositioning a video
description: Resizing or repositioning a video
product: video
---

# Resizing or repositioning a video

The `element` property of the Publisher or Subscriber object is its HTML DOM element. You can reposition this in the HTML DOM and resize the element by editing its `style.width` and `style.height` properties, just as you would any other DOM element:

```javascript
document.getElementById("target").appendChild(publisher.element);
publisher.element.style.width = "100px";
publisher.element.style.height = "75px";
```

If you specify the initial `width` and `height` of the Publisher or Subscriber object as a percentage (such as "100%:), you can resize it by resizing one of its parent elements. The following example includes a function that resizes a Publisher:

```html
<script type="text/javascript">
    var publisherOptions = {
        insertMode: "append",
        height: "100%",
        width: "100%"
    }
    var publisher = OT.initPublisher("publisherContainer", publisherOptions);
    session.publish(publisher);

    function resizePublisher() {
        var publisherContainer = document.getElementById("publisherContainer");
        publisherContainer.style.width = "1000px";
        publisherContainer.style.height = "750px";
    }
</script>

<div id="container">
    <div id="publisherContainer"></div>
    <a href="javascript:resizePublisher()">resize</a>
</div>
```

See the previous section, [Setting the initial dimensions of a video](/video/tutorials/video-ui-customization/video/video-ui-customization/js/initial-position/javascript) for information on setting the initial position and dimensions of a publisher or subscriber.

>**Important:** If you disable the default user interface of the publisher or subscriber by setting insertDefaultUI to false when instantiating the Publisher or Subscriber object, the element property of the Publisher or Subscriber will be undefined. Listen for the videoElementCreated event and use the element property of the event object to access the HTML DOM element for the Publisher or Subscriber.