---
title: Session Monitoring 
description: Learn how to setup up and receive real-time session event callbacks so you can monitor sessions in your application server. You can use events for monitoring or sending events to the client. 
product: video
navigation_weight: 
---

# Session Monitoring

Register to receive real-time session event callbacks and monitor your session activity from your app server.

Using the Vonage Video platform, developers can monitor certain activity of clients using Vonage Video client SDKs, from within their app server.

By registering for callbacks with the Vonage Video REST API, your callback URL will receive HTTP POST requests when any client connects or publishes to a session in your Vonage Video project.

Additionally, you can register a callback to monitor events related to Vonage Video archives for your project.

## Registering callbacks

Session events and archive status updates information can all be registered to HTTP endpoints within your server.

Whenever registered activity occurs, an HTTP request is issued from Vonage Video infrastructure to your endpoint. 

To register a callback:

1. Visit your [Vonage Video API account page](https://identity.nexmo.com/login?icid=nexmocustomer_api-developer-adp_nexmodashbdsigin_nav).
2. Select the Vonage Video project for which you want to register a callback.
3. Set the callback URL in the Session Monitoring section.

The archive callback URL is set separately from the the callback URL for session events. Set the archive callback URL in the Archive section of your [Vonage Video API account page](https://identity.nexmo.com/login?icid=nexmocustomer_api-developer-adp_nexmodashbdsigin_nav).

> **Important:** If within 30 minutes there are more than 50 event delivery failures (in which we don't receive a 200 success response when sending an HTTP request to your callback URL), we will disable session monitoring event forwarding. We will send an email if this occurs. You can re-enable session monitoring in your [Vonage Video API account page](https://identity.nexmo.com/login?icid=nexmocustomer_api-developer-adp_nexmodashbdsigin_nav).

## Monitoring connection activity

Once properly registered, Vonage Video infrastructure can send HTTP requests for all connections made (and destroyed) to all sessions for a single project.

This is particularly useful for tracking user availability without requiring additional connections or reporting directly from the endpoint.

When clients receive `connectionCreated` and `connectionDestroyed` events in response to other clients connecting to and disconnecting from a session, these same events are sent to your registered callback endpoint.

### Connection created

For each distinct event, the server sends an HTTP POST request to the URL you supply.

The Content-Type for the request is `application/json`. The data of the request is a JSON object of the following form:

```json
{
    "sessionId": "2_MX4xMzExMjU3MX5-MTQ3MDI1NzY3OTkxOH45QXRr",
    "projectId": "123456",
    "event": "connectionCreated",
    "timestamp": 1470257688309,
    "connection": {
        "id": "c053fcc8-c681-41d5-8ec2-7a9e1434a21e",
        "createdAt": 1470257688143,
        "data": "TOKENDATA"
    }
}
```

The JSON object includes the following properties:

* `sessionId` — The session ID associated with this event.
* `projectId` — The project ID associated with this event.
* `event` — `"connectionCreated"`.
* `timestamp` — Milliseconds since unix epoch time.
* `connection` — An object defining the connection, containing the following properties:
  * `id` — The connection ID.
  * `data` — The connection data.
  * `createdAt` — The timestamp value this object was created.

### Connection destroyed

For each distinct event, the server sends an HTTP POST request to the URL you supply.

The Content-Type for the request is `application/json`.

The data of the request is a JSON object of the following form:

```json
{
    "sessionId": "2_MX4xMzExMjU3MX5-MTQ3MDI1NzY3OTkxOH45QXRr",
    "projectId": "123456",
    "event": "connectionDestroyed",
    "reason": "clientDisconnected",
    "timestamp": 1470258896953,
    "connection": {
        "id": "c053fcc8-c681-41d5-8ec2-7a9e1434a21e",
        "createdAt": 1470257688143,
        "data": ""
    }
}
```

The JSON object includes the following properties:

* `sessionId` — The session ID associated with this event.
* `projectId` — The project ID associated with this event.
* `reason` — For a `connectionDestroyed` event, this is set to one of the following:
  * `"clientDisconnected"` — A client disconnected from the session (for example, by calling the OpenTok.js `Session.disconnect()` method or by closing the browser or app).
  * `"forceDisconnected"` — A moderator has disconnected the client from the session (by calling the OpenTok.js `Session.forceDisconnect()` method).
  * `"networkDisconnected"` — The network connection terminated abruptly (for example, the client lost their internet connection).
* `event` — `"connectionDestroyed"`.
* `timestamp` — Milliseconds since unix epoch time.
* `connection` — An object defining the connection, containing the following properties:
  * `id` — The connection ID.
  * `data` — The connection data.
  * `createdAt` — The timestamp value this object was created.

## Monitoring streams

Server endpoints can also register to receive HTTP requests triggered by stream activity on all sessions for a given project.

When streams are created and destroyed, the request will contain stream and connection data for the stream that triggered the event.

When clients receive `streamCreated` and `streamDestroyed` events in response to other clients publishing to a session, these same events are sent to your registered callback endpoint.

### Stream created

For each distinct event, the server sends an HTTP POST request to the URL you supply.

The Content-Type for the request is `application/json`. The data of the request is a JSON object of the following form: 

```json
{
    "sessionId": "2_MX4xMzExMjU3MX5-MTQ3MDI1NzY3OTkxOH45QXRr",
    "projectId": "123456",
    "event": "streamCreated",
    "timestamp": 1470258860571,
    "stream": {
        "id": "63245362-e00e-4834-8371-9397deb3e452",
        "connection": {
            "id": "c053fcc8-c681-41d5-8ec2-7a9e1434a21e",
            "createdAt": 1470257688143,
            "data": ""
        },
        "createdAt": 1470258845416,
        "name": "",
        "videoType": "camera"
    }
}
```

* `sessionId` — The session ID associated with this event.
* `projectId` — The project ID associated with this event.
* `event` — `"streamCreated"`.
* `timestamp` — Milliseconds since unix epoch time.
* `stream` — An object that defines the stream:
  * `id` — The stream ID.
  * `connection` — The connection associated with this stream. This object includes the following properties:
     * `id` — The connection ID
     * `data` — The connection data.
     * `createdAt` — The timestamp value the connection was created.
  * `createdAt` — The timestamp value the stream was created.
  * `name` — The name, if there was one, passed in when the publisher associated with this stream was initialized.
  * `videoType` — The type of video sent on this stream, either `"camera"`, `"screen"`, or `"custom"` (or undefined for an audio-only stream).

### Stream destroyed

For each distinct event, the server sends an HTTP POST request to the URL you supply.

The Content-Type for the request is `application/json`. The data of the request is a JSON object of the following form:

```js
{
    "sessionId": "2_MX4xMzExMjU3MX5-MTQ3MDI1NzY3OTkxOH45QXRr",
    "projectId": "123456",
    "event": "streamDestroyed",
    "reason": "clientDisconnected",
    "timestamp": 1470258896953,
    "stream": {
        "id": "63245362-e00e-4834-8371-9397deb3e452",
        "connection": {
            "id": "c053fcc8-c681-41d5-8ec2-7a9e1434a21e",
            "createdAt": 1470257688143,
            "data": ""
        },
        "createdAt": 1470258845416,
        "name": "",
        "videoType": "camera"
    }
}
```

* `sessionId` — The session ID associated with this event.
* `projectId` — The project ID associated with this event.
* `event` — `"streamDestroyed"`.
* `reason` — For a `streamDestroyed` event, this is set to one of the following:
  * `"clientDisconnected"` — The client disconnected from the session (for example, by calling the OpenTok.js `Session.disconnect()` method).
  * `"forceDisconnected"` — A moderator has disconnected the publisher of the stream from the session, by calling the OpenTok.js `Session.forceDisconnect()` method.
  * `"forceUnpublished"` — A moderator has forced the publisher of the stream to stop publishing the stream, by calling the OpenTok.js `Session.forceUnpublish()` method.
  * `"mediaStopped"` — The user publishing the stream has stopped sharing the screen. This value is only used in screen-sharing video streams.
  * `"networkDisconnected"` The network connection terminated abruptly (for example, the client lost their internet connection).
* `timestamp` — Milliseconds since unix epoch time.
* `stream` — An object that defines the stream:
  * `id` — The stream ID
  * `connection` — The connection associated with this stream. This object includes the following properties:
     * `id` — The connection ID.
     * `data` — The connection data.
     * `createdAt` — The timestamp value the connection was created.
  * `createdAt` — The timestamp value the stream was created.
  * `name` — The name, if there was one, passed in when the publisher associated with this stream was initialized.
  * `videoType` — The type of video sent on this stream, either `"camera"`, `"screen"`, or `"custom"` (or undefined for an audio-only stream).

## Monitoring archives

Each archive goes through multiple states through the lifespan of the archive. For every status update that occurs, a server endpoint with an archive status registration will receive an HTTP request.

This is particularly useful for triggering post-processing of an archive, or for performing any necessary administrative tasks after an archive has been uploaded to persistent storage.

For more information see the [archive status changes](/video/guides/archiving#archive-status-changes) section of the Vonage Video archiving developer guide.

## Monitoring SIP call progress

You can monitor status updates for SIP connections to a session.

<!-- OPT-TODO: See the [Monitoring call progress](/guides/sip/#monitoring-call-progress) section of the Vonage Video SIP Interconnect developer guide. -->