const { gitFolderExists } = require('./paths');
const cp = require('child_process');
const conf = require('./config.json');

$("#bots").on('change', () => {
    const name = require('./bot.js').getBotName();
    $("#bot-repo-button").attr("disabled", !gitFolderExists(name));

    const updateCmd = require('./commands.js').getCommand(name, 'update');
    $("#update-cmd").text(updateCmd);

    $("#bot-config-button").attr("disabled", !require('./paths').botConfigExists(name));

    $("#bot-update").text(name);
    $("#time-updated").text(require('./time').getTime(name, 'update'));
    $("#bot-build").text(name);
    $("#time-build").text(require('./time').getTime(name, 'build'));
});

$("#config-button").on('click', () => {
    cp.exec(conf.paths.default.config, { cwd: ".", detached: false }, (error, stdout) => {
        if (error) {
            console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
        } else {
            console.log(stdout);
        }
    });
});

$("#repo-button").on('click', () => {
    require('electron').shell.openExternal('https://github.com/dewhitee/bot-runner');
});

$("#bot-repo-button").on('click', () => {
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
});

$("#bot-config-button").on('click', () => {
    const index = require('./bot.js').getBotIndex();

    cp.exec(conf.paths.bots[index].config, { cwd: ".", detached: false }, (error, stdout) => {
        if (error) {
            console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
        } else {
            console.log(stdout);
        }
    });
});
