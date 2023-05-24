import {useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import React from "react";
import Sidebar from "../Sidebar/Sidebar";
import Logo from "../Logo";
import Images from "src/assets/images";
import { FaBars } from "react-icons/fa";
import { BiSearch, BiBell } from "react-icons/bi";
import { AiOutlineMail, AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "src/redux/features/user/user.slice";
import { RootState } from "src/redux/store";

const TopbarProvider: React.FC = () => {
    const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(false);
    const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
    const dispatch = useDispatch();

  
    let toggleRef = useRef<HTMLElement>(null);
    const userRef = useRef<HTMLLIElement>(null);
    const userMenuRef = useRef<HTMLUListElement>(null);

    const handleLogout = () => {
      dispatch(userLogout({}))
    }
  
    React.useEffect(() => {
      let handler = (e: MouseEvent) => {
        if(toggleRef.current != null) {
          if(!toggleRef.current.contains(e!.target as HTMLElement) && (e.target as HTMLElement).id !== 'toggle') {
            setSidebarOpen(false)
          }
        }
      }
      
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

      window.addEventListener('click', handler);
      document.addEventListener('click', handleUserMenuDropdown);

      return () => {
        window.removeEventListener('click', handler);
        document.removeEventListener('click', handleUserMenuDropdown);
      }
    }, [])
  
    return (
      <>
        <Sidebar refer={toggleRef} open={sidebarOpen} toggleSidebar={toggleSidebar} />
        <nav className="bg-mainColor text-white fixed w-screen top-0 left-0 right-0 z-50 shadow-md">
          <div className="flex justify-between items-center max-w-[95%] mx-auto relative">
            <div className="flex flex-row list-none items-center gap-5">
              <FaBars id="toggle" size={25} className="md:hidden mr-4" onClick={toggleSidebar}/>
              <Logo />
            </div>
  
            <form className="relative w-1/2 bg-white rounded-md md:rounded-3xl my-2 h-10">
              <input type="text" className="border-none w-full h-full outline-none px-10 py-3 text-black bg-transparent" 
              placeholder="...Search"/>
              <BiSearch color="black" size={30} className="absolute h-full top-1/2 right-3 -translate-y-1/2 cursor-pointer"/>
            </form>
  
            <ul className="flex flex-row font-semibold list-none items-center">
              <li className="badge-item">
                <Link to="">
                  <BiBell />
                </Link>
              </li>
              <li className="badge-item">
                  <Link to="">
                    <AiOutlineMail />
                  </Link>
              </li>

              <li ref={userRef} className="badge-item">
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
                      <Link to="/provider/account">
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
          </div>
        </nav>
      </>
    )
  }

  export default TopbarProvider;