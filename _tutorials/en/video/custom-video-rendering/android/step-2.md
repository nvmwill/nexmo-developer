---
title: Exploring the Code
description: Add custom video rendering to your application using the Vonage Video API.
product: video
---

## Exploring the Code

In this example, the app uses a custom video renderer to display a inverted color version of the video.

`InvertedColorsVideoRenderer` is a custom class that extends the `BaseVideoRenderer` class (defined in the Vonage Video Android SDK). The `BaseVideoRenderer` class lets you define a custom video renderer to be used by a Vonage Video publisher or subscriber:

```java
subscriber = new Subscriber.Builder(this, stream)
    .renderer(new InvertedColorsVideoRenderer(this))
    .build();


publisher = new Publisher.Builder(MainActivity.this)
    .renderer(new InvertedColorsVideoRenderer(MainActivity.this))
    .build();
```

The `InvertedColorsVideoRenderer()` constructor sets a `renderer` property to a `GLSurfaceView` object. The app uses this object to display the video using OpenGL ES 2.0. The renderer for this `GLSurfaceView` object is set to a `MyRenderer` object. `MyRenderer` is a custom class that extends `GLSurfaceView.Renderer`, and it is used to render the video to the `GLSurfaceView` object:

```java
public InvertedColorsVideoRenderer(Context context) {
    view = new GLSurfaceView(context);
    view.setEGLContextClientVersion(2);

    renderer = new MyRenderer();
    view.setRenderer(renderer);

    view.setRenderMode(GLSurfaceView.RENDERMODE_WHEN_DIRTY);
}
```

The `onFrame()` method of the video renderer is inherited from the `BaseVideoRenderer` class. The `BaseVideoRenderer.onFrame()` method is called when the publisher (or subscriber) renders a video frame to the video renderer.

The `InvertedColorsVideoRenderer` implementation of this method, it takes the frame's image buffer ([YUV](https://en.wikipedia.org/wiki/YUV) representation of the frame), passes it to the `displayFrame` method of the `MyRenderer` object and calls the `requestRender()` method of the `GLSurfaceView` object:

```java
@Override
public void onFrame(Frame frame) {
    renderer.displayFrame(frame);
    view.requestRender();
}
```

To render the video frames, the renderer class uses OpenGL shaders. In this sample shader produces the inverted color effect, more precisely this is achieved by this line which is inside the `fragmentShaderCode` string:

```java
"y=1.0-1.1643*(y-0.0625);\n"
```
