const { currentBotName } = require("./run");

const status = {
    RUNNING: 'running',
    STOP: 'stop',
    NOTHING: 'nothing',
}

module.exports = {
    updateStatus: updateStatus,
    status: status,
}

//var currentStatus = status.STOP;

function setStatusText(text) {
    document.getElementById('status').textContent = text;
}

function updateStatus(newStatus, botName) {
    if      (newStatus == status.RUNNING) { setStatusText('Running ' + botName); }
    else if (newStatus == status.STOP)    { setStatusText('Stopped ' + botName); }
    else if (newStatus == status.NOTHING) { setStatusText('Not running');        }
}