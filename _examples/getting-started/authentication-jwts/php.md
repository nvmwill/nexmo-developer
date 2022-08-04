---
title: PHP
language: php
---

The current version of the [Vonage PHP Server SDK](https://github.com/Nexmo/nexmo-php) can also create a JWT including the appropriate claims when using the Keypair authentication.

```php
$keypair = new \Vonage\Client\Credentials\Keypair(
    file_get_contents('/path/to/private.key'),
    'aaaaaaaa-bbbb-cccc-dddd-0123456789ab'
);
$client = new \Vonage\Client($keypair);

$claims = [
    'acl' => [
        'paths' => [
            '/*/users/**' => (object) [],
            '/*/conversations/**' => (object) [],
            '/*/sessions/**' => (object) [],
            '/*/devices/**' => (object) [],
            '/*/image/**' => (object) [],
            '/*/media/**' => (object) [],
            '/*/applications/**' => (object) [],
            '/*/push/**' => (object) [],
            '/*/knocking/**' => (object) [],
            '/*/legs/**' => (object) [],
        ]
    ]
];
$token = $client->generateJwt($claims);
$tokenString = (string) $token;
```
