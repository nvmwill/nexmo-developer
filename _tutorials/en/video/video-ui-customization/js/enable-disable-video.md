---
title: Adjusting user interface when video is enabled or disabled
description: Adjusting user interface when video is enabled or disabled
product: video
---

# Adjusting user interface when video is enabled or disabled

A Subscriber objects dispatches the following events related to the video being enabled or disabled for the subscriber's stream:

- `videoEnabled` — Dispatched when the video has been enabled after it was previously disabled.
- `videoDisabled` — Dispatched when the video has been disabled. The reason property of the event object indicates why the video was disabled. (This event object is an [VideoEnabledChangedEvent](/sdk/stitch/video-js-reference//VideoEnabledChangedEvent.html) object.)
- `videoDisableWarning` — Dispatched when the Media Router determines that the stream quality has degraded and the video will be disabled if the quality degrades more. If the quality degrades further, the Subscriber disables the video and dispatches a `videoDisabled` event.
- `videoDisableWarningLifted` — The video has been enabled after it was previously disabled.

The `videoDisableWarning` and `videoDisableWarningLifted` events are only available in sessions that use the [Media Router](/video/guides/create-session#the-media-router-and-media-modes) (sessions with the media mode set to routed).

By default, the Subscriber displays a video disabled warning indicator and a video disabled indicator when the `videoDisableWarning` and `videoDisableWarningLifted` events are dispatched. You can disable the default display of the indicator by setting the `videoDisabledDisplayMode` style setting of the Subscriber object.

The following example uses the `videoDisabledDisplayMode` style setting to have the video disabled warning indicator and a video disabled indicator blink every one second when the `videoDisableWarning` and `videoDisableWarningLifted` events are dispatched:

```javascript
var indicatorBlinker = new IndicatorBlinker(subscriber);

var IndicatorBlinker = function(subscriber) {
  var timer;
  var indicatorOn = false;
  subscriber.on({
    videoDisabled: function(event) {
      start();
    },
    videoDisableWarning: function(event) {
      start();
    },
    videoDisableWarningLifted: function(event) {
      stop();
    },
    videoEnabled: function(event) {
      stop();
    }
  });
  var start = function() {
    subscriber.setStyle('videoDisabledDisplayMode', 'on');
    if (timer) {
      clearInterval(timer);
    }
    timer = setInterval(function() {
      if (indicatorOn) {
        subscriber.setStyle('videoDisabledDisplayMode', 'off');
      } else {
        subscriber.setStyle('videoDisabledDisplayMode', 'on');
      }
      indicatorOn = !indicatorOn;
    }, 1000);
    indicatorOn = true;
  };
  var stop = function() {
    if (timer) {
      clearInterval(timer);
    }
  };
};
```

You can also set the `videoDisabledDisplayMode` style to 'off' and add your own user interface elements based on the `videoDisableWarning`, `videoDisabled`, `videoDisableWarningLifted`, and `videoEnabled` events.