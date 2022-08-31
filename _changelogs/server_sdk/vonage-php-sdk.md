---
version: '3.1.3'
release: '30 Aug 2022'
---
# [Vonage PHP SDK](https://github.com/Vonage/vonage-php-sdk-core)

---

## 3.1.3
### 30 Aug 2022

## Description

This release adds better support for developers needing to extract information back from the Verify API in a more explicit way. When getting an error back from Verify, you can now use `getNetworkId()` and `getRequestId()` if they are present.

## What's Changed
* Verify Blocked Number Handling by @SecondeJK in https://github.com/Vonage/vonage-php-sdk-core/pull/327
**Full Changelog**: https://github.com/Vonage/vonage-php-sdk-core/compare/3.1.2...3.1.3

---

## 3.1.2
### 24 Aug 2022

## What's Changed
* Added support for magic serialization methods by @dragonmantank in https://github.com/Vonage/vonage-php-sdk-core/pull/326

** Please note that while this fixes runtime on PHP8.1, Serialization in the Verification Client is still marked as deprecated, to be removed by v4 of the library.

**Full Changelog**: https://github.com/Vonage/vonage-php-sdk-core/compare/3.1.1...3.1.2

---

## 3.1.1
### 19 Aug 2022

## Description 

This minor release fixes a bug in Messages v1.

## What's Changed
* Update .gitattributes by @ankurk91 in https://github.com/Vonage/vonage-php-sdk-core/pull/321
* #322 fix parameters format by @thiagolcks in https://github.com/Vonage/vonage-php-sdk-core/pull/323

## New Contributors
* @thiagolcks made their first contribution in https://github.com/Vonage/vonage-php-sdk-core/pull/323

**Full Changelog**: https://github.com/Vonage/vonage-php-sdk-core/compare/3.1.0...3.1.1