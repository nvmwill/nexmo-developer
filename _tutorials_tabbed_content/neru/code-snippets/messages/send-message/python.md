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

to = '447700900001'

message = SMSMessage()
message.message_type = 'text'
message.to = to
message.from_ = vonageNumber.number
message.channel = vonageNumber.type_
message.text = 'Hi'

await messages.send(message).execute()
```