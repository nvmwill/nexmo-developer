---
title: Text Chat UI
description: Follow this tutorial to build basic text chat from scratch using the Vonage Video API. It is the quickest way to build a proof of concept for this functionality on the video platform. 
product: video
---

## Text Chat UI

To display our chat messages, we use an `android.widget.ListView` object. This lets the app display more than one message at a time. We add the following code in the `onCreate()` method to inflate our layout and obtain references to its views.

```java
setContentView(R.layout.activity_main);

messageEditTextView = findViewById(R.id.message_edit_text);
messageHistoryListView = findViewById(R.id.message_history_list_view);

// Attach data source to message history
messageHistory = new SignalMessageAdapter(this);
messageHistoryListView.setAdapter(messageHistory);
```

Once we inflate our Android layout views, and attach `messageHistory` to the `messageHistoryListView`, and configure our message editor to send a message when the enter key is pressed on the keyboard.

``` java
messageEditTextView.setOnEditorActionListener(new TextView.OnEditorActionListener() {
    @Override
    public boolean onEditorAction(TextView v, int actionId, KeyEvent event) {
        if (actionId == EditorInfo.IME_ACTION_DONE) {
            InputMethodManager inputMethodManager = (InputMethodManager) v.getContext().getSystemService(Context.INPUT_METHOD_SERVICE);
            inputMethodManager.hideSoftInputFromWindow(v.getWindowToken(), 0);
            sendMessage();
            return true;
        }
        return false;
    }
});

messageEditTextView.setEnabled(false);
```
