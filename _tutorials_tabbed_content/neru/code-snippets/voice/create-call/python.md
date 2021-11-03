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

to = Contact()
to.type_ = 'phone'
to.number = '447000000001

ncco = [
            {
                'action': 'talk',
                'text': 'Hi! This is a call made by the Voice API and NeRu'
            }
    ]

await voice.vapiCreateCall(vonageNumber, [to], ncco).execute()
```