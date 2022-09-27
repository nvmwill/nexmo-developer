---
title: Adding the Vonage Video Windows SDK
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Adding the Vonage Video Windows SDK

Use NuGet to load the Vonage Video Windows SDK, using one of the following methods:

* In Visual Studio, from the **Tools** menu select **NuGet Package Manager** > **Manage NuGet Packages for Solution**, and then search for `OpenTok.Client`. Assign the OpenTok.Client package to the Project you are building.
* In the Visual Studio Package Manager Console enter the following command:

```
Install-Package OpenTok.Client
```

* Use the .NET Core command line tools to install the OpenTok package. Run the following command from within your project directory:

```
dotnet add package OpenTok.Client
```

Add the Vonage Video Windows classes to the application — in Visual Studio, open the **MainWindow.xaml.cs** file. And add the following statements:

```csharp
using OpenTok; 
```

This imports the classes of the Vonage Video Windows SDK that the app will use.
