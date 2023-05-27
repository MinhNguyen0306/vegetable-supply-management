import React from 'react'
import Button from 'src/components/common/Button'
import SelectForm from 'src/components/form/SelectForm'
import { AiOutlineSearch } from "react-icons/ai";
import { setOverlayOpen } from 'src/redux/features/appState/appState.slice';
import { useDispatch, useSelector } from 'react-redux';
import OverlayModal from 'src/components/common/modal/OverlayModal';
import { RootState, useAppDispatch } from 'src/redux/store';
import { getAllOrder, resolveOrder } from 'src/redux/features/order/order.thunks';
import { PageRequest } from 'src/types/base';
import { OrderDetail } from 'src/types/order';
import { useNavigate } from 'react-router-dom';

const headerTab: string[] = [
  "Mã đơn hàng", "Khách hàng", "Ngày đặt", "Ngày nhận", "Trang thai", "", "Thao tác"
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

interface SortBy {
  value: string,
  label: string
}

const optionFilter: SortBy[] = [
  {
    value: "id",
    label: "Mã đơn"
  },
  {
    value: "deliveryDate",
    label: "Thời gian giao"
  },
  {
    value: "orderDate",
    label: "Ngày đặt"
  },
  {
    value: "martId",
    label: "Mã KH"
  },
  {
    value: "mart",
    label: "Tên KH"
  },
]

const AdminOrderPage = () => {
  const dispatch = useDispatch();
  const dispatchThunk = useAppDispatch();
  const navigate = useNavigate();

  const { overlayOpen } = useSelector((state: any) => state.appState)

  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(4);
  const [sortBy, setSortBy] = React.useState<SortBy>(optionFilter[0]);
  const [sortDir, setSortDir] = React.useState<string>('asc');
  const [request, setRequest] = React.useState<boolean>(false);

  const listOrder = useSelector((state: RootState) => state.order.listOrder);
  console.log(listOrder)
  const orderDetail = useSelector((state: RootState) => state.order.orderDetail);

  const handleOpenOrderDetail = (order: OrderDetail) => {
    navigate(`${order.id}`)
  }

  async function handleAccepOrder(order: OrderDetail) {
    const pageRequest: PageRequest = { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy?.value, sortDir: sortDir }
    setRequest(true)
    await dispatchThunk(resolveOrder({ orderId: order.id, typeResolve: 'RESOLVE' }))
    setRequest(false)
  }

  async function handleRejectOrder(order: OrderDetail) {
    setRequest(true)
    const pageRequest: PageRequest = { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy?.value, sortDir: sortDir }
    await dispatchThunk(resolveOrder({ orderId: order.id, typeResolve: 'REJECT' }))
    setRequest(false)
  }

  React.useEffect(() => {
    const pageRequest: PageRequest = { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy?.value, sortDir: sortDir }
    const ordersPromise = dispatchThunk(getAllOrder({request: pageRequest}))
    return () => {
      ordersPromise.abort()
    }
  }, [dispatchThunk, sortBy])

  return (
    <>
      { overlayOpen && <OverlayModal type='order-detail' /> }
      <div className='flex flex-col gap-5 w-[95%] m-auto'>
        <h1 className='font-bold text-2xl'>Đơn hàng hiện có</h1>
        <div className='w-full'>
          {/* Filter Section */}
          <div className='flex  h-[32px] mb-5'>
            <div className='min-w-[150px]'>
              <SelectForm 
                name='filter'
                title='-- Sắp xếp theo --'
                options={optionFilter}
                keyValue='value'
                keyDisplay='label'
                flex='row'
                selectedOption={sortBy}
                onChange={(s) => setSortBy(s)}
              />
            </div>
           
            <div className='rounded border flex-1 flex items-center relative h-full bg-white px-2'>
              <AiOutlineSearch className='mr-2 h-full text-md'/>
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
              listOrder?.content?.map((data, index) =>
              (
                <div key={index} className='w-full h-[50px] grid grid-cols-7 rounded border-2 border-gray-300 bg-white'>
                  <div className='flex items-center justify-center px-2'>
                    <span>{ data.id.slice(0, 5) }</span>
                  </div>
                  <div className='flex items-center justify-center px-2'>
                    <span>{ data.mart.martName }</span>
                  </div>
                  <div className='flex items-center justify-center px-2 text-gray-500'>
                    <span>{ new Date(data.orderDate).toLocaleDateString() }</span>
                  </div>
                  <div className='flex items-center justify-center px-2 text-gray-500'>
                    <span>{ new Date(data.deliveryDate).toLocaleDateString() }</span>
                  </div>
                  <div className='flex items-center justify-center px-2'>
                    <span 
                        className={`${data.orderStatus === 'PENDING' ? 'text-blue-500' : 
                        data.orderStatus === 'REJECT' ? 'text-red-500' : 
                        data.orderStatus === 'RESOLVE' ? 'text-green-500' :
                        data.orderStatus === 'CANCEL' ? 'text-slate-500' :
                        'text-purple-500'} font-bold`}
                    >
                        { data.orderStatus }
                    </span>
                  </div>
                  <div className='flex items-center justify-center px-2 text-gray-500'>
                    <span
                      className='text-blue-500 font-bold hover:text-blue-300 cursor-pointer'
                      onClick={() => handleOpenOrderDetail(data)}
                    >
                      Xem chi tiết
                    </span>
                  </div>
                  <div className='flex items-center justify-center gap-1'> 
                    <button 
                        onClick={() => handleAccepOrder(data)}
                        className='text-center py-1 w-[50px] rounded-md bg-green-500 text-sm text-white hover:opacity-80'
                    >
                        Duyệt
                    </button>
                    <button 
                        onClick={() => handleRejectOrder(data)}
                        className='text-center py-1 w-[50px] rounded-md bg-red-500 text-sm text-white hover:opacity-80'
                    >
                        Hủy
                    </button>
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

export default AdminOrderPage
