---
title: Voice
description: The Voice Provider
navigation_weight: 2
---

# Voice Provider

The Voice provider gives you an interface for the [Voice](/voice/voice-api/overview) and [Conversation](/conversation/overview) APIs.

## Initializing the Voice Provider

To use the Voice Provider you need to create an instance of the provider

```javascript
import { neru, Voice } from "neru-alpha";

const session = neru.createSession();
const voiceApi = new Voice(session);
```

For examples using the Voice provider, check out the [code snippets](/neru/code-snippets/voice-provider/handle-calls.md).