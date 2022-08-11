---
title: Send a WhatsApp Sticker
meta_title: Send a sticker on WhatsApp using the Messages API
---

# How to Send WhatsApp Stickers via the Messages API

Stickers allow businesses to communicate with end users in an informal way similar to emojis, but with larger images and which can be customised to represent a brand. There are two types of stickers:

* Stickers managed by WhatsApp.
* Stickers managed by a business, which will have to be uploaded before they can be used.

To send a sticker via Messages API it is necessary to:

1. Get the Sticker ID from a sticker pack
2. Send a custom message type with the sticker ID inside

## Retrieve the Sticker ID

You can retrieve the ID of your chosen sticker via the [WhatsApp Provisioning API](/api/whatsapp-provisioning).

### Get Deployment ID

To get the Deployment ID for your WhatsApp number you have to live with Vonage using the following request:

`` GET https://api.nexmo.com/v0.1/whatsapp-manager/deployments ``

Response:

``` json
    [
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
    ]
```

The property ``deployment_id`` contains your Deployment ID.

### Retrieve Stickerpacks

WhatsApp Stickerpacks and Stickers have two categories:

1. **First-Party Stickerpacks** - Managed by WhatsApp (ready to be used).
2. **Third-Party Stickerpacks** - Managed by a Business owning a number (custom).

Here's an example of a request to retrieve WhatsApp First-Party Stickerpacks. The request contains a namespace parameter with the value ``whatsapp``.

`` GET https://api.nexmo.com/v0.1/whatsapp-manager/deployments/aaaaaaaa-bbbb-cccc-dddd-0123456789ab/stickerpacks?namespace=whatsapp ``

Response:

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

We can now pick up a sticker pack ID and retrieve stickers indexes:

`` GET https://api.nexmo.com/v0.1/whatsapp-manager/deployments/aaaaaaaa-bbbb-cccc-dddd-0123456789ab/stickerpacks/whatsapp-komo/stickers?namespace=whatsapp ``

Response:

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

We can now pick up a sticker index and retrieve a sticker ID:

``GET https://api.nexmo.com/v0.1/whatsapp-manager/deployments/aaaaaaaa-bbbb-cccc-dddd-0123456789ab/stickerpacks/whatsapp-komo/stickers/0?namespace=whatsapp``

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

The property ``id`` contains the value we need to provide in a Messages API request payload; in this case it's ``13aaecab-2485-4255-a0a7-97a2be6906b9``.

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
