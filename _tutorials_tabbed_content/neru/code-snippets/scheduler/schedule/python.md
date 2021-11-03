---
title: Python
language: python
menu_weight: 1
---

```python
session = neru.createSession()
scheduler = Scheduler(session)

time = datetime.now(timezone.utc) + timedelta(seconds=5000)
startAtParams = StartAtParams()
startAtParams.id = 'myScheduler'
startAtParams.startAt = time.isoformat()
startAtParams.callback = 'parkingReminder'
startAtParams.payload = {
    'text': 'hello world!'
}

await scheduler.startAt(startAtParams).execute()
```