---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
messaging = Messages(session)

vonageNumber = MessageContact()
vonageNumber.type_ = 'sms'
vonageNumber.number = '447700900000'

fromContact = MessageContact()
fromContact.type_ = 'sms'
fromContact.number = None

await messages.onMessage('onMessage', fromContact, vonageContact).execute()
```