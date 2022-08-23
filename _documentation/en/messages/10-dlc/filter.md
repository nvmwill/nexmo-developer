---
title: 10 DLC Filtering Results
meta_title: 10 DLC Filtering Results 
description: Provides and in-depth explanation on how to filter and fetch results containing specific keyword combinations. 
navigation_weight: 3
---

# Overview

All 10 DLC GET [API endpoints](/api/10dlc) allow you to narrow down your results using filters.

For example, instead of getting the list of all brands, you might be interested in brands within the **REAL_ESTATE** vertical. In this case, you can apply a filter to return **REAL_ESTATE** related brands only 

## Request Structure
Filters are passed to the endpoint as query parameters. In your query, you use the keyword `filter` as the key followed by the query in the form of a JSON object.

For example:

```sh
https://api-eu.vonage.com/v1/10dlc/brands/:brand_id/campaigns?filter=[[{"field":"vertical","type":"equal","value":"REAL_ESTATE"}]]
```

### Filter Object 
A filter object is a JSON object containing a filter query. A filter object contains three key/value pairs:

```json
[
   [
      {
         "field":"vertical",
         "type":"equal",
         "value":"REAL_ESTATE"
      }
   ]
]
```

**Field**: is the name of the field whose value you will like to filter by.

**Type**: is the matching condition you will like to apply in the filter search. There are three options available **equal** for getting exact matches, **notequal** for fetching all non-matching values, and **regexp** to filter based on a pattern.

**Value**: is the value you will like to filter by. 

### Filtering Rules
You can have a maximum of **three [filter objects](#filter-object)** in a query. This means you can find results that match a maximum of three fields. Filter objects can also be paired up in different ways.

For example, you can fetch results that match one request object **OR** another. Also, results that match one request object **AND** another.


Let's take the case where we will like to fetch brands where the `vertical` is either **REAL_ESTATE** OR **BANKING** AND where the id of the reseller(`reseller_id`) involved is **12345**.

Expressed as a logical expression we have the following: `( (vertical == REAL_ESTATE OR vertical == BANKING) AND (reseller_id == 12345) )`

When it comes to filter queries, **OR** expressions are represented using the square bracket `[]`. 
For example the following expression`(vertical == REAL_ESTATE OR vertical == BANKING)` becomes `[ [{filter object 1}, {filter object 2}] ]`.

The inner square bracket denotes that you will like to fetch results matching either *filter object 1* **OR** *filter object 2*.

> The outer square bracket marks the start of a filter query and is mandatory and required for all filter queries.

### Examples of filter rules
1. Match ***filter object 1***; `[ [{filter object 1}] ]`.
2. Match ***filter object 1*** **AND** ***filter object 2***; `[ [{filter object 1}] [{filter object 2}] ]`
3. Match ***filter object 1*** **OR** ***filter object 2***;  `[ [{filter object 1},{filter object 2}] ]`
4. Match (***filter object 1*** **OR** ***filter object 2***) **AND** ***filter object 3*** ; `[ [{filter object 1},{filter object 2}], [{filter object 3}] ]`.

> **NB:** Filter objects should always be within a square bracket even if it's a single object. A good example is the ***filter object 3*** in example 4 above.

Also, further expanding the filter objects in example 4. we get the following filter query:

```json
[
   [
      {
         "field":"vertical",
         "type":"equal",
         "value":"REAL_ESTATE"
      },
      {
         "field":"vertical",
         "type":"equal",
         "value":"BANKING"
      }
   ],
   [{
      "field":"reseller_id",
      "type":"equal",
      "value":"12345"
   }]
]
```