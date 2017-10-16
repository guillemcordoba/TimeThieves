const { app, BrowserWindow } = require('electron');
path = require('path');
url = require('url');

// Executes when the application 
// is initialized.
app.on('ready', function() {
    console.log('Starting application!');
    mainWindow = new BrowserWindow({ width: 1280, height: 960, show: false });    
    // Change loadUrl to load index.html
    // using url and path package 
    // to format the file url
    mainWindow.setMenu(null);
    mainWindow.setFullScreen(true);
    //mainWindow.loadURL('http://localhost:4200');
    mainWindow.loadURL(url.format({
        //__dirname is the current working dir
        pathname: path.join(__dirname, 'dist', 'index.html'),
        protocol: 'file:',
        slashes: true
    }));
    mainWindow.webContents.on('did-finish-load', function() {
        mainWindow.show();
    });

    // It is useful to open dev tools
    // for debug.
    // mainWindow.webContents.openDevTools();
    mainWindow.on('closed', function() {
        mainWindow = null;
    });
});
  
// Defines the behavior on close.
app.on('window-all-closed', function() {
    app.quit();
});
