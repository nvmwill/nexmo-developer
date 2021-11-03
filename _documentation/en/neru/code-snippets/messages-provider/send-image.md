---
title: Send an Image
description: How to send an Image with the Messages provider
navigation_weight: 2
---

# Send an Image

The Messages provider's `sendImage` function allows you to send an image using the [Messages API](/messages/overview).

## Method Signature
```javascript
sendImage(from: Contact, to: Contact, imageContent: SendImageContent)
```

### Types

This function uses the NeRu `Contact` type for the sender and recipient of the message, and `SendImageContent` for the image.

```partial
source: _partials/neru/type-contact.md
```

`SendImageContent`:

* `url`: (String) A URL to the image.
* `caption`: (String) A caption for the image.


## Sending a Message

```tabbed_content
source: _tutorials_tabbed_content/neru/code-snippets/messages/send-image
```