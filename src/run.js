const { exec, execSync, spawn } = require('child_process');
const process = require('process');
const shell = require('shelljs');
const s = require('./status.js');
const Status = require('./status.js');
const fkill = require('fkill');
var $ = require('jquery');
const { pid } = require('process');

module.exports = {
    stopBot: stopBot,
}

var running = false;
var botProcess = undefined;
var currentBotName = 'None';
var timeCreated = '';
const processNameConstant = '"BotRunnerBotProcess"';

function onWindows(botName) {
    const commandRun = 'cd ./bots/' + botName + ' && start ' + processNameConstant + ' node .';

    try {
        console.log('Executing ' + commandRun);

        var directoryName = '';
        const commandCheckDir = '.\\src\\shell\\currbasename.sh';
        console.log('Starting the ' + botName + '!');

        Status.updateStatus(Status.status.RUNNING);

        botProcess = exec(commandRun, { cwd: ".", detached: false }, (error, stdout, stderr) => {
            if (error) {
                console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
            } else {
                console.log(stdout);
                return;
            }
        });
        
        let currentTime = new Date();
        let hh = currentTime.getHours();
        let mm = currentTime.getMinutes();
        let ss = currentTime.getSeconds();
        timeCreated = hh + ":" + mm + ":" + ss;
        console.log('Time of bot creation is: ' + timeCreated);

        console.log('BotProcess (Spawning node . under the ' + processNameConstant + ' taskname)PID: ' + botProcess.pid);
        console.log('BotProcess: ' + botProcess);

        running = true;
    } catch (e) {
        console.log("Something went wrong!");
        Status.updateStatus(Status.status.STOP);
    }

    try {

    } catch (e) {

    }
}

function stopBot() {
    try {
        if (botProcess != undefined) {
            console.log('Killing the bot!!!');
            console.log('Trying to kill the bot with the PID = ' + botProcess.pid);

            // if (process.kill(botProcess.pid)) {
            //     console.log('KILLED!');
            // } else {
            //     console.log('FUCK!');
            //     Status.updateStatus(Status.status.RUNNING);
            // }

            // let botKillingProcess = exec('taskkill /IM ' + processNameConstant + ' /T /F', { cwd: ".", detached: false }, (error, stdout, stderr) => {
            //     if (error) {
            //         console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
            //     } else {
            //         console.log(stdout);
            //         return;
            //     }
            // });

            const botKillingCommand = `taskkill /IM node.exe /T /F /FI "CPUTIME le ${timeCreated}" /FI "WINDOWTITLE ne Botrunner"`;
            
            let botKillingProcess = exec(botKillingCommand, { cwd: ".", detached: false }, (error, stdout, stderr) => {
                if (error) {
                    console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
                } else {
                    console.log(stdout);
                    return;
                }
            });

            // let powerKillingProcess = exec(".\\src\\shell\\killprocess.ps1", {shell: 'powershell.exe', cwd: "."});

            // powerKillingProcess.stderr.on("data", function (data) {
            //     console.log("Powershell Errors: " + data);
            // });
            // powerKillingProcess.on("exit", function () {
            //     console.log("Powershell Script finished");
            // });
            // powerKillingProcess.stdin.end(); //end input

            

            Status.updateStatus(Status.status.STOP);
        } else {
            console.log('None of the bots are running');
            Status.updateStatus(Status.status.STOP);
        }
    } catch (e) {
        console.log(e);
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