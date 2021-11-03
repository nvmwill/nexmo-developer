---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
voice = Voice(session)

vonageNumber = Contact()
vonageNumber.type_ = 'phone'
vonageNumber.number = '447000000000'

await voice.onInboundCall('onCall', vonageNumber).execute()
```