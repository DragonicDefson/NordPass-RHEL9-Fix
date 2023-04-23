const { app, BrowserWindow } = require('electron')
const config = require('./package.json')
const app_title = config.description.substring(0, 8)

app.disableHardwareAcceleration()

const createAppWindow = () => {
  const window = new BrowserWindow({
    icon: "./assets/icon.png",
    autoHideMenuBar: true,
    title: app_title,
    show: false,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true
    }
  })
  window.loadURL('https://app.nordpass.com/login')
  window.on('ready-to-show', () => {
    setInterval(async () => { window.title = app_title }, (75))
    window.maximize(); window.show()
  })
}

app.whenReady().then(() => {
  createAppWindow()
  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createAppWindow()
    }
  })
  app.on('window-all-closed', () => { app.quit() })
})
