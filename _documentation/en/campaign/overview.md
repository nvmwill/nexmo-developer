---
title: Overview
meta_title: Send large scale outreach campaigns using any channel available through the Vonage APIs
description: The Campaign API enables the developer to send large scale outreach campaigns using any channel available through the Vonage APIs.
---

# Campaign API Overview

The Campaign API allows you to...

## Contents

* [Getting Started](#getting-started)
* [Concepts](#concepts)
* [Code Snippets](#code-snippets)
* [Use Cases](#use-cases)
* [Reference](#reference)

## Getting Started


## Concepts / Terminology

* Lists
  * Contains the list of targets with which to run the campaign. Lists can be directly uploaded at the time of creation or imported from an external resource, like a file or CRM.
* Events
* Items
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
