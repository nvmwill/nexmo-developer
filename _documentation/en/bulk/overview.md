---
title: Overview
meta_title: Send large scale outreach campaigns using any channel available through the Vonage APIs
description: The Bulk API enables the developer to send large scale outreach campaigns using any channel available through the Vonage APIs.
---

# Bulk API Overview

The Bulk API is a powerful tool that provides customers with a flexible and scalable way of sending large scale outreach campaigns using any channels available through the Vonage APIs. It allows users to configure every aspect of their campaign and is capable of scheduling, segmentation, intelligent failover and analytics.

Accessible through an easy to use interface within the Customer Dashboard, the API works seamlessly with any channel in the [Vonage Messages API](https://developer.vonage.com/messages/overview) and allows customers to create complex communication strategies which can take advantage of all aspects of VCP. Easily link your campaign to AI Studio, Vonage CC or third party applications like Salesforce.

By using the Bulk API, you can create meaningful campaigns that reach customers based on their individual channel preferences, time zones and with content guaranteed to start conversations.

## Contents

* [Concepts](#concepts)
* [Code Snippets](#code-snippets)
* [Guides](#guides)
* [Reference](#reference)

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

```code_snippet_list
product: bulk
```

## Guides

```concept_list
product: bulk
```

## Reference

* [Messages API Reference](/api/messages-olympus)
* [SMS API Reference](/api/sms)
* [Voice API Reference](/api/voice)
* [Bulk API Reference](/api/meetings)
* [AI Studio](https://studio.docs.ai.vonage.com/)
