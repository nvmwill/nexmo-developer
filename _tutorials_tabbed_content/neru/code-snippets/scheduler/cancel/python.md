---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
scheduler = Scheduler(session)

await scheduler.cancel('myScheduler').execute()
```