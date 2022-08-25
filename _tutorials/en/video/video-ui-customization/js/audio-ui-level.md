---
title: Adjusting user interface based on audio levels
description: Adjusting user interface based on audio levels
product: video
---

# Adjusting user interface based on audio levels

Publisher and Subscriber objects dispatch `audioLevelUpdated` events periodically to report the audio level. You can use these events to display an audio level indicator. You can also use these events to detect active speakers in a session.

The following example adjusts the value of a meter element that shows volume of a subscriber. The code sets the `audioLevelDisplayMode` style to `'off'`, which disables the default audio level meter displayed in the Subscriber. Note that the audio level is adjusted logarithmically and a moving average is applied:

```javascript
subscriber.setStyle('audioLevelDisplayMode', 'off');
var movingAvg = null;
subscriber.on('audioLevelUpdated', function(event) {
  if (movingAvg === null || movingAvg <= event.audioLevel) {
    movingAvg = event.audioLevel;
  } else {
    movingAvg = 0.7 * movingAvg + 0.3 * event.audioLevel;
  }

  // 1.5 scaling to map the -30 - 0 dBm range to [0,1]
  var logLevel = (Math.log(movingAvg) / Math.LN10) / 1.5 + 1;
  logLevel = Math.min(Math.max(logLevel, 0), 1);
  document.getElementById('subscriberMeter').value = logLevel;
});
```
The example assumes that there is an HTML meter element with the ID "subscriberMeter".

Note that in audio-only mode, a Publisher or Subscriber DOM element displays a volume indicator by default (in the upper right-hand corner of the element). You can disable this default user interface element and display your own volume meter. See the next topic, [Adjusting user interface when video is enabled or disabled](/video/tutorials/video-ui-customization/video/video-ui-customization/js/audio-block/javascript).

You can also use the `audioLevelUpdated` event to determine when a publisher or subscriber's audio is loud enough for long enough to label the participant as having started talking. Or, if the audio has been quiet for long enough, you can identify the participant as having stopped talking:


```javascript
var subscriber = session.subscribe(event.stream);

SpeakerDetection(subscriber, function() {
  console.log('started talking');
}, function() {
  console.log('stopped talking');
});

var SpeakerDetection = function(subscriber, startTalking, stopTalking) {
  var activity = null;
  subscriber.on('audioLevelUpdated', function(event) {
    var now = Date.now();
    if (event.audioLevel > 0.2) {
      if (!activity) {
        activity = {timestamp: now, talking: false};
      } else if (activity.talking) {
        activity.timestamp = now;
      } else if (now- activity.timestamp > 1000) {
        // detected audio activity for more than 1s
        // for the first time.
        activity.talking = true;
        if (typeof(startTalking) === 'function') {
          startTalking();
        }
      }
    } else if (activity && now - activity.timestamp > 3000) {
      // detected low audio activity for more than 3s
      if (activity.talking) {
        if (typeof(stopTalking) === 'function') {
          stopTalking();
        }
      }
      activity = null;
    }
  });
};
```
(Instead of logging to the console, your app could adjust a user interface element when the user starts and stops talking.