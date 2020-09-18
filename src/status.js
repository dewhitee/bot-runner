const status = {
    ERROR:          'error',
    INFO:           'info',
    WARNING:        'warning',
    DEFAULT:        'default',
    RUNNING:        'running',
    STOP:           'stop',
    NOTHING:        'nothing',
    UPDATING:       'updating',
    BADSTOP:        'badstop',
    BADUPDATE:      'badupdate',
    BADRUN:         'badrun',
    PARTIALUPDATE:  'partialupdate',
    BUILDING:       'building',
    BADBUILD:       'badbuild',
}

module.exports = {
    updateStatus: updateStatus,
    status: status,
}

function setStatusText(text, style = status.DEFAULT) {
    $('#status').text(text);
    switch (style) {
        case status.ERROR:
            $('#status').css({ 'color': 'white', 'background-color': 'darkred' });
            break;
        case status.WARNING:
            $('#status').css({ 'color': 'black', 'background-color': 'yellow' });
            break;
        case status.INFO:
            $('#status').css({ 'color': 'black', 'background-color': '#99ff66' });
            break;
        case status.DEFAULT:
            $('#status').css({ 'color': 'green', 'background-color': 'greenyellow' });
            break;
        default:
            break;
    }
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
            setStatusText(pretext + 'Updating ' + botName + '...', status.INFO);
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
        case status.PARTIALUPDATE:
            setStatusText('Some bots were not updated! Check the developer console for more info.', status.WARNING);
            break;
        case status.BUILDING:
            setStatusText('Building ' + botName, status.INFO);
            break;
        case status.BADBUILD:
            setStatusText('Something went wrong while trying to build ' + botName, status.ERROR);
            break;
        default:
            break;
    }
}