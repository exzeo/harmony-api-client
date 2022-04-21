# Harmony API Client

### Description
The Harmony API Client is an example application designed to show
how to consume the Harmony API. This application is meant for people in the
insurance industry (agents and others) who would like to be able to quickly 
create quotes, update quotes, and bind quotes into policies. This Application
is meant to show some of the possibilities and different ways to consume the data.
The libraries used are for ease of use and are not required for consumption in your
own application

[Harmony API Data Website](#)

### Requirements to Consume API

In order to consume the API you must first get the proper credentials from our team
at Exzeo. You will need to obtain both a Client ID and a Client Secret. They will need
to be added to your .env file to make successful network requests.

### Launching the App Locally 

* Clone the repository from [https://github.com/exzeo/harmony-api-client](https://github.com/exzeo/harmony-api-client).
* `npm install` in the terminal at the root directory.
* create a .env.local file and add your credentials
  * REACT_APP_CLIENT_ID="your ID"
  * REACT_APP_CLIENT_SECRET="your secret"

* `npm start` will launch the application at [http://localhost:8383](http://localhost:8383),
the port is set in the .env file
