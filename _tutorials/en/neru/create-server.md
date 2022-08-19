---
title: Create your Node server
description: In this step you learn how to create a node server for your NeRu Project.
---

# Create your Node server

In your project folder create a new file by running:

```
touch index.js
```

Then open the new file in your text editor. This file will house the Node server that you will deploy to NeRu. At the top of the file import the dependencies and configure express:

```javascript
import { neru, Voice } from "neru-alpha";
import express from 'express';

const app = express();
const port = process.env.NERU_APP_PORT;

app.use(express.json());
```