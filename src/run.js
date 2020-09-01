const { exec, execSync, spawn } = require('child_process');
const process = require('process');
const shell = require('shelljs');
const Status = require('./status.js');

module.exports = {
    stopBot: stopBot,
    updateBots: updateBots,
}

var running = false;
var botProcess = undefined;
var currentBotName = 'None';
var timeCreated = '';
const processNameConstant = '"BotRunnerBotProcess"';

//const updateCheckBox = $(document).getElementById('npm-install-checkbox');
//const runButton = $(document).getElementById('run-button');

function onWindows(botName) {
    let commandRun;
    if (!document.getElementById('npm-install-checkbox').checked) {
        commandRun = 'cd ./bots/' + botName + ' && start ' + processNameConstant + ' node .';
    } else {
        commandRun = 'cd ./bots/' + botName + ' && npm install && start ' + processNameConstant + ' node .';
        console.log("Running npm install!");
    }
    currentBotName = botName;

    try {
        console.log('Executing ' + commandRun);
        console.log('Starting the ' + botName + '!');

        Status.updateStatus(Status.status.RUNNING, botName);

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
        let ss = currentTime.getSeconds() > 50 ? 50 : currentTime.getSeconds();
        timeCreated = ('00' + hh).slice(-2) + ':' + ('00' + mm).slice(-2) + ':' + ('00' + ss).slice(-2);
        console.log('Time of bot creation is: ' + timeCreated);

        console.log('BotProcess (Spawning node . under the ' + processNameConstant + ' taskname)PID: ' + botProcess.pid);
        console.log('BotProcess: ' + botProcess);

        document.getElementById('run-button').disabled = true;
        document.getElementById('stop-button').disabled = false;
        document.getElementById('bots').disabled = true;

        running = true;
        
    } catch (e) {
        console.log("Something went wrong!");
        Status.updateStatus(Status.status.STOP, botName);
    }
}

function updateButtons() {
    document.getElementById('run-button').disabled = false;
    document.getElementById('stop-button').disabled = true;
    document.getElementById('bots').disabled = false;
}

/**
 * @brief Stops the bot by killing it's node processes.
 * @returns True if bot has been successfully terminated.
 */
function stopBot() {
    try {
        if (botProcess != undefined && !botProcess.killed && running) {
            console.log('Killing the bot!!!');
            console.log('Trying to kill the bot with the PID = ' + botProcess.pid);

            const botKillingCommand = `taskkill /IM node.exe /T /F /FI "CPUTIME le ${timeCreated}" /FI "WINDOWTITLE ne Botrunner"`;
            
            let botKillingProcess = exec(botKillingCommand, { cwd: '.', detached: false }, (error, stdout, stderr) => {
                if (error) {
                    console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
                } else {
                    console.log(stdout);
                    if (stdout == 'INFO: No tasks running with the specified criteria.') {
                        running = false;
                    }
                    return;
                }
            });

            Status.updateStatus(Status.status.STOP, '');
            updateButtons();
            running = false;
        } else {
            console.log('None of the bots are running');
            updateButtons();
            running = false;
            Status.updateStatus(Status.status.NOTHING, '');
        }
    } catch (e) {
        console.log(e);
        return false;
    }
    return true;
}

function updateBotsRecursively(files, i) {
    if (files.length > i) {
        const currentFile = files[i];
        console.log('Starting ' + currentFile + ' update using npm install');
        Status.updateStatus(Status.status.UPDATING, files[i]);
        const updatingProcess = exec('cd ./bots/' + currentFile + ' && npm install', { cwd: '.', detached: true }, (error, stdout, stderr) => {
            if (error) {
                console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
            } else {
                console.log(stdout);
                console.log('Successfully updated ' + currentFile + ' with npm install');
                if (files.length > i + 1) {
                    updateBotsRecursively(files, i + 1);
                } else {
                    console.log('All bots were successfully updated!');
                    Status.updateStatus(Status.status.NOTHING, '');
                    document.getElementById('update-button').disabled = false;
                }
            }
        });
    }
}

function updateBots() {
    try {
        document.getElementById('update-button').disabled = true;
        const files = require('fs').readdirSync('./bots/');
        updateBotsRecursively(files, 0);
    } catch(e) {
        console.log(e);
    }
}

function run() {
    if (running) {
        console.log("Already running!");
    }
    console.log('Run!');

    let bots = document.getElementById("bots");
    let botsString = bots.options[bots.selectedIndex].value;
    const botName = botsString.split(' ')[0];
    console.log('Bot name is ' + botName);

    switch (process.platform) {
        case 'win32': onWindows(botName); break;
        default: console.log('Something went wrong while checking your OS!');
    }
}