const { remote } = require('electron');
const { BrowserWindow } = remote;
const path = require('path');

const settingsBtn = document.getElementById('settings-btn');

let settingsWindow;

settingsBtn.addEventListener('click', () => {
    const modalPath = path.join('file://', __dirname, 'settings.html');
    settingsWindow = new BrowserWindow({ width: 400, height: 200 });
    settingsWindow.on('close', () => {
        settingsWindow = null;
    });
    settingsWindow.loadURL(modalPath);
    settingsWindow.show();
});
