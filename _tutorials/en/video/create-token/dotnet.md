---
title: Connection Token Creation
meta_title: Use the Vonage Video API .NET SDK to learn how to create a token.
description: Use the Vonage Video API .NET SDK to learn how to create a token. Tokens allow participants to use audio, video, and messaging functionality in your application.
navigation_weight:
---

## Generating a token using the .NET library

The following .NET code shows how to generate a token using the Vonage Video .NET SDK:

```c#
// Set the following constants with the API key and API secret
// that you receive when you sign up to use the OpenTok API:
OpenTok opentok = new OpenTok(API_KEY, API_SECRET);

//Generate a basic session. Or you could use an existing session ID.
string sessionId = opentok.CreateSession().Id

string token = opentok.GenerateToken(sessionId);
```

Calling the `GenerateToken()` method returns a string. This string is the token.

The following .NET code shows how to obtain a token that has a role of "publisher" and that has a connection metadata string:

```c#
// Set the following constants with the API key and API secret
// that you receive when you sign up to use the OpenTok API:
OpenTok opentok = new OpenTok(API_KEY, API_SECRET);

//Generate a basic session. Or you could use an existing session ID.
string sessionId = opentok.CreateSession().Id

// Replace with meaningful metadata for the connection.
string connectionMetadata = "username=Bob,userLevel=4";

// Generate a token. Use the Role value appropriate for the user.
string token = opentok.GenerateToken(sessionId, Role.PUBLISHER, Null, connectionMetadata);
```

The method takes the following arguments:

* `sessionId` (string) — The session ID corresponding to the session to which the user will connect.
* `role` (string) — Optional. This defines the role the user will have. There are three roles: subscriber, publisher, and moderator. Subscribers can only subscribe to streams in the session (they cannot publish). Publishers can subscribe and publish streams to the session, and they can use the signaling API. Moderators have the privileges of publishers and, in addition, they can also force other users to disconnect from the session or to cease publishing. The default role (if no value is passed) is publisher.
* `expireTime` (int) — Optional. The time when the token will expire, defined as an integer value for a Unix timestamp (in seconds). If you do not specify this value, tokens expire in 24 hours after being created. The `expireTime` value, if specified, must be within 30 days of the creation time.
* `data` (string) — Optional. A string containing metadata describing the connection. For example, you can pass the user ID, name, or other data describing the connection. You may obtain this data from a server-side database or from data provided to you by the client, depending on your application.