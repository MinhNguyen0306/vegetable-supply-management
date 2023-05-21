import { Footer } from "../common/Footer";
import React from "react";
import { Outlet } from "react-router-dom";
import OverlayModal from "../common/modal/OverlayModal";
import { useSelector } from "react-redux";


interface Props {
    children?: JSX.Element;
}

const NotHeaderLayout = ({ children }: Props) => {

    const { modalLoading, errorMessage, successMessage } = useSelector((state: any) => state.appState)

    return (
        <>
            {/* <GlobalLoading /> */}
            <div className="flex flex-col min-h-screen">
                { modalLoading && <OverlayModal type="loading" data="Loading..."/> }
                { successMessage && <OverlayModal type="success" data={successMessage}/> }
                { errorMessage && <OverlayModal type="error" data={errorMessage}/> }
                <div className="overflow-hidden">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default NotHeaderLayout
