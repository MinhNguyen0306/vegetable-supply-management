import React from 'react'
import TopbarAdmin from '../common/Header/TopbarAdmin';
import Sidebar from '../common/Sidebar/Sidebar';
import { FooterAdmin } from '../common/Footer';
import { Outlet } from 'react-router-dom';
import TopbarProvider from '../common/Header/TopbarProvider';
import { useSelector } from 'react-redux';
import OverlayModal from '../common/modal/OverlayModal';

interface Props {
  children?: any 
}

const ProviderLayout = ({ children }: Props) => {

  const { modalLoading, errorMessage, successMessage } = useSelector((state: any) => state.appState)

  return (
    <div>
         {/* <GlobalLoading /> */}
         <div className="flex flex-col min-h-screen">
          { modalLoading && <OverlayModal type="loading" data="Loading..."/> }
          { successMessage && <OverlayModal type="success" data={successMessage}/> }
          { errorMessage && <OverlayModal type="error" data={errorMessage}/> }
          <TopbarProvider />
          <Sidebar />
          <div className="flex-grow overflow-hidden min-h-screen mt-[70px] ml-[250px] p-2">
              <Outlet />
          </div>
          <FooterAdmin />
        </div>
    </div>
  )
}

export default ProviderLayout
