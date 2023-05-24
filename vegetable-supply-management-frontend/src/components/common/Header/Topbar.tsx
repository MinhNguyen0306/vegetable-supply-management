import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Logo from "../Logo";
import { BsBoxes } from "react-icons/bs";
import { useDispatch, useSelector } from "react-redux";
import { setOrderSidebarOpen } from "src/redux/features/appState/appState.slice";
import Images from "src/assets/images";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { userLogout } from "src/redux/features/user/user.slice";
import { RootState } from "src/redux/store";
import { clearOrderTemporary } from "src/redux/features/order/order.slice";

const Topbar = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user.user);

  const userRef = React.useRef<HTMLLIElement>(null);
  const userMenuRef = React.useRef<HTMLUListElement>(null);

  const handleLogout = () => {
    dispatch(userLogout({}))
    dispatch(clearOrderTemporary)
    navigate("/login")
  }

  const handleOpenOrderSidebar = () => {
    dispatch(setOrderSidebarOpen(true))
  }

  React.useEffect(() => {
    const handleUserMenuDropdown = (e: any) => {
      const eTarget = e.target as any
      if(userRef.current === eTarget || userRef.current?.contains(eTarget)) {
        if(userMenuRef.current?.classList.contains('flex')) {
          userMenuRef.current?.classList.add('hidden')
          userMenuRef.current?.classList.remove('flex')
        } else {
          userMenuRef.current?.classList.add('flex')
          userMenuRef.current?.classList.remove('hidden')
        }
      } else {
        userMenuRef.current?.classList.remove('flex')
        userMenuRef.current?.classList.add('hidden')
      }
    }

    document.addEventListener('click', handleUserMenuDropdown);

    return () => {
      document.removeEventListener('click', handleUserMenuDropdown);
    }
  }, [])

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
          
          <li>
            <Link to="" className="menu-item">Tin tức</Link>
          </li>
          <li>
            <Link to="" className="menu-item">Quy định</Link>
          </li>
          <li>
            <Link to="" className="menu-item">Về chúng tôi</Link>
          </li>
        </ul>

        {
          user?.mart && !localStorage.getItem('access_token') ? 
          (
            <div className="menu-item">
              <Link to="/login">
                Đăng nhập
              </Link>
            </div>
          ) : (
            <ul className="flex font-semibold">
              <li className="menu-item" onClick={handleOpenOrderSidebar}>
                <div className="relative flex gap-2 text-white items-center justify-start">
                  <span>Xem đơn đặt</span>
                  <BsBoxes />
                </div>
              </li>
              <li ref={userRef} className="flex items-center cursor-pointer ml-2">
                <div>
                  <img src={Images.CAROT} alt="" 
                    className="rounded-full w-[2rem] h-[2rem] border-2 border-cyan-100 border-opacity-50" 
                  />
                  <ul
                    ref={userMenuRef}
                    className="hidden absolute w-max flex-col top-full shadow-lg rounded-md mt-1 text-black font-normal text-base
                    right-0 bg-white"
                  >
                    <li>
                      <Link to="/account">
                        <div className="flex items-center gap-1 p-2 hover:bg-gray-100 rounded-md">
                          <AiOutlineUser />
                          <span>Hồ sơ</span>
                        </div>
                      </Link>
                    </li>
                    <li className="flex items-center gap-1 p-2 hover:bg-gray-100 rounded-md" onClick={handleLogout}>
                      <AiOutlineLogout />
                      <span>Đăng xuất</span>
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          )
        }
      </div>
    </nav>
  )
}

export default Topbar
