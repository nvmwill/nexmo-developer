---
title: Version 3.0.0 of the Vonage Python SDK is now available!
description: Vonage's Python Server SDK Version 3.0.0 is now available. Find out what's new!
thumbnail: /content/blog/how-an-sdk-can-add-value-to-rest-apis/python_sdk_updates.png
author: max-kahan
published: true
published_at: 2022-08-08T11:48:15.975Z
updated_at: 
category: release
tags:
  - python
comments: true
spotlight: false
redirect: ""
canonical: ""
outdated: false
replacement_url: ""
---

**Tl;dr: [v3.0.0 of the Python SDK is out](https://pypi.org/project/vonage/)! Most of the PR is internal refactoring to lay the groundwork for future enhancements, but we also add a few new features to help you get the most out of using the SDK.**

Since I (Max) joined Vonage 4 months ago, I've spent a significant amount of time refactoring Vonage's [core Python SDK](https://github.com/Vonage/vonage-python-sdk). In this release, I focused on improvements to reduce technical debt and increase readability. As a result, the changes made in the v3.0.0 release mostly lay the groundwork so that cool new features can be added later.

In this post, I'll explain some of the changes I made for v3.0.0, and what the motivation for each of them was.

## An overview

The main structural change was to organise the methods for each API into separate classes and modules. This makes it clearer which API you're calling, as well as allowing us to set the authentication type for each API when you make a request through the SDK.

There was also a lot of duplication. For instance, there were five separate methods, over 3 different files, to make the same basic POST request with a couple of variations. I consolidated all these methods into a single function that makes a REST call with the `requests` package, accounting for the different authentication methods and body types expected by each API.

The main difference between v2 and v3 is that a lot of deprecated code has been removed, so there are a number of breaking changes. All the `Client` class methods that were actually calling a specific API were removed, as they're now accessed from the specific module for that API. There were also some methods that should have been deprecated and removed a long time ago, or never added, which we've now deprecated and will remove in a later release.

We added optional parameters to the `Client` class to let you customise timeout, retries and pooling options for the entire session with a Vonage client. We also added a couple of enhancements to the Pricing API, with a new method and the ability to query based on sms or voice traffic.

## Let's have a look!

### Get the new release

To download the new v3.0.0 release, just run this command (you might want to do this inside a virtual environment!):

```bash
python3 -m pip install --upgrade vonage
```
This will download the new release from scratch, or update an existing version of the SDK to the latest version.

### A quick note

In previous releases, I added a `Messages` class and changed the way that methods could be called. For example, to send an SMS, you previously had to do this:

```python
client = vonage.Client(key='my_key', secret='my_secret')
sms = vonage.Sms(client)
sms.send_message([message_details_go_here])
```

Whereas now you can do this for all API calls:

```python
client = vonage.Client(key='my_key', secret='my_secret')
client.sms.send_message([message_details_go_here])
```

My examples in this post will follow the latter pattern.

### New classes

Initially, all the code was in a single `Client` class. That's every method, for every type of request that can be done with the SDK. A couple of years ago, a refactor was started to modularise these requests into classes based on the APIs they call: `Voice`, `Sms`, `Verify` and so on. This refactor was never completed, so over the last few months I deprecated the methods in the `Client` class and added new modules like `number_insight`, `messages`, `account`, etc. Now, methods related to a specific API are called from that particular module.

E.g. to make a basic number insight request, you can now do this:

```python
client = vonage.Client(key='my_key', secret='my_secret')
client.number_insight.get_basic_number_insight(number=MY_NUMBER)
```

So now the code is modularised, but can all be accessed from a single client class. V3.0.0 removes the methods that were originally in the `Client` class, so they must now be called as described above.

### New client connection options

When you instantiate a `Client` object, you can now specify the optional `max_retries`, `timeout`, `pool_connections` and `pool_maxsize` optional keyword arguments, which will be used for every request made with that `Client` object. The options can be specified this way:

```python
client = vonage.client(
key='my_key', 
secret='my_secret', 
timeout=10,  # timeout in seconds
pool_connections=10,
pool_maxsize=10,
max_retries=5
)
```

These options are useful if you're sending many requests at once or want to allow requests to timeout and be retried.

By default, the request will not time out, but any value in seconds can be specified. The default max number of retries is 3, but any integer value is valid. Likewise, you can specify any integer value for the number of pool connections and the maximum pool size (though both have a default of 10).

### New pricing keyword arguments in calls to the Pricing API

It is now possible to specify if you want to see pricing for sms or voice in calls to the Pricing API. SMS is the default and voice pricing can be requested like this:

```python
client.account.get_country_pricing(country_code='GB', type='voice')
```

### Added a method to get pricing for all countries

We've added a `get_all_countries_pricing` method to the `Account` class. This allows you to see the pricing for all supported countries for sms or voice.

```python
client.account.get_all_countries_pricing() # returns sms pricing for all countries
client.account.get_all_countries_pricing(type='voice') # returns voice pricing for all countries
```

### Removed Message Search API methods

The Message Search API was removed by Vonage, so I've removed the methods that call it. See [this API specification notice](https://developer.vonage.com/api/developer/messages) for more information.

Vonage recommends migrating any calls to the Reports API. As this is a beta feature, it's not supported in the Python SDK, but [this guide](https://developer.vonage.com/reports/guides/migrate-from-sms-message-search) explains how migrating to the Reports API can be done.

### Removed automatic client creation

Previously, it was possible to instantiate an API class (e.g. `Sms`) directly, by passing in credentials, as a client was created when you did this. This has now been removed, as we want everyone to use the classes by creating a client and using it to call API methods.

### Removed deprecated methods from `Voice` and `NumberInsight` classes

The `Voice` class contained methods (`initiate_call`, `initiate_tts_call` and `initiate_tts_prompt_call`) that exposed endpoints that were deprecated by Vonage in 2017! These have now been removed from the SDK. Similarly, the `request_number_insight` method has been removed as it was superseded by the `get_{basic/standard/advanced}_number_insight` methods and endpoints.

### Renaming a secrets method

The `Account.delete_secret` method was renamed to `revoke_secret` to bring it in line with the documentation. Not too much to say here, there was a simple mismatch which we've now corrected.

### Deprecations

We deprecated the `ApplicationV2` class and created an `Application` class to bring the naming in line with other methods. Switching over is simple:

```python
ApplicationV2.list_applications() # Old class
Application.list_applications() # New class
```

Two old Pricing API methods (`get_sms_pricing` and `get_voice_pricing`) were deprecated as they call deprecated endpoints.

Finally, the method calling the Redact API (`redact_transaction`) has been deprecated as it's a dev preview product that's not supported in the Vonage server SDKs.

These will all be removed in a later release.

## Upgrading from 2.x

If you're upgrading from v2.x to the new release, make sure that if you're using any API methods directly from the client class to instead use the methods on the relevant API class.

E.g.

```python
client.get_basic_number_insight(number=MY_NUMBER) # API methods have been removed from the client class - this won't work
client.number_insight.get_basic_number_insight(number=MY_NUMBER) # Call the methods using the relevant API classes instead
```

## Where are we going?

As you can see, we've made quite a few changes to how the APIs are called in this release. In future releases, we'll be adding video functionality into the SDK. We also plan to remove the deprecated methods, add support for `asyncio` and eventually do more to validate input, using a tool such as Pydantic.

Feel free to download the new version and let us know what you think! If there's anything else you want to see, or anything you'd like to contribute, the whole SDK is open-source and [viewable on GitHub](https://github.com/Vonage/vonage-python-sdk). You can get started today with free credits on the [Vonage Developer website](https://developer.vonage.com).
