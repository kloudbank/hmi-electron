require('dotenv').config();
const { app, BrowserWindow, screen, dialog } = require('electron')
const { autoUpdater } = require('electron-updater')
const log = require('electron-log');

const fs = require('fs');
const path = require('path');
const packageJsonPath = path.join(__dirname, 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf-8'));

let HMI_WEB_URL = 'http://127.0.0.1:3000';
let EDGE_APP_URL = 'http://127.0.0.1:8000';
if (1 == 1) {
  HMI_WEB_URL = 'http://ec2-54-180-192-203.ap-northeast-2.compute.amazonaws.com:30030';
  EDGE_APP_URL = 'http://ec2-54-180-192-203.ap-northeast-2.compute.amazonaws.com:30008';;
}

const createBrowser = () => {
  const { width, height } = screen.getPrimaryDisplay().workAreaSize
  const win = new BrowserWindow({
    width,
    height,
    webPreferences: {
      webSecurity: false,
    },
  })

  return win;
}

const createWindow = () => {
  const win = createBrowser();
  // win.loadURL("http://127.0.0.1:3000")
  // win.loadURL("http://hmi-web.edge.kubepia.net")
  win.loadURL(HMI_WEB_URL)

  autoUpdater.logger = log;
  log.info('App starting...');

  log.info(HMI_WEB_URL);
  log.info(EDGE_APP_URL);
}

// force packaged true
Object.defineProperty(app, 'isPackaged', {
  get() {
    return true;
  }
});

app.whenReady().then(() => {
  createWindow()
})

autoUpdater.setFeedURL(EDGE_APP_URL + '/edge/version');
autoUpdater.autoDownload = false;

setInterval(() => {
  autoUpdater.checkForUpdatesAndNotify()
}, 5000)

autoUpdater.on('checking-for-update', () => {
  log.info('업데이트 확인 중...');
});
autoUpdater.on('update-available', (info) => {
  log.info('업데이트가 가능합니다.');

  packageJson.version = info.version;
  fs.writeFileSync(packageJsonPath, JSON.stringify(packageJson, null, 2));
  app.relaunch();
  app.quit();
  return true;
});
autoUpdater.on('update-not-available', (info) => {
  log.info('현재 최신버전입니다.');
});
autoUpdater.on('error', (err) => {
  return true;
  // log.info('에러가 발생하였습니다. 에러내용 : ' + err);
});
