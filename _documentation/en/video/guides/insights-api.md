---
title: Insights API
description: Make API calls to your get data about your projects that use the Vonage Video API
product: video
navigation-weight: 
---

# Insights Dashboard & API

The Vonage Video Insights API is a [GraphQL API](https://graphql.org/graphql-js/). You can use the Insights API and the Insights Dashboard to obtain information about your Vonage Video projects and sessions.

* [The Insights Dashboard](#the-insights-dashboard)
* [API Base URL and Authentication](#insights-api-base-url-and-authentication)
* [Exploring the API Schema With GraphiQL](#exploring-the-api-schema-with-graphiql)
* [Obtaining Project Data](#obtaining-project-data)
* [Obtaining Session Data (Advanced Insights)](#obtaining-session-data-advanced-insights-)
* [Response Objects](#response-objects)
* [Using Pagination in Queries](#using-pagination-in-queries)
* [Data retention and latency](#data-retention-and-latency)
* [Error codes](#error-codes)
* [Making POST Requests to the Vonage Video GraphQL API](#making-post-requests-to-the-vonage-video-graphql-api)
* [Sample App and More Sample Queries](#sample-app-and-more-sample-queries)

## The Insights Dashboard

**Note:** Please click [here](#data-retention-and-latency) for information on data retention and latency.

The Insights Dashboard widget provides data at the project level. You can navigate to it by logging into your [Vonage Video API account](https://tokbox.com/account) and selecting an Vonage Video project. It contains three tabs: Usage, Quality, and Errors, as well as filters for date range, location, and endpoints.

The Usage tab shows different types of minutes that the project generated. You can see a map of where minutes were generated and stack multiple filters as you please.

The Quality tab provides a histogram of video bitrate and latency for streams within the project.

The Errors tab provides the error rate of connections, publishers, and subscribers.

Each tab's data is filtered by the selections made at the top.

## Insights API, Base URL, and Authentication

The Insights API is a [GraphQL API](https://graphql.org/) that allows you to explore your sessions' metadata at the project and session level. GraphQL is an alternative to the typical REST approach of accessing data over HTTP. It was developed by Facebook in 2012 and open-sourced in 2015. Check out [GraphQL's getting started guide](https://graphql.org/graphql-js/) to learn more.

The base URL for the API is:

```
    https://insights.opentok.com/graphql
```

All requests are made as [HTTP POST](/api/video).

## Exploring the API Schema With GraphiQL

Navigating to [https://insights.opentok.com/](https://insights.opentok.com/) using your browser takes you to the Insights instance of [GraphiQL](https://github.com/graphql/graphiql), a tool that lets you explore the GraphQL API schema. Because the tool can make API requests, you must be logged in to use it.

There are five window panes in this tool:

* On the top-right corner of the tool, you will see a **Docs** button. Clicking it opens up a pane containing the schema's documentation. Each field and object type in the documentation contains a description. Click through this to explore the schema.
* On the left side of the page is the **Query** pane. In this pane you can construct queries to run against the API. Going back and forth between the **Docs** pane and the **Query** pane allows you to construct the precise query you need for only the information you require. Because you are logged in, authentication for making queries is taken care of for you.
* Below the **Query** pane is the **Query Variables** pane. Though not required, you can use this to specify variables for your query. For example, you can define the following variables in this pane:

```json
{
    "PROJECT_ID": 100,
    "START_TIME": "2019-01-01T08:00:00.000Z"
}
```

Then, in the Query pane, reference any declared variables:

```javascript
query ($PROJECT_ID: Int!, $START_TIME: Date!) {
    project(projectId: $PROJECT_ID) {
      projectData(
      start: $START_TIME,
      interval: AUTO,
      sdkType: [JS, IOS, ANDROID],
      groupBy: [SDK_TYPE]
          ) {
        resources {
          sdkType
          intervalStart
          intervalEnd
          usage {
            streamedPublishedMinutes
            streamedSubscribedMinutes
          }
        }
      }
    }
}
```

* To the right of the **Query** pane is the **Response** pane. Clicking the Run button in the tool will run the query in the **Query** pane, and the **Response** pane displays the results. This is the same response that you would get if you made the query programatically.
* Finally, click the **History** button above the query pane to view history of your recent queries. Clicking one of the elements displayed populates the **Query** pane and the **Query Variables** pane with that data.

## Obtaining Project Data

The `projectData` field of the project object returns the `ProjectData` object, which provides aggregate report data at the project level.

You must include a `start` date for the query. This value can be an ISO-8601 format string (such as `"2019-10-15T23:43:34.023Z"`) or an Int value representing an epoch timestamp. Integers of 10 digits or less represent epoch seconds. Integers of more than 10 digits represent epoch milliseconds.

The `ProjectData` object includes a `resources` property, which is an array of `Metric` objects. You have the option to filter and group data by the SDK type, SDK version, country, region, browser, or browser version. Additionally, you have the option to change the `Interval` in which you want to segment the data (either `DAILY`, `WEEKLY`, or `MONTHLY`). Note that if you set the `Interval`, you will only see time intervals that have data. Currently, all data under this object is updated nightly, so you won't see live changes to the data.

**Note:** Region, SDK, and Browser filtering is not available for Participant and Archiving Minutes.

The `Metric` object includes information on the country, region (US state, if applicable), Vonage Video SDK type and version, as well browser and browser version (if applicable) for the results. The `Metric` object also includes the following properties:

* `usage` — Information on stream published minutes, stream subscribed minutes, archive usage, broadcast usage, SIP usage, and usage separated by publisher tiers
* `quality` — Information about video quality
* `errors` — The failure rates for connecting to sessions, publishing, and subscribing

The following query requests ProjectData results that include streamed published minutes and streamed subscribed minutes for clients using the Vonage Video JavaScript, Android, and iOS SDKs:

```javascript
{
  project(projectId: 12345678) {
    projectData(
      start: "2019-05-01T07:00:00.000Z",
      interval: MONTHLY,
      sdkType: [JS, ANDROID, IOS],
      groupBy: SDK_TYPE
    ) {
      resources {
        intervalStart,
        intervalEnd,
        usage {
          streamedPublishedMinutes,
          streamedSubscribedMinutes
        }
      }
    }
  }
}
```

Note that by setting the `start` parameter to 0, you will query for results starting with the earliest records available.

## Obtaining Session Data (Advanced Insights)

**Note:** Please click [here](#data-retention-and-latency) for information on data retention and latency.

> ***Important:*** Session data queries are available to [Advanced Insights customers](https://www.vonage.com/communications-apis/video/features/advanced-insights/) only.

The `sessionData` field of the `project` object returns the `SessionData` object. This object includes two fields: `sessions` and `sessionSummaries`.

### Session detail information

The `sessions` field returns a `Sessions` object. Pass in the session IDs as the `sessionIds` argument (an array of matching strings). The `Sessions` object includes a `resources` property, which is an array of `Session` objects. The `Session` object has the following properties:

* `mediaMode` — The media mode for the session. This is `"routed"` for sessions routed through the Vonage Video Media Router or `"relayed"` for direct peer-to-peer streaming.
* `publisherMinutes` — The total number of minutes streamed for all publishers in the session. Note that including this field will slow down query results.
* `subscriberMinutes` — The total number of minutes streamed for all subscribers in the session. Note that including this field will slow down query results.
* `participantMinutes` — The total number of minutes separated by publisher tiers across all meetings in the session.
* `meetings` — An array of `Meeting` objects. An Vonage Video session can have multiple _meetings_. When the first client connects to the session, the first meeting starts. The meeting ends when there are no connections in the session for at least 10 minutes. When a client connects again, a new meeting starts. Each Meeting object includes the following properties:
  * `subscriberMinutes` — The total number of subscriber minutes in the meeting.
  * `publisherMinutes` — The total number of publisher minutes in the meeting.
  * `participantMinutes` — The total number of minutes separated by publisher tiers in the meeting.
  * `connections` — An array of Connection objects defining each client connected to the session (during the meeting). Properties of the Connection object include information about the Vonage Video client SDK used, the browser used (for web clients), information on publishers and subscribers, and more.
  * `publishers` — An array of Publisher objects. Properties of the Publisher object include information about the publisher's stream, the subscribers to the stream, stream statistics, and more. (The stream statistics included with the Advanced Insights add-on. See [Getting stream statistics](#getting-stream-statistics).)
  * `subscribers` — Array of Subscriber objects, providing details about each subscriber. Properties of the Subscriber object include information about the subscribers stream, stream statistics, and more. (The stream statistics included with the Advanced Insights add-on. See [Getting stream statistics](#getting-stream-statistics).)
  * `createdAt` and `destroyedAt` — Timestamps for the start and end of the meeting.

**Note:** If all users are disconnected from a meeting and a new connection to the session is made within the 10 minutes, a new meeting will be created with the same meeting ID as the first meeting. However, if the new connection is made after 10 minutes, the new meeting will get a unique meeting ID.

#### Example session detail query

The following query requests some publisher details on two Vonage Video sessions:

```javascript
{
    project(projectId: 12345678) {
      sessionData {
            sessions(sessionIds: [
                "1_MX4xMDB-fjE1Mzg4NzA0MjExNDd-VjRuSWhpn4",
                "2_MX4xMDB-fjE1Mzg4NzA0OTQzOTN-RFFxeXfcn4"
            ]) {
                resources {
                    sessionId
                    meetings {
                        totalCount
                        resources {
                            createdAt
                            publisherMinutes
                            destroyedAt
                            publishers {
                                resources {
                                    createdAt
                                    destroyedAt
                                    connectionId
                                    stream {
                                      streamId
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    }    
}
```

#### Getting stream statistics

**Note:** Stream statistics is available to [Advanced Insights customers](https://www.vonage.com/communications-apis/video/features/advanced-insights/) only.

The `resources` property of the MeetingPublishers object is an array of Publisher objects. And the Publisher object includes PublisherStreamStatsCollection object. This object is a resource collection, and its `resources` property is an array of PublisherStats objects. Each PublisherStats includes stream statistics for the publisher taken periodically (every 30 seconds) during the course of the publisher's streaming. These statistics include data about the audio and video latency, audio and video bitrate, audio and video packet loss ratio, the video resolution, the audio and video codecs, and whether the stream included audio and video at the time of the stream statistics snapshot.

The following query requests the periodic audio and video bitrate statistics for publishers in an Vonage Video session:

```javascript
{
  project(projectId: 12345678) {
    sessionData {
      sessions(sessionIds: [
        "1_MX4xMDB-fjE1Mzg4NzA0MjExNDd-VjRuSWhpn4",
      ]) {
        resources {
          sessionId
          meetings {
            resources {
              createdAt
              publishers {
                resources {
                  createdAt
                  connectionId
                  stream {
                    streamId
                  }
                  streamStatsCollection {
                    resources {
                      createdAt
                      audioBitrateKbps
                      videoBitrateKbps
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
```

Similarly, the `resources` property of the MeetingSubscribers object is an array of Subscriber objects, and each of these include a SubscriberStreamStatsCollection resource collection, which includes similar stream statistics for a subscriber.

### Session Summary information

**Note:** Session Summary is available to [Advanced Insights customers](https://www.vonage.com/communications-apis/video/features/advanced-insights/) only.

The `sessionSummaries` field is an array of `SessionSummary` objects (one for each session matching the query). The SessionSummary object includes a `resources` property, which is an array of `MeetingSummary` objects (one for each meeting in the session). The `MeetingSummary` object includes information on the number of total and concurrent streams, connections, and subscribers in the meeting.

Both the `SessionSummary` object and `MeetingSummary` objects include `publisherMinutes`, `subscriberMinutes`, and `participantMinutes` properties. These report the total number of minutes streamed for all publishers and subscribers in the session or meeting. Including `participantMinutes` reports minutes separated by publisher tiers in the session or meeting. Note that including `publisherMinutes`, `subscriberMinutes`, or `participantMinutes` in a query will slow down results.

The following query requests partial `SessionSummary` results:

```javascript
{
     project(projectId: 12345678) {
         sessionData {
             sessionSummaries (
                 start: "2019-05-01T07:00:00.000Z",
             ) {
                 resources {
                     sessionId
                     meetings {
                         resources {
                             maxConcurrentStreams
                             maxConcurrentStreams
                             maxConcurrentSubscribers
                             totalStreams
                             totalConnections
                         }
                    }
                }
            }
        }
    }
}
```

## Response Objects

Response objects adhere to the GraphQL schema and are JSON-formatted, but they only include fields you specify in your requests. The \`curl\` example above will result in a response object like the following:

``` json
 {  
  "data":{  
    "project":{  
      "projectData":{  
        "resources":[  
          {  
            "usage":{  
              "streamedSubscribedMinutes":3189
            }
          }
        ]
      }
    }
  }
}
```

The easiest way to see a preview of what to expect is by adding different filters, groups, and fields to the [Insights GraphiQL Explorer](https://insights.opentok.com/), and observing the response.

## Using Pagination in Queries

Both the `projectData()` and `sessionData()` APIs accept pagination options for all the methods that return lists (arrays). All of these methods implement a `ResourceCollection` interface that contain the following optional properties:

* `first` (optional) — The number of entries to be returned by page. The limit is 10 for Meetings and 1000 for all other resource collections. The default number of entries returned is 10 for Meetings and 50 for all other resource collections.
* `endCursor` (optional) — The string cursor used to specify the current page (offset). Obtain this cursor value from the `pageInfo` property for each returned list. If you do not specify an `endCursor` value, a query will return the first matching page of results (the start of the list).
* The `pageInfo` object (returned for each list) includes the following properties:
  * `hasNextPage` — Boolean property which indicates whether there are more pages available.
  * `endCursor` — The string to be passed to get the next page.
  
  For example, the following query returns pagination info along with the first 10 matching `ProjectData` resources:
  
```javascript
{
  project(projectId: 100) {
    projectData(
      start: "2019-05-01T07:00:00.000Z",
      first: 10,
      interval: MONTHLY,

    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      resources {
        usage {
          streamedPublishedMinutes
        }
      }
    }
  }
}
```

The response includes pagination information:

```json
{
  "data": {
    "project": {
      "projectData": {
        "pageInfo": {
          "hasNextPage": true,
          "endCursor": "aW5zaWdodHMtcmVzb3VyY2U6MTA=="
        },
        "resources": [
          {
            "usage": {
              "streamedPublishedMinutes": 56554.83333333332
            }
          },
                    ...
```

Use the `endCursor` value from this response (`"aW5zaWdodHMtcmVzb3VyY2U6MTA=="`) as the `endCursor` input used in the query to obtain the next page of matching records:

```javascript
{
  project(projectId: 100) {
    projectData(
      start: 0,
      first: 10,
      interval: MONTHLY,
      endCursor: "aW5zaWdodHMtcmVzb3VyY2U6MTA=="

    ) {
      pageInfo {
        hasNextPage
        endCursor
      }
      resources {
        usage {
          streamedPublishedMinutes,
          streamedSubscribedMinutes
        }
      }
    }
  }
}
```

## Data Retention and Latency

### Insights / Insights Dashboard

**Data retention:**

* Daily aggregation: 90 days
* Monthly aggregation: 12 months

**Notes:**

* Daily aggregation data is calculated based on 00:00 - 23:59 PST/PDT.
* Daily aggregation retention period for Insights API and Insights Dashboard was updated to 90 days (from 60 days) as of August 12, 2021. Daily aggregated data for video sessions after this date will be available for 90 days.

**Expected Latency:** 36 - 48 hours ![Advanced Insights retention period](/images/video/insights-retention-period.svg)

### Advanced Insights

**Data retention:** 21 days

**Note:** The retention period is based on the created-at time of a meeting within the session.

**Expected Latency:** 5 minutes

**Scheduled Database Maintenance:** Advanced Insights database is regularly maintained. Data may not be accessible during the following time periods. All data will be backfilled shortly after the specified maintenance period.

|     | Day | Time | Data available by |
| --- | --- | --- | --- |
| Daily database maintenance | Monday - Sunday | 9pm - 11pm PST | 11:30pm PST |
| Weekly database maintenance | Sunday | 4am - 7am PST | 8am PST |

![Advanced Insights retention period](/images/video/insights-retention-period.svg)

>**Note:** A single session may have multiple meetings. A new meeting is set when the session is out of use for 10 minutes. Please refer to our documentation on [Sessions vs. Meetings](/video/developer-tools/inspector#sessions-vs-meetings) for more information.

## Error codes

Errors are included in the response, in an `errors` array, like the following:

```json
"errors": [
  {
    "message": "You must provide a valid project ID.",
    "locations": [
      {
        "line": 2,
        "column": 3
      }
    ],
    "path": [
      "project"
    ],
    "errorCode": 1008
  }
]
```

The following table lists the error codes and descriptions. See the \`message\` property of the error for more details.

| Error code | Error description |
| --- | --- |
| 1000 | Invalid App Id provided. |
| 1001 | No valid authentication was provided. |
| 1002 | Invalid date range. |
| 1003 | Invalid parameter. Only one date interval is allowed. |
| 1004 | Invalid parameters. |
| 1005 | Invalid parameter. |
| 1006 | Invalid parameter. The value must be an integer. |
| 1007 | Invalid parameter for specifying an Vonage Video SDK version number. The format required is 0.0.0. |
| 1008 | You must provide a valid project ID. |
| 1009 | Invalid parameter. |
| 1010 | Invalid parameter passed in. The parameter accepts only one value. |
| 1011 | Invalid token. |
| 1012 | Internal server error. |
| 1013 | A mandatory parameter is missing. |
| 1014 | The specified query requires the [Advanced Insights](https://www.vonage.com/communications-apis/video/features/advanced-insights/) add-on. |
| 1015 | The specified project ID was not found. |
| 1016 | The session has expired. |
| 1017 | The specified session was not found. |
| 1018 | You must provide at least one session ID in the input array. |
| 1019 | The token does not match the App ID. |
| 1020 | Unable to validate the token. |
| 1021 | You are not authorized to view data from this project. |
| 1022 | Type error. See details in the `message` string. |

\## Making POST Requests to the Vonage Video GraphQL API

All Vonage Video GraphQL requests are made to https://insights.opentok.com/graphql. Set the `content-type` to `application/json`.

All requests require authentication headers. Set this header to a JWT token with `project` as the `ist` and the the Vonage Video project ID as the `iss`. Sign the token the Vonage Video project secret. See the [API Docs](/api/video).

The POST body will contain a JSON object containing one key and one value. The key will be `query`, and the value will be the JSON-like GraphQL string (such as one) you construct using the GraphiQL tool).

The following `curl` command makes a GraphQL query to obtain streamed subscribed minutes:

``` bash
YOUR_OT_PROJECT_APP_ID=12345678         # Enter your project APP ID
YOUR_OT_JWT=ValidJwtToken                # Enter a valid JWT token corresponding
                                         # to your project APP ID

OT_START_DATE=$(($(date +%s)-864000))    # generates epoch time from 10 days ago

# GraphQL query to obtain streamed subscribed minutes from the start date
GRAPHQL_QUERY='{project
  (projectId:'${YOUR_OT_PROJECT_API_KEY}') {
     projectData(
     start:\"'$OT_START_DATE'\" 
   ) {
     resources {
       usage {
         streamedSubscribedMinutes
      }
    }
   }
  }
}'

curl -X POST \
-H "Content-Type: application/json" \
-H "X-OPENTOK-AUTH:$YOUR_OT_JWT" \
-d '{"query":"$GRAPHQL_QUERY"}' \
'https://insights.opentok.com/graphql'
```

Replace values for the `YOUR_OT_JWT` and `YOUR_OT_PROJECT_APP_ID` variables. To obtain these, see the [API Docs](/api/video) documentation and log into your [Vonage Video API account](https://ui.idp.vonage.com/ui/auth/login).

The example above will result in a response object like the following:

``` json
{  
  "data":{  
    "project":{  
      "projectData":{  
        "resources":[  
          {  
            "usage":{  
              "streamedSubscribedMinutes":3189
            }
          }
        ]
      }
    }
  }
}
```

## Sample App and More Sample Queries

The [insights-dashboard-sample](https://github.com/opentok/insights-dashboard-sample) project at GitHub is a Node application that uses the Vonage Video Insights API to graphically display information on Vonage Video projects. It also includes a number of sample GraphQL queries.