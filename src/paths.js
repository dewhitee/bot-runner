const config = require('./config.json');

module.exports = {
    packageJsonPath:    (fileName) => { return `.\\bots\\${fileName}\\package.json`; },
    gitFolderPath:      (fileName) => { return `.\\bots\\${fileName}\\.git`; },
    gitFolderExists:    (fileName) => { return require('fs').existsSync(module.exports.gitFolderPath(fileName)); },
    botConfigExists:    botConfigExists,
    getPath:            getPath,
    setPaths:           setPaths
}

function botConfigExists(botName) {
    return getPath(botName, 'config') != "";
}

function getPath(botName, path) {
    return config.paths.bots[getBotPathsIndex(botName)][path];
}

function getBotPathsIndex(botName) {
    for (let i = 0; i < config.paths.bots.length; i++) {
        if (config.paths.bots[i].name == botName) {
            return i;
        }
    }
    return -1;
}

function setPaths(botName, paths) {
    // if config !contains this bot
    if (getBotPathsIndex(botName) === -1) {
        let path = {
            name:   botName,
            config: paths['config'],
        };
        config.paths.bots.push(path);

        let data = JSON.stringify(config, null, 2);

        fs.writeFile('./src/config.json', data, err => {
            if (err) throw err;
        });

        console.log("Wrote to the config successfully! (" + botName + ")");
    } else {
        console.log("Config already contains paths for the " + botName + " bot.");
    }
}
