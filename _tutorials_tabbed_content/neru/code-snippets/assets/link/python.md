---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
assets = Assets(session)

fileData = await assets.generateLink('/imgs/image.png', '5w').execute()
```