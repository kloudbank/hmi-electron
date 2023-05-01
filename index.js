const { app, BrowserWindow } = require('electron')

const createWindow=()=>{
    const win = new BrowserWindow({
        width: 800,
        height: 600
      })
      win.loadURL("http://127.0.0.1:3000")
}

app.whenReady().then(() => {
    createWindow()
  })