const electron = require('electron');
const url = require('url');
const path = require('path');

const {app, BrowserWindow, Menu, ipcMain, dialog} = electron;

///===============///
///  Main Window  ///
///===============///

let mainWindow;

app.on('ready', function(){

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        backgroundColor: '#1E1E1E',
        width: 350,
        height: 500,
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true,
    })); 

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

ipcMain.on("changeDir:Map", function(dir) {
    
});

ipcMain.on('open-file-dialog', function (event) {
  dialog.showOpenDialog({
    properties: ['openFile']
  }, function (files) {
    if (files) event.sender.send('selected-file', files)
  })
})

// Hooks
ipcMain.on('open:import', function(e) {
    mainWindow.webContents.send('open:import');

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mapUtility.html'),
        protocol: 'file:',
        slashes: true,
        width: 200,
        height: 500,
    })); 
    
});

ipcMain.on('open:home', function(e) {
    mainWindow.webContents.send('open:home');

    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true,
        width: 200,
        height: 500,
    })); 
    
});

const mainMenuTemplate = [
    {
        label:'Options',
        submenu:[
            {
                label: 'Quit',
                click(){
                    app.quit();
                }
            },
            {
                label: "Dev Tools",
                click(){
                    mainWindow.toggleDevTools();
                }
            }
        ]
    }
]

app.onload = function(){
    
};