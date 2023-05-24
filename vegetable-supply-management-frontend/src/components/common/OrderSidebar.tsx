import React from 'react'
import { AiOutlineClose } from "react-icons/ai";
import FormDatepicker from '../form/FormDatepicker';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useDispatch, useSelector } from 'react-redux';
import { setOpenOrderConfirm, setOrderSidebarOpen } from 'src/redux/features//appState/appState.slice';
import Button from './Button';
import Images from 'src/assets/images';
import { RootState } from 'src/redux/store';
import { TbCurrencyDong } from 'react-icons/tb';
import { deleteOrderItemTemporary, setOrderDelivaryDate } from 'src/redux/features/order/order.slice';

const OrderSidebar = () => {
    const [selectDate, setSelectDate] = React.useState<Date | null>(new Date());

    const dispatch = useDispatch();
    const openOrderSidebar = useSelector((state:RootState) => state.appState.openOrderSidebar);
    const orderTemporary = useSelector((state: RootState) => state.order.orderTemporary); 

    const barRef = React.useRef<HTMLDivElement>(null);
    let days = React.useRef<number>(0);
    let hours = React.useRef<number>(0);
    let minutes = React.useRef<number>(0);


    const handleChangeDate = (date: Date | null) => {
        setSelectDate(date)
    }

    function handleRemoveItem(index: number) {
        dispatch(deleteOrderItemTemporary(index))
    }

    function handleCheckoutOrder() {
        dispatch(setOpenOrderConfirm(true))
        dispatch(setOrderSidebarOpen(false))
    } 

    const handleClose = () => {
        dispatch(setOrderSidebarOpen(false))
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
        const date = new Date();
        const initDate = date.setDate(date.getDate() - 1)
        const deadline = selectDate ? selectDate.getTime() : initDate
        const distance = deadline - date.getTime()
        
        days.current = Math.floor(distance / (1000 * 60 * 60 * 24))
        hours.current = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
        minutes.current = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60))

        dispatch(setOrderDelivaryDate(selectDate?.toISOString()))
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

                <div className='relative w-full flex-grow flex items-center justify-center mt-4'>
                    { orderTemporary.orderItems.length < 1 ?
                        (
                            <div className='w-max h-max flex flex-col justify-center items-center gap-2 font-normal text-gray-500'>
                                <img src={Images.EMPTY_BOX} alt='No Image' className='filter opacity-50' />
                                <span>Chưa có sản phẩm nào</span>
                            </div>
                        ) : (
                            <ul className='absolute top-0 w-full overflow-y-scroll '>
                                {
                                    orderTemporary.orderItems.map((item, index) => (
                                        <li key={index} onClick={() => handleRemoveItem(index)}>
                                            <div className='flex justify-between items-center
                                            bg-gray-100 shadow-md p-2 rounded mb-2 cursor-pointer hover:bg-slate-200'>
                                                <img src={Images.CAROT} alt='No Image'
                                                    className='w-[50px] h-[50px]'
                                                />
                                                <div className='flex flex-col gap-1 flex-grow px-2'>
                                                    <span>{ item.vegetable.vegetableName }</span>
                                                    <div className='flex items-center'>
                                                    <span>{ item.vegetable.currentPricing }</span>
                                                    <TbCurrencyDong />
                                                </div>
                                                </div>
                                                <span>x { item.quantity }</span>
                                            </div>
                                        </li>
                                    ))
                                }
                            </ul>
                        )
                    }
                </div>
                

                <div className='relative bottom-0 left-0 h-[200px] w-full'>
                    <div className='absolute w-full border-t-4 border-t-black flex flex-col gap-2 bottom-0'>
                        <div className='flex justify-between items-center'>
                            <h2>Tổng số sản phẩm: </h2>
                            <span>{ orderTemporary.totalItem }</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <h2>Bao gồm: </h2>
                            <span>{ orderTemporary.categories.join(', ') }</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Tổng tiền: </span>
                            <span>{ orderTemporary.totalPrice }</span>
                        </div>
                        <div className='flex justify-between items-center'>
                            <span>Giao sau: </span>
                            <span>
                                { `${days.current} ngày ${hours.current} giờ ${minutes.current} phút` }
                            </span>
                        </div>
                        <Button type='button' onClick={handleCheckoutOrder}>
                            Đặt hàng
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default OrderSidebar
