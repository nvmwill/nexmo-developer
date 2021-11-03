---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
state = State(session)

customer = body['customer']
number = customer['number']

await state.hset('customers', { number: customer })
```