---
title: Conversation
description: The Conversation Provider
navigation_weight: 5
---

## Conversation Provider

The conversation provider gives you an interface for the [Conversation API](/conversation/overview).

### Initializing the Conversation Provider

To use the Conversation Provider you need to create an instance of the provider

```javascript
import { neru, providers } from "neru-alpha";

const instance = neru.createInstance();
const conversationProvider = new providers.Conversation(instance);
```