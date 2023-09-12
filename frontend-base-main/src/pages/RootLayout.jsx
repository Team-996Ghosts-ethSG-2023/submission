import React, { useState } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import styled from "styled-components"
import {
  DeploymentUnitOutlined,
  CalendarOutlined,
  CompassOutlined,
} from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import HeaderBar from "../components/Navigation/AppHeader";

const { Sider } = Layout;

function getItem(
  label,
  key,
  icon,
  children,
) {
  return {
    key,
    icon,
    children,
    label,
  };
}

const items = [
  getItem('Feed', '/feed', <CompassOutlined />),
  getItem('Campaign', '/campaign', <DeploymentUnitOutlined />),
  getItem('Calendar', '/calendar', <CalendarOutlined />),
];

export const RootLayout = (props) => {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate()
  const location = useLocation();
  return (
    <Layout>
      <HeaderBar 
        collapsed={collapsed}
        setCollapsed={setCollapsed}
      />
      <Layout style={{ minHeight: 'calc(100vh - 64px)' }}>
        <Sider collapsed={collapsed} onCollapse={(value) => setCollapsed(value)}>
          <Menu 
            theme="dark" 
            defaultSelectedKeys={['feed']} 
            selectedKeys={[location.pathname === '/' ? '/feed' : location.pathname]}
            mode="inline" 
            items={items} 
            onClick={(e) => navigate(`${e.key ?? ''}`)}
          />
        </Sider>
        <ContentLayout>
          <Outlet/>
        </ContentLayout>
      </Layout>
    </Layout>
  );
};

const ContentLayout = styled(Layout)`
  height: calc(100vh - 64px);
  background-color: var(--color-hyperdrive-black);
`