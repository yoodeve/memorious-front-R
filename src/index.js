import React from "react";
import ReactDOM from "react-dom/client";
import { ConfigProvider } from "antd";
import App from "./App";

/** @todo 컬러 옵션 : https://ant.design/docs/react/customize-theme */
const config = {
    token: {
        colorPrimary: "#6F6257",
        colorWarning: "#952323",
        colorError: "#952323",
        colorInfo: "#e6a156",
        colorTextBase: "#666",
    },
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <ConfigProvider theme={config}>
        <App />
    </ConfigProvider>,
);
