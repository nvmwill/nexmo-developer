---
title: Sending Signals
description: Follow this tutorial to build basic text chat from scratch using the Vonage Video API. It is the quickest way to build a proof of concept for this functionality on the video platform. 
product: video
---

## Sending Signals

If you look back to step 2, the `sendMessage` method is called when the user hits enter on the keyboard. `sendMessage` creates a `SignalMessage` object from the visible text in the `EditTextView`

```java
private void sendMessage() {
    Log.d(TAG, "Send Message");

    SignalMessage signal = new SignalMessage(messageEditTextView.getText().toString());
    session.sendSignal(SIGNAL_TYPE, signal.getMessageText());

    messageEditTextView.setText("");
}
```

This signal is then sent to all clients connected to the session. `sendSignal()` is the actual Vonage Video method to send a signal. It has two parameters:

* `type` (String) — An optional parameter that can be used as a filter for types of signals.
* `data` (String) — The data to send with the signal.

We set the `type` of the signal to `SIGNAL_TYPE` (a string we decided to define as "text-signal"). We'll see later in the `onSignalReceived()` method, that we checks to see if the signal received is of this type. While in this application, this is our only signal type, you have the flexibility to have multiple different types of signals.
