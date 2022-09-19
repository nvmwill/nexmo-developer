---
title: Connection Token Creation 
meta_title:  Use the Vonage Video API Java SDK to learn how to create a token.
description: Use the Vonage Video API Java SDK to learn how to create a token. Tokens allow participants to use audio, video, and messaging functionality in your application.
navigation_weight:
---

## Generating a token using the Java library

The following Java code example shows how to generate a token using the Vonage Video Java server-side library:

``` java
import com.opentok.OpenTok;
import com.opentok.exception.OpenTokException;

class Test {
    public static void main(String argv[]) throws OpenTokException {
        // Set the following constants to your Vonage Video API key and API secret.
        // See your Vonage Video account https://ui.idp.vonage.com/ui/auth/login.
        OpenTok opentok = new OpenTok(API_KEY, API_SECRET);

        //Generate a basic session. Or you could use an existing session ID.
        String sessionId = opentok.createSession().getSessionId();

        String token = opentok.generateToken(sessionId);
        System.out.println(token);
    }
}
```

Calling the `generateToken()` method returns a string. This string is the token.

The following Java code example shows how to obtain a token that has a role of "publisher" and that has a connection metadata string:

``` java
import com.opentok.OpenTok;
import com.opentok.Role;
import com.opentok.TokenOptions;
import com.opentok.exception.OpenTokException;

class Test {
    public static void main(String argv[]) throws OpenTokException {
        // Set the following constants to your OpenTok API key and API secret.
        // See Vonage Video account https://ui.idp.vonage.com/ui/auth/login.
        OpenTok opentok = new OpenTok(API_KEY, API_SECRET);

        //Generate a basic session. Or you could use an existing session ID.
        String sessionId = opentok.createSession().getSessionId();

        // Replace with meaningful metadata for the connection.
        String connectionMetadata = "username=Bob,userLevel=4";

        // Generate a token. Use the Role value appropriate for the user.
        TokenOptions tokenOpts = new TokenOptions.Builder()
            .role(Role.MODERATOR)
            .expireTime((System.currentTimeMillis() / 1000) + (7 * 24 * 60 * 60)) // in one week
            .data(connectionMetadata)
            .build());
        String token = opentok.generateToken(sessionId, tokenOpts);
        System.out.println(token);
    }
}
```

The method takes the following arguments:

* `sessionId` (String) — The session ID corresponding to the session to which the user will connect.
* `tokenOptions` (TokenOptions) — Optional. An object that defines options for the token:
    * The role the user will have. There are three roles: subscriber, publisher, and moderator. Subscribers can only subscribe to streams in the session (they cannot publish). Publishers can subscribe and publish streams to the session, and they can use the signaling API. Moderators have the privileges of publishers and, in addition, they can also force other users to disconnect from the session or to cease publishing. The default role (if no value is passed) is publisher.
    * Connection data — A string containing metadata describing the connection. For example, you can pass the user ID, name, or other data describing the connection. You may obtain this data from a server-side database or from data provided to you by the client, depending on your application.
    * The time when the token will expire, defined as an integer value for a Unix timestamp (in seconds). If you do not specify this value, tokens expire in 24 hours after being created. The `expire_time` value, if specified, must be within 30 days of the creation time.
