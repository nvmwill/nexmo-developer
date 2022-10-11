---
title: Generate a File's Link
description: How to generate the link for a file with the Assets provider
navigation_weight: 5
---

# Generate a File's Link

The Assets provider allows you to generate a link to a file that is publicly accessible. You can optionally provide a duration for the link, otherwise the default value of 5 minutes will be used. The duration for the link is specified with a number followed by a unit, so for 5 minutes you will use, `5m`. Seconds (`s`), hours (`h`), minutes (`m`), days (`d`), and weeks (`w`) are supported.

## Method signature

```javascript
generateLink(filePath: string, duration?: string)
```

# Generating a File's Link

```tabbed_content
source: _tutorials_tabbed_content/neru/code-snippets/assets/link
```