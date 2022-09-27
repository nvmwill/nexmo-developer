---
title:  Adding the Vonage Video Android SDK
description: Learn the basic concepts of the Vonage Video API platform, including how users can communicate through video, voice, and messaging. Explore a basic Vonage Video API flow.
product: video
--- 

## Adding the Vonage Video Android SDK

The app uses Maven to load the Vonage Video Android SDK:

1. Edit the build.gradle for your project (at your project's root) and add the following code snippet to the `allprojects/repositories` section:

```groovy
mavenCentral()
```

At this point the build.gradle file should look like this:

```groovy
buildscript {
    repositories {
        google()
        jcenter()
    }
    dependencies {
        classpath 'com.android.tools.build:gradle:4.1.2'
    // NOTE: Do not place your application dependencies here; they belong
    // in the individual module build.gradle files
    }
}

allprojects {
    repositories {
        google()
        jcenter()
        mavenCentral()
    }
}

task clean(type: Delete) {
    delete rootProject.buildDir
}
```

2. Modify build.gradle for your module (the app/build.gradle file) and add the following code snippet to the dependencies section:

```groovy
implementation 'com.opentok.android:opentok-android-sdk:2.22.0'
```

When using Vonage Video Android 2.16.0 or above, you will need to add the following to to the `android` section of the app's build.gradle file as well:

```groovy
compileOptions {
    sourceCompatibility JavaVersion.VERSION_1_8
    targetCompatibility JavaVersion.VERSION_1_8
}
```

At this point the build.gradle file for your module should look like this:

```groovy
apply plugin: 'com.android.application'

android {
    compileSdkVersion 32

    defaultConfig {
        applicationId "com.example.myapplication"
        minSdkVersion 16
        targetSdkVersion 32
        versionCode 1
        versionName "1.0"
        testInstrumentationRunner "androidx.test.runner.AndroidJUnitRunner"
    }
    buildTypes {
        release {
            minifyEnabled false
            proguardFiles getDefaultProguardFile('proguard-android-optimize.txt'), 'proguard-rules.pro'
        }
    }
}

dependencies {
    implementation fileTree(dir: 'libs', include: ['*.jar'])
    implementation 'androidx.appcompat:appcompat:1.0.2'
    implementation 'androidx.constraintlayout:constraintlayout:1.1.3'
    implementation 'androidx.annotation:annotation:1.1.0'
    implementation 'com.opentok.android:opentok-android-sdk:2.22.2'
    testImplementation 'junit:junit:4.12'
    androidTestImplementation 'androidx.test:runner:1.2.0'
    androidTestImplementation 'androidx.test.espresso:espresso-core:3.2.0'
}
```

3. Sync your project.
