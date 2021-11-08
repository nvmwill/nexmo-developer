---
title: Call and Legs
description: A Call consists of one or more Legs.
navigation_weight: 5
---

# Leg

A Leg connects a [User](/voice/voice-api/concepts/user) with a [Conversation](/voice/voice-api/concepts/conversation) and enables voice to flow over a certain [Channel](/conversation/concepts/channel). Every time a Leg is created, it is assigned a unique ID.

The following diagram shows a Call with two Legs:

![Conversation](/images/conversation-api/call-forward-conversation.png)

# Call

A call consists of one or more Legs.

For example, consider a call being made from a mobile phone to a Vonage Number, and you want the call to be forwarded to another phone. This communication requires a [Conversation](/voice/voice-api/concepts/conversation) to be created. This Conversation is identified by a unique ID with the form `CON-<uuid>`. Within the Conversation a Leg will be created from the first phone to Vonage. This Leg is identified by a unique ID. When the call is forwarded, another Leg is created, with its own unique ID, within the existing Conversation. The Call therefore is made up of one Conversation and two Legs in this case.

Calls with a single leg are created when only a single mobile phone and Vonage number are the only participants in a call. A common use case for this is using the `record` action to [build a voicemail system](/voice/voice-api/code-snippets/record-a-message). When the user dials a Vonage number, a [Conversation](/voice/voice-api/concepts/conversation) is created, and a leg created from the user's phone to Vonage. When the user hangs up, the call ends. This Call is comprised of one Conversation and one Leg.
