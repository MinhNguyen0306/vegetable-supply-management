import React from 'react'
import TopbarAdmin from '../common/Header/TopbarAdmin';
import SidebarAdmin from '../common/Sidebar/SidebarAdmin';
import { FooterAdmin } from '../common/Footer';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';
import OverlayModal from '../common/modal/OverlayModal';

interface Props {
  children?: any 
}

const AdminLayout = ({ children }: Props) => {

  const { modalLoading, errorMessage, successMessage } = useSelector((state: any) => state.appState)

  return (
    <div>
         {/* <GlobalLoading /> */}
        <div className="flex flex-col min-h-screen">
          { modalLoading && <OverlayModal type="loading" data="Loading..."/> }
          { successMessage && <OverlayModal type="success" data={successMessage}/> }
          { errorMessage && <OverlayModal type="error" data={errorMessage}/> }
          <TopbarAdmin />
          <SidebarAdmin />
          <div className="flex-grow overflow-hidden min-h-screen mt-[70px] ml-[250px] p-2">
              <Outlet />
          </div>
          <FooterAdmin />
        </div>
    </div>
  )
}

export default AdminLayout
