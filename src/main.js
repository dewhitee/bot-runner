const { app, BrowserWindow } = require('electron');
const runjs = require('./run.js');

function createWindow() {
    // Create the browser window
    const mainWindow = new BrowserWindow({
        width: 800,
        heigth: 600,
        webPreferences: {
            nodeIntegration: true,
        },
        backgroundColor: '#43658b',
    });

    mainWindow.loadFile('src\\index.html');

    mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log('Quitting...');
        if (runjs.stopBot()) {
            console.log('Bots were successfully stopped!');
        }
        app.quit();
    }
});

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
});

