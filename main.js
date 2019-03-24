// Modules to control application life and create native browser window
const {app, BrowserWindow, Menu, ipcMain} = require('electron')

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

ipcMain.on('win-min', (event, arg) => {
  mainWindow.minimize()
})

ipcMain.on('win-max', (event, arg) => {
  mainWindow.maximize()
})

ipcMain.on('win-close', (event, arg) => {
  mainWindow.close()
})

function createWindow () {
  Menu.setApplicationMenu(null)
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    minWidth: 1920,
    minHeight: 1080,
    frame: false,
    resizable: false,
    fullscreen: true,
    enableLargerThanScreen: true,
    // minWidth: 1366,
    // minHeight: 793,
    title: 'test',
    icon: 'src/assets/logo1.png',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // mainWindow.loadFile(__dirname + '/src/views/index.html')
  mainWindow.loadFile('./src/index.html')

  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    mainWindow = null
  })
}

app.on('ready', createWindow)

app.on('window-all-closed', function () {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', function () {
  if (mainWindow === null) {
    createWindow()
  }
})
