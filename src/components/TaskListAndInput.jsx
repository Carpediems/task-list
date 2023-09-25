import React, { Component } from "react";
import styled from "styled-components";
import { Button, Checkbox, Input } from "antd";
import AutoIcon from "./icon/AutoIcon";
import { Add, Delete } from "../utils/iconfont";
import db from "../utils/DataController";
const TaskList = styled.main`
  height: 100%;
  h3 {
    margin: 0;
    padding: 10px 0 0 10px;
    box-sizing: border-box;
  }
  ul {
    height: calc(100% - 60px);
    //background: #f5f5f5;
    overflow: auto;
    li {
      list-style: none;
      display: flex;
      align-items: center;
      justify-content: space-between;
      height: 40px;
      margin: 10px;
      background: #ffffff;
      padding: 0 10px;
      border-radius: 5px;
      p {
        flex: 1;
        padding-left: 5px;
        box-sizing: border-box;
      }
      .pText {
        text-decoration: line-through;
        color: #939393;
      }
    }
  }
  .InputDiv {
    height: 30px;
    padding: 0 5px 15px 5px;
    box-sizing: border-box;
    .ant-input {
      height: 30px;
    }
  }
`;

class TaskListAndInput extends Component {
  constructor(props) {
    super(props);
    this.state = {
      taskList: [],
      InputText: "",
      TaskListInput: "",
    };
  }
  componentDidMount() {
    this.setState({ taskList: db.get("mainList").value() });
  }

  /**
   * 任务勾选功能
   * @param id
   * @param chagecheck
   * @returns {(function(*): void)|*}
   */
  onChange = (id, chagecheck) => (e) => {
    db.get("mainList")
      .find({ id: id })
      .assign({ chagecheck: !chagecheck })
      .write();
    this.forceUpdate();
  };

  // 删除功能
  DeleteList = (id) => () => {
    db.get("mainList").remove({ id: id }).write();
    this.forceUpdate();
  };
  /**
   * 列表数据的双向绑定
   * @param e
   */
  onSubmitChange = (e) => {
    this.setState({ TaskListInput: e.target.value });
  };
  onSubmit = (id) => () => {
    db.get("mainList")
      .find({ id: id })
      .assign({ text: this.state.TaskListInput })
      .write();
    this.forceUpdate();
    this.setState({ TaskListInput: "" });
  };
  /**
   * 输入框数据双向绑定
   * @param e
   * @constructor
   */
  AddList = (e) => {
    this.setState({ InputText: e.target.value });
  };

  /**
   * 回车添加任务功能
   * @constructor
   */
  EnterEvent = () => {
    db.get("mainList")
      .push({
        id: new Date().getTime(),
        text: this.state.InputText,
        chagecheck: false,
        TextBoolean: false,
      })
      .write();
    this.setState({ InputText: "" });
    // this.forceUpdate();
  };
  render() {
    return (
      <TaskList>
        <h3>日常任务</h3>
        <ul>
          {this.state.taskList?.map((item, index) => (
            <li key={item.id}>
              <Checkbox
                onChange={this.onChange(item.id, item.chagecheck)}
                checked={item.chagecheck}
              ></Checkbox>
              <Input
                className={item.chagecheck ? "pText" : ""}
                defaultValue={item.text}
                type="text"
                bordered={false}
                onBlur={this.onSubmit(item.id)}
                onChange={this.onSubmitChange}
                // ref={inputRef}
              />
              <Button
                onClick={this.DeleteList(item.id)}
                icon={<AutoIcon icon={Delete} />}
                style={{ border: "none", marginTop: "5px" }}
              />
            </li>
          ))}
        </ul>
        <div className="InputDiv">
          <Input
            placeholder="请添加任务"
            value={this.state.InputText}
            onChange={this.AddList}
            onPressEnter={this.EnterEvent}
            prefix={<AutoIcon icon={Add} />}
          />
        </div>
      </TaskList>
    );
  }
}

export default TaskListAndInput;
