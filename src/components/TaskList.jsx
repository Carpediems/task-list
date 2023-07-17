import React from "react";
import styled from "styled-components";
import { DeleteOutlined } from "@ant-design/icons";
import { Checkbox } from "antd";
import { useSelector, useDispatch } from "react-redux";

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
    .pText{
      text-decoration: line-through;
    }
  }
`;
const TaskList = () => {
  let todolist = useSelector((state) => state.get("TodoList"));
  const dispatch = useDispatch();

  // 任务删除功能
  const DeleteList = (id) => () => {
    dispatch({ type: "delete", ListId: id });
    localStorage.setItem("TodoList", JSON.stringify(todolist));
  };
  // 完成任务功能
  const onChange = (index) => (e) => {
    todolist.forEach((item, id) => {
      if (id === index) {
        item.chagecheck = !item.chagecheck;
      }
    });
    dispatch({type:"todoupdate"})
    localStorage.setItem("TodoList", JSON.stringify(todolist));
  };
  return (
    <UlBox>
      {todolist?.map((item, index) => (
        <li key={item.id}>
          <Checkbox onChange={onChange(index)} checked={item.chagecheck}></Checkbox>
          <p className={item.chagecheck?'pText':''}>{item.text}</p>
          <DeleteOutlined onClick={DeleteList(index)}></DeleteOutlined>
        </li>
      ))}
    </UlBox>
  );
};

export default TaskList;
