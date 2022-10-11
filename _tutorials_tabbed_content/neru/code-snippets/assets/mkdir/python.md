---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
assets = Assets(session)

await assets.createDir('imgs').execute()
```