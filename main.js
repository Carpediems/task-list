const {
  app,
  BrowserWindow,
  Menu,
  ipcMain,
  globalShortcut,
  Tray,
} = require("electron");
const path = require("path");
const isDev = require("electron-is-dev");

try {
  require("electron-reloader")(module, {});
} catch (_) {}
let win;
let tray;
function createWindow() {
  // Menu.setApplicationMenu(null);
  // 创建浏览器窗口
  win = new BrowserWindow({
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
  win.on("close", (event) => {
    event.preventDefault(); // 阻止窗口关闭
    win.hide(); // 隐藏主窗口
  });
  win.title = "待办事项";
  // win.webContents.openDevTools({ mode: "bottom" });
  // 控制台;
  // if (process.env.WEBPACK_DEV_SERVER_URL) {
  //   if (!process.env.IS_TEST) win.webContents.openDevTools();
  // } else {
  //   win.webContents.openDevTools();
  // }
  win.setMenuBarVisibility(false); // 隐藏菜单栏
  const urlLocation = isDev ? "http:localhost:3000" : "build/index.html";
  // urlLocation ? win.loadURL(urlLocation) : win.loadFile(urlLocation);

  win.loadURL("http:localhost:3000");

  // win.loadFile('')
  // win.loadFile("build/index.html");
}
app.whenReady().then(() => {
  createWindow();

  // 创建托盘图标
  tray = new Tray("public/icon/taskList.ico");
  // tray = new Tray("d:/ADocuments/A我的桌面/task-list/build/icon/taskList.ico");
  const contextMenu = Menu.buildFromTemplate([
    { label: "打开主窗口", click: () => win.show() },
    { label: "退出", click: () => app.quit() },
  ]);

  tray.setToolTip("我的待办");
  tray.setContextMenu(contextMenu);

  tray.on("click", () => {
    win.show(); // 点击托盘图标时显示主窗口
  });
});

app.on("before-quit", () => {
  tray.destroy(); // 退出时销毁托盘图标
});
app.on("activate", () => {
  win.show(); // 点击Dock图标时显示主窗口
});
// app.whenReady().then(createWindow);
// app.setLoginItemSettings();
