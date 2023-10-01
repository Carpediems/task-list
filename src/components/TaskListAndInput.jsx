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
    padding: 10px 0 5px 10px;
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
      taskList: db.get("mainList").value(),
      InputText: "",
      TaskListInput: "",
      Title: "工作任务",
      ChekOutList: "mainList",
      id: db.get("taskList").value()[0].CheckoutTitle,
    };
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.props.CheckId !== prevState.id) {
      this.setState({
        id: this.props.props.CheckId,
        Title: this.props.props.title,
        taskList: db.get(this.state.ChekOutList).value(),
        ChekOutList: this.props.props.CheckId,
      });
    }
    if (
      prevState.id === this.props.props.CheckId &&
      prevState.Title !== this.props.props.title
    ) {
      this.setState({ Title: this.props.props.title });
    }
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
    console.log(this.state.ChekOutList);
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
    if (this.state.TaskListInput === "") {
      return;
    }
    db.get("mainList")
      .find({ id: id })
      .assign({ text: this.state.TaskListInput })
      .write();
    this.setState({ TaskListInput: "" });
    this.forceUpdate();
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
    db.get(this.state.ChekOutList)
      .push({
        id: new Date().getTime(),
        text: this.state.InputText,
        chagecheck: false,
        TextBoolean: false,
      })
      .write();
    this.setState({ InputText: "" });
    this.forceUpdate();
  };
  render() {
    return (
      <TaskList>
        <h3>{this.state.Title}</h3>
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
