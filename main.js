const electron = require('electron');
const url = require('url');
const path = require('path');

const mongoose = require('mongoose');
const db = require('./config/keys').mongoURI;
const data = require('./data');

const {app, BrowserWindow, Menu, ipcMain, dialog} = electron;

///===============///
///  Main Window  ///
///===============///

let mainWindow;

// Main Window
app.on('ready', function(){

    mongoose
        .connect(db)
        .then( () => console.log( 'MongoDB Connected..') )
        .catch(err => console.log( err ) )

    mainWindow = new BrowserWindow({
        webPreferences: {
            nodeIntegration: true
        },
        backgroundColor: '#1E1E1E',
        width: 500,
        height: 800,
    });
    mainWindow.loadURL(url.format({
        pathname: path.join(__dirname, 'mainWindow.html'),
        protocol: 'file:',
        slashes: true,
    })); 

    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate);
    Menu.setApplicationMenu(mainMenu);

});

// Hooks
ipcMain.on('open:import', async (e) => {
    
    var d = '';

    async function Testing() {
         d = await data.getMaps();
         console.log(d);
    }

    await Testing();

    e.reply("open:import-reply", d);

});

ipcMain.on('open:map', async (e) => {
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