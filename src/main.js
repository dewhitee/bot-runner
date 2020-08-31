const { app, BrowserWindow } = require('electron');
const running = require('./run.js');

function createWindow() {
    // Create the browser window
    const mainWindow = new BrowserWindow({
        width: 800,
        heigth: 600,
        webPreferences: {
            nodeIntegration: true,
        }
    });

    mainWindow.loadFile('src\\index.html');

    mainWindow.webContents.openDevTools();
}

app.whenReady().then(createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        console.log('Quitting...');
        let botrunning = running.stopBot();
        if (!botrunning) {
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

