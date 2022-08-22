---
title: Changelog
description: This documentation describes changes to the NeRu SDK and CLI
meta_title: NeRu Changelog
---

# NeRu Changelog


## SDKs

* JavaScript SDK is available on [npm](https://www.npmjs.com/package/neru-alpha)

* Python SDK is available on [pypi](https://pypi.org/project/nerualpha/)

### 3.0.0 - (2022-08-9)

* Changed:
    * JavaScript: 
        * The [State provider](/neru/providers/state) is now accessed via the new State provider initializer: `const state = new State(session);`
        `neru.getSession` has been removed.

* Added: 
    * Meetings API provider (Alpha).
    * Numbers API provider (Alpha).
    * `listAll` and `get` functions added to the Scheduler provider.

* Fixed:
    * SDK Classes now all exported.

### 2.4.0 - (2022-07-20)

* Fixed:
    * Request headers added to log submissions.

## CLI

### 0.8.12 - (2022-08-17)

* Fixed: 
    * Missing incoming request parameters (e.g. `req.query`).

### 0.8.11 - (2022-08-2)

* Fixed: 
    * Debug API Key issue.


