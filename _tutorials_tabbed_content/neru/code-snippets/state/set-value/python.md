---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
state = State(session)

await state.set('neru_obj', { 'foo': bar })
```