import { Link } from "react-router-dom";
import Images from "../../../assets/images";
import React from "react";
import Logo from "../Logo";
import { BsBoxes } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setOrderSidebarOpen } from "src/redux/features/appStateSlice";

interface Props {
  children?: any
}

const Topbar: React.FC<Props> = ({ children }) => {

  const dispatch = useDispatch();

  const handleOpenOrderSidebar = () => {
    dispatch(setOrderSidebarOpen(true))
  }

  return (
    <nav className="bg-gradient-to-b from-linearTopColor to-linearBottomColor text-white fixed w-screen top-0 left-0 right-0
     z-50 shadow-md">
      <div className="flex justify-between items-center max-w-7xl mx-auto relative">
        <Logo />
        <ul className="flex font-semibold">
          <li>
            <Link to="/provider/register" className="menu-item">
              Trở thành nhà cung cấp
            </Link>
          </li>
          
          <li><a href="" className="menu-item">Tin tức</a></li>
          <li><a href="" className="menu-item">Quy định</a></li>
          <li><a href="" className="menu-item">Về chúng tôi</a></li>
        </ul>
        <ul className="flex font-semibold">
          <li><a href="" className="menu-item">Account</a></li>
          <li className="menu-item" onClick={handleOpenOrderSidebar}>
            <div className="relative flex gap-2 text-white items-center justify-start">
              <span>Xem đơn đặt</span>
              <BsBoxes />
            </div>
          </li>
        </ul>
      </div>
    </nav>
  )
}

export default Topbar
