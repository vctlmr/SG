# Getting Started 

## Install

Clone the project, then run :

```npm install```

We also need json-server to mock the Api:

```npm install -g json-server```

## Run the app

To run the app we need the node server and the db running with json server

```npm start```

Start json-server watcher, the port used in this project is the 3001:

```json-server --watch db.json --port 3001```

## Tests

Few Tests are implemented for now [WIP], the command to run them is:

```npm test```

Runs the tests available in the project

## Difficulties

I had trouble familiarizing myself with the latest version of react router which allows Action Funtions, provides loaders and error handling specific to routes.

## TODOS

* File with API config
* Improve navigation UX / UI
* Decompose UsersProject view with multiple components ( Modal for example)
* Test E2E with mws and react testing library mocking
* Unit testing formatData() for example

## Improvements ideas

* Better UI / UX ( custom )
* Edit project
* Better sorting
* Searching project by name
* Adding User auth with third-party and handle authorization and protected routes
* Adding database with firebase for example