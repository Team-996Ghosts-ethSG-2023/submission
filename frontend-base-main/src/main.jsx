import React from 'react'
import ReactDOM from "react-dom/client";
import {
  RouterProvider,
  Route,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import './index.css'
import { RootLayout } from './pages/RootLayout';
import { HomeFeed } from './pages/App/HomeFeed';
import { CampaignLayout } from './pages/App/Campaigns';
import { Calendar } from 'antd';
import "./index.css"
import { GlobalStyle } from './components/GlobalStyle';
import { Task } from './pages/App/Campaigns/Task';
import { CampaignList } from './pages/App/Campaigns/CampainList';
import {
  ThirdwebProvider,
  ConnectWallet,
  metamaskWallet,
  localWallet,
  ChainId,
} from "@thirdweb-dev/react";

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<RootLayout />}>
      <Route index path="feed" element={<HomeFeed />}/> 
      <Route path="campaign" element={<CampaignLayout/>}>
        <Route index element={<CampaignList/>}/>
        <Route path='task' element={<Task/>}/>
      </Route>
      <Route path="calendar" element={<Calendar />} />
      <Route path='*' element={<HomeFeed/>}/>
    </Route>
  )
);


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyle>
      <ThirdwebProvider
        activeChain={ChainId.Mumbai}
        clientId={`${import.meta.env.VITE_APP_WEB3_CLIENT_ID}`}
        supportedWallets={[
          metamaskWallet(),
          localWallet(),
        ]}
      >
        <RouterProvider router={router} />
      </ThirdwebProvider>
    </GlobalStyle>
  </React.StrictMode>
);
