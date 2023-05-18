import React, { useEffect } from 'react';
import { useState, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import { BsChevronDown } from "react-icons/bs";

interface ItemProps {
    icon?: any;
    title: string;
    path?: string;
    children?: {
        title: string;
        path: string;
    }[];
    index: number;
    active: number
}

const SidebarItem = (props: ItemProps) => {
    const { icon, title, path, children, index, active } = props;

    const itemRef = useRef<HTMLLIElement>(null);
    const listRef = useRef<HTMLUListElement>(null);

    const [isExpand, setIsExpand] = useState<boolean>(false);

    const { pathname } = useLocation();
    let itemHeight = useRef<number | undefined>(0);
    let listHeight = useRef<number>(0);

    const activeChild = children?.findIndex(e => e.path === pathname);

    const handleExpand = () => {
        setIsExpand(!isExpand)
    }


    useEffect(() => {
        itemHeight.current = itemRef.current?.clientHeight
        listHeight.current = itemHeight.current !== undefined && children ? itemHeight.current * children?.length : 0;
        if(listRef.current?.style.height !== undefined) {
            listRef.current.style.height = isExpand ? listHeight.current + 'px' : '0';
        }
    }, [isExpand])

    return (
        <div className='w-full rounded-sm'>
            {
                children !== undefined ? (
                    <div className={`sidebar-item`} onClick={handleExpand}>
                        <div className='text-2xl mr-2'>
                            {icon}
                        </div>
                        <span>
                            {title}
                        </span>
                        <BsChevronDown className={`absolute right-0 mr-6 transition-all duration-300 ${isExpand ? "rotate-180" : ""}`} />
                    </div>
                ) : (
                    <Link to={path ? path as string : ''} className={`sidebar-item ${index === active ? 'active' : ''}`}>
                        <div className='text-2xl mr-2'>
                            {icon}
                        </div>
                        <span>
                            {title}
                        </span>
                    </Link>
                )
            }
        
            <ul ref={listRef} className={`flex flex-col h-0 list-none ml-10 w-auto overflow-hidden transition-all 
                duration-300 ease-in-out`}>
                {
                    children?.map((c, i) => (
                        <li ref={itemRef} key={i} className={`p-1 hover:text-mainColor 
                            ${i === activeChild ? "text-mainColor" : ""}`}
                        >
                            <Link to={c.path}>
                                <span>{c.title}</span>
                            </Link>
                        </li>
                    ))
                }
            </ul>
        </div>
    )
}

export default SidebarItem
