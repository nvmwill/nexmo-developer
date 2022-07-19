---
title: Vonage Video API archiving using S3 storage
meta_title: Use AWS S3 storage with Vonage Video API archiving.
description: You can use AWS S3 storage for Vonage Video API archiving.
product: video
navigation_weight: 3
---

# Vonage Video API archiving using S3 storage

Use the [Vonage API Dashboard](https://identity.nexmo.com/login?icid=nexmocustomer_api-developer-adp_nexmodashbdsigin_nav) to specify your S3-compliant endpoint or Windows Azure container for completed recordings to be uploaded to. (For more information on Windows Azure see [Using a Windows Azure container with Vonage Video API archiving](/video/guides/using-azure).)

You can create an Amazon S3 account at [http://aws.amazon.com/s3](http://aws.amazon.com/s3).

**Note:** You can also use an S3-compliant storage provider other than Amazon S3. We support Cloudian and Google Cloud Storage (accessed using the AWS S3 API) as S3-compatible storage solutions. Other S3-compatible services may have feature limitations.

You will provide the following information to the Video API account:

* The name of the S3 bucket
* The access key ID
* The secret access key
* The endpoint (optional) — Set this value if you want to use an S3-compliant storage provider other than Amazon. Set the endpoint base URL, including the protocol (http or https), such as `https://s3.cloudianhyperstore.com` or `https://storage.googleapis.com`. The default endpoint is `https://s3.amazonaws.com` (the Amazon S3 endpoint URL).

You can create an Amazon S3 bucket (or find names of existing buckets) at the [Amazon S3 console](https://console.aws.amazon.com/s3).

**Note:** Vonage Video recording does not support S3 buckets in the China (Beijing) region.

To obtain an Amazon S3 access key ID and secret access key:

1. Go to [the Amazon Web Services Management Console](http://aws.amazon.com/console) and sign in.
2. Go to [the Amazon Web Services security credentials page](https://console.aws.amazon.com/iam/home?#security_credential).
3. Under **Access Keys (Access Key ID and Secret Access Key)**, click the **Create New Access Key** button.
4. In the **Create Access Key** window displayed, Click **Show Access Key**.
5. Make a record of the Access Key ID and Secret Access Key values. Or click the Download Key File button to download the rootkey.csv file that contains the access key ID and Secret Access Key values.

If you want to use an IAM user, assign it the following user policy:

```json
    {
        "Version": "2012-10-17",
        "Statement": [
            {
                "Sid": "Stmt1427497452000",
                "Effect": "Allow",
                "Resource": [
                    "arn:aws:s3:::*"
                ],
                "Action": [
                    "s3:ListAllMyBuckets"
                ]
            },
            {
                "Effect": "Allow",
                "Resource": [
                    "arn:aws:s3:::<bucketName>"
                ],
                "Action": [
                    "s3:ListBucket"
                ]
            },
            {
                "Effect": "Allow",
                "Resource": [
                    "arn:aws:s3:::<bucketName>/*"
                ],
                "Action": [
                    "s3:PutObject"
                ]
            }
        ]
    }
```    

(Replace _&lt;bucketName&gt;_ with your bucket name.)

Now, go to the [Vonage API Dashboard](https://identity.nexmo.com/login?icid=nexmocustomer_api-developer-adp_nexmodashbdsigin_nav) and complete the following steps:

1.  Click on a **Project** in the left nav that will contain sessions that you are archiving.
2.  In the Archiving section, click the **Set up your cloud storage now** button, and then click on **Amazon S3**.
3.  Enter the S3 Access Key ID, the Secret Access Key, and the Bucket Name for the bucket to which you want recordings uploaded.
4.  If you are using a S3-compliant storage provider other than Amazon, enter the endpoint base URL, including the protocol (http or https), such as `https://s3.cloudianhyperstore.com` or `https://storage.googleapis.com`.
5.  Click the **Connect to cloud storage** button.

<!-- **Note:** You can also set a recording upload target using the Vonage REST API. -->

<!-- OPT-TODO: Add a link to the video API reference  -->

Recordings are uploaded to the Amazon S3 bucket you specify.

All recordings are saved to a subdirectory of your S3 bucket that has your Vonage Video API key as its name, and each recording is saved to a subdirectory that has the recording ID as its name. The name of the recording file is archive.mp4 (for a composed recording) or archive.zip (for an individual stream recording). (See [Individual stream and composed recordings](/video/guides/archiving#individual-stream-and-composed-recordings).)

For example, consider a recording with the following API key and ID:

* API key 123456
* Recording ID **ab0baa3d-2539-43a6-be42-b41ff1488af3**

The file for this recording is uploaded to the following directory your S3 bucket.

**123456/ab0baa3d-2539-43a6-be42-b41ff1488af3/archive.mp4**

At the [Amazon S3 console](https://console.aws.amazon.com/s3) you can make an uploaded recording file public:

1. Navigate to the recording file in the console and right-click it.
2. Select the **Make public** command. 
3. You can obtain the public URL for the file in the **Properties** panel for the file in the Amazon S3 console.