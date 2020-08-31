const { exec, execSync, spawn } = require('child_process');
const shell = require('shelljs');
const s = require('./status.js');
var $ = require('jquery');

module.exports = {
    stopBot: stopBot,
}

var running = false;
var botProcess = undefined;

function onWindows(botName) {
    const commandRun = 'dir && cd ./bots/' + botName + ' && node .';

    try {
        //s.updateStatus();
        console.log('Executing ' + commandRun);
        //const output = spawn(commandRun, { encoding: "utf-8" });
        //const bat = spawn('cmd.exe', ['/c', 'my.bat']);
        // const outputtest = shell.exec('dir', { cwd: ".." }, (error, stdout, stderr) => {
        //     if (error) {
        //         console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
        //     } else {
        //         console.log(stdout);
        //     }
        // });

        var directoryName = '';
        const commandCheckDir = '.\\src\\shell\\currbasename.sh';
        botProcess = shell.exec(commandRun, { cwd: "." }, (error, stdout, stderr) => {
            if (error) {
                console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
            } else {
                console.log('wa');
                console.log(stdout);
                directoryName = stdout;
                console.log("Directory name = " + stdout);
                return;
            }
        });

        // let child1 = shell.exec('dir', { cwd: "." }, (error, stdout, stderr) => {
        //     if (error) {
        //         console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
        //     } else {
        //         console.log(stdout);
        //     }
        // });

        console.log('Output was:\n', child);
        running = true;
    } catch (e) {
        console.log("Something went wrong!");
    }

    try {

    } catch (e) {

    }
}

function stopBot() {
    try {
        if (botProcess != undefined) {
            console.log('Killing the bot!!!');
            botProcess.kill();
        } else {
            console.log('None of the bots are running');
        }
    } catch (e) {
        return false;
    }
    return true;
}

function run() {
    // Get status here
    console.log('Run!');

    let bots = document.getElementById("bots");
    let botsString = bots.options[bots.selectedIndex].value;
    const botName = botsString.split(' ')[0];
    console.log('Bot name is ' + botName);

    switch (process.platform) {
        case 'win32': onWindows(botName); break;
        default: console.log('Something went wrong while checking your OS!');
    }

    // try {
    //     var shell = WScript.CreateObject("WScript.Shell");
    //     shell.run('cd');
    // } catch (e) {
    //     console.log('Something went wrong again!');
    //     console.log(e);
    // }
}