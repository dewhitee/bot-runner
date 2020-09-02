const { currentBotName } = require("./run");

const status = {
    RUNNING: 'running',
    STOP: 'stop',
    NOTHING: 'nothing',
    UPDATING: 'updating',
    BADSTOP: 'badstop',
}

const styles = {
    ERROR: 'error',
    WARNING: 'warning',
    DEFAULT: 'default'
}

module.exports = {
    updateStatus: updateStatus,
    status: status,
}

//var currentStatus = status.STOP;

function setStatusText(text, style = styles.DEFAULT) {
    document.getElementById('status').textContent = text;
    switch (style) {
        case styles.ERROR:
            setErrorStyle();
            break;
        case styles.WARNING:
            setWarningStyle();
            break;
        case styles.DEFAULT:
            setDefaultStyle();
            break;
        default:
            break;
    }
}

function setErrorStyle() {
    document.getElementById('status').style.сolor = 'white';
    document.getElementById('status').style.backgroundColor = 'darkred';
}

function setWarningStyle() {
    document.getElementById('status').style.сolor = 'black';
    document.getElementById('status').style.backgroundColor = 'yellow';
}

function setDefaultStyle() {
    document.getElementById('status').style.сolor = 'green';
    document.getElementById('status').style.backgroundColor = 'greenyellow';
}

function updateStatus(newStatus, botName = '', pretext = '') {
    switch (newStatus) {
        case status.RUNNING:
            setStatusText('Running ' + botName, styles.DEFAULT);
            break;
        case status.STOP:
            setStatusText('Stopped ' + botName, styles.DEFAULT);
            break;
        case status.NOTHING:
            setStatusText('Not running', styles.DEFAULT);
            break;
        case status.UPDATING:
            setStatusText(pretext + 'Updating ' + botName + '...', styles.WARNING);
            break;
        case status.BADSTOP:
            setStatusText('Something went wrong while trying tp stop ' + botName, styles.ERROR);
            break;
        default:
            break;
    }
}