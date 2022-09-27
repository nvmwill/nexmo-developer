---
title: Running the App
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Running the App

Now that you're code is complete, you can run the app in the XCode emulator. This will create a simulated publisher video — since the emulator cannot access your webcam, the publisher video will display a spinning teapot graphic instead of your camera feed.

To add a second publisher (which will display as a subscriber in your emulator), either run the app a second time in a connected iOS device or use the [Vonage Video Playground](https://tokbox.com/developer/tools/playground/) to connect to the session in a supported web browser by following the steps below:

1. Go to [Vonage Video Playground](https://tokbox.com/developer/tools/playground/) (must be logged into your [Account](https://www.tokbox.com/account/user/signup))
2. Select the **Join existing session** tab
3. Copy the session ID you used in your ViewController.swift file and paste it in **Session ID** input field
4. Click **Join Session**
5. On the next screen, click **Connect**, then click **Publish Stream**
6. You can adjust the Publisher options (not required), then click **Continue** to connect and begin publishing and subscribing

At this point you should see the stream being published from your webcam as well as the stream being published by the emulator. Returning to the emulator, you should also see the new publisher displayed on the emulated screen.
