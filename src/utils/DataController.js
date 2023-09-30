const low = window.require("lowdb");
const FileSync = window.require("lowdb/adapters/FileSync");
const { join } = window.require("path");

const adapter = new FileSync(join(__dirname, "db.json"));
const db = low(adapter);
db.defaults({
  taskList: [
    {
      CheckoutTitle: "mainList",
      key: 1695896526741,
      title: "工作任务",
      BlurChange: false,
    },
  ],
  mainList: [],
});
export default db;
