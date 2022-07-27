---
title: Archive Encryption
meta_title: Create encrypted archives.
description: The Vonage Video platform's encrypted archiving feature allows you to create archives where the data is never at rest in an unencrypted state.
product: video
navigation_weight: 
---

# Archive Encryption

Vonage Video encryption allows you to create archives in which the data is never at rest in an unencrypted state.

You can secure your archives in the following ways:

* Turn off archive storage fallback — By default, Vonage stores an archive file on its servers if it was unable to upload the file to your specified Amazon S3 or Microsoft Azure server. You can prevent this fallback storage by using the REST API to set the archive upload target.
* Use Vonage video encryption — This lets you to create archives where the data is never at rest in an unencrypted state. This provides the highest level of security.
* Use Amazon S3 server-side encryption — This uses Amazon S3-managed encryption keys for encryption. For details, see [this developer guide](/video/guides/amazon-s3-encryption). 

With Vonage video encryption, video and audio data in a Vonage archive is encrypted using a public key certificate you provide Vonage.

**Important:** The Vonage encryption feature is available as an [add-on feature](https://www.vonage.com/communications-apis/video/pricing). [Contact us](https://video-api.support.vonage.com/hc/en-us/requests/new) to enable this feature for your project keys.

## Feature overview

The Vonage Video platform's encrypted archiving feature allows you to create archives where the data is never at rest in an unencrypted state. 

First, create a public and private RSA key pair to use with your archives. Using a REST API call, you share the public key certificate with Vonage. (In the same REST call, you send details on the Amazon S3 or Microsoft Azure upload target to use for your archives. 

The encrypted archiving feature requires you to set an upload target.) You save the private key locally for your **private use only**.

Vonage then encrypts each archive using a randomly generated password, encrypts it with the certificate, and stores the encrypted password in our servers.

When the archive is ready, you will be notified via a callback to your server, and can query for the password. At no time does Vonage store the unencrypted password, and Vonage has no way of decrypting the password (only the keeper of the private key can decrypt the password).

You can then decrypt the password using the private key, and use the password to decrypt the encrypted archive. The decrypted archive file is in MPEG-TS format.

Vonage uses the AES-256 algorithm to encrypt the archive. 

The generated password is encrypted using RSA encryption with OAEP padding. Note that you can only use encrypted archiving with composed archives, not with individual stream archives.

**In this guide we will look at the following:**

[Creating an encrypted archiving certificate](#creating-an-encrypted-archiving-certificate)

[Sending the encrypted archiving certificate to Vonage](#sending-the-encrypted-archiving-certificate-to-vonage)

[Decrypting an archive](#decrypting-an-archive)

[Disabling encrypted archiving](#disabling-encrypted-archiving)

[Known issues](#known-issues)

## Creating an encrypted archiving certificate

Create an X.509 PEM certificate and a corresponding private key to use with your archives: 

```sh
openssl req -new -x509 -days 365 -newkey rsa:2048 -out cert.pem -keyout key.pem 
```

(Note: This has been tested with OpenSSL 1.0.1.)

You will send the certificate to Vonage, which will use it to generate an encrypted password, needed to decrypt the archive. The password can be decrypted with your private key, and the archive can be decrypted with the password. The password will be different for each archive. 

The size of the key must be 2048 bits or smaller. You will send the certificate in JSON data to the Vonage video REST API for setting the archive target (see the next section). Since the certificate will be included in JSON data, send the data base64 encoded or replace newline characters in the cert with "\n".

The following example base64 encodes the certificate:

```sh
openssl enc -base64 -in cert.pem -out cert.pem.encoded -A 
```

A base64-encoded certificate string looks like this:

```
"LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0..." 
```

A certificate string with newline characters replaced looks like this:

```
"-----BEGIN CERTIFICATE-----\n...\n...\n -----END CERTIFICATE-----"
```

## Sending the encrypted archiving certificate to Vonage

To set the certificate, and enable archive encryption, submit an HTTP PUT request to the following URL: 

```
https://api.opentok.com/v2/project//archive/storage 
``` 

Replace `appId` with your project App ID.

Authenticate the REST API request using a custom HTTP header: `X-OPENTOK-AUTH`. Set this to a JSON Web token: 

<!-- (see the OpenTok REST API documentation): -->

<!-- OPT-TODO: Add an Authentication guide? https://tokbox.com/developer/rest/#authentication  -->

```
X-OPENTOK-AUTH:
```

Create the JSON web token with the following claims: 

```json
{
    "iss": "your_app_id",
    "ist": "project",
    "iat": current_timestamp_in_seconds,
    "exp": expire_timestamp_in_seconds,
    "jti": "jwt_nonce"
}
```

* Set `iss` to your Vonage Video App ID (provided to you in your [Vonage Account](https://identity.nexmo.com/login?icid=nexmocustomer_api-developer-adp_nexmodashbdsigin_nav) on the Project page).
* Set `ist` to "project". 
* Set `iat` to the current Unix epoch timestamp (when the token was created), in seconds.
* Set `exp` to the expiration time for the token. For security, we recommend that you use an expiration time close to the token creation time (for example, 3 minutes after creation) and that you create a new token for each REST API call. The maximum allowed expiration time range is 5 minutes.
* Set `jti` to a unique identifier for the JWT. This is optional. See the [JSON web token spec](https://tools.ietf.org/html/rfc7519#section-4.1.7) for details. 

Use your project API secret as the JWT secret key and sign this with the HMAC-SHA256 encryption algorithm. (Your API secret is provided to you in your [Video API account](https://identity.nexmo.com/login?icid=nexmocustomer_api-developer-adp_nexmodashbdsigin_nav) on the Project page.) For example, the following Python code creates a token that can be used in a REST API call:

```python
import jwt # See https://pypi.python.org/pypi/PyJWT
import time
import uuid
print jwt.encode({"iss": "my-project-API-key",
  "iat": int(time.time()),
  "exp": int(time.time()) + 180,
  "ist": "project",
  "jti": str(uuid.uuid4())()},
  'my-project-API-secret',
  algorithm='HS256')
```

Replace `my-project-API-key` and `my-project-API-secret` with the Vonage Video project App ID and secret. 
Set the `Content-type` header for the REST API call to `application/json`:

```
Content-Type:application/json
```

Replace the newline characters in the certificate with `"\n"`, so that you can use it in the string literal in the JSON data. Pass in the public key certificate as a property of the JSON data you send when you call the REST method for setting archive storage. See the next sections.

## Setting up encrypted archiving for a Amazon S3 target

To specify a public key certificate to use with an Amazon S3 target, set the JSON data in the REST API call to use the following format: 

```json
{
    "type": "s3",
    "config": {
        "bucket": "example.com.archive-bucket",
        "secretKey": "BvKwyshsmEATx5mngeloHwgKrYMbP+",
        "accessKey": "AWFS7BAO536E6MXA"
    },
    "fallback": "none",
    "certificate": "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0..."
}
```

Set `bucket` to the name of the Amazon S3 bucket you want to use for archive upload. Set the `secretKey` and `accessKey` properties to the Amazon S3 secret key and access key for that bucket.

Set the fallback property to `"none"` to prevent archive files from being stored in the Vonage video cloud if the upload fails. Set the property to `"opentok"` to have the archive available on your dashboard if upload fails. 

Set the certificate property to the public key certificate Vonage will use to encrypt the archive. Be sure to base64 encode the certificate or replace newline characters in the certificate with `"\n"`, so that you can use it in the string literal in the JSON data.

## Setting up encrypted archiving for a Microsoft Azure target

To specify a public key certificate to use with a Microsoft Azure target, set the JSON data in the REST API call to use the following format:

```json
{
    "type": "azure",
    "config": {
        "accountName":"myAccountname",
        "accountKey":"myAccountKey",
        "container": "containerName"
    },
    "fallback": "none",
    "certificate" : "LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0...
}
```

Set container to match your Microsoft Azure container name. Set the `accountName` and `accountKey` properties to match your Microsoft Azure storage credentials.

Set the `fallback` property to `"none"` to prevent archive files from being stored in the Vonage video cloud if the upload fails. Set the property to `"opentok"` to have the archive available on the dashboard if upload fails.

Set the `certificate` property to the public key certificate Vonage will use to encrypt the archive. Be sure to base64 encode the certificate or replace newline characters in the certificate with `"\n"`, so that you can use it in the string literal in the JSON data. A base64-encoded certificate string looks like this:

```
"LS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0..."
```

## REST API responses

* A response with status code 200 indicates success. 
* A response with a 400 status code indicates that you have included invalid JSON data or that you did not specify the upload target. 
* A response with a 403 status code indicates you passed in an invalid project App ID or API secret.

## Examples

The following command line example securely sets the certificate for Vonage to use when encrypting archives to be uploaded to an Amazon S3 bucket:

```sh
app_id=12345
data='{"type":"s3","config":{"bucket":"your-s3-bucket","secretKey":"your-s3-secret-key","accessKey":"your-s3-access-key"},"certificate" : "...your-cert..."}'
curl \
     -i \
     -H "Content-Type: application/json" \
     -X PUT -H "X-OPENTOK-AUTH:$json_web_token" -d '$data' \
     https://api.opentok.com/v2/project/$app_id/archive/storage
``` 

Set the value for `app_id` to your Vonage Video project App ID. 
Set the value for `json_web_token` to a JSON web token. 
Set the values for `your-s3-bucket` and `your-s3-access-key` to match your Amazon S3 credentials. Replace the certificate value with the certificate string. 

The following command line example securely sets the certificate for Vonage to use when encrypting archives to be uploaded to an Microsoft Azure bucket:

```sh
app_id=12345
data='{"type":"azure","config":{"accountName":"your-azure-account-name","accountKey":"your-azure-account-key", "container":"your-azure-container"}, "certificate": "...your-cert..."}'
curl \
     -i \
     -H "Content-Type:application/json" \
     -X PUT -H "X-OPENTOK-AUTH:$json_web_token" -d "$data" \
     https://api.opentok.com/v2/project/$app_id/archive/storage
```

Set the value for `app_id` to your Vonage Video project App ID.
Set the value for `json_web_token` to a JSON web token. 
Set the values for `your-azure-account-name`, `your-azure-account-name`, and `your-azure-container` to match your Amazon S3 credentials. Replace the certificate value with the certificate string.

## Decrypting an archive

You can set an archive status callback using the dashboard. See "Archive status changes" in the [Archiving developer guide](/video/guides/archiving/#archive-status-changes).

After the archive is created, the archive status POST requests to your callback URL include a password property:

```json
{
    "id" : "b40ef09b-3811-4726-b508-e41a0f96c68f",
    "event": "archive",
    "createdAt" : 1384221380000,
    "duration" : 328,
    "name" : "Foo",
    "partnerId" : 123456,
    "reason" : "",
    "sessionId" : "2_MX40NzIwMzJ-flR1ZSBPERUIDIwMTN-MC45NDQ2MzE2NH4",
    "size" : 18023312,
    "status" : "uploaded",
    "password" : "e42c...d23"
}
```

The password is a certificate-encrypted AES key and initialization vector, in the form of base64-encoded binary data.

The first three bytes of the binary data represent the version (one byte), the algorithm (one byte) and the mode (one byte). In this version, the length is set to 1, the algorithm is set to 1 (indicating AES-256), and the mode is set to 1 (indicating CBC).

The next 32 bytes are the key. The remaining 16 bytes are the initialization vector.

First, decode the password, and then decrypt it using your private key:

```sh
openssl enc -base64 -d -A <<< "password-from-tokbox" \
  -out password.enc

openssl rsautl -decrypt -oaep -inkey key.pem \
  -in password.enc -out password.bin
```

Then, use the password to decrypt the archive file:

```sh
openssl enc -d -aes-256-cbc -nopad -in your_archive_file.ts \
  -out your_decrypted_file.ts \
  -K $(xxd -s 3 -l 32 -c 32 -p password.bin) \
  -iv $(xxd -s 35 -l 16 -c 16 -p password.bin)
```

`-K` is the key
`-iv` is the initialization vector
`xxd` turns the binary decoded and decrypted password into hex so that it can be fed to openssl. Read the xxd man page for more info on switches.

## Disabling encrypted archiving

To disable encrypted archiving, submit an HTTP PUT request to archive storage URL (see [Sending the encrypted archiving certificate to Vonage](#sending-the-encrypted-archiving-certificate-to-vonage)), but set the certificate to null in the JSON data you send with the request.

### Disabling encrypted archiving for an Amazon S3 target

To remove a public key certificate for an Amazon S3 archive target (and remove encryption from the archives), call the REST API with the following JSON data:

```json
{
    "type": "s3",
    "config": {
        "bucket": "example.com.archive-bucket",
        "secretKey": "BvKwyshsmEATx5mngeloHwgKrYMbP+",
        "accessKey": "AWFS7BAO536E6MXA"
    },
    "fallback": "none",
    "certificate" : null
}
```

Set `bucket` to the name of the Amazon S3 bucket you want to use for archive upload.
Set the `secretKey` and `accessKey` properties to the Amazon S3 secret key and access key for that bucket.
Set the `fallback` property `to "none"` to prevent archive files from being stored in the Vonage cloud if the upload fails.
Set the property to `"opentok"` to have the archive available at the Vonage dashboard if upload fails.
Set the `certificate` property to null.

### Disabling encrypted archiving for a Microsoft Azure target

To remove a public key certificate for a Microsoft Azure archive target (and remove encryption from the archives), call the REST API with the following JSON data:

```json
{
    "type": "azure",
    "config": {
        "accountName":"myAccountname",
        "accountKey":"myAccountKey",
        "container": "containerName"
    },
    "certificate" : null
}
```

Set `container` to match your Microsoft Azure container name.
Set the `accountName` and `accountKey` properties to match your Microsoft Azure storage credentials.
Set the `fallback` property to `"none"` to prevent archive files from being stored in the Vonage cloud if the upload fails.
Set the property to `"opentok"` to have the archive available at the Vonage dashboard if upload fails.
Set the `certificate` property to `null`.

### REST API responses

* A response with status code 200 indicates success in disabling encryption.
* A response with a 400 status code indicates that you have included invalid JSON data or that you did not specify the upload target.
* A response with a 403 status code indicates you passed in an invalid project App ID or partner secret.

### Example

The following command line example disables encrypted archiving for an S3 target:

```sh
app_id=12345
data='"type":
"s3","config": {"bucket":
"your-s3-bucket","secretKey":
"your-s3-secret-key","accessKey":
"your-s3-access-key"},{"certificate" : null}'
curl \
     -i \
     -H "Content-Type:application/json" \
     -X PUT -H "X-OPENTOK-AUTH:$json_web_token" -d "$data" \
     https://api.opentok.com/v2/project/$app_id/archive/storage
```

Set the value for `app_id` to your Vonage Video App ID.
Set the value for `json_web_token` to a JSON web token.
Set the values for `your-s3-bucket` and `your-s3-access-key` to match your Amazon S3 credentials.

## Known issues

The duration of an encrypted archive is always reported as 0, in all Vonage Video REST API calls, in methods of the Vonage Video server SDKs, and in archive status change callbacks.