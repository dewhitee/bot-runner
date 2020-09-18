const { gitFolderExists } = require('./paths');

$("#bots").on('change', () => {
    const name = require('./bot.js').getBotName();
    $("#bot-repo-button").attr("disabled", !gitFolderExists(name));

    const updateCmd = require('./commands.js').getCommand(name, 'update');
    $("#update-cmd").text(updateCmd);

    $("#bot-config-button").attr("disabled", !require('./paths').botConfigExists(name));
});
