import React from "react";
import styles from "./Leftmenu.module.css";
import { Button } from "antd";
import AutoIcon from "../icon/AutoIcon";
import { Add } from "../../utils/iconfont";
const LeftMenu = () => {
  /**
   * 菜单栏常量
   */
  const LeftList = [
    {
      key: 0,
      title: "工作任务",
    },
    {
      key: 1,
      title: "日常任务",
    },
    {
      key: 2,
      title: "会议记录",
    },
  ];
  return (
    <>
      <div className={styles.LeftBox}>
        <ul className={styles.ulBox}>
          {LeftList.map((item) => (
            <li key={item.key}>{item.title}</li>
          ))}
        </ul>
        <footer>
          <button className={styles.createButton}>
            <AutoIcon icon={Add} />
            新建列表
          </button>
        </footer>
      </div>
    </>
  );
};

export default LeftMenu;
