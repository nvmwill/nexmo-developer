---
title: Java
language: java
---

The [Nexmo JWT JDK library](https://github.com/Nexmo/nexmo-jwt-jdk) can be used to generate a signed JWT with claims.

```kotlin
val token : String = Jwt.builder()
    .applicationId("aaaaaaaa-bbbb-cccc-dddd-0123456789ab")
    .privateKeyPath("/path/to/private.key")
    .issuedAt(ZonedDateTime.now())
    .subject("alice")
    .addClaim("acl", mapOf(
        "paths" to mapOf(
            "/*/users/**" to mapOf<String, Any>(),
            "/*/conversations/**" to mapOf(),
            "/*/sessions/**" to mapOf(),
            "/*/devices/**" to mapOf(),
            "/*/image/**" to mapOf(),
            "/*/media/**" to mapOf(),
            "/*/applications/**" to mapOf(),
            "/*/push/**" to mapOf(),
            "/*/knocking/**" to mapOf(),
            "/*/legs/**" to mapOf()
        )
    ))
    .build()
    .generate()
```
