import React, {useEffect} from 'react'
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import vegetableApi from 'src/api/modules/vegetable.api';
import SelectForm from 'src/components/form/SelectForm';
import { getVegetablesByProvider, getVegetablesOfProviderByType } from 'src/redux/features/vegetable/vegetable.thunks';
import { RootState, useAppDispatch } from 'src/redux/store';
import { VegetableDetail } from 'src/types/vegetable';
import { AiOutlineLock, AiOutlineUnlock, AiOutlineEdit,  }  from "react-icons/ai";
import { GoIssueOpened } from "react-icons/go";
import LockAction from './LockAction';
import { PayloadAction } from '@reduxjs/toolkit';

const types: {type: string, display: string}[] = [
    {type: "all", display: "Tất cả"},
    {type: "active", display: "Đang hoạt động"},
    {type: "disable", display: "Đã ẩn"},
    {type: "resolving", display: "Chờ duyệt"},
    {type: "soldout", display: "Hết hàng"}
]

const ManageVegetableContainer = () => {

    const { pathname } = useLocation(); 
    const navigate = useNavigate();
    const dispatchThunk = useAppDispatch();
    const { listVegetable } = useSelector((state: RootState) => state.vegetable);
    const providerId = useSelector((state: RootState) => state.user.user?.provider.id)

    const active = types.findIndex(type => type.type === pathname.substring(pathname.lastIndexOf('/') + 1, pathname.length));

    const handleChangeTab = (type: string) => {
        navigate(`${pathname.slice(0, pathname.lastIndexOf("/"))}/${type}`)
    }

    React.useEffect(() => {
        if(providerId && active === 0) {
            const promise = dispatchThunk(getVegetablesByProvider({providerId, pageNumber: 0, pageSize: 4}))
            return () => {
                promise.abort();
            }
        }
        if(providerId && active === 1) {
            const promise = dispatchThunk(getVegetablesOfProviderByType({providerId, type: "active", pageNumber: 0, pageSize: 4}))
            return () => {
                promise.abort();
            }
        }
        if(providerId && active === 2) {
            const promise = dispatchThunk(getVegetablesOfProviderByType({providerId, type: "disable" , pageNumber: 0, pageSize: 4}))
            return () => {
                promise.abort();
            }
        }
        console.log(listVegetable)
        
    }, [dispatchThunk, active])

    useEffect(() => {
        if(active === -1) {
            navigate("/404")
        }
    }, [])

    return (
        <div className='flex flex-col bg-white min-h-[200px] w-11/12 pb-5 mb-10'>
            <div className='border-b-gray-100 h-[50px] w-full'>
                <div className='flex border-b-2 items-center justify-start px-5'>
                    {
                        types.map((type, index) => (
                            <div 
                                key={index} 
                                className={`h-full w-max px-5 cursor-pointer leading-[50px] hover:text-mainColor
                                transition-all duration-300 border-b-4 border-b-transparent 
                                ${index === active ? "text-mainColor !border-b-mainColor" : ""}`}
                                onClick={() => handleChangeTab(type.type)}
                            >
                                {type.display}
                            </div>
                        ))
                    }
                </div>
            </div>

            <div className='border-2 border-gray-200 rounded mt-5 mx-5'>
                <div className='m-0 p-0 bg-gray-200'>
                    <table className='w-full'>
                        <colgroup span={6}>
                            <col width={200}/>
                            <col width={100}/>
                            <col width={100}/>
                            <col width={100}/>
                            <col width={100}/>
                            <col width={100}/>

                        </colgroup>
                        <thead className='bg-mainColor text-slate-50'>
                            <tr>
                                <th colSpan={1}>
                                    <span>Tên sản phẩm</span>
                                </th>
                                <th className='p-4'>
                                    <span>Danh mục</span>
                                </th>
                                <th className='p-4'>
                                    <span>Giá</span>
                                </th>
                                <th className='p-4'>
                                    <span>Còn</span>
                                </th>
                                <th className='p-4'>
                                    <span>Doanh thu</span>
                                </th>
                                <th className='p-4'>
                                    Thao tác
                                </th>
                            </tr>
                        </thead>
                        <tbody className='[&>*:nth-child(even)]:bg-slate-100'>
                            {
                                listVegetable.content?.map((data, index) => (
                                    <tr key={index}>
                                        <td className='p-4 text-left break-all'>
                                            {data.vegetableName}
                                        </td>
                                        <td className='p-4 text-center'>
                                            <span>{data.category.categoryName}</span>
                                        </td>
                                        <td className='p-4 text-center'>
                                            <span>{data.currentPricing}</span>
                                        </td>
                                        <td className='p-4 text-center'>
                                            <span>{data.currentStock}</span>
                                        </td>
                                        <td className='p-4 text-center'>
                                            <span>100</span>
                                        </td>
                                        <td className='p-4'>
                                            <LockAction data={data}/>
                                        </td>
                                    </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default ManageVegetableContainer
