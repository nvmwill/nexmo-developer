---
title: Enterprise environment
meta_title: Using the Vonage Video API Enterprise environment
description: Using the Vonage Video API Enterprise environment
navigation_weight: 
---

# Enterprise environment

The Enterprise environment ensures your application runs on Vonage Video API media services that are dedicated to the Enterprise environment. Vonage release management processes ensure our latest software is always validated in our Standard environment, before the Enterprise environment is upgraded, to minimize impact of change.

As a dedicated environment, the Enterprise environment also protects against platform load spikes and offers longer support duration for client SDKs.

Using the Enterprise environment may mean delayed access to cutting-edge features for production use, but you will always have full access to the Standard environment for development and testing the latest available features.

## Using the Enterprise environment

The Enterprise environment available as an [add-on feature](https://www.vonage.com/communications-apis/video/pricing/).

To get started using the Video API Enterprise environment, you will need to do the following:

* Make sure you are using the Enterprise version of the Vonage Video API Web SDK ([OpenTok.js](/video/client-sdks/web)).

* Make sure you are using an Enterprise-supported version of our iOS,
Android, Windows, and Linux SDKs in your mobile, Windows, and Linux applications. See the [Supported versions](#supported-versions) section below to see supported mobile SDK versions. Please contact Vonage Support if you need help downloading or using a package manager to download an Enterprise-supported SDK.

* Determine which of your Video API projects you would like to use in applications that will use the Enterprise environment, and log in to your [Video API account](https://tokbox.com/account) to assign them to the Enterprise environment.

By default, all newly created project keys are assigned to the Standard environment. You must specifically request a project key be assigned to the Enterprise environment environment if you would like to use it with an application running in the Enterprise environment. Release notes and download links to Enterprise versions of the mobile SDKs are not readily available on the Vonage Video API developer center. If you need assistance accessing these please [contact us](https://video-api.support.vonage.com/hc/en-us/requests/new).

If you desire to switch your application back to the Standard environment you will need to contact support with a list projects you want assigned back to the Standard environment and, if necessary, switch to the Standard environment supported version of the SDK for applications using these projects.

If you should stop paying for the Enterprise environment add-on, you will lose access to the Enterprise environment and your projects will be automatically assigned back to the Standard environment. It will be your responsibility to update your applications with a supported version of the Vonage Video SDK.

Many users of the Enterprise environment find it useful to keep one or more projects assigned to the Standard environment, where they can conduct development and testing of new features with the Standard environment clients before they are deployed to projects using the Enterprise enterprise environment.

## Supported versions

Vonage recognizes that it is not always practical for customers to update the client SDKs each time a new release is issued. We typically limit minor releases to no more than once every 4 months but they are not done in predetermined fixed increments. A minor release is represented by an increment to the digit to the right of the first decimal point in a release version number. Patch releases contain bug fixes and are released as needed. A patch release is represented by an increment to the digit to the right of the second decimal point in a release version number.

Vonage officially supports Video API Client SDK versions as follows:

### Enterprise environment

All Video API client SDKs are supported for at least twelve months from the date of release. Support is provided for the most recent patch release of each version.

| Support SDK version | Deprecation date   |
| ------------------- | ------------------ |
| v2.22               | May 19, 2023       |
| v2.21               | January 25, 2023   |
| v2.20               | August 30, 2022    |

### Standard environment

All Video client SDKs are supported for at least nine months from the date of release. Support is provided for the most recent patch release of each version.

| Support SDK version | Deprecation date   |
| ------------------- | ------------------ |
| v2.23               | March 31, 2023     |
| v2.22               | November 30, 2022  |
| v2.21               | July 8, 2022       |
| v2.20               | February 20, 2022  |

Vonage prides itself on shielding our partner application developers from changes to the WebRTC ecosystem of technology. This includes:

* Changes made by Google to the Chrome browser and the Android operating system
* Changes made by Mozilla to the Firefox browser
* Changes made by Apple to the Safari browser and the iOS operating system
* Changes made by Microsoft the Edge browser to the Windows operating system
* Changes made to Debian

When external changes require Vonage to make changes to our SDKs, it may become necessary for partners to accelerate their adoption of newer SDK versions to maintain proper operation of their applications with these new WebRTC ecosystem components.

<!--alex ignore whitelisting-->

Note: The Allowed IP list add-on (formerly IP whitelisting) requires that you use the Enterprise environment. See the [Allowed IP list developer guide](/video/guides/ip-addresses/).