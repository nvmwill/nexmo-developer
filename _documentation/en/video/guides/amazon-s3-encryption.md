---
title: Amazon S3 server-side encryption
meta_title: Amazon Web Services provides a server-side encryption feature you can use when uploading Vonage recordings to an S3 target.
description: Use the AWS server-side encryption feature when uploading your Vonage recordings to an S3 target.
product: video
navigation_weight: 6
---

# Amazon S3 server-side encryption

Amazon Web Services provides a server-side encryption feature you can use when uploading Vonage Video recordings to an S3 target.

This uses Amazon S3-managed encryption keys for encryption. For more information, see
[this Amazon web services documentation](http://docs.aws.amazon.com/AmazonS3/latest/dev/UsingServerSideEncryption.html). 
(Vonage Video supports using only Amazon S3-managed encryption keys and not KMS or customer-provided keys.)

To use this feature, set the `sse` property to `"s3"` when you call the Vonage Video REST API to set the Vonage Video recording upload target. 

Submit an HTTP PUT request to the following URL:

```lang-none
https://api.opentok.com/v2/project/<apiKey>/archive/storage
```

Replace `<apiKey>` with your Vonage Video API key.


Authenticate the REST API request using a custom HTTP header: `X-OPENTOK-AUTH`. Set this to a JSON Web token (see the [Vonage Video REST API documentation](/developer/rest/#authentication)):

```lang-none
X-OPENTOK-AUTH: <JSON_web_token>
```

Include a JSON object as the POST data:

```lang-none
{
  "type": "s3",
  "config": {
    "bucket": "example.com.archive-bucket",
    "endpoint": "https://s3.cloudianhyperstore.com",
    "secretKey": "BvKwyshsmEATx5mngeloHwgKrYMbP+",
    "accessKey": "AWFS7BAO536E6MXA",
    "sse": "s3"
  },
  "fallback": "none",
}
```

Set `bucket` to the name of the Amazon S3 bucket you want to use for recording upload. Set the `secretKey` and `accessKey` properties to the Amazon S3 secret key and access key for that bucket.

Set the `endpoint` property if you want to use an S3-compliant storage provider other than Amazon.
This is optional. Set this to the endpoint base URL, including the protocol (http or https),
such as `"https://s3.cloudianhyperstore.com"` or `"https://storage.googleapis.com"`. The default
endpoint is `"https://s3.amazonaws.com"` (the Amazon S3 endpoint URL).

Set the `sse` property to `"s3"` to use Amazon S3 server-side encryption. Set the `sse` property to `"none"` to upload archives to a non-encrypted S3 bucket.

Set the `fallback` property to `"none"` to prevent archive files from being stored in the Vonage cloud if the upload fails. Set the property to `"vonage"` to have the archive available at the Vonage API dashboard if upload fails.

## REST API responses

A response with status code 200 indicates success.

A response with a 400 status code indicates that you have included invalid JSON data or that you did not specify the upload target.

A response with a 403 status code indicates you passed in an invalid Vonage Video API key or API secret.

## Example

The following command line example securely sets the server-side encryption flag for Vonage to use when archives are uploaded to an Amazon S3 bucket:

```sh
api_key=12345
data='{"type":"s3","config":{"bucket": "your-s3-bucket","secretKey": "your-s3-secret-key","accessKey": "your-s3-access-key","sse" : "s3"}, "fallback" : "none"}'
curl \
     -i \
     -H "Content-Type: application/json" \
     -X PUT \
     -H "X-OPENTOK-AUTH:$json_web_token" \
     -d "$data" \
     https://api.opentok.com/v2/partner/$api_key/archive/storage
```

Set the value for `api_key` to your OpenTok API key. Set the value for `json_web_token` to a JSON web token. Set the values for `your-s3-bucket` and `your-s3-access-key` to credentials that have appropriate access to your Amazon S3 account.

For more information, see [Using an Amazon S3 bucket with Vonage Video
recording](using-s3-storage).