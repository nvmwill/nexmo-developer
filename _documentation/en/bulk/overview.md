---
title: Overview
meta_title: Execute outreach campaigns at a large scale using any channel or API. 
description: This Bulk API makes it easy to schedule and send personalized messages to large contact groups using any API 
product: bulk
navigation_weight: 1
---

# The Campaign API 

Execute outreach campaigns at a large scale using any channel or API. 

This API makes it easy to schedule and send personalized messages to large contact groups, and offers the ability to receive and act on responses received from customers.

## Capabilities 

- Custom message templates
- Target segmentation based on customer attributes
- Target list management
- Support for any channel or action
- Process and act on responses
- Reporting and analytics 
- Detailed scheduling 
- (future) CRM connectors to fetch target lists and attributes
- (future) Message scheduling
- (future) Conversion
- (future) Webhooks
- (future) Link redirection and click tracking

## Requirements 

- **Vonage Developer Account**: If you don’t have a Vonage account yet, you can [sign up here](https://dashboard.nexmo.com/sign-up)
- **Application ID and Private Key**: Once you’re logged in to the [Vonage API Dashboard](https://dashboard.nexmo.com/), click on Applications and create a new Application. Generate a public and private key and record the private key.
- **JWT using Nexmo application**: Use the [JWT Generator](https://developer.vonage.com/jwt) to create a JWT using the Application ID and Private Token mentioned above. For further details about JWTs, please see [Vonage Authentication](https://developer.vonage.com/concepts/guides/authentication).

## Overview

![Diagram of bulk API](/images/bulk/diagram-1.png)

### Terminology 

- **List**: contains the list of targets with which to run the campaign. List can contain any number of entries with any number of properties/columns. List can be either directly uploaded at the time of creation or imported from an external resource, like a file or CRM. 
- **Action**: configurable action to be performed on a list entry when running a campaign. Actions would typically by used to send an SMS, message, email or make a phone call. Actions can also be used as reactions, to trigger an API call upon receiving a response from the target user. 
- **Job**: the main resource that defines the campaign, always associated with a list. When a job is started, it iterates through the list and applies the predefined set of actions to each element of the list. The job resource allows users to:   
  - Control the status of a job (start/stop/pause)
  - Apply different actions and create custom templates based on a set of conditions when sending a message 
  - Apply different actions based on a set of conditions when handling a response from the user


## Basic Flow for Creating a Bulk Job  

1. Create or use an existing **[`action`](code-snippets/create-action)** to configure the call that will be made: the URL, its payload, the success and failure policy, and how many times to try again. 
2. Upload or use a **[`list`](code-snippets/create-list)** of target recipients for the job  
3. Create a **[`job`](code-snippets/create-job)** that defines the conditions of the job and its matching policy; link it to the action and the list. 
4. Schedule the job with the **[`runs`](code-snippets/runs)** endpoint, using the ID of the job and a selected time frame 


