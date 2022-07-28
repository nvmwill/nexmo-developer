---
title: Initializing SDK
description: Initializing SDK
---

### Initializing SDK

This package follows the [PSR-4](http://www.php-fig.org/psr/psr-4/) autoloading standard. For a composer-based setup, you need to require or include the generated autoloader:

```php
require "<projectpath>/vendor/autoload.php";
```

Once the SDK is loaded, you need to instantiate an `OpenTok\OpenTok` object using your App ID and private key as parameters.

```php
use OpenTok\OpenTok;

$opentok = new OpenTok($appId, $privateKey);
```

**Initialization Options**

The `OpenTok\OpenTok` object allows overrides when special needs arise, such as pointing to a different data center or changing the timeout of the underlying HTTP client. For these situations, you can pass these options as a third parameter in the form of an array.

You may change the following values:

- `apiUrl` - Change the domain that the SDK points to. Useful when needing to select a specific data center or point to a mock version of the API for testing.
- `client` - Custom API client that inherits from `OpenTok\Utils\Client`, useful for customizing an HTTP client.
- `timeout` - Change the default HTTP timeout, which defaults to forever. You can pass a number of seconds to change the timeout.

```php
use OpenTok\OpenTok;
use MyCompany\CustomOpenTokClient;

$options = [
    'apiUrl' => 'https://custom.domain.com/',
    'client' => new CustomOpenTokClient(),
    'timeout' => 10,
]
$opentok = new OpenTok($appId, $privateKey, $options);
```

In the next section you will learn how to [create a session](/video/tutorials/server-side-setup/video/server-side/php/creating-sessions/php).