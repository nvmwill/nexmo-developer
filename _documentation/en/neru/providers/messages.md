---
title: Messages
description: The Messages Provider
navigation_weight: 6
---

## Messages Provider

The Messages provider gives you an interface for the [Messages API](/messages/overview).

### Initializing the Messages Provider

To use the Messages Provider you need to create an instance of the provider

```javascript
import { neru, providers } from "neru-alpha";

const instance = neru.createInstance();
const messagesProvider = new providers.Messages(instance);
```