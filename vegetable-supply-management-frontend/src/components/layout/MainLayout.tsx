import Topbar from "../common/Header/Topbar";
import GlobalLoading from "../common/GlobalLoading";
import { Footer } from "../common/Footer";
import Sidebar from "../common/Sidebar/Sidebar";
import React from "react";
import { Outlet } from "react-router-dom";
import OrderSidebar from "../common/OrderSidebar";
import { useSelector } from "react-redux";
import OverlayModal from "../common/modal/OverlayModal";

interface Props {
    children?: any
}

const MainLayout = ({ children }: Props) => {

    const { modalLoading, errorMessage, successMessage } = useSelector((state: any) => state.appState)

    return (
        <>
            {/* <GlobalLoading /> */}
            <div className="relative flex flex-col min-h-screen">
                { modalLoading && <OverlayModal type="loading" data="Loading..."/> }
                { successMessage && <OverlayModal type="success" data={successMessage}/> }
                { errorMessage && <OverlayModal type="error" data={errorMessage}/> }
                <Topbar />
                {/* <Sidebar /> */}
                <OrderSidebar />
                <div className="flex-grow overflow-hidden min-h-screen mt-[86px] m-5">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default MainLayout
