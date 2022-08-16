---
title: Office Hours Reservation Using Node.js and the Vonage Messages API
description: A web application that allows students to reserve office hour time
  slots with their professors. Once an office hour reservation is booked, the
  student will receive a text message confirming the reservation using Vonage
  Messages API.
thumbnail: /content/blog/office-hours-reservation-using-node-js-and-the-vonage-messages-api/office-hours-reservation.png
author: zoe-mithaug
published: true
published_at: 2022-08-16T06:58:31.354Z
updated_at: 2022-08-16T06:58:32.937Z
category: tutorial
tags:
  - javascript
  - node
  - messages-api
comments: true
spotlight: false
redirect: ""
canonical: ""
outdated: false
replacement_url: ""
---
## Introduction

In this tutorial, we are creating a web application using Node.js, Express, SQLite, and the Vonage Messages API. The [GitHub repository for this project is also available](https://github.com/Vonage-Community/blog-messages_api-node_office-hours-reservation).

## Creating a Web Application

### Homepage

We will need to create three HTML templates to serve as our Input form (the Homepage), Error page, and Confirmation page. After we create these templates, we will move on to the "engine" that drives this web application in Node.js. To begin, we will start with creating a homepage where a user can input information such as their name, their phone number, their date of choice, their time preference, and any notes or comments they have using a basic web form. This form will be posted to our web application for processing.

Let’s begin by creating an `index.html` file that includes our page title, imports our CSS styling, and a basic web form to gather student information. It should look like this:

```html
<html>
  <head>
    <title>Office Hours Reservation</title>
    <link type="text/css" rel="stylesheet" href="/assets/indexstyles.css" />
    <link
      rel="stylesheet"
      href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css"
    />
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
  </head>

  <body>
    <h1>Office Hours Reservation Form</h1>
    <div id="statusdiv">Current Status</div>
    <form
      id="scheduleform"
      name="scheduleform"
      method="post"
      action="/schedule"
    >
      <div id="FormInfo">
        <div class="FormTextBox">
          <div id="alignRight">Select Date for Reservation:</div>
          <div>
            <script>
              $(function () {
                $("#datepicker").datepicker();
              });
            </script>
            <input
              type="text"
              name="AppointmentDate"
              value="7/15/2022"
              id="datepicker"
            />
          </div>
        </div>
        <!--FormTextBox-->
        <div class="FormTextBox">
          <div id="alignRight">Select Professor:</div>
          <div>
            <select name="ProfessorName">
              <option value="Professor Nimoy">Professor Nimoy</option>
              <option value="Dr. Rory">Dr. Rory</option>
              <option value="Professor Amanda">Professor Amanda</option>
              <option value="Professor Dwane">Professor Dwane</option>
              <option value="Dr. Zach">Dr. Zach</option>
            </select>
          </div>
        </div>
        <!--FormTextBox-->
        <div class="FormTextAreaBox">
          <div>Choose Appointment Time:</div>
          <div>
            <label>
              <input type="radio" name="AppointmentTime" value="8" /> 8:00 AM
            </label>
            <label>
              <input type="radio" name="AppointmentTime" value="9" /> 9:00 AM
            </label>
            <label>
              <input type="radio" name="AppointmentTime" value="10" /> 10:00 AM
            </label>
            <label>
              <input type="radio" name="AppointmentTime" value="11" /> 11:00 AM
            </label>
          </div>
        </div>
        <!--FormTextAreaBox-->
        <div class="FormTextBox">
          <div id="alignRight">Student First Name:</div>
          <div>
            <input
              type="text"
              name="studentfirstname"
              id="studentfirstname_id"
            />
          </div>
        </div>
        <!--FormTextBox-->
        <div class="FormTextBox">
          <div id="alignRight">Student Last Name:</div>
          <div>
            <input type="text" name="studentlastname" id="studentlastname_id" />
          </div>
        </div>
        <!--FormTextBox-->
        <div class="FormTextBox">
          <div id="alignRight">Student Phone Number:</div>
          <div>
            <input
              type="text"
              name="studentphonenumber"
              id="studentphonenumber_id"
            />
          </div>
        </div>
        <!--FormTextBox-->
        <div class="FormTextAreaBox">
          <div>Comments, Questions, Notes...</div>
          <div>
            <textarea
              name="studentnotes"
              id="studentnotes_id"
              style="width: 300px; height: 100px"
            >
            </textarea>
          </div>
        </div>
        <!--FormTextAreaBox-->
        <div style="text-align: center">
          <button type="submit" name="booknowbutton" class="BigButton">
            Book Now
          </button>
        </div>
      </div>
      <!--FormInfo-->
    </form>
  </body>
</html>
```

In our example, we include a reservation date input field, a reservation time radio group, a dropdown box to choose professor options, along with student name, student cell phone, and a comments field. 

![](/content/blog/office-hours-reservation-using-node-js-and-the-vonage-messages-api/sample-reservationform-screenshot.png)

Finally, create a submission button called "Book Now" to submit the contents of the form. We are posting this form to our web server at this URL: `/postschedule`, which we will discuss further in our tutorial. 

```html
<form
      id="scheduleform"
      name="scheduleform"
      method="post"
      action="/schedule"
\>
```

### Error Page

In the event the user enters invalid data, or there was an error processing the request, we will display an HTML Error page informing the user what went wrong. This is a simple HTML page that will be processed by Node.js and display specific server-side variables (via Nunjucks) that we set depending on what issue occurred. Here is an example of what our `error.html` page looks like:

```html
<html>
  <head>
    <title>There is an Error processing your request</title>

    <link type="text/css" rel="stylesheet" href="/assets/errorstyles.css" />
    <link
      rel="stylesheet"
      href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css"
    />
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
  </head>

  <body>
    <h1>There was an Error processing your request</h1>
    <div
      id="statusdiv"
    >
      Please correct the following:
      <ul>
        {{ErrorMessage}}
      </ul>
    </div>
    <form
      id="scheduleform"
      name="scheduleform"
      method="post"
      action="/schedule"
    >
      <div id="FormInfo">
        <div class="FormTextBox">
          <div id="alignRight">Date for Reservation:</div>
          <div class="readonlydata">{{AppointmentDate}}</div>
        </div>
        <!--FormTextBox-->
        <div class="FormTextBox">
          <div id="alignRight">Appointment Time:</div>
          <div class="readonlydata">{{AppointmentTime}}</div>
        </div>
        <!--FormTextAreaBox-->
        <div class="FormTextBox">
          <div id="alignRight">Professor:</div>
          <div class="readonlydata">{{ProfessorName}}</div>
        </div>
        <!--FormTextBox-->
        <div class="FormTextBox">
          <div id="alignRight">Student Name:</div>
          <div class="readonlydata">{{StudentName}}</div>
        </div>
        <!--FormTextBox-->
        <div class="FormTextBox">
          <div id="alignRight">Student Phone Number:</div>
          <div class="readonlydata">{{StudentPhoneNumber}}</div>
        </div>
        <!--FormTextBox-->
        <div class="FormTextAreaBox">
          <div>Comments, Questions, Notes...</div>
          <div class="readonlydata">{{StudentNotes}}</div>
        </div>
        <!--FormTextAreaBox-->
        <div id="returnButton">
          <a href="/" class="BigButton"> Return to Reservation Form </a>
        </div>
      </div>
      <!--FormInfo-->
    </form>
  </body>
</html>
```

Our rendered Error page will look like this:

![Error page](/content/blog/office-hours-reservation-using-node-js-and-the-vonage-messages-api/sample-error-screenshot.png "Error page")

The variables enclosed by double brackets, for example: `{{AppointmentDate}}`, are the server-side variables that echo out through Node.js. We will discuss this setup later on in this tutorial. Finally, we will create a return button. This button would return the user back to the homepage if there were an error processing their reservation request.

### Confirmation Page

Now that we have an error response, we must also set up a confirmation response. This page will be displayed only if the request is successful. Similarly, this page will display all user input information. To begin, we will create a `confirmation.html` file and set it up similar to our `error.html` file with server-side (Nunjucks) variables. Here is an example of what our `confirmation.html` page looks like: 

```html
<html>
  <head>
    <title>Your Reservation has been confirmed</title>
    <link
      type="text/css"
      rel="stylesheet"
      href="/assets/confirmationstyles.css"
    />
    <link
      rel="stylesheet"
      href="https://code.jquery.com/ui/1.13.2/themes/base/jquery-ui.css"
    />
    <script src="https://code.jquery.com/jquery-3.6.0.js"></script>
    <script src="https://code.jquery.com/ui/1.13.2/jquery-ui.js"></script>
  </head>
  <body>
    <h1>Your Reservation has been confirmed</h1>
    <form
      id="scheduleform"
      name="scheduleform"
      method="post"
      action="/schedule"
    >
      <div id="FormInfo">
        <div class="FormTextBox">
          <div id="alignRight">Date for Reservation:</div>
          <div class="readonlydata">{{AppointmentDate}}</div>
        </div>
        <!--FormTextBox-->
        <div class="FormTextBox">
          <div id="alignRight">Appointment Time:</div>
          <div class="readonlydata">{{AppointmentTime}}</div>
        </div>
        <!--FormTextAreaBox-->
        <div class="FormTextBox">
          <div id="alignRight">Professor:</div>
          <div class="readonlydata">{{ProfessorName}}</div>
        </div>
        <!--FormTextBox-->
        <div class="FormTextBox">
          <div id="alignRight">Student Name:</div>
          <div class="readonlydata">{{StudentName}}</div>
        </div>
        <!--FormTextBox-->
        <div class="FormTextBox">
          <div id="alignRight">Student Phone Number:</div>
          <div class="readonlydata">{{StudentPhoneNumber}}</div>
        </div>
        <!--FormTextBox-->
        <div class="FormTextAreaBox">
          <div>Comments, Questions, Notes...</div>
          <div class="readonlydata">{{StudentNotes}}</div>
        </div>
        <!--FormTextAreaBox-->
        <div id="returnButton">
          <a href="/" class="BigButton"> Return to Reservation Form </a>
        </div>
      </div>
      <!--FormInfo-->
    </form>
  </body>
</html>
```

Our rendered Confirmation page will look like this:

![Confirmation page](/content/blog/office-hours-reservation-using-node-js-and-the-vonage-messages-api/sample-confirmation-screenshot.png "Confirmation page")

Please note that our server-side variables will be derived from the student submitted form, and they are as follows: `AppointmentDate`, `AppointmentTime`, `ProfessorName`, `StudentName`, `StudentPhoneNumber`, and `StudentNotes`. Finally, we will create a return button. This button will return the user back to the homepage if the user wishes to create another reservation request. 

## Backend

### Mechanics Option: Dotenv

Before we can start our backend implementation, we must create a file called `.env`. This file is extremely important as it stores our private API Secret and API Key. These variables allow us to send our confirmation text using the Vonage Messages API. Start by creating A new file called `.env` and placing it in the root directory of your project. Now, add the following variables with your specific Vonage account information: `VONAGE_API_KEY`, `VONAGE_API_SECRET`, and `FROM_PHONE_NUMBER`.

```bash
VONAGE_API_KEY=
VONAGE_API_SECRET=
FROM_PHONE_NUMBER=
```

### Setting up Node.js as a Web Application Server

To complete our web application, we will be adding functionality to our HTML files by using Node.js, Express, and SQLite. For simplicity, we will place all our web application functionality in a single file called `index.js`. Once we have Node.js successfully installed on our system, we will need to add a few more packages to the configuration: Express, Nunjucks, Fetch, and SQLite. 

```powershell
npm install express 

npm install nunjucks 

npm install node-fetch 

npm install sqlite3

npm install dotenv 

npm install @vonage/server-sdk
```

We set up our `index.js` file to use the newly installed libraries and give our application the ability to serve web pages on port 3000. The start of our `index.js` file looks like this: 

```javascript
require("dotenv").config();
const express = require("express");
const nunjucks = require("nunjucks");
const webserver = express();
const Vonage = require("@vonage/server-sdk");
const SMS = require("@vonage/server-sdk/lib/Messages/SMS");

const fetch = (...args) =>
  import("node-fetch").then(({ default: fetch }) => fetch(...args));

webserver.use("/assets", express.static("assets"));

nunjucks.configure("html", { autoescape: false, express: webserver });

webserver.use(express.json());

webserver.use(express.urlencoded({ extended: true }));

// Global database
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("reservations.db");

const vonage = new Vonage({
  apiKey: process.env.VONAGE_API_KEY,
  apiSecret: process.env.VONAGE_API_SECRET,
});

webserver.listen(3000);
```

A few notes about the code:

* We are calling the Express instance web server 
* We place our three HTML files (`index.html`, `error.html`, `confirmation.html`) in a subdirectory called HTML that Nunjucks is configured to look at.
* We have set SQLite to use a database called `reservations.db` which will be in the root directory of this web application. 
* We are hiding the API Key and API Secret variables that were given to us by Vonage Messages API in a `.env` file, but you will need to substitute these variables with your own secured credentials. 

We are setting the web server to listen to web requests on port 3000. This means that to run this application, you will need to specify this port, for example, http://localhost:3000.

### Using Node.js as a Web Application Server 

We set our `index.js` code to provide three functions:

* Setup the database to store reservation requests (`reservations.db`) 
* Display a homepage where a student can submit an appointment request (`index.html`)
* Process the student reservation request sent to `/schedule` and upon review of the submission, respond with either success (`confirmation.html`) or error (`error.html`)

`SetUpDatabase();`

`DisplayHomePage();`

`PostSchedule();`

### Setting up the Database

In this project, we are using SQLite as the backend database to store our information. However, you may use any database that works with Node.js.

```javascript
function SetUpDatabase() {
  db.serialize(() => {
    db.run(
      "CREATE TABLE if not exists Appointments (appointmentdate text,    appointmenttime text, professorname text, studentfirstname text, studentlastname text, studentphonenumber text, studentnotes text)"
    );
  });
}

```

A few notes about this function: 

* This will look to see if an appointments table exists in the `reservations.db` database; if the table does not exist, it will create it
* Depending on the database system you decide to use with Node.js, you will want to change the appointment date and appointment time to work with that engine's datetime functions

### Setting up the Homepage

Our `DisplayHomePage()` function simply listens for the request at the root of the directory ('/') and then renders our `index.html` file found in the HTML directory. You’ll remember we already set up the `index.html` file to be the office hours reservation form.

```javascript
function DisplayHomePage() {
  // Displaying Homepage after reading an HTML file locally

  webserver.get("/", function (req, res) {
    res.render("index.html");
  });
}

```

### Setting up the Post Schedule Function

`PostSchedule()` is the workhorse of our web application. This process will listen for the `/schedule` handler and do some basic error checking of user input. If the submission data passes our rudimentary error checking process, we will save this information into our appointments table in the `reservations.db` database. We then encapsulate this information into a JSON object that we send to the backend Vonage Messages API for texting a confirmation message. 

```javascript
function PostSchedule() {
  // POST /new Route Handler
  webserver.post("/schedule", function (req, res) {
    // Student info/variables collected from HTML form

    let professorname = req.body.ProfessorName;
    let appointmentdate = req.body.AppointmentDate;
    let appointmenttime = req.body.AppointmentTime;
    let studentfirstname = req.body.studentfirstname;
    let studentlastname = req.body.studentlastname;
    let studentphonenumber = req.body.studentphonenumber;
    let studentnotes = req.body.studentnotes;

    // Text message info sent to Student
    let message =
      "Dear " +
      studentfirstname +
      " " +
      studentlastname +
      "," +
      " you have successfully booked your appointment! Here are your additional notes: " +
      studentnotes;

    let ValidationCheck = true; // Assume success, prove otherwise
    let ErrorMessage = "";

    if (appointmentdate == "") {
      ValidationCheck = false;
      ErrorMessage = ErrorMessage + "<li>Enter an appointment date</li>";
    } else if (appointmenttime == "" || !appointmenttime) {
      ValidationCheck = false;
      ErrorMessage = ErrorMessage + "<li>Enter an appointment time</li>";
    } else if (professorname == "") {
      ValidationCheck = false;
      ErrorMessage = ErrorMessage + "<li>Select a Professor</li>";
    } else if (studentfirstname == "") {
      ValidationCheck = false;
      ErrorMessage = ErrorMessage + "<li>Enter a Student first name</li>";
    } else if (studentlastname == "") {
      ValidationCheck = false;
      ErrorMessage = ErrorMessage + "<li>Enter a Student last name</li>";
    } else if (studentphonenumber == "") {
      ValidationCheck = false;
      ErrorMessage = ErrorMessage + "<li>Enter a mobile phone number</li>";
    }

    if (ValidationCheck == false) {
      res.render("error.html", {
        ProfessorName: professorname,
        StudentName: studentfirstname + " " + studentlastname,
        AppointmentDate: appointmentdate,
        AppointmentTime: appointmenttime,
        StudentNotes: studentnotes,
        StudentPhoneNumber: studentphonenumber,
        ErrorMessage: ErrorMessage,
      });
    } else {
```

A few notes about this code:

* Our Express instance named web server is listening for a post sent to `/schedule` and only executes should this condition arise
* We have created the following Node.js variables to the corresponding HTML request form name/value pairs:

```javascript
  professorname = req.body.ProfessorName 
  appointmentdate = req.body.AppointmentDate 
  appointmenttime = req.body.AppointmentTime 
  studentfirstname = req.body.studentfirstname 
  studentlastname = req.body.studentlastname 
  studentphonenumber = req.body.studentphonenumber 
  studentnotes = req.body.studentnotes
```

* Our Boolean `ValidationCheck` variable tests for empty string data and is set to false on failure. You’ll want to make additional error checking for other bad data scenarios, such as invalid appointment dates and times
* If an error is encountered, we render the `error.html` page, which includes setting the Nunjucks variable `{{ErrorMessage}}` with a description of the problem
* Upon `ValidationCheck` success (returning: `true`) we will continue to add the appointment data to the appointments table and send the text confirmation using Vonage's Messaging API

Upon successful input validation, we now encapsulate the message into a JSON object that we will send to Vonage. We created the instance of the Vonage client class, initialized it with the Vonage API Key and Secret that you have previously added to your .env file, and the variables needed are the phone number, the to text phone number, the message text, and our API Key and API Secret.

```javascript
else {

    vonage.messages.send(
      new SMS(message, studentphonenumber, process.env.FROM_PHONE_NUMBER),
      (err, data) => {
        if (err) {
          console.error(err);
        } else {
          console.log(data.message_uuid);
        }
      }
    );

    // Build SQL string --> insert string to add record to appointments table
    let sqlstring =
      "INSERT INTO Appointments (appointmentdate, appointmenttime, professorname, studentfirstname, studentlastname, studentphonenumber, studentnotes) " +
      "VALUES (?, ?, ?, ?, ?, ?, ?)";

    // Execute SQL string into database (Using paramaterized queries to prevent SQL injection)
    db.run(
      sqlstring,
      appointmentdate,
      appointmenttime,
      professorname,
      studentfirstname,
      studentlastname,
      studentphonenumber,
      studentnotes
    );
    
    // For testing purposes query all records in appointments table and display to console
    // The last record shown should be the record we just inserted
    db.each(
      "SELECT appointmentdate, appointmenttime, professorname, studentfirstname, studentlastname info FROM Appointments",
      (err, row) => {
        console.log(
          row.appointmentdate +
            ": " +
            row.appointmenttime +
            ":" +
            row.professorname
        );
      }
    );

    res.render("confirmation.html", {
      ProfessorName: professorname,
      StudentName: studentfirstname + " " + studentlastname,
      AppointmentDate: appointmentdate,
      AppointmentTime: appointmenttime + ":00 AM",
      StudentNotes: studentnotes,
      StudentPhoneNumber: studentphonenumber,
    });
}
```

We then build our SQL insert statement using the variables we set from the HTML submission form, and we run that statement using the `db.run` function. Finally, we render the `confirmation.html` page setting for the Nunjucks variables to be displayed. 

## Next Steps

We always welcome community involvement. Please feel free to [join us on GitHub](https://github.com/Vonage/) and the [Vonage Community Slack](https://developer.nexmo.com/community/slack) or send us a message on [Twitter](https://twitter.com/VonageDev).
