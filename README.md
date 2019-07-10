# [ABANDONED] Shine

[![npm version](https://badge.fury.io/js/shinets.svg)](https://badge.fury.io/js/shinets)
[![Build Status](https://travis-ci.org/ahasc/Shine.svg?branch=master)](https://travis-ci.org/ahasc/Shine)
[![Maintainability](https://api.codeclimate.com/v1/badges/d4533246f492fcd57251/maintainability)](https://codeclimate.com/github/ahasc/Shine/maintainability)
[![Test Coverage](https://api.codeclimate.com/v1/badges/d4533246f492fcd57251/test_coverage)](https://codeclimate.com/github/ahasc/Shine/test_coverage)

This project is a personnal experimentation of how a NodeJS framework could be. I wanted to take it as a serious library project, with CI, releases on NPM, unit testing, code coverage, and so on. I acknowledge that it's not a very well designed project, efficient nor fully usable for production.


## Installation

In order to use this framework, please initialize a NPM project and execute the following commands :

```shell
npm install --save shinets
```

or

```shell
yarn add shinets
```


## Usage

Shine comes with tools letting you build a REST API quite easily. You can find more complete examples in the examples/ directory of this project.


### Server

The server is the main component of your API, primarly handling requests and executing associated callback throught routers tree. It's a required piece in a Shine project. To initialize a new Server instance, just do the following :

```javascript
const Shine = require('shinets')

const server = new Shine.Server({ ... })
```

Available options :

| option    |   type    |   default   |   description                           | 
| --------- | --------- | ----------- | --------------------------------------- |
| port      | number    | 8000        | The port your application will listen   | 

Then you can start it by calling start() function.

```javascript
server.start() // Prints 'Server is listenning  on port...'
```

Your program is now listening for incoming requests and ready to reply.


### Router

You can organize you application into routers, which are representing your API routes hierarchy. They gather routes under a common endpoint, and are organized as a tree one to another.

To create a new router, just do as follow :

```javascript
const Shine = require('shinets')

const router1 = new Shine.Router()
```

At this stage, your router is not linked to your server. To get it right, you must add some routes and then link it to the Server.

```javascript
router1.route('hello', (req, res) => {
  res.write("Hi there !")
  res.end()
}).route('weather', (req, res) => {
  res.write("What a shiny day !")
  res.end()
})

server.attach('api', router1)
```

Above example creates '/api/hello' and '/api/weather' routes. You can also provide routes as parameters of Router constructor, as an array of ( identifier, callback ). 

You can also attach routers each other :

```javascript
router2.route('get', (req, res) => {
  res.write(JSON.stringify({
    firstname: "John",
    lastname:  "Doe"
  }))
})

router1.attach('users', router2)
```

**You must respect an order when attaching routers. The instance you're calling attach() on must previously have been attached to its parent !**

For example, if you have such a structure :

- server
  -  router1
    - router3
      - router4
  - router2

You'd do :

```javascript
server.attach('...', router1)
server.attach('...', router2)

// Need router1 to have been attached to its parent before
router1.attach('...', router3)

// Same for router3
router3.attach('...', router4)
```
