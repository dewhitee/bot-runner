const status = {
    ERROR:      'error',
    WARNING:    'warning',
    DEFAULT:    'default',
    RUNNING:    'running',
    STOP:       'stop',
    NOTHING:    'nothing',
    UPDATING:   'updating',
    BADSTOP:    'badstop',
    BADUPDATE:  'badupdate',
    BADRUN:     'badrun',
}

module.exports = {
    updateStatus: updateStatus,
    status: status,
}

function setStatusText(text, style = status.DEFAULT) {
    $('#status').text(text);
    switch (style) {
        case status.ERROR:
            setErrorStyle();
            break;
        case status.WARNING:
            setWarningStyle();
            break;
        case status.DEFAULT:
            setDefaultStyle();
            break;
        default:
            break;
    }
}

function setErrorStyle() {
    $('#status').css({ 'color': 'white', 'background-color': 'darkred' });
}

function setWarningStyle() {
    $('#status').css({ 'color': 'black', 'background-color': 'yellow' });
}

function setDefaultStyle() {
    $('#status').css({ 'color': 'green', 'background-color': 'greenyellow' });
}

function updateStatus(newStatus, botName = '', pretext = '') {
    switch (newStatus) {
        case status.RUNNING:
            setStatusText('Running ' + botName, status.DEFAULT);
            break;
        case status.STOP:
            setStatusText('Stopped ' + botName, status.DEFAULT);
            break;
        case status.NOTHING:
            setStatusText('Not running', status.DEFAULT);
            break;
        case status.UPDATING:
            setStatusText(pretext + 'Updating ' + botName + '...', status.WARNING);
            break;
        case status.BADSTOP:
            setStatusText('Something went wrong while trying to stop ' + botName, status.ERROR);
            break;
        case status.BADUPDATE:
            setStatusText('Something went wrong while updating the bots ', status.ERROR);
            break;
        case status.BADRUN:
            setStatusText('Something went wrong while trying to run ' + botName, status.ERROR);
            break;
        default:
            break;
    }
}