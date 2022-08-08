---
title: JavaScript SDK
meta_title: Learn best practices about exception handling for your web application.
description: Learn best practices about exception handling for your web application. Learn about our completion handlers, which methods have them, and how to listen for exception events in real-time applications.
navigation_weight: 
---
# Exception Handling | Web SDK

A best practice when programming is to write code that assumes and anticipates that things will go wrong. For example, a client may not be connected to the internet when trying to connect to a session.

The [Web SDK](/video/client-sdks/web) includes completion handlers and exception events that reveal exceptions at run time.

This topic includes the following sections:

* [Completion handlers](#completion-handlers)
* [Methods with completion handlers](#methods-with-completion-handlers)
* [Listening for exception events](#listening-for-exception-events)

## Completion handlers

For many methods that complete asynchronously, the final parameter you pass in is a completion handler function. This function is called when the method completes or fails. If it fails, the function is passed an error object as a parameter.

For example, the following code calls the `Session.connect()` method, passing in a completion handler:

```js
var session = OT.initSession(apiKey, session);
session.connect(token, function (error) {
    if (error) {
    console.log("Failed to connect: ", error.message);
    if (error.name === "OT_NOT_CONNECTED") {
        alert("You are not connected to the internet. Check your network connection.");
    }
    } else {
    console.log("Connected");
    }
});
 ```   

It is important to implement completion handlers to see when a method succeeds or fails. In some cases, you can prompt the user if there is a client condition that caused the error. For example, if the `error.name` property is set to "OT\_NOT\_CONNECTED" when calling the `Session.connect()` method fails, this indicates that the client is not connected to the network.

For other error conditions that are not the fault of the client, you can examine the error code and message to see the nature of the error. For example, when calling the `Session.connect()` method fails, an error code of 1004 indicates that you tried to connect with an invalid token. This could be a token that is expired or that does not match the session you are connecting to. Check the message property of the error object for details.

## Methods with completion handlers

The following methods in the Web SDK include a `completionHandler` parameter. For this optional parameter, you can pass in a function that is called when the method succeeds or fails:

* `Session.forceDisconnect()`
* `Session.forceUnpublish()`
* `Session.connect()`
* `Session.publish()`
* `Session.signal()`
* `Session.subscribe()`
* `OT.initPublisher()`

Check the `message` property for more details about the error.

In the event of an error, the `code` value of the `error` parameter can have one of the following values:

|     |     |
| --- | --- |
| **Errors when calling `Session.connect()`:** |     |
| **code** | **Description** |
| 1004 | Authentication error. Check the error message for details. This error can result if you pass in an expired token when trying to connect to a session. It can also occur if you pass in an invalid token or API key. Make sure that you are generating the token using the current version of one of the [server SDKs](/video/server-sdks/overview). |
| 1005 | Invalid Session ID. Make sure you generate the session ID using the current version of one of the [server SDKs](/video/server-sdks/overview). |
| 1006 | Connect Failed. Unable to connect to the session. You may want to have the client check the network connection. |

|     |     |
| --- | --- |
| **Errors when calling `Session.forceDisconnect()`:** |     |
| **code** | **Description** |
| 1520 | Unable to force disconnect. The client's token does not have the role set to moderator. Once the client has connected to the session, the `capabilities` property of the Session object lists the client's capabilities. |

|     |     |
| --- | --- |
| **Errors when calling `Session.forceUnpublish()`:** |     |
| **code** | **Description** |
| 1530 | Unable to force unpublish. The client's token does not have the role set to moderator. Once the client has connected to the session, the `capabilities` property of the Session object lists the client's capabilities. |
| 1535 | Force Unpublish on an invalid stream. Make sure that the stream has not left the session before you call the `forceUnpublish()` method. |

|     |     |
| --- | --- |
| **Errors when calling `Session.publish()`:** |     |
| **code** | **Description** |
| 1010 | Cannot publish: the client is not connected to the session. Check that your application makes the client connect successfully before trying to publish. And check that the client has not disconnected before trying to publish. |
| 1500 | Unable to Publish. The client's token does not have the role set to publish or moderator. Once the client has connected to the session, the `capabilities` property of the Session object lists the client's capabilities. |
| 1601 | Internal error -- WebRTC publisher error. Try republishing or reconnecting to the session. |

|     |     |
| --- | --- |
| **Errors when calling `Session.signal()`:** |     |
| **code** | **Description** |
| 1510 | Unable to signal. Check that the `to` property of the signal parameter is set to a valid Connection object. Also, make sure that you are connected to the session. |

|     |     |
| --- | --- |
| **Errors when calling `Session.subscribe()`:** |     |
| **code** | **Description** |
| 1600 | Internal error -- WebRTC subscriber error. Try resubscribing to the stream or reconnecting to the session. |

|     |     |
| --- | --- |
| **Errors when calling `OT.initPublisher()`:** |     |
| **code** | **Description** |
| 1004 | Authentication error. Check the error message for details. This error can result if you pass in an expired token when trying to connect to a session. It can also occur if you pass in an invalid token or API key. Make sure that you are generating the token using the current version of one of the [server SDKs](/video/server-sdks/overview). |

|     |     |
| --- | --- |
| **General errors that can occur when calling any method:** |     |
| **code** | **Description** |
| 1011 | Invalid Parameter. Check that you have passed valid parameter values into the method call. |
| 2000 | Internal Error. Try reconnecting to the session and trying the action again. |

## Listening for exception events

To detect all exception events, add an event listener for the `exception` event, dispatched by the OT object. However, it is easier to react to errors in completion handlers for specific methods.