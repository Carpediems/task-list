import React, { Component } from "react";
import styles from "./Leftmenu.module.css";
import AutoIcon from "../icon/AutoIcon";
import { Add, ListMore } from "../../utils/iconfont";
import db from "../../utils/DataController";
import { Input } from "antd";
import { CloseOutlined } from "@ant-design/icons";

class LeftMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      LeftList: [],
      text: "待办事项",
      BlurValue: false,
      // InputController: false,
      TaskListInput: "",
      TranslatedText: "",
    };
  }

  componentDidMount() {
    this.setState({ LeftList: db.get("taskList").value() });
  }

  /**
   * 数据双向绑定
   * @param e
   * @constructor
   */
  ChangeValue = (e) => {
    this.setState({ TaskListInput: e.target.value });
  };
  /**
   * 点击新建列表后创建一个新的列表内容（左侧）
   * @returns {Promise<void>}
   */
  createList = async () => {
    db.get("taskList")
      .push({
        key: new Date().getTime(),
        title: this.state.text,
        BlurChange: false,
      })
      .write();
    this.forceUpdate();
  };

  /**
   * 点击 × 号后删除指定的列表
   * @param id
   * @returns {(function(): void)|*}
   * @constructor
   */
  DeleteList = (id) => () => {
    db.get("taskList").remove({ key: id }).write();
    this.forceUpdate();
  };

  /**
   * 双击后出现输入框,由输入框中输入文字修改列表主题
   * @param id
   * @param BlurChange
   * @returns {(function(): void)|*}
   */
  onDoubleFocus = (id, BlurChange) => () => {
    db.get("taskList")
      .find({ key: id })
      .assign({ BlurChange: !BlurChange })
      .write();
    this.forceUpdate();
  };

  /**
   * 失去焦点后提交修改后的内容
   * @param id
   * @param BlurChange
   * @returns {(function(): void)|*}
   */
  onBlurChange = (id, BlurChange) => () => {
    if (this.state.TaskListInput.length === 0) {
      db.get("taskList")
        .find({ key: id })
        .assign({ BlurChange: !BlurChange })
        .write();
      this.forceUpdate();
      return;
    }
    db.get("taskList")
      .find({ key: id })
      .assign({ BlurChange: !BlurChange, title: this.state.TaskListInput })
      .write();
    this.forceUpdate();
  };

  render() {
    return (
      <>
        <div className={styles.LeftBox}>
          <ul className={styles.ulBox}>
            {this.state.LeftList.map((item) => (
              <li key={item.key}>
                <AutoIcon icon={ListMore}></AutoIcon>
                {item.BlurChange ? (
                  <Input
                    bordered={true}
                    type="text"
                    defaultValue={item.title}
                    ref={this.state.Ref}
                    onChange={this.ChangeValue}
                    onBlur={this.onBlurChange(item.key, item.BlurChange)}
                  />
                ) : (
                  <p
                    onDoubleClick={this.onDoubleFocus(
                      item.key,
                      item.BlurChange
                    )}
                    style={{
                      fontSize: "14px",
                      flex: "1",
                      textAlign: "left",
                      textIndent: "5px",
                    }}
                  >
                    {item.title}
                  </p>
                )}
                <CloseOutlined
                  style={{ fontSize: "12px", marginLeft: "5px" }}
                  onClick={this.DeleteList(item.key)}
                />
              </li>
            ))}
          </ul>
          <footer>
            <button className={styles.createButton} onClick={this.createList}>
              <AutoIcon icon={Add} />
              新建列表
            </button>
          </footer>
        </div>
      </>
    );
  }
}

export default LeftMenu;
