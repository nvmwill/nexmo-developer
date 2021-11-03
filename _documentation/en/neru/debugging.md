---
title: NeRu Debugging
description: This documentation describes NeRu Debugging
meta_title: NeRu Debugging
---

# NeRu Debugging

Debugging a NeRu deployment is possible by running a local Docker image that imitates the NeRu deployment and relays API calls back to the Vonage servers. You could then attach a debug session in VSCode to it.


## Start a local debug session

In your project folder run the debug start command from the CLI (you can already use the terminal window in VSCode if that is more convenient for you) - please note that the first time you run this it will set up and install a few more things.

```
neru debug 
```

Any code changes you make will trigger the debugger to reload the code and restart the debug session once you save the file.

## Debug from VSCode

Once you have a debug session running you can mark breakpoints and start to debug your code. This will attach the debugger in VSCode to the debug session running in your terminal.

Please note that the debugger will refresh after a crash only if you make code changes and save the file.
