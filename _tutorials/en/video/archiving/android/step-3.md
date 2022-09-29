---
title: Exploring the code
description: Follow this tutorial to build basic archiving for a web application from scratch using the Vonage Video API. It is the quickest way to build a proof of concept for this functionality on the Vonage Video API platform.
product: video 
---

## Exploring the code

In the `ServerConfig` file, you set the `CHAT_SERVER_URL` property to the base URL:

```java
public static final String CHAT_SERVER_URL = "https://YOURAPPNAME.herokuapp.com";
```

The endpoints of the web service the app calls to start archive recording, stop recording, and play back the recorded video are defined in the `APIService` interface:

```java
public interface APIService {
    @GET("session")
    Call getSession();

    @POST("archive/start")
    @Headers("Content-Type: application/json")
    Call startArchive(@Body StartArchiveRequest startArchiveRequest);

    @POST("archive/{archiveId}/stop")
    Call stopArchive(@Path("archiveId") String archiveId);
}
```

When the user selects the `start archive`, `stop archive`, and `play archive` menu items from the action bar or the options menu, the app calls the `startArchive()` and `stopArchive()`, and `playArchive()` methods. These methods internally call the web services defined above:

```java
@Override
public boolean onOptionsItemSelected(MenuItem item) {
    // Handle app bar item clicks here. The app bar will
    // automatically handle clicks on the Home/Up button, so long
    // as you specify a parent activity in AndroidManifest.xml.
    switch (item.getItemId()) {
        case R.id.action_settings:
            return true;
        case R.id.action_start_archive:
            startArchive();
            return true;
        case R.id.action_stop_archive:
            stopArchive();
            return true;
        case R.id.action_play_archive:
            playArchive();
            return true;
        default:
            return super.onOptionsItemSelected(item);
    }
}
```

The `MainActivity` class includes an `archiveListener` property that implements the `Session.ArchiveListener` interface providing callbacks for handling archive-related events: `onArchiveStarted` and `onArchiveStopped`.

When the user clicks the `start archive` button, the app calls `archive/start` endpoint via the `startArchive()` method. When the archive recording starts, the `onArchiveStarted()` callback is triggered:

```java
@Override
    public void onArchiveStarted(Session session, String archiveId, String archiveName) {
        currentArchiveId = archiveId;
        setStopArchiveEnabled(true);
        archivingIndicatorView.setVisibility(View.VISIBLE);
    }
```

The `onArchiveStarted()` method stores the archive identifier in a `currentArchiveId` property. The method also calls `setStopArchiveEnabled(true)`, which causes the `stop recording` menu item to be displayed. And it causes `archivingIndicatorView` to be displayed (a red dot on the video).

When the user clicks the `stop archive` button, the app calls `archive/stop` endpoint via the `stopArchive()` method. When archive recording stops, the `onArchiveStopped()` callback is triggered:

```java
@Override
public void onArchiveStopped(Session session, String archiveId) {
    playableArchiveId = archiveId;
    currentArchiveId = null;
    setPlayArchiveEnabled(true);
    setStartArchiveEnabled(true);
    archivingIndicatorView.setVisibility(View.INVISIBLE);
}
```

The `onArchiveStopped()` method stores the archive identifier to a `playableArchiveId` property and sets `currentArchiveId` to `null`. The method also calls `setPlayArchiveEnabled(false)`, which disables the Play Archive menu item, and it calls `setStartArchiveEnabled(true)` to enable the Start Archive menu item. And it causes the `archivingIndicatorView` to be hidden.

When the user clicks the `play archive` button, the `playArchive()` method opens a web page (in the device's web browser), which displays the archive recording.

**Notes:**

* In most applications, control of the archive recording would not be granted to each end-user.
* You can have automatically archived sessions, which are recorded whenever a client starts publishing a stream.
* You will want to set up an Amazon S3 or Microsoft Azure target for storage of your archive recordings.

For more information on archiving, see the [Vonage Video archiving developer guide](/video/guides/archiving/overview).
