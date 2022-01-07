---
title: FreePBX
description: How to setup Vonage SIP with FreePBX
---

# FreePBX

Below we provide example configurations for using Vonage's SIP service with [FreePBX](http://www.freepbx.org).

## Inbound configuration

```text
host=5.10.112.121
type=friend
insecure=port,invite
;Add your codec list here.
; Note: Use "ulaw" for US only, "alaw" for the rest of the world.
allow=ulaw,alaw,g729
dtmfmode=rfc2833

host=5.10.112.122
type=friend
insecure=port,invite
;Add your codec list here.
; Note: Use "ulaw" for US only, "alaw" for the rest of the world.
allow=ulaw,alaw,g729
dtmfmode=rfc2833

host=119.81.44.6
type=friend
insecure=port,invite
;Add your codec list here.
; Note: Use "ulaw" for US only, "alaw" for the rest of the world.
allow=ulaw,alaw,g729
dtmfmode=rfc2833

host=119.81.44.7
type=friend
insecure=port,invite
;Add your codec list here.
; Note: Use "ulaw" for US only, "alaw" for the rest of the world.
allow=ulaw,alaw,g729
dtmfmode=rfc2833

host=169.60.141.29
type=friend
insecure=port,invite
;Add your codec list here.
; Note: Use "ulaw" for US only, "alaw" for the rest of the world.
allow=ulaw,alaw,g729
dtmfmode=rfc2833

host=169.60.141.30
type=friend
insecure=port,invite
;Add your codec list here.
; Note: Use "ulaw" for US only, "alaw" for the rest of the world.
allow=ulaw,alaw,g729
dtmfmode=rfc2833
```

## Outbound configuration

```text
host=sip.nexmo.com
  type=friend
  insecure=port,invite
  qualify=yes
  ;Add your codec list here.
  ;Note: Use "ulaw" for US only, "alaw" for the rest of the world.
  allow=ulaw,alaw,g729
  dtmfmode=rfc2833

  username=<key>
  fromuser=<long_virtual_number>
  secret=<secret>

  Register String
  <key>:<secret>@sip.nexmo.com
```

## PJSIP configuration

For PJSIP configuration use the following information:

| Configuration item | Value |
|----|----|
| Authentication | Outbound |
| Registration | None |
| SIP Server | sip.nexmo.com |
| Username | API Key |
| Secret | API Secret |
| From Domain | sip.nexmo.com |
| DTMF Mode | RFC4733 |
| Codecs | ulaw, alaw, g729 |

## PSIP

Below you can learn how to integrate Vonage SIP Trunking with Genesys Contact Center in 10 minutes.
[![Learn how to integrate Vonage SIP Trunking with Genesys Contact Center in 10 minutes](https://user-images.githubusercontent.com/9335603/148577543-206547e7-68ba-402b-b2ac-656bdb5ae8f1.png)](https://www.youtube.com/watch?v=v6k1FpbP2V4)

