import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setThemeMode } from 'src/redux/features/appState/appState.slice';
import menuConfigs from 'src/configs/menu.config';
import SidebarItem from './SidebarItem';

interface IProps {
    open?: boolean,
    refer?: any,
    toggleSidebar?: () => void
}

const Sidebar: React.FC<IProps> = ({ open, refer, toggleSidebar }) => {
    const dispatch = useDispatch();

    const themeMode = useSelector((state: any) => state.themeMode)

    const { pathname } = useLocation();
    const active = menuConfigs. sidebarAdminNav.findIndex(e => e.path === pathname);

    return (
        <div ref={refer} className={`${open ? 'block' : 'hidden'} md:block h-screen w-[250px] fixed text-base mt-[56px] 
        bg-slate-50 shadow-md overflow-hidden transition-all duration-300`}>
            <ul className='flex flex-col h-screen list-none py-2 m-0 gap-1 overflow-hidden'>
                {
                    menuConfigs.sidebarAdminNav.map((item, index) => (
                        <li key={index} className="w-full rounded-sm" onClick={() => toggleSidebar}>
                            <SidebarItem
                                icon={item.icon}
                                title={item.title}
                                path={item.path}
                                children={item.children}
                                index={index}
                                active={active}
                            />
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default Sidebar
