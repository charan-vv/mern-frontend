import { BrowserRouter } from "react-router-dom";
import { App as AntdApp } from "antd";
import Layout from "./layout";
import "./App.scss";

function App() {
  return (
    <>
      <BrowserRouter>
        <AntdApp>
          <Layout />
        </AntdApp>
      </BrowserRouter>
    </>
  );
}

export default App;
