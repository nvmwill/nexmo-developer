---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
messaging = Messages(session)

await messaging.unsubscribeEvents('listenerId').execute()
```