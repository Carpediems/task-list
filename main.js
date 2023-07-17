const { app, BrowserWindow, Menu,ipcMain } = require("electron");
// const Store = require('electron-store');

// const store = new Store();
// const array = store.get('TodoList')
// console.log(array,'11')
// ipcMain.on('saveData', (event, data) => {
//   // 将数据存储到本地存储中
//   store.set('data', data);
// });
//
//
// ipcMain.on('getData', (event) => {
//   // 从本地存储中读取数据
//   const data = store.get('data');
//   // 将数据发送回渲染进程
//   event.reply('data', data);
// });

try {
  require("electron-reloader")(module, {});
} catch (_) {}

function createWindow() {
  Menu.setApplicationMenu(null);
  // 创建浏览器窗口
  let win = new BrowserWindow({
    width: 420,
    height: 740,
  });
  win.title = "任务";
  // if (process.env.WEBPACK_DEV_SERVER_URL) {
  //   if (!process.env.IS_TEST) win.webContents.openDevTools();
  // } else {
  //   win.webContents.openDevTools();
  // }
  // win.loadURL("http:localhost:3000");
  // win.loadFile('')
  win.loadFile("build/index.html")
}

app.whenReady().then(createWindow);
