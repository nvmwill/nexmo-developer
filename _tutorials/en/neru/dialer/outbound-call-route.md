---
title: Create an Outbound Call
description: In this step you learn how to create an Outbound Call with NeRu.
---

# Create an Outbound Call

Now that the form is displaying, you will need to handle the form submission. Create a new route for `/call` by adding the following to the index.js file:

```javascript
app.post('/call', async (req, res, next) => {
    try {  
        const session = neru.createSession();
        const voice = new Voice(session);

        const vonageNumber = { number: process.env.VONAGE_NUMBER, type: "phone"};
        const to = { type: 'phone', number: req.body.number };
    
        const response = await voice
            .vapiCreateCall(
                vonageNumber,
                [to],
                [
                    {
                        action: 'talk',
                        text: "Hi! This is a call made by the Voice API and NeRu",
                    }
                ]
            )
            .execute();
        
        await voice.onVapiEvent({ vapiUUID: response?.uuid, callback: 'onEvent' }).execute();
        
        res.redirect('/');
    } catch (error) {
        next(error);
    }
});
```

The above route creates a session, which is used to create a voice provider object. The Vonage number you linked to this application is parsed from the `contact` configuration that was added to the `neru.yml` file. 

Then, `vapiCreateCall` is used to create the outbound call. `vapiCreateCall` takes a from number, a to number, and a call control object. The response for the outbound call is stored so `onVapiEvent` can be used to subscribe to the call's events.

Add a route to your `index.js` file to handle the incoming events:

```javascript
app.post('/onEvent', async (req, res) => {
    console.log('event status is: ', req.body.status);
    console.log('event direction is: ', req.body.direction);
    res.sendStatus(200);
});
```

If you save the file, the debugger will reload with your new code. If you refresh the website and enter your phone number you will receive a call! Once done testing locally, stop NeRu debugger server with Ctrl/CMD+C.

## Deploy an Instance of your Project

By deploying you are creating an instance of your project - a running service that is built from the current version of the code with the current configuration (neru.yml). 

Stop your debug process, then deploy your project by running:

```sh
neru deploy
```

Much like debugging you will get two new urls for the deployed version of your project. The second url, ending in `.com`, is again better suited for use with static webpages.