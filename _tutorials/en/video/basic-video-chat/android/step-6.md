---
title: Adjusting the sample app UI
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Adjusting the sample app UI

The Vonage Video Android SDK exposes videos you publish and subscribe to as View objects. You can add these as children of `ViewGroup` objects in your app. This sample app will use `FrameLayout` objects (which extend `ViewGroup`) as containers for the publisher and subscriber views:

1. In Android Studio, open the `app/res/layout/activity_main.xml` file. Click the "Text" tab at the bottom of the editor to display the XML code for the file.

2. Replace the file contents with the following code:

```xml
<?xml version="1.0" encoding="utf-8"?>
    <androidx.constraintlayout.widget.ConstraintLayout xmlns:android="http://schemas.android.com/apk/res/android"
            xmlns:app="http://schemas.android.com/apk/res-auto"
            xmlns:tools="http://schemas.android.com/tools"
            android:layout_width="match_parent"
            android:layout_height="match_parent"
            tools:context=".MainActivity">
    
        <FrameLayout
                android:layout_width="fill_parent"
                android:layout_height="fill_parent"
                app:layout_constraintBottom_toBottomOf="parent"
                app:layout_constraintEnd_toEndOf="parent"
                app:layout_constraintStart_toStartOf="parent"
                app:layout_constraintTop_toTopOf="parent">
    
            <FrameLayout
                    android:id="@+id/subscriber_container"
                    android:layout_width="fill_parent"
                    android:layout_height="fill_parent" />
    
            <FrameLayout
                    android:id="@+id/publisher_container"
                    android:layout_width="90dp"
                    android:layout_height="120dp"
                    android:layout_gravity="bottom|end"
                    android:layout_marginEnd="16dp"
                    android:layout_marginRight="16dp"
                    android:layout_marginBottom="16dp"
                    android:background="#CCCCCC"
                    android:padding="2dp" />
    
        </FrameLayout>
    
    </androidx.constraintlayout.widget.ConstraintLayout>
```

Be sure to replace the entire content of the `<TextView>` element (through the closing `/>` tag).

3. Now declare `publisherViewContainer` and `subscriberViewContainer` as properties of the MainActivity class (right after the declaration for the `session` property):

```java
private FrameLayout publisherViewContainer;
private FrameLayout subscriberViewContainer;
```

4. Finally, in the existing `onCreate()` method, initialize these layout view objects by adding the following lines of code under the `setContentView()` method call:

```java
publisherViewContainer = findViewById(R.id.publisher_container);
subscriberViewContainer = findViewById(R.id.subscriber_container);
```

At this point, your `onCreate()` method should look like this:

```java
@Override
protected void onCreate(Bundle savedInstanceState) {

    super.onCreate(savedInstanceState);
    setContentView(R.layout.activity_main);

    publisherViewContainer = findViewById(R.id.publisher_container);
    subscriberViewContainer = findViewById(R.id.subscriber_container);

    requestPermissions();
}
```

The steps above merely set up a sample layout for this app. Your own app can add publisher and subscriber views as children of other `ViewGroup` objects
