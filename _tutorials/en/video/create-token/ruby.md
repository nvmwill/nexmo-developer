---
title: Connection Token Creation
meta_title: Use the Vonage Video API Ruby SDK to learn how to create a token.
description: Use the Vonage Video API Ruby SDK to learn how to create a token. Tokens allow participants to use audio, video, and messaging functionality in your application.
navigation_weight:
---

## Generating a token using the Ruby library

The following example shows how to generate a token using the Vonage Video Ruby server-side library:

```ruby
class SampleController < ApplicationController
    def action
        # Replace with your OpenTok API key:
        api_key = "your_API_key"
        # Replace with your OpenTok API secret:
        api_secret = "your_API_secret"

        opentok = OpenTok::OpenTok.new api_key, api_secret
        session = opentok.create_session
        session_id = session.session_id
        token = opentok.generate_token session_id
    end
end
```

Calling the `generate_token()` method returns a string. This string is the token.

You can also generate a token by calling the `generate_token()` method of the Session object (returned by the `opentok.create_session()` method):

``` ruby
opentok = OpenTok::OpenTok.new api_key, api_secret
session = opentok.create_session
token = session.generate_token
```

The following example shows how to obtain a token that has a role of "publisher" and that has a connection metadata string:

```ruby
class SampleController < ApplicationController
    def action
        # Replace with your OpenTok API key:
        api_key = "your_API_key"
        # Replace with your OpenTok API secret:
        api_secret = "your_API_secret"

        opentok = OpenTok::OpenTok.new api_key, api_secret
        session = opentok.create_session

        token = session.generate_token({
            :role => :publisher,
            :data => "username=bob"
        })
    end
end
```

The method takes the following options:

* `role` (Symbol) — Optional. This defines the role the user will have. There are three roles: subscriber, publisher, and moderator. Subscribers can only subscribe to streams in the session (they cannot publish). Publishers can subscribe and publish streams to the session, and they can use the signaling API. Moderators have the privileges of publishers and, in addition, they can also force other users to disconnect from the session or to cease publishing. The default role (if no value is passed) is publisher.
* `data` (String) — Optional. A string containing metadata describing the connection. For example, you can pass the user ID, name, or other data describing the connection. You may obtain this data from a server-side database or from data provided to you by the client, depending on your application.
* `expire_time` (int) — Optional. The time when the token will expire, defined as an integer value for a Unix timestamp (in seconds). If you do not specify this value, tokens expire in 24 hours after being created. The `expire_time` value, if specified, must be within 30 days of the creation time.