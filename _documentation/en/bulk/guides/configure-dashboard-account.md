---
title: How to Configure Your Dashboard Account
description: How to configure your account to use either the API or the Dashboard UI
product: bulk
navigation_weight: 0
---

# How to Configure Your Dashboard Account

1. Link social channels you want to use by going to the [External Accounts Page](https://dashboard.nexmo.com/messages/social-channels) of the [Dashboard](https://dashboard.nexmo.com).

## Messages API Setting

Go to [API Settings](https://dashboard.nexmo.com/settings) page of your dashboard and ensure your SMS settings are using the Messages API instead of the SMS API:

![Dashboard SMS Settings](/images/dashboard-sms-settings.png)

## Create an Application

There are two alternative methods for creating a Messages and Dispatch application:

1. Using the Vonage CLI
2. Using the Dashboard

Each of these methods is described in the following sections. When you create your application you will be able to enter your inbound and status URLs; these should be:

* INBOUND URL: ``https://api-eu.vonage.com/v0.1/bulk/webhooks/recipients/responses?application_id=yourapplicationID``
* STATUS URL: ``https://api-eu.vonage.com/v0.1/bulk/webhooks/actions/status?application_id=yourapplicationID``

### How to create a Messages and Dispatch application using the Vonage CLI

To create your application using the Vonage CLI, enter the following command into the shell:

``` shell
vonage apps:create "My Messages App" --messages_inbound_url=https://api-eu.vonage.com/v0.1/bulk/webhooks/recipients/responses?application_id=yourapplicationID --messages_status_url=https://api-eu.vonage.com/v0.1/bulk/webhooks/actions/status?application_id=yourapplicationID
```

This creates a Vonage API application with a messages [capability](/application/overview#capabilities), with the webhook URLs configured as specified, and generate a private key file `my_messages_app.key` and creates or updates the `vonage_app.json` file.

### How to create a Messages and Dispatch application using the Dashboard

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

## WhatsApp

### Connecting to WhatsApp

1. If you don't already have a WhatsApp number to connect, go to ???????
2. Go to 'Setup my WhatsApp Business Account' and click Next.
3. Fill in the fields and click 'Get my WhatsApp number Live' to connect your WhatsApp Number.

### Updating your WhatsApp Profile

1. Find your WhatsApp number in the list of connected social channels and click Edit.
2. Here, you can update the information which is publicly visible in the WhatsApp mobile app, including your:
    * Profile Picture
    * Business description
    * Business category
    * Address
    * Contact email
    * Website

### Link WhatsApp to your application

1. If you haven't already, create an application in the [dashboard](https://dashboard.nexmo.com/applications).
2. In the [External Accounts Page](https://dashboard.nexmo.com/messages/social-channels), find your WhatsApp number in the list of connected social channels and click 'Link to an application'.
3. Select the Application you want to link to your WhatsApp account.
4. Click 'Link social channels' and find your WhatsApp account in the list; click Link to connect the account.
5. This will now show as "Linked to this application" under Status.
