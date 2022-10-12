---
title: Before You Begin
product: bulk
navigation_weight: 0
---

# Before You Begin

## What are Code Snippets?

Code snippets are short pieces of code you can reuse in your own applications.
The code snippets utilize code from the [Vonage Node Code Snippets](https://github.com/Nexmo/nexmo-node-code-snippets) and [Vonage Curl Code Snippets](https://github.com/Nexmo/nexmo-curl-code-snippets) repositories.

Please read this information carefully, so you can best use the code snippets.

```partial
source: _partials/reusable/prereqs.md
```

## Getting Started

In order to use the Bulk API you will need:

* An account set up in the [Vonage Dashboard](https://ui.idp.vonage.com/ui/auth/registration?icid=tryitfree_adpdocs_nexmodashbdfreetrialsignup_inpagelink).
* An API Key and Secret, which can be found on the [dashboard](https://dashboard.nexmo.com/).
* A [JWT](https://developer.vonage.com/getting-started/concepts/authentication#json-web-tokens).
* An application [configured for the Bulk API](/bulk/guides/configure-dashboard-account).

### Channel Setup

The Bulk API is compatible with any channel in the [Vonage Messages API](https://developer.vonage.com/messages/overview). You will need to have configurations set for the channels you want to use:

Channel | Requirements
-- | --
SMS | If you want to use SMS you will need a number linked to your [dashboard](https://dashboard.nexmo.com/) which enables SMS messaging.
MMS | 
Viber Business Messages | Contact [Sales](https://www.vonage.com/communications-apis/contact-api/) for your own verified Viber Business Account.
WhatsApp | If you want to use WhatsApp you will need a WhatsApp number linked to your account. This can be done via Embedded sign up on the dashboard [External Accounts Page](https://dashboard.nexmo.com/messages/social-channels), or via the manual onboarding process.
Facebook Messenger | If you wish to use Facebook Messenger, you will need a Facebook Messenger account set up and you will need your messenger ID. Once you link your Facebook account and select your business page in the [External Accounts Page](https://dashboard.nexmo.com/messages/social-channels), you will see your Facebook ID listed.

> For more detailed instructions and to ensure your account is configured correctly, see the guide on [How to Configure Your Dashboard Account](/bulk/guides/configure-dashboard-account).
