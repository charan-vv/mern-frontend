import { BrowserRouter } from "react-router-dom";
import { App as AntdApp } from "antd";
import Layout from "./layout";
import store from "./redux/store"
import { Provider } from "react-redux";
import "./App.scss";

function App() {
  return (
    <>
      <Provider store={store}>
        <BrowserRouter>
        <AntdApp>
          <Layout />
        </AntdApp>
      </BrowserRouter>
      </Provider>
    </>
  );
}

export default App;
