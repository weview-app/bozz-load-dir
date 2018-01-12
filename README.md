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

#### user.events.js (Object version)

```javascript
const UserSession = require(`./model/UserSession`);

module.exports = {
  `user:loggedIn`  : UserSession.start,
  `user:loggedOut` : UserSession.end,
};
```

#### user.events.js (Method version)

When you export a method insteadof an object, you have access to the `ms` instance in this method :
```javascript
module.exports = ms => ({
  `user:loggedIn`  : user => ms.request(`user-session:start`, user),
  `user:loggedOut` : user => ms.request(`user-session:end`, user),
});
```

## Usage

```javascript
const bozz        = require(`bozz`);
const bozzLoadDir = require(`bozz-load-dir`);
const ms          = bozz.createMs();

ms.use(bozzLoadDir);
```
That's all. Enjoy !