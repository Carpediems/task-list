const fs = window.require("fs").promises;

/**
 * 读取文件
 * @param path
 * @returns {Promise<string>}
 */
export const rendFile = (path) => {
  return fs.readFile(path, "utf-8");
};

/**
 * 判断文件是否存在
 * 成功返回 200 ，失败返回400
 * @param path
 * @returns {Promise<unknown>}
 */
export const accessFile = (path) => {
  return new Promise((resolve) => {
    fs.access(path, fs.constants.F_OK, (err) => {
      if (err) {
        resolve(400);
      } else {
        resolve(200);
      }
    });
  });
};

/**
 * 创建新的文件
 * @param filename
 * @param contentFile
 * @returns {Promise<void>}
 */
export const writeFiles = (filename, contentFile) => {
  const rootFolderPath = "/";
  const writeStream = fs.createWriteStream(`${rootFolderPath}/${filename}`);
  writeStream.write(contentFile);
  // return fs.writeFile(filename, contentFile);
};
