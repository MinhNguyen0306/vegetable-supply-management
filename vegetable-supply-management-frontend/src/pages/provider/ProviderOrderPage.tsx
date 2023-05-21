import React from 'react'
import Button from 'src/components/common/Button'
import SelectForm from 'src/components/form/SelectForm'
import { AiOutlineSearch } from "react-icons/ai";
import { setOverlayOpen } from 'src/redux/features/appState/appState.slice';
import { useDispatch, useSelector } from 'react-redux';
import OverlayModal from 'src/components/common/modal/OverlayModal';

const orderStatusProvider = [
  "Chờ nhận", "Đã"
]

const headerTab: string[] = [
  "Mã đơn hàng", "Mã khách hàng", "Tên khách hàng", "Thời gian đặt", "Thời gian nhận", "", "Thao tác"
]

const orderData: any[] = [
  {
    id: "DH001",
    mart: "KH001",
    name: "Sieu thi 1",
    orderDate: "20/3/2023",
    deliveryDate: "20/4/2023",
    status: "active",
  },
  {
    id: "DH001",
    mart: "KH001",
    name: "Sieu thi 1",
    orderDate: "20/3/2023",
    deliveryDate: "20/4/2023",
    status: "active",
  },
]

const optionFilter = [
  {
    value: "deliveryDate",
    display: "Thời gian giao"
  },
  {
    value: "orderDate",
    display: "Thời gian nhận"
  },
  {
    value: "martId",
    display: "Mã KH"
  },
  {
    value: "orderId",
    display: "Mã đơn"
  },
  {
    value: "mart",
    display: "Tên KH"
  },
]

const OrderPage = () => {

  const dispatch = useDispatch();
  const { overlayOpen } = useSelector((state: any) => state.appState)

  const handleOpenOrderDetail = () => {
    dispatch(setOverlayOpen(true))
  }

  return (
    <>
      { overlayOpen && <OverlayModal type='order-detail' /> }
      <div className='flex flex-col gap-5 w-[95%] m-auto'>
        <h1 className='font-bold text-2xl'>Đơn hàng hiện có</h1>
        <div className='w-full'>
          {/* Filter Section */}
          <div className='flex  h-[32px] mb-5'>
            <div className='min-w-[100px]'>
              <SelectForm 
                name='filter'
                label='Loc don hang'
                options={optionFilter}
                keyValue='value'
                keyDisplay='display'
              />
            </div>
           
            <div className='rounded border flex-1 relative h-full bg-white px-2'>
              <AiOutlineSearch className='absolute left-3 -translate-y-1/2 top-1/2 h-full text-md'/>
              <input type='text' className='outline-none bg-transparent h-full w-full'/>
            </div>
          </div>
          {/* End Filter Section */}    

          {/* Header Section */}
          <div className=' grid grid-cols-7 grid-rows-1 bg-gray-300 rounded h-[45px] mb-5'>
            {
              headerTab.map((title, index) => (
                <div key={index} className='flex items-center justify-center px-2'>
                  <span>{ title }</span>
                </div>
              ))
            }
          </div>
          {/* End Header Section */}

          {/* Content Section */}
          <div className='flex flex-col gap-3'>
            {
              orderData.map((data, index) =>
              (
                <div key={index} className='w-full h-[50px] grid grid-cols-7 rounded border-2 border-gray-300 bg-white'>
                  <div className='flex items-center justify-center px-2'>
                    <span>{ data.id }</span>
                  </div>
                  <div className='flex items-center justify-center px-2'>
                    <span>{ data.mart }</span>
                  </div>
                  <div className='flex items-center justify-center px-2'>
                    <span>{ data.name }</span>
                  </div>
                  <div className='flex items-center justify-center px-2 text-gray-500'>
                    <span>{ data.orderDate }</span>
                  </div>
                  <div className='flex items-center justify-center px-2 text-gray-500'>
                    <span>{ data.deliveryDate }</span>
                  </div>
                  <div className='flex items-center justify-center px-2 text-gray-500'>
                    <span
                      className='text-blue-500 font-bold hover:text-blue-300 cursor-pointer'
                      onClick={handleOpenOrderDetail}
                    >
                      Xem chi tiết
                    </span>
                  </div>
                  <div className='flex items-center justify-center px-2'> 
                    <Button rounded>Nhận</Button>
                  </div>
                </div>
              ))
            }
          </div>
          {/* End Content Section */}
        </div>
      </div>
    </>
    
  )
}

export default OrderPage
