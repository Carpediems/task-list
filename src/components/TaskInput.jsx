import React, { useState } from "react";
import { Input } from "antd";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import AutoIcon from "./icon/AutoIcon";
import { Add } from "../utils/iconfont";
const InputBox = styled.div`
  width: 100%;
  height: 30px;
  padding: 0 5px 15px 5px;
  box-sizing: border-box;
  .ant-input {
    height: 30px;
  }
`;
const TaskInput = () => {
  const [InputText, setInputText] = useState("");
  const dispatch = useDispatch();
  const AddList = (e) => {
    setInputText(e.target.value);
  };
  const EnterEvent = () => {
    dispatch({
      type: "add",
      AddList: {
        id: new Date().getTime(),
        text: InputText,
        chagecheck: false,
        TextBoolean: false,
      },
    });
    dispatch({ type: "setup" });
    setInputText("");
  };
  return (
    <InputBox>
      <Input
        placeholder="请添加任务"
        value={InputText}
        onChange={AddList}
        onPressEnter={EnterEvent}
        prefix={<AutoIcon icon={Add} />}
      />
    </InputBox>
  );
};

export default TaskInput;
