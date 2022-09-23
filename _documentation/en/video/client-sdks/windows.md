---
title: Windows
description: Use the Vonage Video Windows library to add Vonage Video API-powered WebRTC video to Windows apps. Use video, voice, messaging, and more in your Windows application with our SDK.
keywords: Vonage, Vonage Video API, Vonage Video for Windows, mobile, mobile WebRTC, interoperability, Windows, WebRTC, Real-time communications, Developer, Developer Center, SDKs, tutorials, WebRTC tutorials, Developer Guides, Components
product: video
---

# Vonage Video Windows SDK

The Vonage Video Windows SDK lets you use Vonage Video API-powered video sessions in Windows apps.

Apps written with the Vonage Video Windows SDK 2.23.2 can interoperate with Vonage Video apps written with version 2.21+ of the Vonage Video client SDKs:

* OpenTok.js (Web)
* Android SDK
* iOS SDK
* Linux SDK

## Using the SDK

The Vonage Video Windows SDK is hosted on NuGet. Install the package in one of the following ways:

* Open the Visual Studio *Manage NuGet Packages* UI and search for `OpenTok.Client`.
* Open the [Package Manager Console](https://docs.microsoft.com/en-us/nuget/tools/package-manager-console) in Visual Studio and enter the following command:

```c#
Install-Package OpenTok.Client
```

* Using the [.NET Core command line tools](https://docs.microsoft.com/en-us/dotnet/articles/core/tools/), run the following command from within your project directory: 

```c#
dotnet add package OpenTok.Client
```

When creating an installer for your application, add [Visual C++ Redistributable for Visual Studio 2015](https://www.microsoft.com/en-us/download/details.aspx?id=48145) as an installer package.

Depending on the architecture of your application, you could use either the x86 version or the x64 version, but we recommend using both to be safe.

The Windows SDK requires .NET version 4.0 and makes use of Windows Presentation Framework. The Vonage Video Windows SDK supports applications written in C#.

## System requirements

The Vonage Video Windows SDK is expected to work on desktops, laptops, and tablets from Lenovo, HP, Dell, and ASUS.

The Vonage Video Windows SDK is supported on the x86 and x64 architectures. The supported operating system versions are:

* Windows 7
* Windows 8.x
* Windows 10
* Windows 11 (only Windows SDK 2.22.0+ versions) Version 2.23.0 of the SDK adds support for [Universal Windows Platform](https://docs.microsoft.com/en-us/windows/uwp/get-started/your-first-app) in desktop applications.

## Sample Applications

For sample code, go to the [vonage-video-windows-sdk-samples repo](https://github.com/opentok/opentok-windows-sdk-samples) at GitHub.

## Documentation

See the [Vonage Video Windows SDK API reference](/sdk/stitch/video-windows-reference/annotated.html) and the [Vonage Video developer guides](/video/guides/create-session).

<!-- OPT-TODO: ## More information

For a list of new features and known issues, see the [release notes](/developer/sdks/windows/release-notes.html). -->
