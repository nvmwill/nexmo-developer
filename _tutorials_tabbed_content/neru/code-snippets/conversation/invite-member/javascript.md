---
title: Javascript
language: javascript
menu_weight: 1
---

```javascript
const session = neru.createSession();
const voiceApi = new Voice(session);

const conversation = await voiceApi.createConversation();

await conversation.inviteMember("Alice", {id: "channel_Id", type: "app"})
```