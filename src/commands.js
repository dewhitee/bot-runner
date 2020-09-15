const config = require('./config.json');
const fs = require('fs');

module.exports = {
    getCommand: getCommand,
    setCommand: setCommand,
}

function getCommand(botName, cmdType) {
    for (bot of config.commands[cmdType]) {
        if (bot.botName == botName) {
            return bot.cmd;
        }
    }
    return config.commands.default[cmdType];
}

function setCommand(botName, cmdType, cmd) {
    if (!contains(fileName, cmdType)) {

        let bot = {
            botName: botName,
            cmd: cmd
        };

        config.commands[cmdType].push(bot);

        let data = JSON.stringify(config, null, 2);

        fs.writeFile('config.json', data, err => {
            if (err) throw err;
        });

        console.log("Wrote to the config successfully! (" + botName + ")");

    } else {
        console.log("Config already contains " + cmdType + " command for the " + botName + " bot.");
    }
}

function contains(botName, cmdType) {
    for (bot of config.commands[cmdType]) {
        if (bot.botName == botName) {
            return true;
        }
    }
    return false;
}