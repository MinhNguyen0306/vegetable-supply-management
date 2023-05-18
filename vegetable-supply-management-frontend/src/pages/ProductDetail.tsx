import React, { useState } from 'react'
import Images from '../assets/images';

interface IProductDetail {
  
}

const arrImg = [
  Images.VEGE_BG, Images.OTCHUONG, Images.OTCHUONG2, Images.CAROT, Images.MONGTOI
]

const ProductDetail: React.FC<IProductDetail> = () => {

  const [quantity, setQuantity] = useState<any | null>(1);
  const [indexHover, setIndexHover] = useState(0);

  const handleOnMouseOver = (index:number) => setIndexHover(index)

  const minusQuantity = () => setQuantity(quantity > 1 ? quantity - 1 : 1)

  const plusQuantity = () => setQuantity((prev:any) => prev + 1)

  return (
    <div className='flex flex-col bg-slate-400 min-h-screen'>
      <div className='flex m-1 h-fit w-fit'>
        <div className='flex flex-col p-3 w-[450px]'>
          <div className='block relative box-border h-[430px] w-full'>
            <img src={arrImg[indexHover]} alt='' className='w-full h-full cursor-zoom-in rounded-3xl'/>
          </div>
          <div className='flex justify-between mt-3 w-full'>
            {arrImg.map((image,index) => (
              <div key={index} onMouseOver={() => handleOnMouseOver(index)} className={`w-1/6 h-20 inline-block`}>
                <img src={image} className={`w-full h-full cursor-pointer rounded-xl ${index === indexHover ? 'active-thumb' : ''}`} alt=''/>
              </div>
            ))}
          </div>
        </div>
        <div className='flex flex-col w-auto'>
          <h2>Bông cải baby</h2>
          <h3>129.000vnd</h3>
          <h3>Lua chon don vi klg</h3>
          <div className='flex gap-3'>
            <div className='flex gap-1'>
              <input type='radio' id='1kg' name='klg' value='1kg' checked/>
              <label htmlFor="1kg">1KG</label>
            </div>
            <div className='flex gap-1'>
              <input type='radio' id='500g' name='klg' value='500g' />
              <label htmlFor="500g">500G</label>
            </div>
          </div>

          <div className='flex gap-1'>
            {/* Quantity Box */}
            <div className='flex items-center rounded-xl border-4 border-emerald-700 bg-slate-500 h-[45px] w-[150px]'>
              <input type='button' value='-' className='w-1/4 h-full font-semibold text-lg cursor-pointer' onClick={minusQuantity}/>
              <input type="text" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="
              w-1/2 outline-none h-full bg-white p-2 font-semibold text-base text-center"/>
              <input type='button' value='+' className='w-1/4 h-full font-semibold text-lg cursor-pointer' onClick={plusQuantity}/>
            </div>
            {/* End Quantity Box */}

            {/* Button Add Cart */}
            <button className='w-[250px] relative bg-lime-600 h-[45px] rounded-3xl font-semibold text-white text-sm uppercase
            before:bg-white before:w-full before:h-full before:absolute before:top-0 before:left-0 before:scale-0 before:rounded-3xl before:opacity-0
            hover:before:opacity-100 hover:before:scale-100 before:transition-all before:duration-300'>
                <p className=''>Them vao gio</p>
              
            </button>

            <button className='w-[250px] relative bg-lime-600 h-[45px] rounded-3xl font-semibold
             text-white text-sm uppercase before:bg-white before:w-1/12 before:h-full 
             before:absolute before:top-0 before:right-0 before:opacity-0 before:rounded-3xl before:z-10
            hover:before:w-full hover:before:opacity-100 hover:before:left-0 hover:before:right-auto
             before:transition-all before:duration-500'>
                <p className=''>Them vao gio</p>
            </button>

            {/* <Button contained outlined>Them vao gio</Button> */}
            {/* Button Add Cart */}
          </div>
          
        </div>
      </div>
    </div>
  )
}

export default ProductDetail
