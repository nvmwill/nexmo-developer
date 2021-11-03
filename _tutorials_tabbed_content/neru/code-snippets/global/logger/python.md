---
title: Python
language: python
menu_weight: 1
---

```python
from nerualpha.neru import Neru

session = neru.createSession()

await session.log('info', 'test info')
await session.log('debug', 'test debug')
await session.log('warn', 'test warn')
await session.log('error', 'test error')
await session.log('error', 'test error with context', {'actionName': 'creating user', 'payload': '{ user: Alice }', 'result': 'fail'})
```