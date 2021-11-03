---
title: Listen for Incoming Messages
description: How to listen for incoming messages with the Messages provider
navigation_weight: 3
---

# Listen for Incoming Messages

The Messages provider's `listenMessages` function allows you to listen for incoming messages using the [Messages API](/messages/overview).

## Method Signature
```javascript
listenMessages(from: Contact, to: Contact, callback: string)
```

### Types

This function uses the NeRu `Contact` type for the sender and recipient of the message.

```partial
source: _partials/neru/type-contact.md
```

## Listening for Messages

Using the wild card character, `*`, you can listen for any incoming messages to a specified Vonage number. Incoming messages will call the `onMessage` route.

```tabbed_content
source: _tutorials_tabbed_content/neru/code-snippets/messages/listen-messages
```