---
title: Scheduler
description: The Scheduler Provider
navigation_weight: 5
---

## Scheduler Provider

The Scheduler provider allows you to schedule functions to be run at a specific time or after a time out.

### Initializing the Scheduler Provider

To use the Scheduler Provider you need to create an instance of the provider

```javascript
import { neru, Scheduler } from "neru-alpha";

const session = neru.createSession();
const scheduler = new Scheduler(session);
```