---
title: Linux
description: Learn about the Linux SDK, which makes it easy to use many of Vonage Video's REST API's functionality. Use the SDK to generate sessions and tokens, and more.
product: video
---

# Vonage Video Linux SDK

Apps written with the Vonage Video Linux SDK 2.23.0 can interoperate with Vonage Video apps
written with version 2.21+ of the Vonage Video client SDKs:

* OpenTok.js (Web)
* Android SDK
* iOS SDK
* Windows SDK

The Vonage Video Linux SDK supports applications written in C/C++.

> Important: Version 2.23.0 of the SDK adds support for Debian 11, and removes support for Debian 9.

## System requirements

The Linux SDK works on desktops and laptops running Debian 10 and 11
(amd64). In addition to a Debian package, we provide tgz packages for development
on other platforms and architectures such as armv7 and arm64. However, Vonage
Support staff can only diagnose and troubleshoot issues that are reproducible on
desktops or laptops running Debian (amd64).

## Using the SDK

### Debian package

The Vonage Video Linux SDK for x86_64 (adm64) architecture is available as a Debian
package. For Debian we support 10 (buster) and 11 (bullseye). We maintain
our own Debian repository on packagecloud. For Debian 10, follow these steps
to install the packages from our repository.

* Add packagecloud repository:

  ```bash
  curl -s https://packagecloud.io/install/repositories/tokbox/debian/script.deb.sh | sudo bash
  ```

* Install the Vonage Video Linux SDK packages.

  ```bash
  sudo apt-get install libopentok-dev
  ```

### `tgz` packages

The Vonage Video Linux SDK for armv7 and arm64 architectures is available as a `tgz`
package via a direct download in the Vonage Video developer center. There is also a
package for x86_64.

* For x86_64 architecture find the `tgz` package at https://tokbox.com/downloads/libopentok_linux_llvm_x86_64-2.23.0

* For armv7 architecture find the `tgz` package at https://tokbox.com/downloads/libopentok_linux_llvm_armv7-2.23.0

* For arm64 architecture find the `tgz` package at https://tokbox.com/downloads/libopentok_linux_llvm_arm64-2.23.0

You can download any of those packages and use them in your applications.

After extracting the packages the folder with the contents contains a handy
`CMakeLists.txt` file the developer can use if `CMake` is used in the
application. The developer would need to add it via the `ADD_SUBDIRECTORY()`
command, add `$<TARGET_PROPERTY:libopentok,INTERFACE_INCLUDE_DIRECTORIES>` to the
list of include folders with the `INCLUDE_DIRECTORIES()` command and finally add
`libopentok` to the list of target link libraries.

```c
  ADD_SUBDIRECTORY(<absolute-path-to-package-folder> ${CMAKE_CURRENT_BINARY_DIR}/libopentok)

  # ...

  INCLUDE_DIRECTORIES(<other-include-directories> $<TARGET_PROPERTY:libopentok,INTERFACE_INCLUDE_DIRECTORIES>)

  # ...

  ADD_EXECUTABLE(${PROJECT_NAME} <sources>)
  TARGET_LINK_LIBRARIES(${PROJECT_NAME} <other-libraries> libopentok)
```

## Sample Applications

For sample code, go to the
[vonage-video-linux-sdk-samples repo](https://github.com/opentok/opentok-linux-sdk-samples)
at GitHub.
