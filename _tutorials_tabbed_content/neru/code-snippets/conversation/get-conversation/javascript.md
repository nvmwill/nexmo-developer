---
title: Javascript
language: javascript
menu_weight: 1
---

```javascript
const session = neru.createSession();
const voiceApi = new Voice(session);

const conversation = voiceApi.getConversation("conversation_id", "conversation_name");
```