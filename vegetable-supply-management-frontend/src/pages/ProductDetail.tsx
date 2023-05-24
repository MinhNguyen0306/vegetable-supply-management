import React, { useState } from 'react'
import Images from '../assets/images';
import { VegetableDetail } from 'src/types/vegetable';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, useAppDispatch } from 'src/redux/store';
import { getVegetableById } from 'src/redux/features/vegetable/vegetable.thunks';
import SelectForm from 'src/components/form/SelectForm';
import { getAllUnitOfVegetable } from 'src/redux/features/unit/unit.thunks';
import { TbCurrencyDong } from 'react-icons/tb';
import Button from 'src/components/common/Button';
import { addItemIntoOrderTemporary } from 'src/redux/features/order/order.slice';
import { Unit } from 'src/types/unit';
import { OrderItem } from 'src/types/orderitem';
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";

const arrImg = [
  Images.VEGE_BG, Images.OTCHUONG, Images.OTCHUONG2, Images.CAROT, Images.MONGTOI
]

const ProductDetail = () => {
  const dispatchThunk = useAppDispatch();
  const dispatch = useDispatch();
  const { productId } = useParams();

  const vegetableDetail = useSelector((state: RootState) => state.vegetable.vegetableDetail);
  const listUnit = useSelector((state: RootState) => state.unit.listUnit)

  const [unit, setUnit] = React.useState<Unit>();
  const [quantity, setQuantity] = useState<number>(1);
  const [indexHover, setIndexHover] = useState(0);

  function handleAddOrder () {
    const orderItem: OrderItem = { 
      quantity: quantity,
      vegetable: vegetableDetail
    }
    toast("Đã thêm")
    dispatch(addItemIntoOrderTemporary(orderItem))
  }

  React.useEffect(() => {
    if(productId) {
      const promise = dispatchThunk(getVegetableById(productId))
      const unitsPromise = dispatchThunk(getAllUnitOfVegetable(productId))
      return () => {
        promise.abort()
        unitsPromise.abort()
      }
    }
    window.scrollTo(0,0)
  }, [dispatchThunk, productId])


  const handleOnMouseOver = (index:number) => setIndexHover(index)

  const minusQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1)

  const plusQuantity = () => setQuantity((prev:any) => prev + 1)

  return (
    <div className='flex flex-col bg-white min-h-screen w-10/12 m-auto p-5'>
      <div className='flex m-1 h-fit w-fit'>
        <div className='flex flex-col w-[500px] mr-8'>
          <div className='block relative box-border h-[430px] w-full'>
            <img src={arrImg[indexHover]} alt='No Image' className='w-full h-full cursor-zoom-in rounded-3xl'/>
          </div>
          <div className='flex justify-between mt-3 w-full'>
            {arrImg.map((image,index) => (
              <div key={index} onMouseOver={() => handleOnMouseOver(index)} className={`w-1/6 h-20 inline-block`}>
                <img src={image} className={`w-full h-full cursor-pointer rounded-xl ${index === indexHover ? 'active-thumb' : ''}`} alt=''/>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col'>
          <div className='flex flex-col'>
              <h1 className='font-bold text-2xl'>
                {vegetableDetail.vegetableName}
              </h1>
              <h2 className='flex items-center justify-start font-bold text-xl'>
                <span>{vegetableDetail.currentPricing}</span>
                <TbCurrencyDong />
              </h2>
              <h1><span>Loại sản phẩm: </span>{vegetableDetail.category.categoryName}</h1>
          </div>
         
          <div className='flex gap-10 items-center justify-start w-1/2'>
            <SelectForm 
              name='units'
              label='Chọn đơn vị'
              title='-- Chọn đơn vị --'
              options={listUnit}
              keyValue='id'
              keyDisplay='unitName'
              flex='col'
              selectedOption={unit}
              onChange={(u) => setUnit(u)}
            />

            <div className='flex flex-col gap-2'>
              <span className='text-left'>
                Chọn số lượng
              </span>
              <div className='flex items-center rounded border border-gray-300 h-[35px] w-[150px]'>
                <button 
                  type='button' 
                  onClick={minusQuantity}
                  className='w-1/4 h-full font-semibold text-lg cursor-pointer hover:bg-gray-300' 
                >
                  -
                </button>
                <input
                  type="number" 
                  value={quantity} 
                  onChange={(e) => setQuantity(Number.parseInt(e.target.value.trim()))} 
                  className="w-1/2 outline-none h-full bg-white p-2 font-semibold text-base text-center"
                />
                <button 
                  type='button'
                  onClick={plusQuantity}
                  className='w-1/4 h-full font-semibold text-lg cursor-pointer hover:bg-gray-300'>
                  +
                </button>
              </div>
            </div>
          </div>
          
          <div className='my-5'>
            <Button 
              type='button' 
              rounded
              onClick={handleAddOrder}
            >
              Đặt hàng
            </Button>
          </div>

          <div className='flex flex-col gap-4 justify-start my-10'>
              <h1 className='font-bold text-xl'>
                Chứng nhận an toàn thực phẩm
              </h1>
              <ul className='flex gap-2'>
                {
                  arrImg.map((image, index) => (
                    <img key={index} src={image} alt='NO Image' 
                      className='w-[70px] h-[70px] border-2 border-transparent rounded-md hover:border-gray-300 cursor-zoom-in'
                    />
                  ))
                }
              </ul>
          </div>

          <div className='flex flex-col gap-4 justify-start my-10'>
              <h1 className='font-bold text-xl'>
                Mô tả sản phẩm
              </h1>
              <div>
                <p>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quo nobis, similique unde nulla 
                  alias eum tempora vel, consequuntur sed enim ab magni reiciendis vitae aspernatur, modi itaque! 
                  Maxime, vitae repellendus?
                </p>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
