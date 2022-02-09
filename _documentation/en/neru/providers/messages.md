---
title: Messages
description: The Messages Provider
navigation_weight: 3
---

## Messages Provider

The Messages provider gives you an interface for the [Messages API](/messages/overview).

### Initializing the Messages Provider

To use the Messages Provider you need to create an instance of the provider

```javascript
import { neru, Messages } from "neru-alpha";

const session = neru.createSession();
const messaging = new Messages(session);
```

For examples using the Messages provider, check out the [code snippets](/neru/code-snippets/messages-provider/send-message.md).