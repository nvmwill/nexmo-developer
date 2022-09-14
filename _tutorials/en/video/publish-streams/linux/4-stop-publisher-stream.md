---
title: Stopping a publisher's stream
description: Learn how to publish Vonage Video API streams in your iOS application. Once you have connected to a session, you can send video, audio, and messages by publishing a stream.
product: video 
---

## Stopping a publisher from streaming

To stop a publisher's stream, call the `otc_session_unpublish()` function, passing in the `otc_session` and `otc_publisher` structs:

```c
otc_status status = otc_session_unpublish(session, publisher);
  if (status == OTC_SUCCESS) {
  printf("Unpublished successfully.");
} else {
  printf("Could not unpublish.");
}
```
