import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import FormDatepicker from '../form/FormDatepicker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { setOrderSidebarOpen } from 'src/redux/features/appStateSlice';
import Button from './Button';
import Images from 'src/assets/images';

const OrderSidebar = () => {
    // const initDate = React.useRef<any>(now.setDate(now.getDate() + 1));
    const [selectDate, setSelectDate] = React.useState<Date | undefined | null>(new Date());

    const dispath = useDispatch();
    const { openOrderSidebar } = useSelector((state:any) => state.appState);
    const { orderTemporary } = useSelector((state: any) => state.order);   
    const barRef = React.useRef<HTMLDivElement>(null);
    let days = React.useRef<number>(0);
    let hours = React.useRef<number>(0);
    let minutes = React.useRef<number>(0);


    const handleChangeDate = (date: Date | undefined | null) => {
        setSelectDate(date)
    }

    const handleClose = () => {
        dispath(setOrderSidebarOpen(false))
    }

    React.useEffect(() => {
        if(openOrderSidebar) document.body.style.overflow = 'hidden'
        else document.body.style.overflow = ''

        let handler = (e: any) => {
            if(!barRef.current?.contains(e.target)) {
                handleClose()
            }
        }

        document.addEventListener('mousedown', handler)
        return () => {
            document.removeEventListener('mousedown', handler)
        }
    }, [openOrderSidebar])

    React.useEffect(() => {
        const now = new Date().getTime()
        const deadline = selectDate ? selectDate.getTime() : new Date().getTime()
        const distance = deadline - now
        
        days.current = Math.floor(distance / (1000 * 60 * 60 * 24))
        hours.current = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        minutes.current = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))
    }, [selectDate])

    return (
        <div ref={barRef} className={`${openOrderSidebar ? "w-96 opacity-100": "w-0 opacity-0"} fixed left-0 z-[9999] h-screen
         bg-white shadow-2xl transition-all duration-300`}>
            <div className='relative h-full w-full flex flex-col p-5'>
                <div 
                    className='relative flex items-center justify-between mb-4 border-b-4 border-b-black pb-4'
                >
                    <h1>Order Sumary</h1>
                    <div 
                        onClick={handleClose} 
                        className='rounded-full text-md cursor-pointer border-2 border-transparent hover:border-gray-500'
                    >
                        <AiOutlineClose />
                    </div>
                </div>

                <FormDatepicker 
                    label='Chọn ngày giao'
                    selected={selectDate}
                    onChange={handleChangeDate}
                    flex='row'
                    showTimeSelect
                    showTimeInput
                    isRequired
                />

                <div className='w-full flex-grow flex items-center justify-center mt-4'>
                    { orderTemporary.orderItems.length < 1 ?
                        (
                            <div className='w-max h-max flex flex-col justify-center items-center gap-2 font-normal text-gray-500'>
                                <img src={Images.EMPTY_BOX} alt='No Image' className='filter opacity-50' />
                                <span>Chưa có sản phẩm nào</span>
                            </div>
                        ) : (
                            <ul className=' hidden overflow-y-scroll'>
                                
                            </ul>
                        )
                    }
                </div>
                

                <div className='bottom-0 left-0 h-[200px] w-full p-5'>
                    <div className='border-t-4 border-t-black flex flex-col gap-2'>
                        <div className='flex justify-between items-center'>
                            <h2>Tổng số sản phẩm: </h2>
                            <span>x53</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <h2>Bao gồm</h2>
                            <span>Rau, củ, quả</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Tổng tiền</span>
                            <span>10000</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Giao sau</span>
                            <span>
                                { `${days.current} ngày ${hours.current} giờ ${minutes.current} phút` }
                            </span>
                        </div>
                        <Button>
                            Đặt hàng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSidebar
