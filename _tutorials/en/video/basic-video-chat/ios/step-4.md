---
title: Connecting to the Session
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Connecting to the Session

Next, we will connect to the Vonage Video session. You must do this before you can publish your audio-video stream to the session or view other participants streams.

1. Add a `session` property to the ViewController class:

```objc
@interface ViewController()
@property (nonatomic) OTSession *session;
@end
```

The OTSession class is defined in the Vonage Video iOS SDK. It represents a Vonage Video session and includes methods for interacting with the session.

2. Add a method to instantiate the OTSession object and call its `[OTSession connectWithToken: error:]` method. Then you can call it in `viewDidLoad`:

```objc
- (void)viewDidLoad {
    [super viewDidLoad];
    [self connectToAnOpenTokSession];
}

- (void)connectToAnOpenTokSession {
    _session = [[OTSession alloc] initWithApiKey:kApiKey sessionId:kSessionId delegate:self];

    NSError *error;
    [_session connectWithToken:kToken error:&error];
    if (error) {
        NSLog(@"%@", error);
    }
}
```

The `[OTSession initWithApiKey:sessionId:delegate:]` method takes three parameters:

* Your Vonage Video API key
* The session ID
* The object that implements the OTSessionDelegate protocol

The `[OTSession connectWithToken: error:]` method connects the client application to the Vonage Video session. You must connect before sending or receiving audio-video streams in the session (or before interacting with the session in any way). The method takes two parameters:

* `token` is the authentication token for this client to connect to the Vonage Video session.
* `error` is set to an OTError object if an error occurs synchronously when calling the method.

3. Change the ViewController interface declaration to indicate that the class implements the `OTSessionDelegate` protocol:

```objc
@interface ViewController() <OTSessionDelegate>
```

Next we will implement methods of the OTSessionDelegate protocol. Add the following code to the end of the ViewController class (before the class's `@end` statement):

```objc
# pragma mark - OTSession delegate callbacks

- (void)sessionDidConnect:(OTSession*)session
{
    NSLog(@"The client connected to the session.");
}

- (void)sessionDidDisconnect:(OTSession*)session
{
    NSLog(@"The client disconnected from the OpenTok session.");
}

- (void) session:(OTSession*)session
didFailWithError:(OTError*)error
{
    NSLog(@"The client failed to connect to the OpenTok session: (%@)", error);
}

- (void)session:(OTSession*)session
    streamCreated:(OTStream *)stream
{
    NSLog(@"A stream was created in the session.");
}

- (void)session:(OTSession*)session
streamDestroyed:(OTStream *)stream
{
    NSLog(@"A stream was destroyed in the session.");

}
```

This protocol includes methods for handling events related to the session:

* When the client connects to the Vonage Video session, the `[OTSessionDelegate sessionDidConnect:]` message is sent.
* If the client fails to connect to the Vonage Video session, the `[OTSessionDelegate session:didFailWithError:]` message is sent.
* When the client disconnects from the Vonage Video session, the `[OTSessionDelegate sessionDidDisconnect:]` message is sent.
* When another client publishes a stream to the Vonage Video session the `[OTSessionDelegate session:streamCreated:]` message is sent.
* When another client stops publishing a stream to the Vonage Video session the `[OTSessionDelegate session:streamDestroyed:]` message is sent.

For now, the app prints to the debugger console when any of these events occur.

Debug your application. If the app successfully connects to the Vonage Video session, the the `[OTSessionDelegate sessionDidConnect:]` method should print to the debug console.
