---
title: Displaying a custom UI element when Subscriber audio is blocked
description: Displaying a custom UI element when Subscriber audio is blocked
product: video
---

# Displaying a custom UI element when Subscriber audio is blocked

Some browsers automatically block audio playback, requiring a `click` event before audio playback starts for subscribers. These browsers include Safari, Firefox 66+, and Chrome 71+.

The Subscriber object displays an audio playback button if audio playback is blocked. You can disable the Subscriber's default audio playback button and display your own UI element that the user will click to start audio playback.

To disable the display of the default audio playback button, set the `style.audioBlockedDisplayMode` property of the options parameter of the `Session.subscribe()` method.

```javascript
var subscriberOptions = {
    style: { audioBlockedDisplayMode: "off" }
  };
var subscriber = session.subscribe(stream,
  'subscriber-element-id', // Replace with the replacement element ID
  subscriberOptions
);
```

Add event listeners for the `audioBlocked` and `audioUnbocked` events dispatched by the Subscriber to display and hide your custom UI element (telling the use to click to play back audio):

```javascript
subscriber.on({
  audioBlocked: function(event) {
    // display custom UI
  },
  audioUnblocked: function(event) {
    // hide custom UI
  }
});
```

When the user clicks your custom UI element, call the OT.`unblockAudio()` method:

```javascript
customElement.addEventListener('click', async () => {
  try {
    await OT.unblockAudio();
  } catch (err) {
    console.error('Unblocking audio failed.', err);
    return;
  }
  console.log('Unblocked audio successfully.');
});
```