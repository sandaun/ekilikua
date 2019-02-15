# MEAN Starter Kit

It’s a web APP basic configuration with MEAN stack.

## Content
  - **Express** APP initial structure
  - **Ejs (Embedded Javascript Templates):** Templating language that lets you generate HTML markup with plain JavaScript.
  - **Express ejs layouts:** Layout support for ejs in express.
  - **ESLint:** JavaScript code linting utility used to find problematic patterns or code that doesn't adhere to certain style guidelines.
  - **Nodemon:** Utility that will monitor for any changes in your source and automatically restart your server.
  - **Mongodb:** Open source database management system (DBMS) that uses a document-oriented database model.
  - **Bcrypt:** Password hashing function. 
  - **Express Session:** Store user data between HTTP requests.
  - **Connect Flash:** Uses flash area of the session for storing messages.
  - **Connect Mongo:** Manage a connection to a MongoDB.
  - **Mongoose:** Object Data Modeling (ODM) library for MongoDB and Node.js.
  - **Morgan:** HTTP request logger middleware for node.js.
  - **Reset** CSS stylesheet

## Usage

  - After clone, create a new repository and change github **origin**.
  - Type your database name into **dbName**.
  - Put your custom middlewares into **assets** folder
  - `npm run start` - Runs the app
  - `npm run dev` - Runs the app in dev mode

## Manual Mode
If you want to configure your APP manually:

### Requirements
  - Node.js: JavaScript runtime built on Chrome's V8 JavaScript engine.
  - NPM: Software Package Manager and Installer for Node.js.
  - ESLint.
  - Mongodb. 

### Install

  - `npm install express-generator -g` - Install express-generator globally.
  - `express --ejs --git <APP_NAME>` - Generate basic Web APP structure in actual in current dir, with ejs and gitignore file.
  - `eslint --init` - Install ESLint.
  - `npm i -D nodemon` - Install nodemon like dev-dependency
  - `npm install express-ejs-layouts` - Install express ejs layouts support.
  - `npm install` - Check and install all the dependencies.
  - `git init` - Inits git on project.
  - `npm install mongoose`
  - `npm install morgan`
  - `npm i bcrypt`
  - `npm i express-session`
  - `npm i connect-mongo`
  - `npm i connect-flash`


## Licence

Copyright (c) 2019 JdeJ