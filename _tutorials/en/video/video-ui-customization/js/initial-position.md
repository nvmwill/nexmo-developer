---
title: Setting the initial position and dimensions of a video
description: Setting the initial position and dimensions of a video
product: video
---

# Setting the initial position and dimensions of a video

When you publish a video, you can specify the DOM element (or its ID) that the publisher will replace. You can also specify the initial width and height of the publisher:

```javascript

// Replace the first parameter with ID of the target DOM element:
var publisher = OT.initPublisher('myPublisherElementId',
                                 {width:400, height:300});
session.publish(publisher);
```
You can also set the `insertMode` property of the options you pass into the [`OT.initPublisher()`](/sdk/stitch/video-js-reference/OT.html#initPublisher) method to 'append' to have the publisher appended as a child of the DOM element (container) you specify:

```javascript
var publisherOptions = {
  insertMode: 'append',
  width: 400,
  height: 300
};
var publisher = OT.initPublisher('publisherContainerElementId', publisherOptions);
session.publish(publisher)
```

Similarly, when you subscribe to a stream, you can specify the target DOM element (or its ID). You can also specify the initial width and height of the subscriber:

```javascript
var options = {width: 400, height: 300, insertMode: 'append'}
var subscriber = session.subscribe(stream, 'containerElementId', options);
```

You can also specify the initial width and height of as a percentage of the size of the parent DOM element:

```javascript
var publisherOptions = {
  insertMode: 'append',
  width: '100%',
  height: '100%'
};
var publisher = OT.initPublisher(publisherContainerElement, publisherOptions);
session.publish(publisher);
```

If you do not specify a replace element ID (or set it to null), the application appends a new DOM element to the HTML body. The default width is 264 pixels, and the default height is 198 pixels.

If you want to apply multiple CSS rules, apply it to the parent (container) DOM element:

```html
<style>
    #publisherContainer.large
    { width: 640px; height: 480px; }
    #publisherContainer.small
    { width:100px; height: 100px; }
</style>
<div id="publisherContainer"></div>
<script>
    var publisher = OT.initPublisher('publisherContainer',
    {width: '100%', height: '100%', insertMode: 'append'}
</script>
```

To apply a different size to a video on a mobile device, use CSS media queries:

```html
<style>
    #publisherContainer
    { width: 100px; height: 100px; }
    @media screen and (max-width: 650px) {
    #publisherContainer
    { width: 89px; height: 50px; }
    }
</style>
<div id="publisherContainer"></div>
<script>
    var publisher = OT.initPublisher('publisherContainer',
    {width: '100%', height: '100%', insertMode: 'append'}
</script>
```

If you will want to dynamically resize the video, set the `insertMode` to `'append'` and set the `height` and `width` to `'100%'`.

See the next section for information on resizing or repositioning a publisher or subscriber video.