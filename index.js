require('dotenv').config();
const { app, BrowserWindow, screen } = require('electron')

const createWindow=()=>{
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
    const win = new BrowserWindow({
        width,height
      })
      // win.loadURL("http://127.0.0.1:3000")
      // win.loadURL("http://hmi-web.edge.kubepia.net")
      win.loadURL(process.env.HMI_WEB_URL)
}

app.whenReady().then(() => {
    createWindow()
  })