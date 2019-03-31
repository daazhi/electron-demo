// Modules to control application life and create native browser window
let electron = require('electron')
const {app, BrowserWindow, Menu, ipcMain} = electron

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
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize

  Menu.setApplicationMenu(null)
  // Create the browser window.
  mainWindow = new BrowserWindow({
    frame: false,
    resizable: false,
    fullscreen: true,
    enableLargerThanScreen: true,
    title: '荷乐宝贝',
    icon: 'src/assets/logo1.png',
    webPreferences: {
      nodeIntegration: true
    }
  })

  // mainWindow.loadFile(__dirname + '/src/views/index.html')
  let index = width === 1366 ? './src/index1366.html' : './src/index.html'
  mainWindow.loadFile(index)

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
