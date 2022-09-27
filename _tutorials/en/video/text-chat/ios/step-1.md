---
title: Exploring the Code
description: Follow this tutorial to build basic text chat from scratch using the Vonage Video API. It is the quickest way to build a proof of concept for this functionality on the video platform. 
product: video
---

## Exploring the Code

The archiving sample builds upon the [Basic-Video-Chat sample](/video/tutorials/basic-video-chat), and it adds the following functionality:

* Tap in the text chat input field (labeled "Tap here to send a chat message."), enter a text chat message and tap the Return button. The text chat message is sent to other clients connected to the session. You can also send a chat message from the other clients to the iOS client.

When the user enters text in the text chat input text field, the `[self sendChatMessage:]` method is called:

```objc
- (void) sendChatMessage
{
    OTError* error = nil;
    [_session signalWithType:@"chat"
                        string:_chatInputTextField.text
                    connection:nil error:&error];
    if (error) {
        NSLog(@"Signal error: %@", error);
    } else {
        NSLog(@"Signal sent: %@", _chatInputTextField.text);
    }
    _chatTextInputView.text = @"";
}
```

This method calls the `[OTSession signalWithType:string:connection:]` method. This method sends a message to clients connected to the session. Each signal is defined by a `type` string identifying the type of message (in this case "chat") and a string containing the message.

When another client connected to the session sends a message, the implementation of the `[OTSessionDelegate session:receivedSignalType:fromConnection:withString:]` method is called:

```objc
- (void)session:(OTSession*)session receivedSignalType:(NSString*)type fromConnection:(OTConnection*)connection withString:(NSString*)string {
    NSLog(@"Received signal %@", string);
    Boolean fromSelf = NO;
    if ([connection.connectionId isEqualToString:session.connection.connectionId]) {
        fromSelf = YES;
    }
    [self logSignalString:string fromSelf:fromSelf];
}
```

This method checks to see if the signal was sent by the local iOS client or by another client connected to the session:

```objc
Boolean fromSelf = NO;
if ([connection.connectionId isEqualToString:session.connection.connectionId]) {
    fromSelf = YES;
}
```

The `session` argument represents your client's OTSession object. The OTSession object has a `connection` property with a `connectionId` property. The `connection` argument represents the connection of client sending the message. If these match, the signal was sent by the local iOS app.

The method calls the `[self logSignalString:]` method which displays the message string in the text view for chat messages received.

This app uses the Vonage Video signaling API to implement text chat. However, you can use the signaling API to send messages to other clients (individually or collectively) connected to the session.
