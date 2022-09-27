---
title: Adding the Vonage Video library
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Adding the Vonage Video library

Follow the steps below to use CocoaPods to add the Vonage Video library and its dependencies to your app. If you would prefer not to use CocoaPods, follow [these instructions for using the SDK](/video/client-sdks/ios/overview).

1. In the Terminal, navigate to the root directory of your project and enter the following:

```
pod init
```

This creates a Podfile at the root of your project directory.

2. Edit the Podfile and add the following line after the comment that says `# Pods for [YourProjectName]` (The podfile will not be visible in your XCode project, so you will need to open it from the project folder directly):

```
pod 'OpenTok'
```

3. Save changes to the Podfile.

4. In the Terminal, in your project root directory type:

```
pod install
```

5. Close your project in Xcode. Then reopen your project by double-clicking the new .xcworkspace file in the Finder (in the root directory of your project).

For camera and microphone access you need to modify the Info.plist file:

1. In the left hand navigator panel in Xcode, click the project file (with the name of your project) to open the center project panel. To the left of the **General** tab in the project panel, you should see your project name. If the name is something different from your project (such as [YourProjectName]Tests), click on it and set the target to your project name.

2. Inside the panel, switch to the Info tab.

3. Expand the Custom iOS Target Properties section if it’s collapsed

4. Mouse over any key and click the + button to add a new key. Add a `Privacy - Camera Usage Description` key and assign it the following string:

```
$(PRODUCT_NAME) uses the camera.
```

Then click the + button to add a new `Privacy - Microphone Usage Description` key and assign it the following string:

```
$(PRODUCT_NAME) uses the microphone.
```

The app displays these strings when the application first accesses the camera and microphone. (These security features were added in iOS 10.)

Add the Vonage Video library to the view controller.

* In Xcode, open the ViewController.m file and, at the beginning of the file, add a line to import the Vonage Video library:

```objc
#import "ViewController.h"
#import <OpenTok/OpenTok.h>
```
