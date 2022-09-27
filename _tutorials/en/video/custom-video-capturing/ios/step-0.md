---
title: Getting Started
description: Add custom video capturing to your application using the Vonage Video API.
product: video
---

## Overview

This tutorial walks through the steps required to make minor modifications to the video renderer used by an OTPublisher object. You can also use the same techniques to modify the video renderer used by an OTSubscriber object (though this example only illustrates a custom renderer for a publisher).

## Setting Up Your Project

The code for this section is in the **Basic Video Renderer** project of the [opentok-ios-sdk-samples repo](https://github.com/opentok/opentok-ios-sdk-samples), so if you haven't already, you'll need to clone the repo into a local directory — **this can be done using the command line**:

```sh
git clone https://github.com/opentok/opentok-ios-sdk-samples.git
```

Change directory to the Basic Video Renderer project:

```sh
cd opentok-ios-sdk-samples/Basic-Video-Renderer
```

Then install the Vonage Video dependency:

```sh
pod install
```

Open the project in Xcode to follow along.
