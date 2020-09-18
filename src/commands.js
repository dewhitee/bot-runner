const config = require('./config.json');
const fs = require('fs');

module.exports = {
    getCommand: getCommand,
    setCommands: setCommands,
}

function getCommand(botName, cmdType) {
    return config.commands.bots[getBotCommandsIndex(botName)][cmdType];
}

function getBotCommandsIndex(botName) {
    for (let i = 0; i < config.commands.bots.length; i++) {
        if (config.commands.bots[i].name == botName) {
            return i;
        }
    }
    return -1;
}

function setCommands(botName, commands) {
    // if config !contains this bot
    if (getBotCommandsIndex(botName) === -1) {
        let bot = {
            name:       botName,
            run:        commands['run'],
            update:     commands['update'],
            build:      commands['build']
        };
        config.commands.bots.push(bot);

        let data = JSON.stringify(config, null, 2);

        fs.writeFile('./src/config.json', data, err => {
            if (err) throw err;
        });

        console.log("Wrote to the config successfully! (" + botName + ")");
    } else {
        console.log("Config already contains commands for the " + botName + " bot.");
    }
}
