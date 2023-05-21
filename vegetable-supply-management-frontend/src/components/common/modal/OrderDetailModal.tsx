import React, { useEffect } from 'react'
import { OrderDetail } from 'src/types/order';
import { AiOutlineClose } from "react-icons/ai";
import { TbCurrencyDong } from "react-icons/tb";
import Button from '../Button';
import { useDispatch } from 'react-redux';
import { setOverlayOpen } from 'src/redux/features/appState/appState.slice';

interface Props {
    data?: OrderDetail,
}

const OrderDetailModal = (props: Props) => {
    const { data } = props;

    const dispatch = useDispatch();

    const handleCloseModal = () => {
        dispatch(setOverlayOpen(false))
    }

    return (
        <div className='relative w-1/3 h-5/6 bg-white rounded-sm shadow-md p-2'>
            <div className='flex items-center justify-center text-xl font-bold mb-3'>
                <div className='flex-1 flex justify-center '>
                    <span>Đơn hàng: <span>DH001</span></span>
                </div>
                <AiOutlineClose
                    className='border-2 border-transparent hover:border-gray-400 cursor-pointer'
                    onClick={handleCloseModal}
                />
            </div>
            <div className='overflow-y-scroll'>
                <div className='flex justify-between items-center'>
                    <span className='min-w-[100px] text-right mr-5'>Bên đặt:</span>
                    <span className='flex-1 break-all'>Nguyễn Lê Minh</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='min-w-[100px] text-right mr-5'>Mô tả:</span>
                    <span className='flex-1 break-all'>Mô tả này là của modal </span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='min-w-[100px] text-right mr-5'>Ngày đặt: </span>
                    <span className='flex-1 break-all'>12/3/2023</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='min-w-[100px] text-right mr-5'>Ngày giao: </span>
                    <span className='flex-1 break-all'>15/6/2023</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='min-w-[100px] text-right mr-5'>Trạng thái: </span>
                    <span className='flex-1 break-all'>Active</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='min-w-[100px] text-right mr-5'>Số sản phẩm: </span>
                    <span className='flex-1 break-all'>15</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='min-w-[100px] text-right mr-5'>Bao gồm: </span>
                    <span className='flex-1 break-all'>Rau, củ, quả</span>
                </div>
                <div className='flex justify-between items-center'>
                    <span className='min-w-[100px] text-right mr-5'>Tổng cộng: </span>
                    <span className='flex items-center justify-start flex-1 break-all'>
                        <span>150000</span>
                        <TbCurrencyDong />
                    </span>
                </div>
            </div>

            <div className='absolute bottom-0 left-0 w-full p-2'>
                <Button type='button' outlined maxWidth>
                    Nhận đơn
                </Button>
            </div>
        </div>
    )
}

export default OrderDetailModal
