function openRepo() {
    require('electron').shell.openExternal('https://github.com/DewhiteE/bot-runner');
}

function openConfig() {
    require('child_process').exec('cd ./src && config.json', { cwd: ".", detached: false }, (error, stdout, stderr) => {
        if (error) {
            console.log(`Name: ${error.name}\nMessage: ${error.message}\nStack: ${error.stack}`);
        } else {
            console.log(stdout);
            return;
        }
    });
}