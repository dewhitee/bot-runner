const { setCommands } = require('./commands.js');
const { setPaths, botConfigExists } = require('./paths');
const { setTimes, getTime } = require('./time');
const $ = require('jquery');
const config = require('./config.json');
const bot = require('./bot.js');
const file = require('./files.js');

$(async function () {
    const files = require('fs').readdirSync('./bots/');

    for (fileName of files) {
        const authorName = file.getAuthorName(fileName);
        console.log("Author of " + fileName + " is " + authorName);

        let option = document.createElement('option');
        option.id = fileName;

        if (authorName === '') {
            option.text = fileName;
        } else {
            option.text = fileName + ' by ' + authorName;
        }

        // TODO: use package.json name field to get the name of the bot.

        setCommands(fileName, {
            'run': config.commands.default.run,
            'update': config.commands.default.update,
            'build': config.commands.default.build
        });

        setPaths(fileName, {
            'config': '',
        });
        
        setTimes(fileName, {
            'update': '',
            'build': '',
        });

        document.querySelector('#bots').add(option, null);
    }

    const name = bot.getBotName();
    $("#bot-config-button").attr("disabled", !botConfigExists(name));

    $("#time-updated").text(getTime(name, 'update'));
    $("#bot-update").text(name);
    $("#time-build").text(getTime(name, 'build'));
    $("#bot-build").text(name);

    $("#build-button").attr('disabled', !getTime(name, 'build') !== '');
});