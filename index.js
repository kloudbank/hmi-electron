const { app, BrowserWindow, screen } = require('electron')

const createWindow=()=>{
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
    const win = new BrowserWindow({
        width,height
      })
      win.loadURL("http://127.0.0.1:3000")
}

app.whenReady().then(() => {
    createWindow()
  })