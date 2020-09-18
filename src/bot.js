module.exports = {
    getBotName: getBotName,
    getBotIndex: getBotIndex
}

function getBotName() {
    let botsString = $("#bots").val();
    const botName = botsString.split(' ')[0];
    console.log('Bot name is ' + botName);
    return botName;
}

function getBotIndex() {
    let bots = document.getElementById("bots");
    return bots.selectedIndex;
}