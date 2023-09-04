import React from "react";
import styled from "styled-components";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import LeftMenu from "./components/Leftmenu/Leftmenu";

// 设置主窗口样式
const Boxtask = styled.div`
  width: outerwidth + "px";
  height: 100vh;
  border-radius: 2px;
  display: flex;
  main{
    flex: 1;
    background: #f5f5f5;
    box-sizing: border-box;
    padding-bottom: 10px;
  }
`;


const App = () => {
  return (
    <Boxtask>
        <LeftMenu/>
        <main>
            <TaskList />
            <TaskInput />
        </main>
    </Boxtask>
  );
};

export default App;
