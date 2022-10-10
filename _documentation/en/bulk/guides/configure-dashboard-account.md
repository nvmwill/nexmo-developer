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

You have now created your application. Next, you will need to link any numbers and social channels that you wish to use.

> **NOTE:** Before testing your application ensure that your webhooks are configured and your webhook server is running.

## Setup your Integration

Setting up an integration requires:

* The ID of the Application you created earlier; this can be found by going to Applications, selecting the Application you wish to use, and copying the Application ID.
* Your Private Key encoded in base64. Your Private Key was created when you set up your application needs to be converted using a tool such as [this one](https://www.base64encode.org/).

> If you cannot find the Private Key for your application, you can generate a new one by going to Applications -> Your Application -> Edit -> Generate public and private key.

1. In the [dashboard](https://dashboard.nexmo.com), select 'Integrations' in the left hand menu.
2. Under 'Setup an integration', select Vonage.
3. Enter a name for your integration, your Application ID, and your Private Key encoded in base64.

Once you have your Integration set up it will appear in the list of 'Existing integrations' on the Integrations page.

## WhatsApp

### Connecting to WhatsApp

1. If you don't already have a WhatsApp number to connect, go to ???????
2. On the [External Accounts Page](https://dashboard.nexmo.com/messages/social-channels), select 'Setup my WhatsApp Business Account' and click Next.
3. Fill in the fields and click 'Get my WhatsApp number Live' to connect your WhatsApp Number.

### Updating your WhatsApp Profile

1. On the [External Accounts Page](https://dashboard.nexmo.com/messages/social-channels), find your WhatsApp number in the list of connected social channels and click Edit.
2. Here, you can update the information which is publicly visible in the WhatsApp mobile app, including your:
    * Profile Picture
    * Business description
    * Business category
    * Address
    * Contact email
    * Website

### Link WhatsApp to your Vonage application

1. If you haven't already, [create an application](#create-an-application).
2. In the [External Accounts Page](https://dashboard.nexmo.com/messages/social-channels), find your WhatsApp account in the list of connected social channels and click 'Link to an application'.
3. Select the Application you want to link to your WhatsApp account.
4. Click 'Link social channels' and find your WhatsApp account in the list; click Link to connect the account.
5. This will now show as "Linked to this application" under Status.

## Facebook Messenger

1. On the [External Accounts Page](https://dashboard.nexmo.com/messages/social-channels), select 'Connect Facebook pages'.
2. Follow the steps to authenticate and connect your Facebook Business Page to your Vonage account.
3. In the External Accounts Page, find your Facebook page in the list of connected social channels and click 'Link to an application'.
4. Select the Application you want to link to your Facebook account.
5. Click 'Link social channels' and find your WhatsApp account in the list; click Link to connect the account.
6. This will now show as "Linked to this application" under Status.

## Salesforce

### Configure your Salesforce Account

1. In your Salesforce account, click ????? then Setup.
2. In the left hand menu, click Apps -> App Manager.
3. Select 'New Connected App' in the top right corner.
4. Fill in the following fields:
    * Connected App Name
    * API Name
    * Contact Email
    * Tick 'Enable OAuth Settings'
    * Callback URL - enter `https://api-eu.vonage.com/oauth/redirect`
    * Selected OAuth Scopes - Add 'Full access (full)' and 'Perform requests at any time (refresh_token, offline_access)
5. Click 'Save' at the top of the form when complete.
6. Once created, select the 'Manage Consumer Details' button under 'API (Enable OAuth Settings)'
7. Make note of the Consumer Key and Consumer Secret; these will be used to link Salesforce to your Vonage application.

### Link Salesforce to your Vonage application

1. In the [dashboard](https://dashboard.nexmo.com), select 'Integrations' in the left hand menu.
2. Select Salesforce under 'Setup an integration'.
3. Enter the following details:
    * Name - A name for your integration
    * Customer Secret - the Salesforce customer secret?
    * Customer Key - the Salesforce customer key?
    * Redirect URI - Enter `http://api-eu.dev.v1.vonagenetworks.net/oauth/redirect`
4. Click 'Connect with sf-oauth-1'.

Once complete, your Salesforce integration will appear in the list of 'Existing integrations' on the Integrations page.
