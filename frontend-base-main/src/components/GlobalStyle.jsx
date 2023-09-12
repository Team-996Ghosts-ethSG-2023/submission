import React from "react";
import { ConfigProvider } from 'antd';

export const GlobalStyle = (props) => {
  return (
    <ConfigProvider
      theme={{
        token: {
          fontFamily: "Gotham",
          colorLink: "#293647",
          colorLinkHover: "#293647",
          colorLinkActive: "#293647",
          colorPrimaryHover: "#293647",
          colorText: "#deece4",
        //   colorTextDescription: "#deece4",
          colorBgContainer: "#deece4",
        },
      }}
    >
      {props.children}
    </ConfigProvider>
  );
};