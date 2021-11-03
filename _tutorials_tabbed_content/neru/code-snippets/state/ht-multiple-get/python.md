---
title: Python
language: python
menu_weight: 1
---

```python
number = body['number']
otherNumber = '447000000001'

customer = await state.hmget('customers', [number, otherNumber])
```