---
title: Setting up authentication
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Setting up authentication

In order to connect to an Vonage Video session, the client will need access to some authentication credentials — an **API key**, **session ID**, and **token**. In a production application, these credentials should be generated using a [server SDK](/video/server-sdks/overview), but to speed things up we will hard code the values for now:

1. Create the `OpenTokConfig` class (File | New | Java Class), add some static variables to store the API key, session ID, and token. We'll also add some constants for our log message identifier and permissions:

```java
public class OpenTokConfig {
    public static final String API_KEY = "";
    public static final String SESSION_ID = "";
    public static final String TOKEN = "";
}
```

2. Adjust the code by hard coding the values for the `API_KEY`, `SESSION_ID` and `TOKEN`. To do this, log into your [Video API account](https://www.tokbox.com/account/user/signup), either create a new Vonage Video API project or use an existing Vonage Video API project, then go to your project page and scroll down to the **Project Tools** section. From there, you can generate a session ID and token manually. Use the project’s API key along with the session ID and token you generated.

**Important:** You can continue to get the session ID and token values from your Account during testing and development, but before you go into production you must set up a server.

For more information on sessions, tokens, and servers, check out [Video API Basics](/video/overview).
