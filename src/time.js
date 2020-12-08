const t = require('../saved/times.json');

module.exports = {
    getTimeCreated: getTimeCreated,
    getCurrentTime: getCurrentTime,
    setTimes: setTimes,
    setNewTime: setNewTime,
    getTime: getTime,
    saveTimeToHistory: saveTimeToHistory
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

function getTime(botName, timeSelect) {
    return t.bots[getBotTimesIndex(botName)][timeSelect];
}

function setNewTime(botName, timeSelect, newValue) {
    const time = require('../saved/times.json');
    time.bots[getBotTimesIndex(botName)][timeSelect] = newValue;
    let data = JSON.stringify(time, null, 2);
    require('fs').writeFile('./saved/times.json', data, err => {
        if (err) throw err;
    });

    if (require('./config.json').other.saveHistory) {
        saveTimeToHistory(botName, timeSelect);
    }
}

function getBotTimesIndex(botName) {
    for (let i = 0; i < t.bots.length; i++) {
        if (t.bots[i].name == botName) {
            return i;
        }
    }
    return -1;
}

function setTimes(botName, times) {
    // if times.json !contains this bot
    if (getBotTimesIndex(botName) === -1) {
        let time = {
            name: botName,
            update: times['update'],
            build: times['build']
        };
        t.bots.push(time);

        let data = JSON.stringify(t, null, 2);

        require('fs').writeFile('./saved/times.json', data, err => {
            if (err) throw err;
        });

        console.log("Wrote to the times.json successfully! (" + botName + ")");
    } else {
        console.log("Times.json already contains " + botName + " bot.");
    }
}

function saveTimeToHistory(botName, timeSelect) {
    const txt = `${botName}, ${timeSelect.toUpperCase()}, ${getTime(botName, timeSelect)}`;
    require('fs').writeFile('./saved/hist.txt', txt, err => {
        if (err) {
            throw err;
        } else {
            console.log(`${txt} was added to history.`);
        }
    });
}
