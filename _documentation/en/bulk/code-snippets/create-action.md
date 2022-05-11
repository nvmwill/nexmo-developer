---
title: Create an action
navigation_weight: 0
description: Creating an action
---

# Create an Action

Given its customizable nature, an action can be whatever you make it, such as the call that occurs on a list entry once segmentation conditions are met, or the response to an event that happens. 
>An action can also be reused in subsequent jobs.

**POST**: `https://api-eu.dev.v1.vonagenetworks.net/beta/jobs/actions`

Request headers should include: 

```
Authorization: Bearer <JWT>
Content-type: application/json
```

The action is configured within request body, and is made up of the following values:

### Name 

The name of the action. 

### Parameters 

Any variables that you would like to use in the request, to be referred to using their name, for example `parameters.api-secret` 

```
"parameters": [
{
    "name": "action",
    "default": "no-action"
},
{
    "type": "string",
    "name": "credentials-token",
    "default": ""
},
{
    "type": "string",
    "name": "credentials-basic",
    "default": ""
}
],
  ```

### TPS

API calls per second, usually dependent on the restrictions of the API being used. 

### Response 

Object that describes response expectations, both immediate or async. 

- **`success_codes`**: All possible success codes that can return from this request, determines whether the call is considered successful

### Delivery

Describes information about response from request, relevant only for async calls 

- **`invocation_id`**: the id of the request, found in the response, that can be matched to subsequent async responses

### Async 

Describes information about async responses from request 

- **status**: all possible response statuses that can be returned in the response. If only `success_statuses` is specified, then any other status is considered as failure
- **value**: used to identify the event in body of subsequent requests

```
"status": {
    "success_statuses": [
    "delivered"
    ],
    "failure_statuses": [
    "rejected",
    "undeliverable"
    ],
    "info_statuses": [
    "submitted"
    ],
    "value": "{{event.status}}"
}
```

- **error**: used to identify the error in subsequent responses 

```
"error": {
"code": "{{event.error.title}}",
"reason": "{{event.error.details}}"
}
```

### Timeout Seconds 
The number of seconds until request timeout 

### Retry Policy 

Object containing details about request retries 

- **`num_retries`**: number of tries to attempt before failing the action 
- **`backoff_policy.base_interval_seconds`**: how long to wait before trying again 
- **`backoff_policy.max_interval_seconds`**:

### Command 

Object containing details about the API call.  

- **headers**: name and value of request headers 

```
    "headers": [
      {
        "name": "Content-Type",
        "value": "application/json"
      },
      {
        "name": "Authorization",
        "value": "Bearer {{ inputs.credentials-token }}"
      }
    ],
```

- **type**: type of request. currently only http methods are supported. 
- **URL**: URL of the API call, including query parameters 
- **method**: request method 
- **payload**: body of the request, in the format expected by the API 


### Example Action Request Body

```
{
  "name": "send-message",
  "parameters": [
    {
      "name": "action",
      "default": "no-action"
    },
    {
      "type": "string",
      "name": "to",
      "default": ""
    },
    {
      "type": "string",
      "name": "from",
      "default": ""
    },
    {
    "type": "string",
    "name": "credentials-token",
    "default": ""
    },
  ],
  "tps": 10,
  "timeout_seconds": 5,
  "retry_policy": {
    "num_retries": 3,
    "backoff_policy": {
      "base_interval_seconds": 1,
      "max_interval_seconds": 30
    }
  },
  "command": {
    "headers": [
      {
        "name": "Content-Type",
        "value": "application/json"
      }
    ],
    "type": "http-api-invoke",
    "url": "https://postman-echo.com/post",
    "method": "post",
    "payload": {   "to":  "{{ item.number }}",   "message_type": "text",  "from": "{{ parameters.fromNumber }}",  "channel": "sms",   "text": "{{ template.message }}",  "client_ref": "my-sms" }
  }
}
```