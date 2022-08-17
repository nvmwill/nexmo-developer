---
title: Using WhatsApp Stickers
meta_title: How to retrieve and send stickers on WhatsApp using the Messages API
navigation_weight: 7
---

# Using WhatsApp Stickers with the Messages API

Stickers allow businesses to communicate with end users in an informal way similar to emojis, but with larger images and which can be customised to represent a brand.

To send a sticker via the Messages API it is necessary to:

1. Get the Sticker ID from a sticker pack using the WhatsApp Provisioning API.
    * [Get Deployment ID](#get-deployment-id)
    * [Retrieve Stickerpacks](#retrieve-stickerpacks)
    * [Retrieve Sticker Indexes](#retrieve-sticker-indexes)
    * [Retrieve Stickers](#retrieve-stickers)
2. Send a custom message type with the sticker ID inside using the Messages API.
    * [Sending Stickers via Messages API](#sending-stickers-via-messages-api)

## Retrieve the Sticker ID

You can retrieve the ID of your chosen sticker via the [WhatsApp Provisioning API](/api/whatsapp-provisioning).

### Get Deployment ID

First, ensure you have provisioned a [WhatsApp deployment](/messages/whatsapp-provisioning/provision-deployment). Use the following request to get the Deployment ID for your WhatsApp number:

``` HTTP
GET https://api.nexmo.com/v0.1/whatsapp-manager/deployments 
```

A successful response will contain the property ``deployment_id``:

``` json
{
    "deployment_id":"aaaaaaaa-bbbb-cccc-dddd-0123456789ab",
    "country_code":"44",
    "number":"7756733252",
    "api_key":"apiKey",
    "waba_id":"123456123456",
    "current_state":{
        "title":"READY"
    }
}
```

### Retrieve Stickerpacks

WhatsApp Stickerpacks and Stickers have two categories:

1. **First-Party Stickerpacks** - Managed by WhatsApp (ready to be used).
2. **Third-Party Stickerpacks** - Managed by a Business owning a number (custom).

> If you want to use a custom sticker pack, you'll need to create a sticker app and release it to the Google Play store and/or the Apple App store. Take a look at the [WhatsApp Documentation](https://faq.whatsapp.com/219571822467807/?locale=en_US) for more information on how to do this.

Here's an example of a request to retrieve WhatsApp First-Party Stickerpacks. The request contains a namespace parameter with the value ``whatsapp`` along with your ``deployment_id``:

``` HTTP
GET https://api.nexmo.com/v0.1/whatsapp-manager/deployments/aaaaaaaa-bbbb-cccc-dddd-0123456789ab/stickerpacks?namespace=whatsapp 
```

A successful response contains an object called `stickerpacks` containing the IDs for all of the available WhatsApp First-Party Stickerpacks:

```json
{
    "stickerpacks": [
        {
            "id": "Encanto"
        },
        {
            "id": "whatsapp-komo"
        },
        {
            "id": "GirlPower"
        },
        {
            "id": "HowAreYou"
        },
        ....
        {
            "id": "Biscuit"
        }
    ],
    "meta": {
        "version": "v2.37.1",
        "api_status": "stable"
    }
}
```

### Retrieve Sticker Indexes

We can now pick up a sticker pack ID and retrieve stickers indexes, for example this request retrieves the ``whatsapp-komo`` stickerpack:

``` HTTP
GET https://api.nexmo.com/v0.1/whatsapp-manager/deployments/aaaaaaaa-bbbb-cccc-dddd-0123456789ab/stickerpacks/whatsapp-komo/stickers?namespace=whatsapp
```

A successful response contains the ``stickers`` object with all of the sticker indexes:

```json
{
    "stickers": [
        {
            "index": "0"
        },
        {
            "index": "1"
        },
        ...
        {
            "index": "23"
        }
    ],
    "meta": {
        "version": "v2.37.1",
        "api_status": "stable"
    }
}
```

### Retrieve Stickers

We can now pick up a sticker index and retrieve a sticker ID. For example, this request will retrieve the sticker with index `0`:

``` HTTP
GET https://api.nexmo.com/v0.1/whatsapp-manager/deployments/aaaaaaaa-bbbb-cccc-dddd-0123456789ab/stickerpacks/whatsapp-komo/stickers/0?namespace=whatsapp
```

The property ``id`` contains the value we need to provide in a Messages API request payload; in this case it's ``13aaecab-2485-4255-a0a7-97a2be6906b9``:

```json
{
    "stickers": [
        {
            "emojis": [
                "👍",
                "🐰"
            ],
            "id": "13aaecab-2485-4255-a0a7-97a2be6906b9"
        }
    ],
    "meta": {
        "version": "v2.37.1",
        "api_status": "stable"
    }
}
```

## Sending Stickers via Messages API

It is possible to send stickers via custom content as below:

```curl
curl -X POST https://messages-sandbox.nexmo.com/v1/messages \
-u 'apiKey:apiSecret' \
-H 'Content-Type: application/json' \
-H 'Accept: application/json' \
-d '{
   "from":"14157386102",
   "to":"44XXXXXXXXX",
   "channel":"whatsapp",
   "message_type":"custom",
   "custom":{
      "type":"sticker",
      "sticker":{
         "id":"13aaecab-2485-4255-a0a7-97a2be6906b9"
      }
   }
}'
```

> Please note: Animated stickers are not supported.

References:

* [Messages API](/api/messages-olympus)
* [WhatsApp Provisioning API](/api/whatsapp-provisioning)
