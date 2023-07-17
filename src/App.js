import React from "react";
import styled from "styled-components";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

// 设置主窗口样式
const Boxtask = styled.div`
  width: outerwidth + "px";
  height: 100vh;
  border-radius: 2px;
`;

const App = () => {
  return (
    <Boxtask>
      <TaskList />
      <TaskInput />
    </Boxtask>
  );
};

export default App;
