---
title: Overview
meta_title: Send large scale outreach campaigns using any channel available through the Vonage APIs
description: The Campaign API enables the developer to send large scale outreach campaigns using any channel available through the Vonage APIs.
---

# Campaign API Overview

The Campaign API is a powerful tool that provides customers with a flexible and scalable way of sending large scale outreach campaigns using any channels available through the Vonage APIs. It allows users to configure every aspect of their campaign and is capable of scheduling, segmentation, intelligent failover and analytics.

Accessible through an easy to use interface within the Customer Dashboard, the API works seamlessly with any channel in the [Vonage Messages API](https://developer.vonage.com/messages/overview) and allows customers to create complex communication strategies which can take advantage of all aspects of VCP. Easily link your campaign to AI Studio, Vonage CC or third party applications like Salesforce.

By using the Campaign API, businesses will be able to create meaningful campaigns that reach customers based on their individual channel preferences, time zones and with content guaranteed to start conversations.

## Contents

* [Getting Started](#getting-started)
* [Concepts](#concepts)
* [Code Snippets](#code-snippets)
* [Use Cases](#use-cases)
* [Reference](#reference)

## Getting Started

### Pre-Requisites

In order to use the Campaign API you will need:
* An account set up in the Vonage Dashboard
* An API Key and Secret
* A JWT

### Channel Setup

You will need to have configurations set for the channels you want to use:

Channel | Requirements
-- | --
[SMS] | If you want to use SMS you will need a number linked to your [dashboard] which enables SMS messaging.
MMS |
Viber Business Messages |
[WhatsApp] | If you want to use WhatsApp you will need a WhatsApp number linked to [your account]. This can be done via Embedded sign up on the dashboard External Accounts Page, or via the manual onboarding process.
[Facebook Messenger] | If you wish to use Facebook Messenger, you will need a facebook messenger account set up and you will need your messenger ID. Once you link your Facebook account and select your business page in the External Accounts Page, you will see your Facebook ID listed.

### Messages API Setting

Messages set to Messages API not SMS → Go to Vonage Dashboard → API Settings → https://dashboard.nexmo.com/settings

### Create an Application

* Create an application in the [dashboard](https://dashboard.nexmo.com/applications)

When you create your application you will be able to enter your inbound and status URLs. These should be: 

INBOUND URL: https://api-eu.vonage.com/v0.1/bulk/webhooks/recipients/responses?application_id=yourapplicationID

STATUS URL: https://api-eu.vonage.com/v0.1/bulk/webhooks/actions/status?application_id=yourapplicationID

You can also generate private and public keys which you will need to create your JWT [here](https://developer.vonage.com/jwt)

In your application settings you will need to link any numbers you wish to use, and any social channels. Once created your application will generate a unique ID. Save this value as you will need it later.

### Integrations

* Check to see if 'Integrations' are enabled in the dashboard. Should show up in the left hand nav. Then need to create a Vonage Integration.
* If you want to use Salesforce you will need to add a Salesforce Integration.

Setting up an integration requires name (name of your integration) Application ID  and Private Key encoded in base64.   Your Private Key created when you set up your application can be converted e.g. using https://www.base64encode.org/

Once you have your Integration set up it will look like this → (screenshot needed)

> Will integrations be available to everyone by the time these docs go live?

## Concepts / Terminology

* Lists
  * Contains the list of targets with which to run the campaign. Lists can be directly uploaded at the time of creation or imported from an external resource, like a file or CRM.
* Events
  * Events are configured to enable the api to 'listen' for certain responses or events. This might be to unsubscribe a user, create a new list based on a response, invoke a chat bot agent or trigger certain analytics. Again, it's totally up to the user.
* Items
  * The lists contains items  - we can think of these as rows within the spreadsheet of targets. This is used to help perform segmentation. When a campaign is configured the api moves through each item applying segmentation and actions. 
* Actions
  * Configure the action to be performed on a list entry when running a campaign. Actions are typically used to send an SMS, message, email or make a phone call. Actions can also be used as reactions, to trigger an API call upon receiving a response from the target user.
* Event Handler
* Scheduler
* Analytics
* Jobs
  * Configure the main resource that defines the campaign. A job iterates through the list and applies a predefined set of actions to each element of the list. Create a job to apply different actions based on different conditions.
* Runs
  * See all jobs that have run, are running, or are scheduled to run, and find out how your campaigns are performing.

## Code Snippets

* Before you begin
* How to send an SMS Notification campaign
* How to send a WhatsApp campaign with buttons (ecommerce)
* How to create a voice campaign with Studio AI (for EA and probably Beta you HAVE to use Studio)
* How to manage unsubscribes
* How to upload a list from salesforce

## Use Cases

Content here

## Reference

* [Messages API Reference](/api/messages-olympus)
* [SMS API Reference](/api/sms)
* [Voice API Reference](/api/voice)
* [Campaign API Reference](/api/meetings)
* [AI Studio](https://studio.docs.ai.vonage.com/)
