---
title: Voice Enabling a Text-only Chatbot
description: Learn here how to add voice interaction to your existing text-only chatbot.
thumbnail: /content/blog/voice-enabling-a-text-only-chatbot/chatbots-voice-enable.png
author: tony-chan
published: true
published_at: 2022-07-28T09:30:05.047Z
updated_at: 2022-07-28T09:13:15.356Z
category: tutorial
tags:
  - chatbot
  - javascript
  - voice-api
comments: true
spotlight: false
redirect: ""
canonical: ""
outdated: false
replacement_url: ""
---
## Overview

Learn here how to add voice interaction to your existing text-only chatbot.

This application uses Vonage Voice API for speech recognition and text-to-speech capabilities to enable your chatbot to listen to callers' spoken requests and playback replies.

Over forty language locales are supported for voice enabling your chatbot.

There are two sample Voice API application code and a simple text chatbot application in this tutorial; the first Voice API application will connect to the simple chatbot application service that simulates requests/responses whose only purpose is to illustrate how an actual chatbot can be voice-enabled, and the [second sample Voice API application has the same core voice capabilities as the first one, you will update that application to integrate with your actual chatbot for requests/responses using the first one as reference.

Both Voice API applications code support inbound or outbound voice calls from/to users as needed for your chatbot use case.

In this tutorial, we will be using and referring to the [Voice API applications GitHub repository](https://github.com/nexmo-se/voice-enabling-text-bot-application) and the [simple chatbot simulator GitHub repository](https://github.com/nexmo-se/voice-enabling-text-bot-simple-chatbot). 

## Prerequisites

You will need:

* Node.js,
* Ngrok,
* a Vonage API account,
* Optionally Heroku for a hosted deployment.

Each prerequisite item setup is detailed as follows.

## Node.js Installation

* [Install nvm](https://github.com/nvm-sh/nvm) (Node Version Manager); if you are using Windows OS, look at these [important notes](https://github.com/nvm-sh/nvm#important-notes)
* Install Node.js version 16 with the command: nvm install 16
* Use Node.js version 16 with the command: nvm use 16

  * We have tested the applications with Node.js version 16.15.1

## Ngrok Installation

To quickly start testing, you may run the Voice API application and the simple chatbot simulator application on your local computer; however, they need to be accessible from the Internet to use the Vonage Voice API, for example, to receive webhook calls for events like incoming voice calls, answered calls, speech recognition transcripts. You achieve that capability by installing the Internet tunneling service ngrok.

Each application will need its own ngrok tunnel.

To set up ngrok:

* [Install ngrok](https://ngrok.com/download),
* Make sure you are using the latest version of ngrok and not using a previously installed version of ngrok,
* Sign up for a free [ngrok account](https://dashboard.ngrok.com/signup),
* Verify your email address from the email sent by ngrok,
* Retrieve [your Authoken](https://dashboard.ngrok.com/get-started/your-authtoken),
* Run the command ngrok config add-authtoken <your-authtoken>
* Set up both tunnels
* * Run ngrok config edit
  * * For a free ngrok account, add the following lines to the ngrok configuration file (under authoken line):

```
  tunnels:
  	six:
  		proto: http
  		addr: 6000
  	eight:
  		proto: http
  		addr: 8000 
```

* For a [paid ngrok account](https://dashboard.ngrok.com/billing/subscription), you may set ngrok hostnames that will never change on each ngrok new launch; add the following lines to the ngrok configuration file (under authoken line) - set hostnames (they must be unique) to actual desired values:

  ```
   tunnels:
    	six:
    		proto: http
    		addr: 6000
    		hostname: youmustsetanamehere6.ngrok.io
    	eight:
    		proto: http
    		addr: 8000
    		hostname: youmustsetanamehere8.ngrok.io
  ```

Note: The Voice API application will be running on local port 8000, and the simple chatbot application will be running on local port 6000

* Start both ngrok tunnels
* * Run ngrok start six eight
  * You will see lines like...
    Web Interface [http://127.0.0.1:4040](http://127.0.0.1:4040/) Forwarding [https://xxxxxxx.ngrok.io](https://xxxxxxx.ngrok.io/) -> [http://localhost:6000](http://localhost:6000/) Forwarding [https://yyyyyyy.ngrok.io](https://yyyyyyy.ngrok.io/) -> [http://localhost:8000](http://localhost:8000/)
  * Make a note of xxxxxxx.ngrok.io (without the leading https://), the one associated with local port 6000, as it will be set as `BOT_SERVER` in the next steps below,
  * Make a note of [https://yyyyyyy.ngrok.io](https://yyyyyyy.ngrok.io/) (with the leading https://), the one associated with local port 8000, as it will be needed in the next steps below.

## Vonage API Account

[Log in to your](https://ui.idp.vonage.com/ui/auth/login) or [sign up for a](https://ui.idp.vonage.com/ui/auth/registration) Vonage API account.

Go to [Your applications](https://dashboard.nexmo.com/applications), access an existing application or [+ Create a new application](https://dashboard.nexmo.com/applications/new).

Under the Capabilities section (click on \[Edit] if you do not see this Capabilities section):

Enable Voice

* Under Answer URL, leave HTTP GET, and enter https://<host>:<port>/answer (replace <host> and <port> with the public hostname and, if necessary public port of the server where the sample Voice API application is running), e.g. <https://yyyyyyyy.ngrok.io/answer> or <https://myappname.herokuapp.com/answer> (see next sections) or <https://myserver2.mycompany.com:40000/answer> (deploying on your own servers)
* Under Event URL, select HTTP POST (instead of HTTP GET), and enter https://<host>:<port>/event (replace <host> and <port> with the public hostname and, if necessary public port of the server where the sample Voice API application is running), e.g. <https://yyyyyyyy.ngrok.io/event>or <https://myappname.herokuapp.com/event> [ ](https://myappname.herokuapp.com/answer)(see next sections) or <https://myserver2.mycompany.com:40000/event> (deploying on your own servers)
* Click on \[Generate public and private key] if you did not yet create or want new ones, then save as `.private.key` file (note the leading dot in the file name) in the folder that will contain the Voice API application.
  IMPORTANT: Do not forget to click on \[Save changes] at the bottom of the screen if you have created a new key set.
* Link a phone number to this application if none has yet been linked to the application.

Please take note of your Application ID and the linked phone number (as they are needed in the very next section.) 

For the next steps, you will need:

* Your [Vonage API key](https://dashboard.nexmo.com/settings) (as `API_KEY`)
* Your [Vonage API secret](https://dashboard.nexmo.com/settings), not a signature secret (as `API_SECRET`)
* Your application ID (as `APP_ID`),
* The phone number linked to your application (as `SERVICE_NUMBER`), your phone will call that number,
* The Simple Text-Only chatbot server public hostname and port (as `BOT_SERVER`), the argument has no http:// nor https:// prefix, no trailing /, and no sub-path, e.g. xxxxxxx.ngrok.io or mysimplebotname.herokuapp.com or myserver1.mycompany.com:32000

## Heroku Setup

After testing locally, at a later time, you may optionally deploy on Heroku-hosted environments.

To setup Heroku,

Install [git](https://git-scm.com/downloads).

[Sign up for a Heroku](https://signup.heroku.com/) account.

Install the [Heroku command line](https://devcenter.heroku.com/categories/command-line) and log in to your Heroku account.

To deploy the applications, follow the instructions in the section Deploy to Heroku. 

## Development

Let’s see how the applications work.

### First phase

In the first phase, we are going to use and deploy the reference application voice-on-text-bot-app-with-simple-bot.js from the [Voice Enabling Text Bot Application repository](https://github.com/nexmo-se/voice-enabling-text-bot-application), in conjunction with the simple chatbot application very-simple-bot.js from the [Voice-Enabling Text Bot Simple Chatbot repository](https://github.com/nexmo-se/voice-enabling-text-bot-simple-chatbot). 

Local deployment on your computer for both applications

![Architecture diagram](/content/blog/voice-enabling-a-text-only-chatbot/voice-enabling-text-only-chatbot-local-deployment.png "Voice enabling text-only chatbot. Local deployment for tests")

Download the reference application code from the [repository](https://github.com/nexmo-se/voice-enabling-text-bot-application) to a local folder, then go to that folder.

Copy the `env.example` file over to a new file called .env (with a leading dot):
`cp env.example .env`

Edit the .env file, and set the five parameter values (see previous sections):

```
API_KEY=

API_SECRET=

APP_ID=

BOT_SERVER=

SERVICE_NUMBER=
```

Install dependencies once:

`npm install`

Make sure ngrok has been started with both tunnels as explained in previous sections.

Launch the application:

`node voice-on-text-bot-app-with-simple-bot.js`

Download the simple chatbot application code from the [repository](https://github.com/nexmo-se/voice-enabling-text-bot-simple-chatbot) to a local folder, then go to that folder.

Launch the application:

`node very-simple-bot.js`

To interact via voice calls with the very simple bot, call the phone number linked to your application, the one listed as `SERVICE_NUMBER`.

### Deploy to Heroku

Optionally, you may deploy both applications to Heroku-hosted environments.

Make sure first that your applications work as expected with local deployment on your computer and that you have set up Heroku in the prerequisites.

Go to the folder where you have the Voice API application,

If you do not yet have a local git repository, create one:

`git init`

`git add .`

`git commit -am "initial"`

Start by creating this application on Heroku from the command line using the Heroku CLI: Note: In the following command, replace "myappname" with a unique name on the whole Heroku platform.

`heroku create myappname`

or `heroku create myappname --team <xxxxx>` (if your Heroku account uses teams)

On your Heroku dashboard where your application page is shown, click on the Settings button, add the following Config Vars and set them with their respective values:

```
API_KEY

API_SECRET

APP_ID

BOT_SERVER (see further below)

SERVICE_NUMBER

PRIVATE_KEY_FILE with the value ./.private.key
```

Now, deploy the application:

`git push heroku master`

On your Heroku dashboard, where your application page is shown, click on the Open App button. That hostname is the one to be used under your corresponding [Vonage Voice API application Capabilities](https://dashboard.nexmo.com/applications) (click on the corresponding application, then [Edit]).

For example, the respective links would be (replace myappname with actual value):

<https://myappname.herokuapp.com/answer>

<https://myappname.herokuapp.com/event> 

See more details in the above section Vonage API account.

Go to the folder where you have the very simple chatbot application,

If you do not yet have a local git repository, create one:

go to this simple bot application folder

`git init`

`git add .`

`git commit -am "initial"`

Create this application on Heroku from the command line using the Heroku CLI:

Note: In the following command, replace "mysimplebotname" with a unique name on the whole Heroku platform.

`heroku create mysimplebotname`

or `heroku create mysimplebotname --team <xxxxx>` (if your Heroku account uses teams)

### Deploy the application

`git push heroku master`

In this case, when setting up the Voice API application, the parameter `BOT_SERVER` argument for the other Heroku deployment will be mysimplebotname.herokuapp.com (replace mysimplebotname with its actual value, there is no leading https://, no trailing /)

To interact via voice calls with the very simple bot, call the phone number linked to your application, the one listed as SERVICE_NUMBER.

### How the applications work

The application voice-on-text-bot-app-with-simple-bot.js:

* Uses Vonage Voice API with the Node.js server SDK ‘@vonage/server-sdk’,
* Presets values for the:

  * ASR (Automatic Speech Recognition) and TTS (Text-to-Speech) language code, as ‘languageCode’, 
  * Initial greeting, as ‘greetingText’,
  * and other parameters as commented.
* Manages webhook routes:

  * ‘/makecall’

    * If you would like to initiate outbound calls
    * Update the number in the callInfo object. It must the full international number (E.164 format), with country code, without leading ‘+’, without international dial prefix such as ‘011’ or ‘00’, without dashes ‘-’ or space characters
    * It will call the route ‘/placecall’
    * To initiate the outbound call, in a web browser, enter the web address: <this-application-host-name>/placecall, e.g. xxxxxxx.ngrok.io/makecall
* ‘/placecall’

  * This is where a voice outbound call API request is actually made.
* ‘/answer’

  * This webhook route is called by the Vonage Voice API platform on an inbound voice call, or when an outbound voice call is answered,
  * The (Voice API) call leg is identified by its UUID value,
  * The application returns an [NCCO](https://developer.vonage.com/voice/voice-api/ncco-reference#ncco-reference) where:

    * A greeting is played to the remote party with [“action”: “talk”](https://developer.vonage.com/voice/voice-api/ncco-reference#talk),
    * It starts an ASR (Automatic Speech Recognition) cycle with [“action”: “input”](https://developer.vonage.com/voice/voice-api/ncco-reference#input),

The Voice API platform will call the webhook URL as specified in the `eventUrl` parameter (route /asr) whether speech has been detected or not.

* ‘/event

  * This webhook route is called by the Vonage Voice API platform on different states of the voice call leg with a given UUID value,
  * In this application, there are no actions in reply to this webhook route apart from returning the HTTP code 200 (ok). 
* ‘/asr’

  * This webhook route is called by the Vonage Voice API platform on ASR (Automatic Speech Recognition) results whether a transcript has been successfully returned or not, e.g. there could have been noises instead of actual spoken words or timed out if no sound has been detected (the time out duration corresponds to the parameter `startTimeout` value)
  * It starts a new ASR cycle by returning an [NCCO](https://developer.vonage.com/voice/voice-api/ncco-reference#input) with "action": "input"
* ‘/botreply’

  * This webhook route is called by the simple chatbot to return a text reply from a text request,
  * Then it initiates a [TTS](https://github.com/Vonage/vonage-node-code-snippets/blob/master/voice/play-tts-into-call.js) (Text-to-Speech) to play the chatbot response.
* In this application, set the [ASR (Automatic Speech Recognition) language](https://developer.vonage.com/voice/voice-api/guides/asr#language) code and [TTS (Text-To-Speech) language](https://developer.vonage.com/voice/voice-api/guides/text-to-speech#supported-languages) code (languageCode parameter) that match your text chatbot's language. Over 40 language locales are available with Vonage Voice API for both ASR and TTS.
* Both last code lines allow this Node.js application to listen on local port 8000 for local deployment or on a different local port for a hosted deployment (automatically set with a Heroku deployment). 

The application very-simple-bot.js:

* Simulates a text-only chatbot. Its only purpose is to show how an actual text-only chatbot would be voice-enabled with the application that uses Vonage Voice API,
* This sample very simple chatbot supports English and French languages as examples
* The only supported requests are listed in the respective dictionaries botKbEn and botKbFr,
* This very simple chatbot does not do Natural Language Processing for testing. You must exactly say one of the expected supported requests. Otherwise, the reply will be the default one for unknown requests,
* It handles the webhook ‘/bot’ to receive requests; it will call back the webhook URL as listed in the incoming request to provide the corresponding text reply,
* Both last code lines allow this Node.js application to listen on local port 6000 for a local deployment or on a different local port for a hosted deployment (automatically set with a Heroku deployment).

### Second phase

![Production architecture](/content/blog/voice-enabling-a-text-only-chatbot/voice-enabling-text-only-chatbot-hosted-deployment.png "Voice Enabling text-only chatbot. Hosted/ Production deployment.")

In the second phase, you are going to update (where indicated inside) the source code voice-on-text-bot-app-generic.js to interact with your actual chatbot for text requests/responses and use voice-on-text-bot-app-with-simple-bot.js as a reference, both from the [application repository](https://github.com/nexmo-se/voice-enabling-text-bot-application).

You will not need any code from the [simple bot simulator repository](https://github.com/nexmo-se/voice-enabling-text-bot-simple-chatbot).

You will interact via voice with your chatbot by calling the phone number linked to your application, the one listed as `SERVICE_NUMBER`.

### Conclusion

In this tutorial, you learned that using Vonage Voice API, you can voice-enable any text-only chatbot, and many languages are supported.

You start first with a local deployment on your computer with the Voice API application and the simple text chatbot to illustrate how you can voice-enable a text chatbot.

You may optionally deploy to Heroku-hosted environments.

Then you will update the other Voice API application to add only the specific code to integrate with your text chatbot for text requests/answers as all the necessary interaction with the Vonage Voice API, including handling of incoming/outgoing voice calls, automatic speech recognition and text-to-speech have been already implemented in that source code file.

How did you like this tutorial? Have questions or feedback about Video Voice enabling a text-only chatbot? Join us on the [Vonage Developer Slack](https://developer.vonage.com/community/slack). And follow us on [Twitter](https://twitter.com/VonageDev) to keep up with the latest Vonage Developer updates
