---
title: Securing your app
meta_title: Learn about Vonage and WebRTC security practices and FAQs so you can build apps with strong security.
description: Learn about Vonage and WebRTC security practices and FAQs so you can build apps with strong security. Read about data encryption and application best practices.
navigation_weight:
---

# Securing your app

Follow these best practices for maintaining security in your app.

Vonage recognizes that security is an essential consideration for any business interested in integrating real time communications into its website, app or service. The Vonage platform is a reliable and secure platform on which you can build applications that meet your company, industry or client security needs.


## Security FAQs

#### Is voice and video traffic encrypted over WebRTC session?

Yes, all media traffic is encrypted no matter the endpoint you use (web or mobile) or the session setup you choose (P2P or multiparty). That means that you are safe when using Vonage solution even if use it in an open public hotspot.

Also, in web apps, publishing is only supported on HTTPS pages.

#### Is it based on a proprietary solution?

No, we don't believe in proprietary solutions when we talk about security. Vonage is fully based on proven standards, written by industry experts, and used for years in commercial products. The core protocols providing WebRTC Vonage security are SRTP for media traffic encryption and DTLS-SRTP for key negotiation, which are defined by the IETF.

#### What are the encryption algorithms and strength of the keys being used?

Vonage WebRTC-compatible endpoints use the AES cipher with 128-bit keys to encrypt audio and video, and HMAC-SHA1 to verify data integrity.

AES-256 encryption is available on supported clients for as an [add-on feature](https://www.vonage.com/communications-apis/video/pricing/).

#### What keys are being used for the encryption?

The endpoints generate random keys at the beginning of the session and in addition they change periodically during the conversation to make it even safer.

#### Does it require any interaction with the user?

No, everything happens under the hood without any interaction with the user.

#### Does it require any change in my Vonage-based applications?

No, the Vonage API doesn't change. The Vonage API does not expose these low-level details to developers.

#### Does it have an impact on bandwidth and quality of the video conference?

It has, but very low. It increases the length of each audio and video packet by 8 bytes, but that is less than 1% of the typical bitrate of a session. Regarding the delay, the SRTP encryption framework was designed specifically for real-time applications, and the impact is not noticeable at all.

#### Does it have an impact on CPU or battery consumption?

Yes, but the cost of encoding and decoding audio and video is significantly higher than the cost of encrypting and decrypting.

## Security best practices

Whether you're new to the Vonage platform, or have years of experience, here is a useful set of best practices you can employ when developing with Vonage to help you build a secure application.

### Serve content using HTTPS URLs

In web apps, publishing video is only supported on HTTPS pages.

### Personal Information

#### Keep the API key and secret private and secure

The API key and secret are used to create tokens that grant access to sessions, retrieve archive metadata and change archive storage credentials, as well as other administrative operations on your account.

To avoid compromising your credentials, you should always keep your API secret private. Some key measures you can take:

* Never save the API secret in any public source code repositories.
* Never save the API secret in any client side libraries, or even compiled mobile SDKs.
* Use only HTTPS URLs to make REST calls to the Vonage servers.

#### Generate a unique session ID per call and token per participant

You need to generate a session ID to initiate a call. The tokens that enable the participants to join are unique to a session ID. The tokens have an expiry but it may be longer than the duration of your call. Therefore, if you have consecutive meetings using the same session ID, earlier users may still be able to connect to the new meeting.

To avoid this:
* Generate a unique session ID for each new meeting
* Generate a unique token for each participant of that meeting.

See [this topic](/video/guides/create-session) on how to create sessions. See [this topic](/video/guides/create-token) on how to generate tokens.

#### Ensure server generating token is behind authenticated endpoint

It is important to place the server generating the token behind an authenticated endpoint because anyone with access to that server could end up generating new tokens and could misuse the app.

Don't use personal information in token data.

The token data is a string containing metadata describing the connection. However, this data is passed to all users in the session and is also readable through the client logs. This means you should never use unencrypted sensitive or personal information in the token data. See [this topic](/video/guides/create-token) on how to add data to your tokens

### Relayed vs Routed Mode

#### End to End Media Encryption

During a routed session, media streams are temporarily decrypted while within the Vonage Platform cloud servers and then immediately re-encrypted prior to being sent through the internet to the subscribing client. This decryption is necessary for managing group sessions, intelligent quality control, and archiving of sessions (if used). Using routed sessions, your media streams are never transmitted unencrypted on the open internet.

However, if your application requires uninterrupted end-to-end encryption of all media, you may choose to use relayed sessions. Be aware that you would not be able to use archiving, and performance will not be managed as well in low bandwidth / high packet loss networks or with groups.

### Archiving

Vonage provides a number of ways to ensure the security of your archived sessions.

#### Different levels of archive security

You can secure your archives in the following ways:

* **Turn off archive storage fallback** — By default, Vonage stores an archive file on servers if it was unable to upload the file to your specified Amazon S3 or Microsoft Azure server. To prevent this fallback storage, log in to your [Video API account](https://tokbox.com/account), select the project, and set the option to disable archive storage fallback.

* **Use Vonage encryption** — With encrypted archiving, video and audio data in an archive is encrypted using a public key certificate you provide Vonage. This lets you to create archives where the data is never at rest in an unencrypted state. Of the available methods of securing your archives, this provides the highest level of security. This is available as an [add-on feature](https://www.vonage.com/communications-apis/video/pricing/). For more information, see the [Vonage encryption](/video/guides/archiving/encryption) documentation.

#### Manage archive deletion

An archive successfully uploaded to your storage will be automatically deleted from the archiving server at the time of upload.

In case of failure to upload, storage is provided as a default fallback option. This means the archive will be stored for 72 hours on the server.

You will be alerted via email for every archive that fails to reach your storage. You can then use the REST API to download the archive from the archive URL.

Following the download, you can choose to immediately delete the archive to avoid it being on the storage for the remainder of the fallback period.

To prevent this fallback storage, log in to your [Video API account](https://tokbox.com/account), select the project, and set the option to disable archive storage fallback.

See the [API Docs](/api/video) for more information on how to delete an archive.

#### Control who is able to begin archiving

You can only archive a session using the REST API. To control who can initiate the archive, you can programmatically decide which view of the application includes the option to start archiving. Those unauthorized would have a limited view with no option to archive.

In addition to authenticating your own users, you should also consider a strategy for authorization. Once you know who a user is (authentication), and that they are in fact allowed to start an archive (authorization), you've reduced the risk of any unintended user from causing archives to be recorded.

#### Ensure minimum set of privileges

The minimum set of permissions required to upload archives to our storage is discussed in [this topic](/video/guides/archiving/using-s3).

Partners should not provide any additional permissions for the credentials that they store with Vonage.

### Alerts and Controls

#### Limit maximum number of users in a session

In order to have more control over the number of people in a session, your application should limit the maximum number of users in a session. This could be useful if you're trying to limit your usage.

#### Display subscriber count

You may also wish to set up a subscriber count to display in your application. This is a useful way of knowing when a connection is subscribing but not publishing.

#### Set up Moderator permissions to force disconnect

The Vonage platform provides the capability to remove a user from a session. For example, in case of violation of terms of services, you can enable the moderator in the session to remove the violating participant from the session via force disconnect or force unpublish. See [this topic](/sdk/stitch/video-js-reference/Session.html#forceDisconnect) for more information.

#### Allocate Subscriber-only permissions for those that do not need to publish

In some use cases you may want to limit the number of people who can publish in a session. This is implemented by not extending publish permissions to every participant.

See [this topic](/video/guides/create-token) for generating tokens with the right roles.