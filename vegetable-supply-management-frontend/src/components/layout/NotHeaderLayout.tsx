import GlobalLoading from "../common/GlobalLoading";
import { Footer } from "../common/Footer";
import { Outlet } from "react-router-dom";

interface Props {
    children?: JSX.Element;
}

const NotHeaderLayout = ({ children }: Props) => {
    return (
        <>
            {/* <GlobalLoading /> */}
            <div className="flex flex-col min-h-screen">
                <div className="overflow-hidden">
                    <Outlet />
                </div>
                <Footer />
            </div>
        </>
    )
}

export default NotHeaderLayout
