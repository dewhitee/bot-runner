const { app, BrowserWindow } = require('electron');
const runjs = require('./run.js');

let mainWindow;

function createWindow() {
    // Create the browser window
    mainWindow = new BrowserWindow({
        width: 800,
        heigth: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true,
        },
        backgroundColor: '#43658b',
        minWidth: 400,
        minHeight: 300,
    });

    mainWindow.loadFile('src\\index.html');

    mainWindow.webContents.openDevTools();

    mainWindow.on('closed', () => {
        mainWindow = null;
    })
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
