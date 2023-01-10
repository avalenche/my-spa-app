import React from "react";
import { Button, DatePicker } from "antd";
import { WifiOutlined } from "@ant-design/icons";
import styles from "./app.module.css";

const app = styles.app;

const App = () => {
  return (
    <div className={app}>
      <DatePicker />
      <Button type="text" icon={<WifiOutlined />}>
        My Button{" "}
      </Button>
    </div>
  );
};

export default App;
