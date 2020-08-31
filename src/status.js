const status = {
    RUNNING: 'running',
    STOP: 'stop',
}

module.exports = {
    updateStatus: updateStatus,
    status: status,
}

//var currentStatus = status.STOP;

function updateStatus(newStatus) {
    currentStatus = newStatus;

    console.log('Status update to ' + newStatus);

    if (newStatus == status.RUNNING) {
        document.getElementById('status').textContent = 'Running';
        console.log('running...');
    } else if (newStatus == status.STOP) {
        document.getElementById('status').textContent = 'Stopped';
        console.log('stopping...');
    }
}