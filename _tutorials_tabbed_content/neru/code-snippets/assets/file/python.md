---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
assets = Assets(session)

file = await assets.getRemoteFile('/imgs/image.png').execute();
```