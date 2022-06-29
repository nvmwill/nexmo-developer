---
title: Working with Archives
description: Working with Archives
---

### Working with Archives

You can start the recording of a session using the `OpenTok.startArchive(sessionId, options, callback)` method.

The `options` parameter is an optional object used to set the name of the archive. The callback has the signature `function(err, archive)`. The archive returned in the callback is an instance of archive.

>Note that you can only start an archive on a Session with connected clients.

```js
opentok.startArchive(sessionId, { name: "Important Presentation" }, function (
  err,
  archive
) {
  if (err) {
    return console.log(err);
  } else {
    // The id property is useful to save off into a database
    console.log("new archive:" + archive.id);
  }
});
```

You can also disable audio or video recording by setting the `hasAudio` or `hasVideo` property of the options parameter to `false`:

```js
var archiveOptions = {
  name: "Important Presentation",
  hasVideo: false, // Record audio only
};
opentok.startArchive(sessionId, archiveOptions, function (err, archive) {
  if (err) {
    return console.log(err);
  } else {
    // The id property is useful to save to a database
    console.log("new archive:" + archive.id);
  }
});
```

By default, all streams are recorded to a single (composed) file. You can record the different streams in the session to individual files (instead of a single composed file) by setting the `outputMode` option to `'individual'` when you call the `OpenTok.startArchive()` method:

```js
var archiveOptions = {
  name: "Important Presentation",
  outputMode: "individual",
};
opentok.startArchive(sessionId, archiveOptions, function (err, archive) {
  if (err) {
    return console.log(err);
  } else {
    // The id property is useful to save off into a database
    console.log("new archive:" + archive.id);
  }
});
```

You can stop the recording of a started Archive using the `OpenTok.stopArchive(archiveId, callback)` method. You can also do this using the `Archive.stop(callback)` method an archive instance. The callback has a signature `function(err, archive)`. The archive returned in the callback is an instance of archive.

```js
opentok.stopArchive(archiveId, function (err, archive) {
  if (err) return console.log(err);

  console.log("Stopped archive:" + archive.id);
});

archive.stop(function (err, archive) {
  if (err) return console.log(err);
});
```

To get an archive instance (and all the information about it) using an **archiveId**, use the `OpenTok.getArchive(archiveId, callback)` method.

The callback has a function `signature function(err, archive)`. You can inspect the properties of the archive for more details.

```js
opentok.getArchive(archiveId, function (err, archive) {
  if (err) return console.log(err);

  console.log(archive);
});
```

To delete an archive, you can call the `OpenTok.deleteArchive(archiveId, callback)` method or the `delete(callback)` method of an archive instance. The callback has a signature `function(err)`.

```php
// Delete an Archive from an archiveId (fetched from database)
opentok.deleteArchive(archiveId, function (err) {
  if (err) console.log(err);
});

// Delete an Archive from an Archive instance, returned from the OpenTok.startArchive(),
// OpenTok.getArchive(), or OpenTok.listArchives() methods
archive.delete(function (err) {
  if (err) console.log(err);
});
```

You can also get a list of all the archives you've created (up to 1000) with your API Key. This is done using the `OpenTok.listArchives(options, callback)` method. The parameter options is an optional object used to specify an **offset** and **count** to help you paginate through the results. The callback has a signature `function(err, archives, totalCount)`. The archives returned from the callback is an array of an archive instance.

The **totalCount** returned from the callback is the total number of archives your API Key has generated.

```js
opentok.listArchives({ offset: 100, count: 50 }, function (
  error,
  archives,
  totalCount
) {
  if (error) return console.log("error:", error);

  console.log(totalCount + " archives");
  for (var i = 0; i < archives.length; i++) {
    console.log(archives[i].id);
  }
});
```

>Note that you can also create an automatically archived session, by passing in `'always'` as the `archiveMode` option when you call the `OpenTok.createSession()` method see ["Creating Sessions"](/video/tutorials/server-side-setup/video/server-side/node/creating-sessions/node).

For composed archives, you can set change the layout dynamically, using the `OpenTok.setArchiveLayout(archiveId, type, stylesheet, screenshareType, callback)` method:

```js
opentok.setArchiveLayout(archiveId, type, null, null, function (err) {
  if (err) return console.log("error:", error);
});
```

You can set the initial layout class for a client's streams by setting the layout option when you create the token for the client, using the `OpenTok.generateToken()` method. And you can change the layout classes for streams in a session by calling the `OpenTok.setStreamClassLists(sessionId, classListArray, callback)` method.

Setting the layout of composed archives is optional. By default, composed archives use the `"best fit"` layout.

<!-- opentok-todo: (see Customizing the video layout for composed archives). https://tokbox.com/developer/guides/archiving/layout-control.html-->

<!-- opentok-todo: For more information on archiving, see the OpenTok archiving developer guide. https://tokbox.com/developer/guides/archiving/ -->

In the next section you will learn how to [work with broadcasts](/video/tutorials/server-side-setup/video/server-side/node/broadcasts/node).