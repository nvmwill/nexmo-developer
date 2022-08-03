---
title: Authentication
navigation_weight: 1
---

# Authentication

Vonage APIs support different authentication methods depending on which product you are using.

API | API Key and Secret (Query String) | API Key and Secret (Header) | JSON Web Token (JWT)
-- | -- | -- | -- | --
[SMS](/api/sms) | ✅ | ❌ | ❌
[Voice](/api/voice)¹ | ❌ | ❌ | ✅
[Verify](/api/verify) | ✅ | ❌ | ❌
[Number Insight](/api/number-insight) | ✅ | ❌ | ❌
[Conversion](/api/conversion) | ✅ | ❌ | ❌
[Developer](/api/developer) | ✅ | ❌ | ❌
[Messages](/api/messages-olympus) | ❌ | ✅ | ✅
[Meetings](/api/meetings) | ❌ | ❌ | ✅
[Dispatch](/api/dispatch) | ❌ | ✅ | ✅
[Audit](/api/audit) | ❌ | ✅ | ❌
[Redact](/api/redact) | ❌ | ✅ | ❌
[Media](/api/media) | ✅ | ❌ | ❌
[Conversation](/api/conversation) | ❌ | ❌ | ✅
[Reports](/api/reports) | ❌ | ✅ | ❌

¹ SIP Trunking uses [Digest Authentication](https://developer.vonage.com/voice/sip/overview#authentication) method with the API Key as user and API Secret as password.

## Contents

In this document you can learn about authentication via the following means:

- [API Key and Secret](#api-key-and-secret)
  - [Request Body](#request-body)
  - [Query String](#query-string)
  - [Header-based API Key and Secret Authentication](#header-based-api-key-and-secret-authentication)
  - [Secret Rotation](#secret-rotation)
- [JSON Web Tokens (JWT)](#json-web-tokens)
  - [Header and Payload](#header-and-payload)
  - [Vonage SDKs](#vonage-sdks)
  - [ACLs](#acls)
  - [Generating JWTs](#generating-jwts)

- [References](#references)

## API Key and Secret

When you create a Vonage account, an API key and secret will be created for you. These are located in your [account settings](https://dashboard.nexmo.com/settings) in the Vonage Dashboard. You should always keep these secure and **never share these details**: be careful when adding it to your codebase to make sure they are not shared with anyone who may use it maliciously. If you use [message signatures](/concepts/guides/signing-messages), these are generated using the `SIGNATURE_SECRET` rather than the `API_SECRET`; both values can be found in your [account settings](https://dashboard.nexmo.com/settings).

> Note: The secret should always be kept secure and never shared. Be careful when adding it to your codebase to make sure it is not shared with anyone who may use it maliciously. Read more about the [Best Security Practices for your Vonage Account](https://help.nexmo.com/hc/en-us/articles/115014939548).

Vonage APIs may require your API Key and Secret in a number of different ways.

### Request Body

For `POST` requests to the SMS API, your API key and secret should be sent as part of the body of the request in the JSON object.

### Query String

Your API key and secret should be included in the query parameters of requests you make to the Conversion, Number Insight or Developer API. The parameters are called `API_KEY` and `API_SECRET` respectively.

An example of authentication query parameters would be as follows:

```
?api_key=VONAGE_API_KEY&api_secret=VONAGE_API_SECRET
```

The request may also need other query parameters and these can be added in any order.

### Basic Authentication

A number of newer Vonage APIs require authentication to be done using an API key and secret sent Base64 encoded in the `Authorization` header.

For these APIs, you send your API key and secret in the following way:

```
Authorization: Basic base64(API_KEY:API_SECRET)
```

If your API key were `aaa012` and your API secret were `abc123456789`, you would concatenate the key and secret with a `:` (colon) symbol and then encode them using Base64 encoding to produce a value like this:

```
Authorization: Basic YWFhMDEyOmFiYzEyMzQ1Njc4OQ==
```

A website for generating Base64 encoded strings can be found here:

- General: [Base64 Encode and Decode](https://www.base64encode.org/)

Details on how to encode Base64 strings in a variety of programming languages can be found at the following websites:

- C#/.NET: [How do I encode and decode a Base64 string?](https://stackoverflow.com/questions/11743160/how-do-i-encode-and-decode-a-base64-string) from StackOverflow
- Go: [Base64 Encoding](https://gobyexample.com/base64-encoding) from Go By Example
- Java: [Base64](https://docs.oracle.com/javase/8/docs/api/java/util/Base64.html)
- JavaScript: [Base64 encoding and decoding](https://developer.mozilla.org/en-US/docs/Web/API/WindowBase64/Base64_encoding_and_decoding) from MDN web docs
- PHP: [base64_encode](https://secure.php.net/manual/en/function.base64-encode.php)
- Python: [Base64](https://docs.python.org/2/library/base64.html)
- Ruby: [Base64](https://ruby-doc.org/stdlib-2.5.0/libdoc/base64/rdoc/Base64.html)
- Swift: [Base64 Encode and Decode in Swift](http://iosdevelopertips.com/swift-code/base64-encode-decode-swift.html) from iOS Developer Tips

### Secret Rotation

It is possible to have two API secrets to be used against one API key at the same time. This way you can create a second API secret and test it before revoking the existing API secret in your production network. The API secret rotation procedure consists of the following steps:

1. Create a second API secret in your [account settings](https://dashboard.nexmo.com/settings) or by using the [secret rotation API](/api/account/secret-management).
2. Update one or more of your servers to use the newly created API secret for making calls to Vonage APIs
3. Test that there are no connectivity issues and roll out the API secret update across the remaining servers
4. Delete the replaced API secret

## JSON Web Tokens

JSON Web Tokens (JWTs) are a compact, URL-safe means of representing claims to be transferred between two parties. For a full list of the APIs that use JWTs, please see the table [above](#authentication).

### Header and Payload

Values for the Header are:

Name | Description | Required
-- | -- | --
`alg` | The encryption algorithm used to generate the JWT. `RS256` is supported. | ✅
`typ` | The token structure. Set to `JWT`. | ✅

The values for the payload claim are:

Name | Description | Required
-- | -- | --
`application_id` | The unique ID allocated to your application by Vonage. | ✅
`iat` | The UNIX timestamp at UTC + 0 indicating the moment the JWT was requested. | ✅
`jti` | The unique ID of the JWT. | ✅
`nbf` | The UNIX timestamp at UTC + 0 indicating the moment the JWT became valid. | ❌
`exp` | The UNIX timestamp at UTC + 0 indicating the moment the JWT is no longer valid. A minimum value of 30 seconds from the time the JWT is generated. A maximum value of 24 hours from the time the JWT is generated. A default value of 15 minutes from the time the JWT is generated. | ❌

If you are not using a Vonage library you should refer to [RFC 7519](https://tools.ietf.org/html/rfc7519) to implement JWT.

## Vonage SDKs

The [Vonage SDKs](/tools) use [JWTs](https://jwt.io/) for authentication when a user logs in. These JWTs are generated using the application ID and private key that is provided [when a new application is created](/tutorials/client-sdk-generate-test-credentials).

### Claims

Using that `private.key` and the application ID, we can mint a new JWT. In order to log a user into a Vonage client, the JWT will need the following claims:

|Claim | Description |
| --------- | ----------- |
| `sub`| The "subject". The subject, in this case, will be the name of the user created and associated with your Vonage Application. |
| `acl`| Access control list. The Client SDK uses this as a permission system for users. Read more about it in the [ACL overview](#acls). |
| `application_id`| This is the ID of the Vonage Application you created. |
| `iat`| "Issued at time" This is the time the JWT was issued, in unix epoch time. |
| `jti`| "JWT ID". This is a unique identifier for this JWT. |
| `exp`| "Expiration time" This is the time in the future that the JWT will expire, in unix epoch time.  |

> *The `exp` claim is optional.* If the claim is not provided, then the JWT will expire by default in 15 minutes. The max expiration time for a JWT is 24 hours. JWTs should typically be short-lived, as it is trivial to create a new JWT and some JWTs can have multiple far-reaching permissions.

### Sample JWT Payload

Once all the claims have been provided, the resulting claims should appear like so:

```json
{
  "iat": 1532093588,
  "jti": "705b6f50-8c21-11e8-9bcb-595326422d60",
  "sub": "alice",
  "exp": "1532179987",
  "acl": {
    "paths": {
      "/*/users/**": {},
      "/*/conversations/**": {},
      "/*/sessions/**": {},
      "/*/devices/**": {},
      "/*/image/**": {},
      "/*/media/**": {},
      "/*/applications/**": {},
      "/*/push/**": {},
      "/*/knocking/**": {},
      "/*/legs/**": {}
    }
  },
  "application_id": "aaaaaaaa-bbbb-cccc-dddd-0123456789ab"
}
```

## ACLs

### Overview

In the previous section, you can see that the `acl` claim has a `paths` object containing multiple endpoints. These endpoints correspond with certain permissions a user can have when utilizing Client SDK features.

### Paths

|Endpoint | Description |
| --------- | ----------- |
| `/*/sessions/**`| Log in as a user|
| `/*/users/**`| Create and manage users|
| `/*/conversations/**`| Create and manage conversations & send/receive messages|
| `/*/image/**`| Send and receive images|
| `/*/media/**`| Send and receive audio|
| `/*/knocking/**`| Start phone calls|
| `/*/push/**`| Receive push notifications|
| `/*/devices/**`| Send push notifications|
| `/*/applications/**`| Upload push notification certificate|
| `/*/legs/**`| Create and manage legs in a conversation|

You should provide the user you are generating with permissions to access only the relevant paths. For instance, if a user is not going to upload or receive push notifications, you can create a JWT without including the `/*/applications/**`or `/*/push/**` paths.

## Generating JWTs

### Using the Vonage API online tool to generate a JWT

You can generate a JWT using our [online tool](/jwt).

### Using the Vonage CLI to generate JWTs

The [Vonage CLI](https://github.com/vonage/vonage-cli) provides a command for generating a JWT. The general syntax is:

``` shell
vonage jwt [options]
```

An example of generating a JWT for a Voice API application is as follows:

``` shell
vonage jwt --key_file=path/to/private.key --app_id=asdasdas-asdd-2344-2344-asdasdasd345
```

An example of generating a JWT for a Client SDK application is as follows:

``` shell
vonage jwt --key_file=./private.key --subject=MY_USER_NAME --acl='{"paths":{"/*/users/**":{},"/*/conversations/**":{},"/*/sessions/**":{},"/*/devices/**":{},"/*/image/**":{},"/*/media/**":{},"/*/applications/**":{},"/*/push/**":{},"/*/knocking/**":{},"/*/legs/**":{}}}' --app_id=MY_APP_ID
```
**NB:** The private key in question is generated and stored in the current directory where you created your app using the CLI. It will have the same name as your application. You can also find it in the generated `vonage_app.json` file.

Further information on the Vonage CLI can be found in its [repository on GitHub](https://github.com/vonage/vonage-cli).

### Node

The beta version of the [Vonage Node Server SDK](https://github.com/Nexmo/nexmo-node/tree/beta#jwt) can also create a JWT [including the appropriate claims](https://github.com/Nexmo/nexmo-node/tree/beta#jwt).

```js
const aclPaths = {
  "paths": {
    "/*/users/**": {},
    "/*/conversations/**": {},
    "/*/sessions/**": {},
    "/*/devices/**": {},
    "/*/image/**": {},
    "/*/media/**": {},
    "/*/applications/**": {},
    "/*/push/**": {},
    "/*/knocking/**": {},
    "/*/legs/**": {}
  }
}

Nexmo.generateJwt(PRIVATE_KEY, {
            application_id: "aaaaaaaa-bbbb-cccc-dddd-0123456789ab",
            sub: "alice",
            //expire in 24 hours
            exp: Math.round(new Date().getTime()/1000)+86400,
            acl: aclPaths
          })
```

### PHP

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

### Java / Kotlin

The [Nexmo JWT JDK library](https://github.com/Nexmo/nexmo-jwt-jdk) can be used to generate a signed JWT with claims.

```kotlin
val token : String = Jwt.builder()
    .applicationId("aaaaaaaa-bbbb-cccc-dddd-0123456789ab")
    .privateKeyPath("/path/to/private.key")
    .issuedAt(ZonedDateTime.now())
    .subject("alice")
    .addClaim("acl", mapOf(
        "paths" to mapOf(
            "/*/users/**" to mapOf<String, Any>(),
            "/*/conversations/**" to mapOf(),
            "/*/sessions/**" to mapOf(),
            "/*/devices/**" to mapOf(),
            "/*/image/**" to mapOf(),
            "/*/media/**" to mapOf(),
            "/*/applications/**" to mapOf(),
            "/*/push/**" to mapOf(),
            "/*/knocking/**" to mapOf(),
            "/*/legs/**" to mapOf()
        )
    ))
    .build()
    .generate()
```

### Other languages

Creating a JWT with the appropriate claims for authenticating a Vonage user is not currently provided in any of the other Vonage Client Libraries. Instead, you are encouraged to use your Server SDK of choice to create a new JWT with the [Sample JWT Payload](#sample-jwt-payload). [JWT.io](https://jwt.io/#libraries-io) has a selection of libraries for generating JWTs in multiple languages.

## References

- [Voice API Reference](/api/voice)
- [SMS API Reference](/api/sms)
