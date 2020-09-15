const $ = require('jquery');
const fs = require('fs');
const { setCommand } = require('./commands.js');
const config = require('./config.json');

const getPackageJsonPath = (fileName) => {
    return '.\\bots\\' + fileName + '\\package.json';
}

const getAuthorName = (fileName) => {
    const defaultPath = getPackageJsonPath(fileName);
    if (fs.existsSync(defaultPath)) {
        let rawData = fs.readFileSync(defaultPath);
        let data = JSON.parse(rawData);
        const authorName = data['author'];
        return authorName;
    }
    console.warn(fileName + " don't have an author!");
    return '';
}

$(document).ready(async function () {
    const files = fs.readdirSync('./bots/');

    for (fileName of files) {
        const authorName = getAuthorName(fileName);
        console.log("Author of " + fileName + " is " + authorName);

        let option = document.createElement('option');
        option.id = fileName;
        
        if (authorName === '') {
            option.text = fileName;
        } else {
            option.text = fileName + ' by ' + authorName;
        }

        // TODO: use package.json name field to get the name of the bot.

        setCommand(fileName, 'run', config.commands.default.run);
        setCommand(fileName, 'update', config.commands.default.update);

        document.querySelector('#bots').add(option, null);
    }
});