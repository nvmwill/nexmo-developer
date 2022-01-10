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
<center><iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/v6k1FpbP2V4" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe></center>

