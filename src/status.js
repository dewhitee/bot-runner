const { currentBotName } = require("./run");

const status = {
    RUNNING: 'running',
    STOP: 'stop',
    NOTHING: 'nothing',
    UPDATING: 'updating',
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
    switch (newStatus) {
        case status.RUNNING:
            setStatusText('Running ' + botName);
            break;
        case status.STOP:
            setStatusText('Stopped ' + botName);
            break;
        case status.NOTHING:
            setStatusText('Not running');
            break;
        case status.UPDATING:
            setStatusText('Updating ' + botName + '...');
            break;
        default:
            break;
    }
}