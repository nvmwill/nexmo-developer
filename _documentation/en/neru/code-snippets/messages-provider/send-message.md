---
title: Send a Message
description: How to send a message with the Messages provider
navigation_weight: 1
---

# Send a Message

The Messages provider's `sendText` function allows you to send a message using the [Messages API](/messages/overview).

## Method Signature
```javascript
sendText(from: Contact, to: Contact, message: string)
```

### Types

This function uses the NeRu `Contact` type for the sender and recipient of the message.

```partial
source: _partials/neru/type-contact.md
```

## Sending a Message

```tabbed_content
source: _tutorials_tabbed_content/neru/code-snippets/messages/send-text
```