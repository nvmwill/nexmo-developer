---
title: Announcing the Vonage Java SDK v7.0.0
description: Version 7.0.0 of the Vonage Java SDK is now available! This post
  describes the changes and what to expect in the near future.
thumbnail: /content/blog/announcing-the-vonage-java-sdk-v7-0-0/java-sdk-updates.png
author: sina-madani
published: true
published_at: 2022-08-22T10:23:51.517Z
updated_at: 2022-08-22T10:23:51.532Z
category: release
tags:
  - java
  - SDK
comments: true
spotlight: false
redirect: ""
canonical: ""
outdated: false
replacement_url: ""
---
## Introduction
Since joining Vonage, I have been focusing on improving the [core Java SDK](https://github.com/Vonage/vonage-java-sdk) by paying down some technical debt and ensuring it is up to date with the latest [API specifications](https://developer.vonage.com/api). In this post, I'll explain some of the prominent changes to the SDK and what's on the horizon. Hopefully, I can also convince you to upgrade to the latest version 🙂. You can also check out the [release notes for each version on GitHub](https://github.com/Vonage/vonage-java-sdk/releases).

## Security
If I could only give you one reason to upgrade, it would be security. Versions [before 6.4.2 are susceptible to over 50 CVE security vulnerabilities](https://mvnrepository.com/artifact/com.vonage/client) due to outdated dependencies (mainly Jackson, which is what we use for JSON serialisation).

Before v7.0.0, the SDK depended on a small in-house library for working with JWTs. This library [hadn't been updated for a few years and was still under the Nexmo brand](https://mvnrepository.com/artifact/com.nexmo/jwt). It has now moved to the Vonage org on GitHub(https://github.com/Vonage/vonage-jwt-jdk) and [Maven Central](https://search.maven.org/artifact/com.vonage/jwt), receiving a rebrand for consistency along with dependency updates for security.

## New Features
The most notable feature is the Messages API, which was added in 6.5.0 (read about the announcement [here](https://developer.vonage.com/blog/22/07/05/the-vonage-messages-api-is-now-in-our-server-sdks)). I recently wrote [a blog post about the Java SDK's implementation of Messages v1](https://developer.vonage.com/blog/22/08/04/how-an-sdk-can-add-value-to-rest-apis), so I hope some of you reading this already using it!
Support for the [Pricing API endpoint to retrieve outbound pricing for all countries](https://developer.nexmo.com/api/pricing#retrievePricingAllCountries)  was also added in 6.5.0.

Two new features have been added in 7.0.0.
[Premium text-to-speech](https://developer.vonage.com/voice/voice-api/guides/text-to-speech#premium-voices) is now GA, so the flag to activate it has been added to the `TalkAction` NCCO. You can now also prompt for [payments over the phone](https://developer.vonage.com/voice/voice-api/guides/payments) using the new Pay NCCO action. [Here's a link to the specification](https://developer.vonage.com/voice/voice-api/ncco-reference#pay).


## Deprecations & Removals
Removals are a breaking change, hence the major version update. The [SMS Search API](https://developer.nexmo.com/api/developer/messages) had long been deprecated and finally completely removed, so naturally, it has been removed from the SDK as well. [The legacy text-to-speech `voiceName` field](https://developer.vonage.com/voice/voice-api/guides/text-to-speech#legacy-voice-names) has also been removed to discourage its use as it was already deprecated. Instead, you should use the new `premium` flag as described above. Some internal refactoring has also resulted in some classes that should never have been publicly accessible (such as classes ending with `Endpoint`) being made package-private as intended. `AbstractClient` was not intended as a public-facing feature and served no real purpose internally, so it has also been removed. Same with `AbstractAuthMethod`. On the off chance that you were relying on Apache Commons (specifically, `lang3,` `io` and `logging`) libraries being added as an implicit dependency, they're gone too.

The main deprecation to note is to do with the [Redact API](https://developer.vonage.com/api/redact). Whilst it has been part of the SDK for some time, it never left Developer Preview. As a policy, the Java SDK only supports APIs that are "General Availability" in mainline releases, so we're deprecating this with the intent of removal until we are confident in fully supporting it as a GA service. Aside from that, the `ipAddress` field in `AdvancedInsightRequest` has been deprecated to reflect its deprecation status in the [Number Insight API spec](https://developer.vonage.com/api/number-insight#getNumberInsightAsync). It will be removed in the next major release.

## Fixes & Enhancements
As our APIs evolve, strongly typed SDKs need to be updated to reflect changes in the spec. We're on the lookout for instances where the SDK is not in sync with the API, but we don't always catch everything, so please do report any issues and we'll try to fix them in the next release!

The `CallEvent` webhook was missing the `call_uuid` field, which was added in 6.4.2. The `com.vonage.client.sms.MessageStatus` enum was missing some of the error codes described [in the specification](https://developer.vonage.com/api-errors/sms), which has been rectified. There were some issues with the NCCO classes, which were not compliant with [the specification](https://developer.vonage.com/voice/voice-api/ncco-reference). Most notably, the Actions were not properly defined in the object model, which meant deserialisation was not working as intended. `SipEndpoint` was missing the `headers` field and `WebSocketEndpoint` incorrectly restricted `headers` Map values to Strings. The NCCO endpoints now validate the `uri` fields using `java.net.URI`. The builders have also been made package-private so you must acquire them from the static `builder()` method for consistency.

Implementation of the [Number Insight API](https://developer.vonage.com/api/number-insight) in the Java SDK has been updated to be consistent with the specification. Issues were mostly around missing fields, or fields being in the wrong class (some functionality has moved from Advanced to Standard insight, for example). Documentation has also been improved and added where it was missing. Some of the inner enums (for example, in `AdvancedInsightResponse`) have been moved to separate files so that if functionality is moved from e.g. Advanced to Standard, a breaking change won't be required in the future. Additional values for `InsightStatus` have been added. For the synchronous version of `AdvancedInsightRequest`, a new Boolean field `realTimeData` has been added. If set to `true`, you will get back the status in `AdvancedInsightResponse`.

Some fixes have been made to the Messages API. Most notably in `WhatsappTemplateRequest`'s `parameters` field, which [the specification](https://developer.vonage.com/api/messages-olympus) misleadingly presented as being a `List<Map, String, ?>>` when in fact it should be `List<String>`. Another fix is to the `policy` and `locale` fields. Since the former has a single valid value at this time, it is optional in the API. The latter was more fundamentally flawed in 6.5.0 since it prevented locales with less than 4 characters from being used. It was also not clear from the documentation what the valid values were. To avoid confusion, the full list of languages supported by WhatsApp has been added as an enum, so rather than passing in a potentially invalid String, you no longer have to search for what's supported - it's all enumerated for you in the SDK! More generally, the SDK's validation of sender numbers (i.e. the `from` field) was incorrect for SMS, MMS and WhatsApp. SMS and MMS senders may now contain alphanumeric characters (i.e. IDs), whereas the WhatsApp sender must be a WhatsApp Business Account number.

More generally, the SDK is a bit tidier internally (in terms of code quality, consistency etc.) and has higher test coverage. From a user's perspective, the other miscellaneous enhancements are the setting of `Content-Type`, `Accept` and `User-Agent` headers in outbound requests, as well as explicitly using UTF-8 encoding. For those wondering about compatibility, we endeavour to support Java 8 for quite some time unless there is a more compelling reason from a maintainability perspective to move to 11 or 17. The SDK has been tested on JDK 18, so we any modern version of Java is currently supported.

## Roadmap
Aside from routine maintenance to ensure the current implementation is consistent with the API specifications and general fixes, the next big thing for the Java SDK is the new [Video API](https://developer.vonage.com/api/video), which is currently in beta. The [OpenTok Java SDK](https://github.com/opentok/Opentok-Java-SDK) will eventually be sunset. Instead of having separate repos, artifacts, versions, codebases etc., we have decided to streamline the user experience by integrating video functionality directly into our core SDKs. We are going to be rolling out support for it in the SDKs incrementally through beta releases, so if you're keen to get your hands on video capabilities, keep an eye out on [Maven Central](https://search.maven.org/artifact/com.vonage/client) for beta versions of the Java SDK!

Of course, in the meantime, there will still be mainline releases with patches, fixes and even new GA features, but in the interim, we'll be working on implementing the Video API in the SDKs. Since the OpenTok codebase is so architecturally different from the core SDK, this is going to be a complete rewrite for me. Looking further ahead, I'm aware that some users of the Java SDK want asynchronous requests and responses. This is the next item on my wishlist of major enhancements to the SDK, so watch this space.

## Signing off
That's all for now! If you do come across any issues or have suggestions for enhancements, feel free to [raise an issue on GitHub](https://github.com/Vonage/vonage-java-sdk/issues), reach out to us on [Twitter](https://twitter.com/VonageDev) or drop by our [Community Slack](https://developer.vonage.com/community/slack). I hope that you have a great experience using the Vonage APIs with the latest version of the Java SDK!
