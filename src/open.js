function openConfig() {
    require('child_process').exec('cd ./src && config.json', { cwd: ".", detached: false }, (error, stdout, stderr) => {
        if (error) {
            console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
        } else {
            console.log(stdout);
            return;
        }
    });
}

function openRepo() {
    require('electron').shell.openExternal('https://github.com/DewhiteE/bot-runner');
}

function openBotRepo() {

    const name = require('./bot.js').getBotName();
    const command = 'cd ./bots/' + name + ' && git remote get-url origin';

    require('child_process').exec(command, { cwd: ".", detached: false }, (error, stdout, stderr) => {
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