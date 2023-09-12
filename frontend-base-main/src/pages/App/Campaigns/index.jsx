import React from 'react'
// import { Card } from 'antd';
import { styled } from 'styled-components';
import { Avatar, Layout, List, Space } from 'antd';
import { Outlet } from 'react-router';


export const CampaignLayout = (props) => {
  return(
    <ContentLayout>
      <Outlet/>
    </ContentLayout>
  )
}

const ContentLayout = styled(Layout)`
  height: calc(100vh - 64px);
  background-color: var(--color-hyperdrive-black);
`