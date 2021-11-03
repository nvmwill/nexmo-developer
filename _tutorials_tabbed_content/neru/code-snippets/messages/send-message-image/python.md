---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
messaging = Messages(session)

vonageNumber = MessageContact()
vonageNumber.type_ = 'whatsapp'
vonageNumber.number = '447700900000'

to = '447700900001'

image = ImagePayload()
image.url = 'http://developer.vonage.com/vonage_developer_logo.svg'

message = WhatsappImageMessage()
message.message_type = 'image'
message.to = to
message.from_ = vonageNumber.number
message.channel = vonageNumber.type_
message.image = image

await messages.send(message).execute()
```