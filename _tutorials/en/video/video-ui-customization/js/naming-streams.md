---
title: Adding a name for a published stream
description: Adding a name for a published stream
product: video
---

# Adding a name for a published stream

When you create a Publisher, you can (optionally) specify a name to be displayed in the video:

```javascript
// Replace the first parameter with the target element ID:
var publisher = OT.initPublisher("myPublisher",
                                 {name: "John"})
session.publish(publisher);
```

You can use this name to identify the client.

Note that you can also add metadata about the client when you create a token. This name is not automatically displayed in the video. However, by adding the data when you create a token, you can add information more securely (since tokens are created on the server, not on the client. For more information, see [Token creation](/video/tutorials/create-token).

Clients can choose to hide the name in a Publisher or Subscriber view. See the [next section](/video/tutorials/video-ui-customization/video/video-ui-customization/js/hiding-video-name/javascript)