---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
voice = Voice(session)

vapiEventParams = VapiEventParams()
vapiEventParams.callback = 'onEvent'
vapiEventParams.vapiUUID = 'uuid'

await voice.onVapiEvent(vapiEventParams).execute()
```