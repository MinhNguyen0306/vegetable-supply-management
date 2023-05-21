import React from 'react';
import { TbCurrencyDong } from "react-icons/tb";

const VegetableItem = ({ data }: {data: any}) => {
  return (
    <div>
       <li className='border-2 border-gray-200 rounded hover:border-mainColorLight p-2 bg-white'>
            <div className='flex flex-col gap-2'>
            <h2 className='font-bold'>{ data.provider }</h2>
            <div className='flex gap-2 w-full'>
                <img src={ data.logo } alt='No Image' className='w-[70px] h-[70px]'/>
                <div className='flex flex-col h-[70px] w-full justify-between'>
                <h2>{ data.name }</h2>
                <div className='flex justify-between w-full'>
                    <div className='flex items-center'>
                    <span>{ data.price }</span>
                    <TbCurrencyDong />  
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
