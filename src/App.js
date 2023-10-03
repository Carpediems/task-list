import React, { useEffect, useState } from "react";
import styled from "styled-components";
import LeftMenu from "./components/Leftmenu/Leftmenu";
import TaskListAndInput from "./components/TaskListAndInput";

// 设置主窗口样式
const Boxtask = styled.div`
  width: outerwidth + "px";
  height: 100vh;
  border-radius: 2px;
  display: flex;

  main {
    flex: 1;
    background: #f5f5f5;
    box-sizing: border-box;
    padding-bottom: 10px;
  }
`;

const App = () => {
  const [CheckoutArg, setCheckoutArg] = useState("");
  const [title, setTitle] = useState("");
  const [key, setKey] = useState("");
  useEffect(() => {}, [CheckoutArg, title, key]);
  const getTitle = (CheckId, title, key) => {
    setCheckoutArg(CheckId);
    setTitle(title);
    setKey(key);
  };
  return (
    <Boxtask>
      <LeftMenu onSingleList={getTitle} />
      <main>
        <TaskListAndInput
          props={{ CheckId: CheckoutArg, title: title, key: key }}
        ></TaskListAndInput>
      </main>
    </Boxtask>
  );
};

export default App;
