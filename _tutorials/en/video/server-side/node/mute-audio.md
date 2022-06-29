---
title: Forcing clients in a session mute published audio
description: Forcing clients in a session mute published audio
---

### Forcing clients in a session mute published audio

You can force the publisher of a specific stream to stop publishing audio using the `Opentok.forceMuteStream(sessionId)` method.

You can force the publisher of all streams in a session (except for an optional list of streams) to stop publishing audio using the `Opentok.forceMuteAll()` method. You can then disable the mute state of the session by calling the `Opentok.disableForceMute()` method.

In the next section you will learn how to [send and handle signals](/video/tutorials/server-side-setup/video/server-side/node/sending-signals/node).