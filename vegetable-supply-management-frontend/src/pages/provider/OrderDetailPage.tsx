import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getOrderById } from 'src/redux/features/order/order.thunks'
import { RootState, useAppDispatch } from 'src/redux/store'
import { IoIosArrowBack } from "react-icons/io";
import { TbCurrencyDong } from 'react-icons/tb';
import { useSelector } from 'react-redux';
import Images from 'src/assets/images';

const OrderDetailPage = () => {

    const { orderId } = useParams()
    const navigate = useNavigate()
    const dispatchThunk = useAppDispatch();

    const orderDetail = useSelector((state: RootState) => state.order.orderDetail)

    React.useEffect(() => {
        if(orderId) {
            const orderDetailPromise = dispatchThunk(getOrderById(orderId));
            return () => {
                orderDetailPromise.abort()
            }
        }

    }, [dispatchThunk, orderId])

    return (
        <div className='relative w-[1000px] m-auto min-h-screen bg-white'>
            <div className='p-5'>
                <div className='flex items-center justify-between mb-5'>
                    <h1 className='font-bold text-black text-3xl'>Chi tiết đơn hàng</h1>
                    <span  
                        onClick={() => navigate(-1)}
                        className='hover:opacity-80 flex gap-2 items-center justify-end cursor-pointer'
                    >
                        <IoIosArrowBack />
                        <span>Về trang trước</span>
                    </span>
                </div>

                {/* Order Info Section */}
                <div className='flex justify-between w-full'>
                    <div className='flex-1 flex flex-col mr-5'>
                        <table>
                            <thead>
                                <tr className='border-b border-b-gray-300'>
                                    <th className='w-[35%] py-2 px-1'>
                                        Sản phẩm
                                    </th>
                                    <th className='w-[10%] py-2 px-1'>
                                        Giá / kg
                                    </th>
                                    <th className='w-[25%] py-2 px-1'>
                                        Đơn vị
                                    </th>
                                    <th className='w-[10%] py-2 px-1'>
                                        Số lượng
                                    </th>
                                    <th className='w-[20%] py-2 px-1'>
                                        Tổng
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className='border-b border-b-gray-300'>
                                    <td width="35%" className='py-2 px-1 text-center'>
                                        <div className='flex items-center justify-center'>
                                            <img src={Images.CAROT} alt='' className='w-[50px] h-[50px]' />
                                            <span>Ten san pham</span>
                                        </div>
                                    </td>
                                    <td width="10%" className='py-2 px-1 text-center'>
                                        <span>50000</span>
                                    </td>
                                    <td width="25%" className='py-2 px-1 text-center'>
                                        <span>2000g/bo</span>
                                    </td>
                                    <td width="10%" className='py-2 px-1 text-center'>
                                        <span>50</span>
                                    </td>
                                    <td width="20%" className='py-2 px-1 text-center'>
                                        <span className='flex items-center justify-center'>
                                            <span>10000</span>
                                            <TbCurrencyDong />
                                        </span>
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-300'>
                                    <td width="35%" className='py-2 px-1 text-center'>
                                        <div className='flex items-center justify-center'>
                                            <img src={Images.CAROT} alt='' className='w-[50px] h-[50px]' />
                                            <span>Ten san pham</span>
                                        </div>
                                    </td>
                                    <td width="10%" className='py-2 px-1 text-center'>
                                        <span>50000</span>
                                    </td>
                                    <td width="25%" className='py-2 px-1 text-center'>
                                        <span>2000g/bo</span>
                                    </td>
                                    <td width="10%" className='py-2 px-1 text-center'>
                                        <span>50</span>
                                    </td>
                                    <td width="20%" className='py-2 px-1 text-center'>
                                        <span className='flex items-center justify-center'>
                                            <span>10000</span>
                                            <TbCurrencyDong />
                                        </span>
                                    </td>
                                </tr>
                                <tr className='border-b border-b-gray-300'>
                                    <td width="35%" className='py-2 px-1 text-center'>
                                        <div className='flex items-center justify-center'>
                                            <img src={Images.CAROT} alt='' className='w-[50px] h-[50px]' />
                                            <span>Ten san pham</span>
                                        </div>
                                    </td>
                                    <td width="10%" className='py-2 px-1 text-center'>
                                        <span>50000</span>
                                    </td>
                                    <td width="25%" className='py-2 px-1 text-center'>
                                        <span>2000g/bo</span>
                                    </td>
                                    <td width="10%" className='py-2 px-1 text-center'>
                                        <span>50</span>
                                    </td>
                                    <td width="20%" className='py-2 px-1 text-center'>
                                        <span className='flex items-center justify-center'>
                                            <span>10000</span>
                                            <TbCurrencyDong />
                                        </span>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                        <div className='flex flex-col w-1/2'>
                            <div className='flex justify-between items-center gap-5'>
                                <span>Tổng số sản phẩm </span>
                                <span>15</span>
                            </div>
                            <div className='flex justify-between items-center gap-5'>
                                <span>Giá trị đơn hàng: </span>
                                <span>50000</span>
                            </div>
                            <div className='flex justify-between items-center gap-5'>
                                <span>Mã đơn: </span>
                                <span>{ orderId }</span>
                            </div>
                        </div>
                    </div>
                    
                    <div className='flex-2 border border-gray-500 flex flex-col'>
                        <div className='w-full flex flex-col border-b border-b-gray-500'>
                            <span className='font-bold text-center p-1 border-b border-b-gray-500'>Thông tin đơn hàng</span>
                            <div className='flex flex-col p-1 gap-1'>
                                <div className='flex justify-between items-center gap-5'>
                                    <span>Mã đơn: </span>
                                    <span>{ orderId }</span>
                                </div>
                                <div className='flex justify-between items-center gap-5'>
                                    <span>Trạng thái: </span>
                                    <span>{ orderDetail.orderStatus }</span>
                                </div>
                                <div className='flex justify-between items-center gap-5'>
                                    <span>Ngày đặt: </span>
                                    <span>{ orderDetail.orderDate }</span>
                                </div>
                                <div className='flex justify-between items-center gap-5'>
                                    <span>Ngày đặt: </span>
                                    <span>{ orderDetail.orderDate }</span>
                                </div>
                                <div className='flex justify-between items-center gap-5'>
                                    <span>Ngày giao: </span>
                                    <span>{ orderDetail.deliveryDate }</span>
                                </div>
                                <div className='flex justify-between items-center gap-5'>
                                    <span>Mô tả: </span>
                                    <span>{ orderDetail.description }</span>
                                </div>
                            </div>
                        </div>
                        <div className='w-full flex flex-col'>
                            <span className='font-bold text-center p-1 border-b border-b-gray-500'>Thông tin khách hàng</span>
                            <div className='flex flex-col p-1 gap-1'>
                                <div className='flex justify-between items-center'>
                                    <span>Tên siêu thị: </span>
                                    <span>{ orderDetail.mart.martName }</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span>Địa chỉ: </span>
                                    <span>{ orderDetail.mart.martName }</span>
                                </div>
                                <div className='flex justify-between items-center'>
                                    <span>Liên lạc: </span>
                                    <span>{ orderDetail.mart.faxCode }</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Order Info Section */}
            </div>

            <div className='fixed bottom-0 w-[1000px] m-auto bg-green-100 rounded-md h-[100px] p-5'>
                
            </div>
        </div>
    )
}

export default OrderDetailPage
