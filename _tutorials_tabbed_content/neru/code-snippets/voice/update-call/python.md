---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
voice = Voice(session)

ncco = {
            "action": "transfer",
            "destination": {
                "type": "ncco",
                "ncco": [
                    {
                        'action': 'talk',
                        'text': 'Updated call from NeRu!'
                    }
                ]
            }
        }

await voice.onVapiEvent('callID', ncco).execute()
```