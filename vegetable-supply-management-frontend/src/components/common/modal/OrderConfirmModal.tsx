import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import FormTextarea from 'src/components/form/FormTextarea'
import { Order, OrderPayload, OrderTemporary } from 'src/types/order'
import Button from '../Button'
import { useDispatch, useSelector } from 'react-redux'
import { RootState, useAppDispatch } from 'src/redux/store'
import { setErrorMessage, setOpenOrderConfirm, setSuccessMessage } from 'src/redux/features/appState/appState.slice'
import { createOrder } from 'src/redux/features/order/order.thunks'
import { clearOrderTemporary } from 'src/redux/features/order/order.slice'

const OrderConfirmModal = ({data}: {data: OrderTemporary}) => {

    const dispatch = useDispatch()
    const dispatchThunk = useAppDispatch()

    const user = useSelector((state: RootState) => state.user.user)

    const [description, setDescription] = React.useState<string>("")

    function closeModal() {
        dispatch(setOpenOrderConfirm(false))
    }

    const confirmOrder = async () => {
        const order: OrderPayload = {
            description: description,
            deliveryDate: new Date(data.deliveryDate),
            orderItems: data.orderItems
        }
        if(user && user.mart !== null && user.mart.id !== null) {
            const promise = await dispatchThunk(createOrder({ martId: user.mart.id, payload: order }))
            if(promise.payload) {
                dispatch(clearOrderTemporary)
                dispatch(setSuccessMessage("Đặt hàng thành công"))
            } else {
                dispatch(setErrorMessage("Lỗi yêu cầu"))
            }
        }
        dispatch(setOpenOrderConfirm(false))
    }

    return (
        <div className='flex flex-col w-1/3 h-1/2 bg-white shadow-md rounded-lg'>
            <div className='flex items-center justify-between py-2 px-2 border-b border-b-gray-500'>
                <span className='flex-grow text-center font-bold'>
                    Xác nhận đặt đơn hàng này?
                </span>
                <AiOutlineClose className='hover:border hover:border-gray-500 cursor-pointer' onClick={closeModal}/>
            </div>
        
            <div className='flex flex-col w-full h-full gap-1'>
                <div className='w-full flex-grow p-5'>
                    <FormTextarea 
                        id='description'
                        placeholder='Them mo ta cho don hang'
                        value={description}
                        rows={7}
                        flex='col'
                        fullWidth
                        onChange={(e) => setDescription(e.target.value)}
                    />
                </div>
                <div className='flex justify-evenly mb-5'>
                    <Button type='button' rounded onClick={confirmOrder}>
                        Xác nhận
                    </Button>
                    <Button type='button' rounded outlined onClick={closeModal}>
                        Hủy
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default OrderConfirmModal
