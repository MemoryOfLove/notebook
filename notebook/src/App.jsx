import { useState } from "react";
import route from "./router";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ConfigProvider } from "zarm";
import zhCN from "zarm/lib/config-provider/locale/zh_CN";
import NavBar from "@/components/NavBar";
import "lib-flexible/flexible";
import './index.less'
import routes from "../src/router";
function App() {
  return (
    <Router>
      <ConfigProvider primaryColor={"#007fff"} locale={zhCN}>
        <>
        <Routes>
          {routes.map((route) => (
            <Route
              exact
              key={route.path}
              path={route.path}
              element={<route.component />}
            />
          ))}
        </Routes>
        <NavBar showNav={true} />
        </>
      </ConfigProvider>
    </Router>
  );
}

export default App;
