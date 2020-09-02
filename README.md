# bot-runner
* [General info](#general-info)
* [Techonologies](#technologies)
* [Setup](#setup)

## General info
Simple app for running discord bots.

## Technologies
Project is created with:
* [Node.js](https://nodejs.org/): v12.18.2
* [Electron](https://www.electronjs.org/): ^v10.1.0
* [Bulma](https://bulma.io/): ^v0.9.0
* [JQuery](https://jquery.com/): ^v3.5.1

## Setup
To use this application, you need to run the following command in a terminal while in *botrunner* project directory:
```js
npm start
```

By default, there will be none of the bots available at the start. To be able to run your bots, you need to add the *bots* directory in the *botrunner* project directory.
After you add the *bots* directory, ```git clone``` the bots you want to use in this directory. All the bots you add will appear in the *Choose a bot* selector.
