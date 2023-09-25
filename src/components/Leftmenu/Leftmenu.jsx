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
      InputController: false,
      TaskListInput: "",
    };
  }

  componentDidMount() {
    this.setState({ LeftList: db.get("taskList").value() });
  }
  createList = () => {
    db.get("taskList")
      .push({
        key: new Date().getTime(),
        title: this.state.text,
        BlurChange: false,
      })
      .write();
    this.forceUpdate();
  };

  DeleteList = (id) => () => {
    db.get("taskList").remove({ key: id }).write();
    this.forceUpdate();
  };
  ChangeValue = (e) => {
    this.setState({ TaskListInput: e.target.value });
  };
  onDoubleFocus = (id, BlurChange) => () => {
    db.get("taskList")
      .find({ key: id })
      .assign({ BlurChange: !BlurChange })
      .write();
    this.forceUpdate();
  };
  onBlurChange = (id, BlurChange) => () => {
    this.setState({ InputController: false });
    db.get("taskList")
      .find({ key: id })
      .assign({ BlurChange: !BlurChange, title: this.state.TaskListInput })
      .write();
    db.get("taskList").find({ key: id }).assign({ title: this.state.title });
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
