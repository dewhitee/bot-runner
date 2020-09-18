const cp = require('child_process');
const conf = require('./config.json');

function openConfig() {
    cp.exec(conf.paths.default.config, { cwd: ".", detached: false }, (error, stdout) => {
        if (error) {
            console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
        } else {
            console.log(stdout);
        }
    });
}

function openRepo() {
    require('electron').shell.openExternal('https://github.com/DewhiteE/bot-runner');
}

function openBotConfig() {
    const index = require('./bot.js').getBotIndex();
    
    cp.exec(conf.paths.bots[index].config, { cwd: ".", detached: false }, (error, stdout) => {
        if (error) {
            console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
        } else {
            console.log(stdout);
        }
    });
}

function openBotRepo() {
    const name = require('./bot.js').getBotName();
    const command = 'cd ./bots/' + name + ' && git remote get-url origin';

    cp.exec(command, { cwd: ".", detached: false }, (error, stdout) => {
        if (error) {
            console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
        } else {
            console.log(stdout);

            const url = stdout.slice(0, -5);
            require('electron').shell.openExternal(url);
            return;
        }
    }); 
}
