---
title: Assets
description: The Assets Provider
navigation_weight: 6
---

# Assets Provider (WIP Docs)

The Assets provider allows you to store and retrieve objects on the NeRu platform. You can generate links to your public files, with TTLs for secure files, or download the binary.

## Functions

* [`createDir`](/neru/code-snippets/assets-provider/create-directory)
* [`uploadFiles`](/neru/code-snippets/assets-provider/upload)
* [`remove`](/neru/code-snippets/assets-provider/remove)
* [`list`](/neru/code-snippets/assets-provider/list)
* [`generateLink`](/neru/code-snippets/assets-provider/gen-link)
* [`getRemoteFile`](/neru/code-snippets/assets-provider/get-file)


## Initializing the Assets Provider

To use the Assets Provider you need to create an instance of the provider using a session:

```javascript
const session = neru.createSession();
const assets = new Assets(session);
```