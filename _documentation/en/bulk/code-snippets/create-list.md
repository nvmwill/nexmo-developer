---
title: Create a list
navigation_weight: 0
description: Creating or importing a list
---

## Creating a List 

A list can be used as a target list or as an unsubscribe list. It is made of up of entries with _labels_.
You can import a list from [Salesforce](#import-list-from-salesforce), or upload from a CSV [file](#upload-list-from-file). 

**TODO - Lauren**

- The limits on list sizes are as follows: 
- EA: 10,000 entries 
- Beta: 100,000 entries 
- GA: 1 million entries


### Import List From Salesforce 

To import a list from Salesforce, you'll need to first authenticate your account with the [Vonage Integrations API](dashboard.nexmo.com/integrations). 

**POST**: `https://api-eu.dev.v1.vonagenetworks.net/beta/lists/lists`

Request headers should include: 

```
Authorization: Bearer <JWT>
Content-type: application/json
```

In the request body, you'll need the field labels, the Name of the integration, which can be found at **TODO** and the relevant query for the contacts you'd like to import. 

#### Request Body

```
{
    "name": "{{$name}}",
    "labels": [ { "name": "firstName" }, { "name": "lastName" }, { "name": "number" } ],
    "tags": ["vip"],
    "datasource": {
        "type": "salesforce",
        "integration_id": "uuid",
        "soql": "SELECT Id, LastName, FirstName, Phone, Email FROM Contact limit 20"
    },
}
```

#### Response 

The response will contain a `list_id` that can be used to retrieve or manage this list. 

```
{
    "items_count": 0,
    "sync_status": "configured",
    "name": "Random Name",
    "labels": [
        {
            "name": "firstName"
        },
        {
            "name": "lastName"
        },
        {
            "name": "number"
        }
    ],
    "tags": [
        "vip"
    ],
    "id": "904cdc29-7399-4553-8b45-d34b80c6e0d2",
    "created_at": "2022-05-03T12:33:59.853Z",
    "updated_at": "2022-05-03T12:33:59.853Z"
}
```

## Upload List From File

To upload a list from a file, you'll need to first **create the list** and set its field labels. 

**POST**: `https://api-eu.dev.v1.vonagenetworks.net/beta/lists/lists`

Request headers should include: 

```
Authorization: Bearer <JWT>
Content-type: application/json
```

```
{
    "name": "{{$name}}",
    "labels": [ { "name": "first_name" }, { "name": "last_name" }, { "name": "phone" } ],
    "tags": ["vip"]
}
```


Use the `list_id` received in the response to upload the file:


**POST**: `https://api-eu.dev.v1.vonagenetworks.net/beta/lists/lists/{list_id}/items/import` 

```
--form 'file=@"{PATH_TO_FILE.csv}"'
```

Once you've uploaded or imported the list, use its ID to include it in a job. Note that lists can be reused for multiple jobs.    

## Managing a List

The endpoint for managing a list is `https://api-eu.dev.v1.vonagenetworks.net/beta/lists/lists` TODO lists lists 

### Update List

To update the name of a list, use a PUT and the list ID: 

**PUT**: `https://api-eu.dev.v1.vonagenetworks.net/beta/lists/lists/{LIST_ID}`

### Get List

To see a list of all lists, use a GET on the list endpoint:

**GET**: `https://api-eu.dev.v1.vonagenetworks.net/beta/lists/lists`


To see details about one specific list, use a GET and the list ID:

**GET**: `https://api-eu.dev.v1.vonagenetworks.net/beta/lists/lists/{LIST_ID}`

## Managing List Items

The endpoint for managing a list entry is `https://api-eu.dev.v1.vonagenetworks.net/beta/lists/{LIST_ID}/items/{ITEM_ID}` 

### Get List Entries 

To see all items in a list, use a GET with the List ID:

**GET**: `https://api-eu.dev.v1.vonagenetworks.net/beta/lists/{LIST_ID}`


To see details about one item in the list, use a GET with the List ID and the item ID: 

**GET**: `https://api-eu.dev.v1.vonagenetworks.net/beta/lists/{LIST_ID}/items/{ITEM_ID}`

### Update List Entries 

To change the values in a list entry, use an PUT, and add all values to be changed to an object called `data`: 

**UPDATE**: `https://api-eu.dev.v1.vonagenetworks.net/beta/lists/{LIST_ID}/items/{ITEM_ID}`

```
"data": {
    "first_name": "Steve",
    "last_name": "Boyle",
    "phone": "668-606-9417",
  }
```

### Reset List 

To delete all entries from a list, use a POST and call the reset endpoint with the List ID: 

**POST**: `https://api-eu.dev.v1.vonagenetworks.net/beta/lists/{LIST_ID}/items/reset`