---
title: Run a Job
navigation_weight: 0
description: Scheduling or running a job
---

## Running a Job 

A job is run for a given of segment of time, which means that if there are responses to be handled after the list is iterated through, they will be handled during the given time frame. 
Jobs can be [`stopped`](#stop-job) before their end time. 

**POST Endpoint**: `https://api-eu.dev.v1.vonagenetworks.net/beta/jobs/runs`

Request headers should include: 

```
Authorization: Bearer <JWT>
Content-type: application/json
```

To run a job, you need a name for the run, the ID of the job, as well as a start time and end time (in UTC format?)

```
{
    "jobId": "12345678",
    "name": "Pizza Campaign",
    "startAt": "2022-05-02T17:23:14.000Z",
    "endAt": "2022-05-03T11:51:03.800Z"
}
```

### Response 

{
    "status": "scheduled",
    "job_id": "231667a5-8696-45cb-aa1d-b9f46d3e13f8",
    "name": "Pizza Campaign",
    "start_at": "2022-05-02T17:23:14.000Z",
    "end_at": "2022-05-03T11:51:03.800Z",
    "id": "0e54831a-5187-4701-afa4-aae01a2bdff6",
    "created_at": "2022-05-03T10:51:03.993Z",
    "updated_at": "2022-05-03T10:51:03.993Z"
}

This will return an ID, which can be used to stop a run or see the status of a run. 

## Get All Runs 

To see all existing runs, even those that have already ended, perform a GET on the runs endpoint: 

**GET Endpoint**: `https://api-eu.dev.v1.vonagenetworks.net/beta/runs/`

## Get Run 

Similarly, if you have the ID of the run, use a GET and the ID to find details about one specific run 

**GET Endpoint**: `https://api-eu.dev.v1.vonagenetworks.net/beta/runs/{RUN_ID}`

## Stop Run

To stop a run, use the ID of the run: 

**POST Endpoint**: `https://api-eu.dev.v1.vonagenetworks.net/beta/runs/{RUN_ID}/stop`

## Get Run Summary 

To see the summary of a Run, use a GET on the `summary` endpoint with the Run ID: 

`https://api-eu.dev.v1.vonagenetworks.net/beta/jobs/runs/{RUN_ID}/summary`

The response will look something like this: 
```
{
    "total_items": 2,
    "page": 1,
    "page_size": 100,
    "_embedded": {
        "recipient_response": {
            "recipients_count": 11,
            "job_run_id": "0e54831a-5187-4701-afa4-aae01a2bdff6"
        },
        "action_delivery_status": {
            "recipients_count": 16,
            "status_succeeded_count": 9,
            "status_failed_count": 2,
            "status_info_count": 18,
            "job_run_id": "0e54831a-5187-4701-afa4-aae01a2bdff6"
        }
    },
    "total_pages": 1,
    "_links": {
        "self": {
            "href": "https://api-eu.dev.v1.vonagenetworks.net/runs/0e54831a-5187-4701-afa4-aae01a2bdff6/summary?page_size=100&page=1"
        },
        "prev": {
            "href": "https://api-eu.dev.v1.vonagenetworks.net/runs/0e54831a-5187-4701-afa4-aae01a2bdff6/summary?page_size=100&page=1"
        },
        "next": {
            "href": "https://api-eu.dev.v1.vonagenetworks.net/runs/0e54831a-5187-4701-afa4-aae01a2bdff6/summary?page_size=100&page=1"
        },
        "first": {
            "href": "https://api-eu.dev.v1.vonagenetworks.net/runs/0e54831a-5187-4701-afa4-aae01a2bdff6/summary?page_size=100&page=1"
        }
    }
}