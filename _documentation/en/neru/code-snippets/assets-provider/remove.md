---
title: Remove a File or Directory
description: How to remove a file or directory with the Assets provider
navigation_weight: 3
---

# Remove a File or Directory

The Assets provider allows you to remove a file or directory that you have previously uploaded or created. This is a permanent action that cannot be reversed. You can set `recursive` to true to delete sub files and folders too, this is false by default.

## Method Signature

```javascript
remove(remoteFilePath: string, recursive?: boolean)
```

## Removing a File or Directory

```tabbed_content
source: _tutorials_tabbed_content/neru/code-snippets/assets/remove
```