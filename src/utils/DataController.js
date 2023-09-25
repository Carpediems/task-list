const low = window.require("lowdb");
const FileSync = window.require("lowdb/adapters/FileSync");
const { join } = window.require("path");

const adapter = new FileSync(join(__dirname, "db.json"));
const db = low(adapter);
db.defaults({
  taskList: [
    {
      key: 0,
      title: "工作任务",
    },
    {
      key: 1,
      title: "日常任务",
    },
  ],
  mainList: [],
});
export default db;
