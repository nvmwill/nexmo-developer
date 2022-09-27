---
title: Adjusting the Sample App UI
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Adjusting the Sample App UI

By default, the Vonage Video Windows SDK renders videos you publish and subscribe to using the the VideoRenderer class (defined in the Vonage Video Windows SDK). This class renders videos to an Windows Presentation Framework control.

For this sample app, define the target controls in the application's MainWindow.xaml file. In Visual Studio, open that file and edit its XML to add a reference to the `OpenTok` namespace and to add two `VideoRenderer` objects to the main `Grid` control of the application:

```csharp
<Window x:Class="BasicVideoChat.MainWindow"
        xmlns="http://schemas.microsoft.com/winfx/2006/xaml/presentation"
        xmlns:x="http://schemas.microsoft.com/winfx/2006/xaml"
        xmlns:d="http://schemas.microsoft.com/expression/blend/2008"
        xmlns:mc="http://schemas.openxmlformats.org/markup-compatibility/2006"
        xmlns:local="clr-namespace:BasicVideoChat"
        xmlns:OpenTok="clr-namespace:OpenTok;assembly=WPFVideoRenderer"
        mc:Ignorable="d"
        Title="MainWindow" Height="960" Width="640">
    <Grid>
        <OpenTok:VideoRenderer x:Name="PublisherVideo" HorizontalAlignment="Center" Height="480" VerticalAlignment="Top" Width="640">
        </OpenTok:VideoRenderer>
        <OpenTok:VideoRenderer x:Name="SubscriberVideo" HorizontalAlignment="Center" Height="480" VerticalAlignment="Bottom" Width="640">
        </OpenTok:VideoRenderer>
    </Grid>
</Window>
```
