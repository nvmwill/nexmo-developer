---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
voice = Voice(session)

await voice.onVapiAnswer("onAnswer").execute()

@app.post('/onAnswer')
async def onAnswer():
    return  [
                {
                    'action': 'talk',
                    'text': 'Hi from Vonage!'
                }
        ]
```