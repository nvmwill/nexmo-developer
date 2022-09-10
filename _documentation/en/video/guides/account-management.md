---
title: "Account Management"
description: "Learn how to setup up and manage different projects for your Vonage Video API account." 
product: video
navigation_weight: 
---

# Account Management

Account administrators can use the Vonage Video REST API to create and manage individual projects in their Vonage Video account.

For example, you may want to create different projects that correspond to different customers. Separate projects enable Vonage Video to track usage individually for each customers.

Each project has its own unique Vonage Video *project* App ID and *project* API secret.

For example, a customer — Acme — is using your service. You can use the Vonage Video REST API to create an Vonage Video project App ID and project API secret for that customer. 

You can use the Vonage Video REST API to do the following:

* [Create a new project for your Vonage Video account](/api/video)
* [Suspend a project APP ID or make it active again](/api/video)
* [Delete a project](/api/video)
* [Get information about a specific project or all projects](/api/video) for an account
* [Generate a new API secret for a project](/api/video)
* [Specify an Amazon S3 or Microsoft Azure upload target](/api/video) for a project's archive files
* [Deleting an upload target](/api/video) for a project's archive files

For the following REST API calls, use the **account-level** App ID and secret. 
To obtain the account-level App ID and secret:
- Log on to your [Video API account](https://tokbox.com/account/)
- Click **Account Settings** in the left-hand menu
- Under **Vonage Video REST API**, click **View account keys**.

The account-level App ID and secret is only available to registered administrators of your Vonage Video account. Use the account-level App ID and secret when creating the [authentication token](/api/video)) you use in the REST API call:

* [Creating a new project for your Vonage Video account](/api/video)
* [Suspending a project API key or make it active again](/api/video)
* [Deleting a project](/api/video)
* [Getting information about a specific project or all projects](/api/video) for an account
* [Generating a new API secret for a project](/api/video)

The account-level App ID and secret is only available to registered administrators of your Vonage Video account.
For other REST API calls, use the App ID and secret for the specific project in your account. These are provided on the Project page of your [Video API account](https://ui.idp.vonage.com/ui/auth/login).

## Project details object

Many responses to the REST API calls include a project details object. This part of the JSON response includes details on the project. It is in the following format:

```json
{
  "id":  "12312",
  "secret":  "567890",
  "status": "ACTIVE",
  "name": "Joe Montana",
  "environment": "standard",
  "createdAt": 1414642898000 // A UNIX timestamp (in milliseconds)
}
```

The project details object has the following properties:

* `id` — The Vonage Video project App ID
* `secret` — The Vonage Video project API secret
* `status` — Whether the project is active (`"ACTIVE"`) or suspended (`"SUSPENDED"`). See [Suspending a project API key or making it active](/api/video).
* `name` — The name, if you specified one when creating the project; or an empty string if you did not specify a name
* `environment` — This is set to `"standard"` or `"enterprise"`, and it refers to the environment a project is running on. Enterprise package partners have access to the enterprise environment. For more information, see our [support packages page](https://www.vonage.com/communications-apis/video/pricing/). If you have additional questions please [contact us](https://video-api.support.vonage.com/hc/en-us/requests/new).
* `createdAt` — The time at which the project was created (a UNIX timestamp, in milliseconds)

Please disregard any other properties in the project details object.