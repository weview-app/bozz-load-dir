# Bozz load dir

Plugin for [Bozz](https://www.npmjs.com/package/bozz).

## Principle

This plugin loads all `requests` and `events` files found in the `bozz` directory of your project.

## Installation

Assuming you already have `bozz` installed in your project.
```bash
yarn add bozz-load-dir
```
or
```bash
npm install --save bozz-load-dir
```

## Bozz directory and files

```
MyProject
|-- node_modules/
|-- package.json
|-- bozz
    |-- user.requests.js
    |-- user.events.js
    |-- book.events.js
```

#### user.events.js

```javascript
const UserSession = require(`./model/UserSession`);

module.exports = {
  `user:loggedIn`  : UserSession.start,
  `user:loggedOut` : UserSession.end,
};
```

## Usage

```javascript
const bozz        = require(`bozz`);
const bozzLoadDir = require(`bozz-load-dir`);
const ms          = bozz.createMs();

ms.use(bozzLoadDir);
```
That's all. Enjoy !