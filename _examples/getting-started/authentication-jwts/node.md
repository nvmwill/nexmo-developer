---
title: Node.js
language: node
---

The beta version of the [Vonage Node Server SDK](https://github.com/Nexmo/nexmo-node/tree/beta#jwt) can also create a JWT [including the appropriate claims](https://github.com/Nexmo/nexmo-node/tree/beta#jwt).

```js
const aclPaths = {
  "paths": {
    "/*/users/**": {},
    "/*/conversations/**": {},
    "/*/sessions/**": {},
    "/*/devices/**": {},
    "/*/image/**": {},
    "/*/media/**": {},
    "/*/applications/**": {},
    "/*/push/**": {},
    "/*/knocking/**": {},
    "/*/legs/**": {}
  }
}

Nexmo.generateJwt(PRIVATE_KEY, {
            application_id: "aaaaaaaa-bbbb-cccc-dddd-0123456789ab",
            sub: "alice",
            //expire in 24 hours
            exp: Math.round(new Date().getTime()/1000)+86400,
            acl: aclPaths
          })
```
