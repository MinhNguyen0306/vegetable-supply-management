import React from 'react'
import TopbarAdmin from '../common/Header/TopbarAdmin';
import Sidebar from '../common/Sidebar/Sidebar';
import { FooterAdmin } from '../common/Footer';
import { Outlet } from 'react-router-dom';
import TopbarProvider from '../common/Header/TopbarProvider';

interface Props {
  children?: any 
}

const ProviderLayout = ({ children }: Props) => {
  return (
    <div>
         {/* <GlobalLoading /> */}
         <div className="flex flex-col min-h-screen">
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
