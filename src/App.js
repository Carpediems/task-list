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
  const [CheckoutArg, setCheckoutArg] = useState([]);
  useEffect(() => {}, [CheckoutArg]);
  const getTitle = (arg) => {
    console.log(arg);
    setCheckoutArg(arg);
  };
  return (
    <Boxtask>
      <LeftMenu onSingleList={getTitle} />
      <main>
        <TaskListAndInput props={CheckoutArg}></TaskListAndInput>
      </main>
    </Boxtask>
  );
};

export default App;
