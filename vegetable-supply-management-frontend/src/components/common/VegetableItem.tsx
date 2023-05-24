import React from 'react';
import { TbCurrencyDong } from "react-icons/tb";
import { useNavigate } from 'react-router-dom';
import Images from 'src/assets/images';
import { VegetableDetail } from 'src/types/vegetable';

const VegetableItem = ({ vegetable }: {vegetable: VegetableDetail}) => {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/product/${vegetable.id}`)
  }

  return (
    <div onClick={handleClick} className='cursor-pointer'>
       <li className='border-2 border-gray-200 rounded hover:border-mainColorLight p-2 bg-white'>
            <div className='flex flex-col gap-2'>
            <h2 className='font-bold'>{ vegetable.id }</h2>
            <div className='flex gap-2 w-full'>
                <img src={ Images.CAROT } alt='No Image' className='w-[70px] h-[70px]'/>
                <div className='flex flex-col h-[70px] w-full justify-between'>
                <h2>{ vegetable.vegetableName }</h2>
                <div className='flex justify-between w-full'>
                    <div className='flex items-center'>
                    <span>{ vegetable.currentPricing }</span>
                    <TbCurrencyDong /> 
                    <span>/ kg</span> 
                    </div>
                </div>
                </div>
            </div>
            </div>
        </li>
    </div>
  )
}

export default VegetableItem
