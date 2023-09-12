import React from "react";
import styled from "styled-components";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Layout, Button } from "antd";
import { ConnectWallet } from "@thirdweb-dev/react";
const { Header } = Layout;

export const HeaderBar = (props) => {
  const { collapsed, setCollapsed } = props;
  return (
    <HeaderStyled>
      <Button
        type="primary"
        onClick={() => setCollapsed(!collapsed)}
        style={MenuButtonStyles}
      >
        {collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
      </Button>
      <Gap />
      <ConnectWallet
        theme="dark"
        btnTitle="Connect Wallet"
      />
      <Button
        shape="circle"
        size="large"
        icon={<Avatar icon={<UserOutlined />} />}
      ></Button>
    </HeaderStyled>
  );
};

export default HeaderBar;

const HeaderStyled = styled(Header)`
  padding: 5px;
  display: flex;
  justify-content: space-between;
`;

const MenuButtonStyles = {
  fontSize: "16px",
  color: "#fff",
  marginLeft: "0.8rem",
  marginRight: "2rem",
  marginBottom: "16",
  marginTop: "0.8rem",
};

const Gap = styled.div`
  width: 80%;
`;
