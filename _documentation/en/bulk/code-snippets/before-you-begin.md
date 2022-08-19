---
title: Before You Begin
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

### Channel Setup

The Bulk- API is compatible with any channel in the [Vonage Messages API](https://developer.vonage.com/messages/overview). You will need to have configurations set for the channels you want to use:

Channel | Requirements
-- | --
SMS | If you want to use SMS you will need a number linked to your [dashboard](https://dashboard.nexmo.com/) which enables SMS messaging.
MMS | 
Viber Business Messages | Contact [Sales](https://www.vonage.com/communications-apis/contact-api/) for your own verified Viber Business Account.
WhatsApp | If you want to use WhatsApp you will need a WhatsApp number linked to your account. This can be done via Embedded sign up on the dashboard [External Accounts Page](https://dashboard.nexmo.com/messages/social-channels), or via the manual onboarding process.
Facebook Messenger | If you wish to use Facebook Messenger, you will need a Facebook Messenger account set up and you will need your messenger ID. Once you link your Facebook account and select your business page in the [External Accounts Page](https://dashboard.nexmo.com/messages/social-channels), you will see your Facebook ID listed.

### Messages API Setting

Go to [API Settings](https://dashboard.nexmo.com/settings) page of your dashboard and ensure your SMS settings are using the Messages API instead of the SMS API:

![Dashboard SMS Settings](/images/dashboard-sms-settings.png)

### Create an Application

There are two alternative methods for creating a Messages and Dispatch application:

1. Using the Vonage CLI
2. Using the Dashboard

Each of these methods is described in the following sections. When you create your application you will be able to enter your inbound and status URLs; these should be:

* INBOUND URL: ``https://api-eu.vonage.com/v0.1/bulk/webhooks/recipients/responses?application_id=yourapplicationID``
* STATUS URL: ``https://api-eu.vonage.com/v0.1/bulk/webhooks/actions/status?application_id=yourapplicationID``

#### How to create a Messages and Dispatch application using the Vonage CLI

To create your application using the Vonage CLI, enter the following command into the shell:

``` shell
vonage apps:create "My Messages App" --messages_inbound_url=https://api-eu.vonage.com/v0.1/bulk/webhooks/recipients/responses?application_id=yourapplicationID --messages_status_url=https://api-eu.vonage.com/v0.1/bulk/webhooks/actions/status?application_id=yourapplicationID
```

This creates a Vonage API application with a messages [capability](/application/overview#capabilities), with the webhook URLs configured as specified, and generate a private key file `my_messages_app.key` and creates or updates the `vonage_app.json` file.

#### How to create a Messages and Dispatch application using the Dashboard

You can create Messages and Dispatch applications in the [Dashboard](https://dashboard.nexmo.com/applications).

To create your application using the Dashboard:

1. Under [Applications](https://dashboard.nexmo.com/applications) in the Dashboard, click the **Create a new application** button.

2. Under **Name**, enter the Application name. Choose a name for ease of future reference.

3. Click the button **Generate public and private key**. This will create a public/private key pair and the private key will be downloaded by your browser.

4. Under **Capabilities** select the **Messages** button.

5. In the **Inbound URL** box, enter the URL for your inbound message webhook: ``https://api-eu.vonage.com/v0.1/bulk/webhooks/recipients/responses?application_id=yourapplicationID``

6. In the **Status URL** box, enter the URL for your message status webhook: ``https://api-eu.vonage.com/v0.1/bulk/webhooks/actions/status?application_id=yourapplicationID``

7. Click the **Generate new application** button. You are now taken to the next step of the Create Application procedure where you can link a Vonage API number to the application, and link external accounts such as Facebook to this application.

8. If there is an external account you want to link this application to, click the **Linked external accounts** tab, and then click the corresponding **Link** button for the account you want to link to.

You have now created your application. In your application settings you will need to link any numbers you wish to use, and any social channels. Once created your application will generate a unique ID. Save this value as you will need it later.

> **NOTE:** Before testing your application ensure that your webhooks are configured and your webhook server is running.

### Integrations

* Check to see if 'Integrations' are enabled in the dashboard. Should show up in the left hand nav. Then need to create a Vonage Integration.
* If you want to use Salesforce you will need to add a Salesforce Integration.

Setting up an integration requires name (name of your integration) Application ID and Private Key encoded in base64. Your Private Key created when you set up your application can be converted e.g. using https://www.base64encode.org/

Once you have your Integration set up it will look like this → (screenshot needed)

> Will integrations be available to everyone by the time these docs go live?
