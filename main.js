const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  globalShortcut,
} = require("electron");
// const Store = require("electron-store");

const isDev = require("electron-is-dev");

/**
 * 调用 electron-store
 */
// Store.initRenderer();

try {
  require("electron-reloader")(module, {});
} catch (_) {}

function createWindow() {
  // Menu.setApplicationMenu(null);
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 1200,
    height: 740,
    webPreferences: {
      nodeIntegration: true,
      nodeIntegrationInWorker: true,
      enablePreferredSizeMode: true,
      contextIsolation: false,
    },
    icon: "public/icon/taskList.ico",
  });
  win.title = "待办事项";
  win.webContents.openDevTools({ mode: "left" });
  // 控制台
  if (process.env.WEBPACK_DEV_SERVER_URL) {
    if (!process.env.IS_TEST) win.webContents.openDevTools();
  } else {
    win.webContents.openDevTools();
  }

  const urlLocation = isDev ? "http:localhost:3000" : "myUrl";
  // win.loadURL("http:localhost:3000");
  win.loadURL(urlLocation);
  // win.loadFile('')
  // win.loadFile("build/index.html");
}

app.whenReady().then(createWindow);
