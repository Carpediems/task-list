import React, { useEffect } from "react";
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
  useEffect(() => {}, []);
  return (
    <Boxtask>
      <LeftMenu />
      <main>
        <TaskListAndInput></TaskListAndInput>
      </main>
    </Boxtask>
  );
};

export default App;
