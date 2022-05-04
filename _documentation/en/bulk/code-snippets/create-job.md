---
title: Create a job
navigation_weight: 0
description: Creating a job
---

## Creating A Job

A job is essentially a pairing of segmentation(s), action(s) and list. In other words, a job iterates over a list with particular conditions, and performs an action on the list items that pass the condition. 

A job also contains a template, or the message to the be sent to the target user, which can include variables from the list items, such as `item.name`. 

**POST Endpoint**: `https://api-eu.dev.v1.vonagenetworks.net/beta/jobs/jobs`

**Request headers should include:**

```
Authorization: Bearer <JWT>
Content-type: application/json
```

The job is configured within request body, and is made up of the following values:

### Name 

The name of the job 

### Tags 

List of tags to be associated with the job 

```
 "tags": [
    "marketing",
    "uk"
  ],
```

### Definition 

Definition of the job, made up of: 

#### Type

Choose `segmentation-job` 

#### Recipients 

Add an exclude and include list. Both need an ID and a type: 

```
"recipients": {
    "include": [
        {
            "id": "{{includeListId}}",
            "type": "list"
        }
    ],
    "exclude": [
              {
            "id": "{{excludeListId}}",
            "type": "list"
        }
    ]
},
```

#### Segmentation 

A list of one or more segmentations that determine which action and template to use for each item, based on specific conditions. Each segmentation is made up of: 

- **Correlation ID**: The primary value with which to identify the list item 
- **Condition**: Logical condition (in JavaScript) that is run on each item 
- **Action Call**: Contains an `action_ref` object that includes the `type` (action), and the `id` of the action to be used. Also contains an object `parameters` in which you can set the values of the parameters defined in the action creation. The action call object will look something like this: 

```
"action_call": {
    "action_ref": {
        "type": "action",
        "id": "{{segmentationActionId}}"
    },
    "parameters": [
        {
            "name": "message",
            "value": "{{ template.message }}"
        },
        {
            "name": "toNumber",
            "value": "{{ item.number }}"
        }
    ]
}
```

- **Name**: The name of the segmentation (as there can be many)
- **Description**: The description of this segmentation
- **Template**: Message to be used for entries that pass the condition 

```
"template": {
    "type": "text",
    "message": "Dear {{ item.firstName }}, {{ item.lastName }} :)\\n This's our first SMS communication from the Vonage API.\\nReply back with STOP if you want to stop receiving our messages"
}
```

### Events Handler 

Handles events. Sorry I didn't finish this part. 