import React from 'react'
import TopbarAdmin from '../common/Header/TopbarAdmin';
import SidebarAdmin from '../common/Sidebar/SidebarAdmin';
import { FooterAdmin } from '../common/Footer';
import { Outlet } from 'react-router-dom';

interface Props {
  children?: any 
}

const AdminLayout = ({ children }: Props) => {
  return (
    <div>
         {/* <GlobalLoading /> */}
         <div className="flex flex-col min-h-screen">
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
