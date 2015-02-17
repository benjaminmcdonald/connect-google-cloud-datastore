#connect-google-cloud-datastore

This is a simple session store for connect using [Google Cloud Datastore](https://cloud.google.com/datastore/ 'Cloud Datastore - NoSQL Database for Cloud Data Storage').

It uses the [Google Cloud Node.js Client](https://www.npmjs.org/package/gcloud), which you are probably using already as a data storage for your project.

## Installation
	$ npm install connect-google-cloud-datastore
	  

## Options
Authenticated `gcloud.datastore.dataset` instance is required. An existing dataset can be passed directly using the `dataset` option or created for you using `credentials` and `projectId` options.
  - `dataset` An existing, authenticated `gcloud.datastore.dataset` created using [gcloud npm module](https://www.npmjs.org/package/gcloud);
  - `credentials`, `projectId` your project id copied from [Google Developer Console](https://console.developers.google.com/project) and Credentials object – JSON key downloaded from the [Google Developer Console](https://console.developers.google.com/project). Could be omitted if initialised via passed `gcloud.datastore.dataset` option;


## Usage
We pass `express-session` to required `connect-google-cloud-datastore` module in order to extend default connect `session.Store`:
````javascript
var session = require('express-session');
var SessionStore = require('connect-google-cloud-datastore')(session);

var gcloud = require('gcloud');
var dataset = gcloud.datastore.dataset({
  credentials: require('path/to/your/credentials.json'),
  projectId: process.env.GAE_LONG_APP_ID
});

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new SessionStore({
    dataset: dataset
  }),
  resave: true,
  saveUninitialized: true
}));
````