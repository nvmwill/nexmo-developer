---
title: PHP
description: Learn about the PHP Vonage Video API server SDK, which makes it easy to use many of Vonage Video API's REST API's functionality. Use the SDK to generate sessions and tokens, and more.
product: video
---

# Vonage Video API PHP SDK

The Vonage Video PHP SDK provides methods for:

* [Creating sessions](#creating-sessions).
* [Generating tokens](#generating-tokens)
* [Working with streams](#working-with-streams)
* [Working with archives](#working-with-archives)
* [Disconnecting clients from sessions](#force-a-client-to-disconnect)
* [Forcing clients in a session to disconnect or mute published audio](#forcing-clients-in-a-session-mute-published-audio)
* [Sending signals to clients connected to a session](#sending-signals)

## Installation

## Requirements

You need to create a Vonage Application with Video capabilities. You will then use the private key and application ID
to configure the API client. You can create the application by logging into your
[Vonage Video API account](https://dashboard.nexmo.com).

The Vonage Video PHP SDK requires PHP 7.4 or higher.

### Composer (recommended)

Composer helps manage dependencies for PHP projects. Find more info here: <http://getcomposer.org>

Add this package (`vonage/video`) to your `composer.json` file, or run the following at the
command line:

```
$ ./composer.phar require vonage/video
```

## Usage

### Initializing

This package follows the [PSR-4](http://www.php-fig.org/psr/psr-4/) autoloading standard. If you are
composer requires the generated autoloader:

```php
require "<projectpath>/vendor/autoload.php";
```

Once the files of the SDK are loaded, you can create a Vonage API client using the private key and
application ID associated with your Vonage Video application. Since the Video SDK is currently in
beta, you will need to also register it with the main API client in order to access it in the same
way as the other APIs.

```php
use Vonage\Client;
use Vonage\Client\Credentials\Keypair;
use Vonage\Video\ClientFactory;

$credentials = new Keypair('private-key-string', 'application-id');
$client = new Client($credentials);
$client->getFactory()->set('video', new ClientFactory());
$vonageVideoClient = $client->video();
```

#### Initialization Options

The Vonage Video client allows for some overrides of values when special needs arise, such as
needing to point to a different datacenter or change the timeout of the underlying HTTP client. For
these situations, you can pass an array of additional options as the third parameter.

We allow the following additional options for the Video SDK:
* `base_video_url` - Change the domain that the SDK points to. Useful when needing to select a specific datacenter
or point to a mock version of the API for testing

```php
use Vonage\Client;
use Vonage\Client\Credentials\Keypair;
use Vonage\Video\ClientFactory;

$credentials = new Keypair('private-key-string', 'application-id');
$options = [
    'base_video_url' => 'https://country-specific.api.vonage.com'
];
$client = new Client($credentials);
$client->getFactory()->set('video', new ClientFactory());
$vonageVideoClient = $client->video();
```

### Creating Sessions

To create a Session, use the `createSession($options)` method of the
Vonage Video client. The `$options` parameter is an optional array used to specify the following:

- Setting whether the session will use the  Media Router or attempt to send streams directly
  between clients.

- Setting whether the session will automatically create archives (implies use of routed session)

- Specifying a location hint.

```php
use Vonage\Video\MediaMode;
use Vonage\Video\SessionOptions;
use Vonage\Video\Archive\ArchiveMode;

// Create a session that attempts to use peer-to-peer streaming:
$session = $client->video()->createSession();

// A session that uses the Vonage Video Media Router, which is required for archiving:
$session = $client->video()->createSession(new SessionOptions(['mediaMode' => MediaMode::ROUTED]));

// A session with a location hint:
$session = $client->video()->createSession(new SessionOptions(['location' => '12.34.56.78']));

// An automatically archived session:
$sessionOptions = new SessionOptions([
    'archiveMode' => ArchiveMode::ALWAYS,
    'mediaMode' => MediaMode::ROUTED
]);
$session = $client->video()->createSession($sessionOptions);


// Store this sessionId in the database for later use
$sessionId = $session->getSessionId();
```

The `getSessionId()` method returns the session ID,
which you use to identify the session in the Vonage Video client libraries.

For more information on sessions, see the [sessions](/video/tutorials/create-session) developer guide.

### Generating Tokens

Once a Session is created, you can start generating Tokens for clients to use when connecting to it.
You can generate a token either by calling the `generateToken($sessionId, $options)` method.

The `$options` parameter is an optional array used to set the role,
how long until the token expires, and connection data of the Token. For layout control in archives and broadcasts,
the initial layout class list of streams published from connections using this token can be set as well.

```php
use Vonage\Video\Role;

// Generate a Token from just a sessionId (fetched from a database)
$token = $client->video()->generateToken($sessionId);
// Generate a Token by calling the method on the Session (returned from createSession)
$token = $session->generateToken();

// Set some options in a token
$token = $session->generateToken(array(
    'role'       => Role::MODERATOR,
    'ttl'        => 7 * 24 * 60 * 60, // in one week
    'data'       => 'name=Johnny',
    'initialLayoutClassList' => ['focus']
));
```

For more information on Tokens, see the [Create Token](/video/guides/create-token) developer guide.

### Working with Streams

You can get information about a stream by calling the `getStream($sessionId, $streamId)` method of the
Vonage Video client.

```php
// Get stream info from just a sessionId (fetched from a database)
$stream = $client->video()->getStream($sessionId, $streamId);

// Stream properties
$stream->id; // string with the stream ID
$stream->videoType; // string with the video type
$stream->name; // string with the name
$stream->layoutClassList; // array with the layout class list
```

You can get information about all the streams in a session by calling the `listStreams($sessionId)` method of the
Vonage Video client.

```php
// Get list of streams from just a sessionId (fetched from a database)
$streamList = $client->video()->listStreams($sessionId);

$streamList->count(); // total count
```


### Working with Archives

You can only archive sessions that use the Vonage Video Media Router
(sessions with the media mode set to routed).

You can start the recording of a Vonage Video Session using the `startArchive($archiveConfig)` method
of the Vonage Video client. This will return an `Vonage\Video\Archive` instance.

The parameter
`$archiveConfig` is an configuration object and is used to determine the session ID, assign a name, whether to record audio and/or
video, the desired output mode for the Archive, and the desired resolution if applicable. Note that you can only start an
Archive on a Session that has clients connected.

```php
use Vonage\Video\Archive\ArchiveConfig;

// Create a simple archive of a session
$archive = $client->video()->startArchive(new ArchiveConfig($sessionId));

// Create an archive using custom options
$archiveOptions = (new ArchiveConfig($sessionId))
    ->setName('Important Presentation')
    ->setHasAudio(true)
    ->setHasVideo(true)
    ->setOutputMode(ArchiveConfig::OUTPUT_MODE_COMPOSED)
    ->setResolution(ArchiveConfig::RESOLUTION_LANDSCAPE_HD)
;
$archive = $client->video()->startArchive($archiveOptions);

// Store this archiveId in the database for later use
$archiveId = $archive->getId();
```

If you set the `outputMode` option to `ArchiveConfig::OUTPUT_MODE_INDIVIDUAL`, it causes each stream in the archive to be recorded to its own individual file. Please note that you cannot specify the resolution when you set the `outputMode` option to `ArchiveConfig::OUTPUT_MODE_INDIVIDUAL`. The `ArchiveConfig::OUTPUT_MODE_COMPOSED` setting (the default) causes all streams in the archive to be recorded to a single (composed) file.

> Note that you can also create an automatically archived session, by passing in `ArchiveMode::ALWAYS`
as the `archiveMode` key of the `options` parameter passed into the `$client->video()->createSession()`
method (see "Creating Sessions," above).

You can stop the recording of a started archive using the `stopArchive($archiveId)` method of the
Vonage Video client.

```php
// Stop an Archive from an archiveId (fetched from database)
$client->video()->stopArchive($archiveId);
```

To get an `Vonage\Video\Archive` instance (and all the information about it) from an archive ID, use the
`getArchive($archiveId)` method of the Vonage Video client.

```php
$archive = $client->video()->getArchive($archiveId);
```

To delete an Archive, you can call the `deleteArchive($archiveId)` method of the Vonage Video client.

```php
// Delete an Archive from an archiveId (fetched from database)
$client->video()->deleteArchive($archiveId);
```

You can also get a list of all the Archives you've created (up to 1000) with your API Key. This is
done using the `listArchives($filter)` method of the Vonage Video Client.

You can pass a `KeyValueFilter` object with `offset`, `count`, or `sessionId` options. The filter is optional and can help you subset results. Note that the list will automatically return the next page of results, so you do not need to manually call an `offset` or `count` unless specifically needed.

```php
use Vonage\Entity\Filter\KeyValueFilter;

// Return all archives
$archiveList = $client->video()->listArchives();
// Filter to a specific page, offset, or session ID
$archiveList = $client->video()->listArchives(new KeyValueFilter(['offset' => 10]));

// The list is iterable
foreach($archives as $archive) {
    echo $archive->getName() . PHP_EOL;
}
// Get the total number of Archives for this API Key
$totalCount = $archiveList->count();
```

For composed archives, you can change the layout dynamically, using the `updateArchiveLayout($archiveId, $layoutType)` method:

```php
$layout = Layout::getPIP(); // Or use another get method of the Layout class.
$client->video()->setArchiveLayout($archiveId, $layout);
```

You can set the initial layout class for a client's streams by setting the `layout` option when
you create the token for the client, using the `generateToken()` method or the
`Session->generateToken()` method.

Setting the layout of composed archives is optional. By default, composed archives use the
"best fit" layout (see [Customizing the video layout for composed
archives](/video/guides/layout-control)).

For more information on archiving, see the [Vonage Video archiving](/video/guides/archiving/overview) developer guide.

### Force a Client to Disconnect

Your application server can disconnect a client from a Vonage Video session by calling the `disconnectClient($sessionId, $connectionId)`
method of the Vonage Video client.

```php
// Force disconnect a client connection
$client->video()->disconnectClient($sessionId, $connectionId);
```

### Forcing clients in a session mute published audio

You can force the publisher of a specific stream to stop publishing audio using the 
`forceMuteStream($sessionId, $stream)` method.

You can force the publisher of all streams in a session (except for an optional list of streams)
to stop publishing audio using the `forceMuteAll($sessionId, $excludedStreamIds)` method.
You can then disable the mute state of the session by calling the
`disableForceMute(sessionId)` method.

### Sending Signals

Once a Session is created, you can send signals to everyone in the session or to a specific connection.
You can send a signal by calling the `signal($sessionId, $type, $data, $connectionId)` method of the
Vonage Video client.

The `$sessionId` parameter is the session ID of the session.

The `$data` (string) is a data string for the signal. You can send a maximum of 8kB.

The `$type` (string) is the type string for the signal. You can send a maximum of 128 characters, and only the following characters are allowed: A-Z, a-z, numbers (0-9), '-', '\_', and '~'.

The `$connectionId` parameter is an optional string used to specify the connection ID of
a client connected to the session. If you specify this value, the signal is sent to
the specified client. Otherwise, the signal is sent to all clients connected to the session.

```php
// Send a signal to a specific client
$data = 'some signal message';
$type => 'signal type';
$connectionId = 'da9cb410-e29b-4c2d-ab9e-fe65bf83fcaf';
$client->video()->sendSignal($sessionId, $type, $data, $connectionId);

// Send a signal to everyone in the session
$data = 'some signal message';
$type => 'signal type';
$client->video()->signal($sessionId, $signalPayload);
```

<!-- OPT-TODO: For more information, see the [Vonage Video signaling developer
guide](/developer/guides/signaling/). -->

## Release Notes

See the
<a href="https://github.com/Vonage/vonage-php-sdk-video/releases" onclick="gaEvent('php_sdk', 'body: releases-info')">Releases</a>
page for details.
