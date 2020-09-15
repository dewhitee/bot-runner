module.exports = {
    getBotName: getBotName
}

function getBotName() {
    let bots = document.getElementById("bots");
    let botsString = bots.options[bots.selectedIndex].value;
    const botName = botsString.split(' ')[0];
    console.log('Bot name is ' + botName);
    return botName;
}