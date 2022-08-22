---
title: Scheduler
description: The Scheduler Provider
navigation_weight: 5
---

# Scheduler Provider

The Scheduler provider allows you to schedule functions to be run at a specified time in the future, or to recur based on an interval. The Scheduler provider also supports scheduling operations using [CRON](https://en.wikipedia.org/wiki/Cron) expressions.

## How it works

When you call the `startAt` function on the Scheduler, the NeRu platform creates a job with the details you provided, if you provided an ID that should be used, otherwise one will be generated for you. This ID is how you can cancel the job if needed using the `cancel` function. The Scheduler provider operates with the minimum of a minutes precision. For example, a job scheduled to be invocated at 10:01 will be invocated within that minute, between 10:01:00 and 10:01:59.

When the job's invocation time is reached, your application will get a request to the callback you specified. You will have 30 seconds to respond to this request with a 200 status otherwise the request will be retried. Requests are retried 5 times before being abandoned.

Each request from the scheduler has a hash on the request's header under `X-Neru-Scheduler-RequestHash`. Using this hash you can make sure to handle incoming scheduler requests once in case your application was not able to respond with a 200 status in time.

## Functions

* [`startAt`](/neru/code-snippets/scheduler-provider/schedule-callback.md)

* [`cancel`](/neru/code-snippets/scheduler-provider/cancel-callback.md)

* [`get`](/neru/code-snippets/scheduler-provider/get-job.md)

* [`listAll`](/neru/code-snippets/scheduler-provider/list-jobs.md)

## Initializing the Scheduler Provider

To use the Scheduler Provider you need to create an instance of the provider using a session:

```javascript
const session = neru.createSession();
const scheduler = new Scheduler(session);
```

Requests made from NeRu to your application via the Scheduler provider will contain the session information from the session which set up the scheduled callback. Meaning you can access state from the originating session using `getSessionFromRequest` to create a session object. 

## Use Case

For example, to use the Scheduler provider to send a one off reminder text in five minutes time after an incoming message:

```javascript
router.post('/onMessage', async (req, res, next) => {
    try {
        const session = neru.createSession();
        const scheduler = new Scheduler(session);

        const reminderTime = new Date(new Date().setMinutes(new Date().getMinutes() + 5)).toISOString();

        await scheduler.startAt({
            startAt: reminderTime,
            callback: 'textReminder',
            payload: {
                from: req.body.from,
            }
        }).execute();
    } catch (error) {
        next(error);
    }
});
```

After five minutes have passed the `textReminder` route will get called with the payload:

```javascript
router.post('/textReminder', async (req, res, next) => {
    try {
        const session = neru.createSession();
        const messaging = new Messages(session);

        const from = req.body.from;

        const to = { type: "sms", number: from };
        const vonageNumber = { type: "sms", number: "447000000000" }; 

        await messaging.sendText(
            vonageNumber,
            to,
            `Reminder from Vonage!`
        ).execute();

        res.sendStatus(200);
    } catch (error) {
        next(error);
    }
});
```

The Scheduler provider also supports using CRON to define the interval in which it calls the defined route. This time, the code triggers the defined route every 10 minutes past the hour for a day:

```javascript
router.post('/onMessage', async (req, res, next) => {
    try {
        const session = neru.createSession();
        const scheduler = new Scheduler(session);

        const nowDate = new Date();
        const endDate = new Date();
        endDate.setDate(endDate.getDate() + 1);

        await scheduler.startAt({
            startAt: nowDate.toISOString(),
            callback: 'textReminder',
            interval: {
                cron: '10 * * * *',
                until: {
                    date: endDate.toISOString(),
                    maxInvocations: 24
                }
            },
            payload: {
                from: req.body.from,
            }
        }).execute();
    } catch (error) {
        next(error);
    }
});
```