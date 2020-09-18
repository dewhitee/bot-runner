const { status, updateStatus } = require('./status.js');
const { exec } = require('child_process');
const { getCommand } = require('./commands.js');
const process = require('process');

module.exports = {
    stopBot: stopBot,
    updateBots: updateBots,
}

let running = false;
let botProcess = undefined;
let currentBotName = 'None';
let timeCreated = '';

const processNameConstant = '"BotRunnerBotProcess"';

function startBotProcess(commandRun, botName) {
    return exec(commandRun, { cwd: ".", detached: false }, (error, stdout, stderr) => {
        if (error) {
            console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);

            updateButtons(false);
            updateStatus(status.BADRUN, botName);
        } else {
            console.log(stdout);
            return;
        }
    });
}

function formatTime(hh, mm, ss) {
    return ('00' + hh).slice(-2) + ':' + ('00' + mm).slice(-2) + ':' + ('00' + ss).slice(-2); 
}

function getTimeCreated() {
    let currentTime = new Date();
    let hh = currentTime.getHours();
    let mm = currentTime.getMinutes();

    // By some reason, CPUTIME filter of taskkill shell command do not recognize seconds value above 50
    let ss = currentTime.getSeconds() > 50 ? 50 : currentTime.getSeconds();
    return formatTime(hh, mm, ss); 
}

function getCurrentTime() {
    let currentTime = new Date();
    let date = ("0" + currentTime.getDate()).slice(-2);
    let month = ("0" + (currentTime.getMonth() + 1)).slice(-2);
    let year = currentTime.getFullYear();
    let hh = currentTime.getHours();
    let mm = currentTime.getMinutes();
    let ss = currentTime.getSeconds();
    return `${date}/${month}/${year} ${formatTime(hh, mm, ss)}`;
}

function getRunBotCommand(botName, startCmd) {
    const runCmd = getCommand(botName, 'run');
    const cdCmd = 'cd ./bots/' + botName;

    if (!$('#npm-install-checkbox').attr('checked')) {
        return `${cdCmd} && ${startCmd} ${runCmd}`;
    } else {
        const updateCmd = getCommand(botName, 'update');
        console.log("Running " + updateCmd + "!");
        return `${cdCmd} && ${updateCmd} && ${startCmd} ${runCmd}`;
    }
}

function startBot(botName, cmd) {
    try {
        console.log('Executing ' + cmd);
        console.log('Starting the ' + botName + '!');
        currentBotName = botName;
        updateStatus(status.RUNNING, botName);

        botProcess = startBotProcess(cmd, botName);
        timeCreated = getTimeCreated();

        console.log('Time of bot creation is: ' + timeCreated);
        console.log('BotProcess (Spawning node . under the ' + processNameConstant + ' taskname) PID: ' + botProcess.pid);

        running = true;
        updateButtons(running);

    } catch (e) {
        console.log("Something went wrong!");
        updateStatus(status.STOP, botName);
    }
}

function onWindows(botName) {
    startBot(botName, getRunBotCommand(botName, `start ${processNameConstant}`));
}

function onDarwin(botName) {
    startBot(botName, getRunBotCommand(botName, `bash - c "exec -a ${processNameConstant}`));
}

function updateButtons(isRunning = false) {
    if (!isRunning) {
        $('#stop-button').attr('disabled', true);
        $('#run-button, #bots').attr('disabled', false);
    } else {
        $('#stop-button').attr('disabled', false);
        $('#run-button, #bots').attr('disabled', true);
    }
}

function onStop(status) {
    updateStatus(status, '');
    updateButtons();
    running = false;
}

/**
 * @brief Stops the bot by killing it's node processes.
 * @returns True if bot has been successfully terminated.
 */
function stopBot() {
    try {

        if (botProcess != undefined && !botProcess.killed && running) {

            const botKillingCommand = `taskkill /IM node.exe /T /F /FI "CPUTIME le ${timeCreated}" /FI "WINDOWTITLE ne Botrunner"`;
            
            let botKillingProcess = exec(botKillingCommand, { cwd: '.', detached: false }, (error, stdout, stderr) => {
                if (error) {
                    console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
                    updateStatus(status.BADSTOP, currentBotName);
                } else {
                    console.log(stdout);
                    if (stdout == 'INFO: No tasks running with the specified criteria.') {
                        running = false;
                    }
                    return;
                }
            });

            onStop(status.STOP);

        } else {
            console.log('None of the bots are running');
            onStop(status.NOTHING);
        }

    } catch (e) {
        console.log(e);
        return false;
    }

    return true;
}

function updateBotsRecursively(files, i, successes) {
    if (files.length > i) {
        const currentFile = files[i];
        const updateCmd = getCommand(currentFile, 'update');
        console.log('Starting ' + currentFile + ' update using ' + updateCmd);
        updateStatus(status.UPDATING, files[i], `(${i + 1} of ${files.length}) `);
        let updatingProcess = exec(`cd ./bots/${currentFile} && ${updateCmd}`, { cwd: '.', detached: true }, (error, stdout) => {
            if (error) {
                console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
                return;
            } else {
                console.log(stdout);
                console.log('Successfully updated ' + currentFile + ' with npm install');
                if (files.length > i + 1) {
                    updateBotsRecursively(files, i + 1, successes + 1);
                } else {
                    if (successes == files.length - 1) {
                        console.log('All bots were successfully updated!');
                        updateStatus(status.NOTHING, '');
                    } else {
                        console.warn('Some bots was not updated!');
                        updateStatus(status.PARTIALUPDATE, '');
                    }
                    $('#update-button').attr('disabled', false);
                    const currentTime = getCurrentTime();
                    $("#time-updated").text(currentTime);
                    
                    const fs = require('fs');
                    fs.writeFile('./saved/timeUpdated.txt', currentTime, err => {
                        if (err) {
                            console.error(err);
                            return;
                        }
                    });
                }
            }
        });
        updatingProcess.stderr.on('data', (data) => {
            console.warn('stderr: ' + data);
            if (data.indexOf('is not recognized') !== -1) {

                // If there are bots left
                if (files.length > i + 1) {
                    updateBotsRecursively(files, i + 1, successes);
                } else {
                    console.warn("Killing process");
                    updateStatus(status.BADUPDATE);
                    $('#update-button').attr('disabled', false);
                    updatingProcess.kill();
                }
            }
        });
        updatingProcess.on('close', (code) => {
            console.log('closing code: ' + code);
        });
    }
}

function updateBots() {
    try {
        $('#update-button').attr('disabled', true);
        const files = require('fs').readdirSync('./bots/');
        updateBotsRecursively(files, 0, 0);
    } catch(e) {
        console.log(e);
        updateStatus(status.BADUPDATE);
    }
}

function run() {
    if (running) {
        console.log("Already running!");
    }
    console.log('Run!');

    const botName = require('./bot.js').getBotName();
    console.log('Bot name is ' + botName);

    switch (process.platform) {
        case 'win32':
            onWindows(botName);
            break;
        case 'darwin':
            onDarwin(botName);
            break;
        default: 
            console.log('Something went wrong while checking your OS!');
    }
}