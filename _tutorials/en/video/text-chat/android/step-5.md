---
title: Receiving Signals with onSignalReceived
description: Follow this tutorial to build basic text chat from scratch using the Vonage Video API. It is the quickest way to build a proof of concept for this functionality on the video platform. 
product: video
---

## Receiving Signals with onSignalReceived

In the body of the `onSignalReceived)()` method, we first want to differentiate between signals sent from the local Android client and other clients connected to the session. While this check isn't necessary for all applications, our application is a text chat one, and we want to make it clear which messages were sent and which were received.

To do this, we inspect the Connection object. The Connection object in the argument of the method is from the client that the signal was sent from. This will only match the Connection object returned by `mSession.getConnection()` (which returns the local client's connection) if the signal was sent by the local client. The `remote` variable is set to `true` if the signal is coming from a connection that is different than our own, otherwise it is set to `false`.

```java
@Override
public void onSignalReceived(Session session, String type, String data, Connection connection) {

    boolean remote = !connection.equals(session.getConnection());
    if (type != null && type.equals(SIGNAL_TYPE)) {
        showMessage(data, remote);
    }
}
```

Next we call the `showMessage(messageData, remote)` method, passing in `remote`. Downstream, the `SignalMessageAdapter` instance, `messageHistoryListView` will use this to place the view holding the signal's data on the right side of the view if it was being sent, and on the left was being received.

```java
private void showMessage(String messageData, boolean remote) {
    SignalMessage message = new SignalMessage(messageData, remote);
    messageHistory.add(message);
}
```

For more information on the Android classes used in this text chat implementation, see the Android reference docs for the [ArrayAdaptor](http://developer.android.com/reference/android/widget/ArrayAdapter.html) and [ListView](http://developer.android.com/reference/android/widget/ListView.html).
