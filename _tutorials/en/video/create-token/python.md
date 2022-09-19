---
title: Connection Token Creation
meta_title: Use the Vonage Video API Python SDK to learn how to create a token.
description: Use the Vonage Video API Python SDK to learn how to create a token. Tokens allow participants to use audio, video, and messaging functionality in your application.
navigation_weight:
---

## Generating a token using the Python library

The following Python code example shows how to generate a token using the Vonage Video Python server-side library:

``` python
import OpenTok

# Replace with your OpenTok API key:
api_key = "your_API_key"
# Replace with your OpenTok API secret:
api_secret = "your_API_secret"
# Replace with the representative URL of your session:
session_address = "192.0.43.10"

opentok_sdk = OpenTok.OpenTok(api_key, api_secret)
session = opentok_sdk.create_session(session_address)
token = opentok_sdk.generate_token(session.session_id)
print token
```

Calling the `generate_token()` method returns a string. This string is the token.

The following Python code example shows how to obtain a token that has a role of "publisher" and that has a connection metadata string:

``` python
import OpenTok

# Replace with your OpenTok API key:
api_key = "your_API_key"
# Replace with your OpenTok API secret:
api_secret = "your_API_secret"
# Replace with the representative URL of your session:
session_address = "192.0.43.10"

opentok_sdk = OpenTok.OpenTok(api_key, api_secret)
role_constants = OpenTok.RoleConstants

session = opentok_sdk.create_session(session_address)
connectionMetadata = "username=Bob,userLevel=4"
token = opentok_sdk.generate_token(session.session_id, role_constants.PUBLISHER, None, connectionMetadata)
print token
```

The method takes the following arguments:

* `session_id` (String) — The session ID corresponding to the session to which the user will connect.
* `role` (String) — Optional. This defines the role the user will have. There are three roles: subscriber, publisher, and moderator. Subscribers can only subscribe to streams in the session (they cannot publish). Publishers can subscribe and publish streams to the session, and they can use the signaling API. Moderators have the privileges of publishers and, in addition, they can also force other users to disconnect from the session or to cease publishing. The default role (if no value is passed) is publisher.
* `connection_data` (String) — Optional. A string containing metadata describing the connection. For example, you can pass the user ID, name, or other data describing the connection. You may obtain this data from a server-side database or from data provided to you by the client, depending on your application.
* `expire_time` (int) — Optional. The time when the token will expire, defined as an integer value for a Unix timestamp (in seconds). If you do not specify this value, tokens expire in 24 hours after being created. The `expire_time` value, if specified, must be within 30 days of the creation time.
