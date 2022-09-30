---
title: Changelog
description: This documentation describes changes to the NeRu SDK and CLI
meta_title: NeRu Changelog
---

# NeRu Changelog


## SDKs

* JavaScript SDK is available on [npm](https://www.npmjs.com/package/neru-alpha)

* Python SDK is available on [pypi](https://pypi.org/project/nerualpha/)

### 3.2.0 - (2022-09-12)

* Added:
    * Form-data dependency to support file uploads.
    * Watch dev dependency to support watch mode.
    * `RequestInterfaceWithParams` class to support passing request params to the request

### 3.1.0 - (2022-09-07)

* Added:
    * Sessions now expire, the default TTL is 7 days. You can change this by passing a TTL in seconds when creating a session: `neru.createSession(5000)`.

* Changed: 
    * `session.log()` is no longer async.
    * `conversation.sayText` now has an optional `to` parameter.
    * `name` was removed as a parameter for `Conversation.init` and `voice.getConversation`.

* Fixed:
    * `conversation.sayText()` and `conversation.sayStop()` now work as expected with default values.
    * `logAction.id` and `logAction.session_id` have the correct values.


### 3.0.0 - (2022-08-09)

* Added: 
    * Meetings API provider (Alpha).
    * Numbers API provider (Alpha).
    * `listAll` and `get` functions added to the Scheduler provider.
    * `delete` function added to the State provider

* Changed:
    * JavaScript: 
        * The [State provider](/neru/providers/state) is now accessed via the new State provider initializer: `const state = new State(session);`
        `neru.getSession` has been removed.

* Fixed:
    * SDK Classes now all exported.

* Removed:
    * NeRu Router (`neru.Router()`) has been removed. Use a web server library of your choice (e.g. express/fast api) and expose it on the port provided by `process.env.NERU_APP_PORT`
    * State provider function `del` has been removed. Replaced with `delete`.

### 2.4.0 - (2022-07-20)

* Fixed:
    * Request headers added to log submissions.

## CLI

### 0.8.14 - (2022-09-23)

* Added:
    * Adding `environment` capabilities support for `neru.yml`. The `configurations` capability has been deprecated.

* Fixed:
    * Assets provider support

### 0.8.13 - (2022-08-25)

* Fixed:
    * Fix for empty instance IDs

### 0.8.12 - (2022-08-17)

* Fixed: 
    * Missing incoming request parameters (e.g. `req.query`).

### 0.8.11 - (2022-08-02)

* Fixed: 
    * Debug API Key issue.