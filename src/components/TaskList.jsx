import React, { useRef } from "react";
import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons";
import { Button, Checkbox, Input } from "antd";
import { useSelector, useDispatch } from "react-redux";
import AutoIcon from "./icon/AutoIcon";
import { Delete } from "../utils/iconfont";

const UlBox = styled.ul`
  height: calc(100% - 40px);
  background: #f5f5f5;
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
`;
const TaskList = () => {
  // 任务列表渲染数据
  let todolist = useSelector((state) => state.get("TodoList"));
  // 引入redux方法
  const dispatch = useDispatch();
  // 用于获取节点数据
  const inputRef = useRef(null);
  // 封装公共逻辑方法
  const updatelocalStorage = () => {
    dispatch({ type: "todoupdate" });
    localStorage.setItem("TodoList", JSON.stringify(todolist));
  };
  // 任务删除功能
  const DeleteList = (id) => () => {
    dispatch({ type: "delete", ListId: id });
    localStorage.setItem("TodoList", JSON.stringify(todolist));
  };

  // 多选框完成任务功能
  const onChange = (index) => (e) => {
    todolist.forEach((item, id) => {
      if (id === index) {
        item.chagecheck = !item.chagecheck;
      }
    });
    updatelocalStorage();
  };

  const submit = (index) => () => {
    dispatch({
      type: "enterChange",
      InputId: index,
      text: inputRef.current.input.value,
    });
    updatelocalStorage();
  };
  return (
    <UlBox>
      {todolist?.map((item, index) => (
        <li key={item.id}>
          <Checkbox
            onChange={onChange(index)}
            checked={item.chagecheck}
          ></Checkbox>
          <Input
            className={item.chagecheck ? "pText" : ""}
            defaultValue={item.text}
            type="text"
            bordered={false}
            onBlur={submit(index)}
            ref={inputRef}
          />
          {/*<DeleteOutlined onClick={DeleteList(index)}></DeleteOutlined>*/}
          <Button
            onClick={DeleteList(index)}
            icon={<AutoIcon icon={Delete} />}
            style={{ border: "none", marginTop: "5px" }}
          />
        </li>
      ))}
    </UlBox>
  );
};

export default TaskList;
