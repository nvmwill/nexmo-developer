---
title: Scheduler
description: The Scheduler Provider
navigation_weight: 3
---

## Scheduler Provider

The Scheduler provider allows you to schedule functions to be run at a specific time or after a time out.

### Initializing the Scheduler Provider

To use the Scheduler Provider you need to create an instance of the provider

```javascript
import { neru, providers } from "neru-alpha";

const createSession = neru.createSession();
const schedulerProvider = new providers.Scheduler(createSession);
```