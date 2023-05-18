import React, { useEffect } from 'react'
import {useRef} from "react"
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TiTick } from "react-icons/ti";


interface Props {
    message: string;
}

const SuccessModal: React.FC<Props> = ({ message }) => {

  return (
    <div
      className='flex flex-col justify-center items-center gap-2 absolute w-max h-max px-20 py-8 rounded-lg shadow-md bg-white'
    >
      <div className='rounded-full bg-mainColor text-white font-bold text-3xl p-2'>
        <TiTick />
      </div>
      <span>{message}</span>
    </div>
  )
}

export default SuccessModal
