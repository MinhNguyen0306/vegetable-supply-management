import React, { useEffect } from 'react'
import {useRef} from "react"
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import { TbLoader } from "react-icons/tb"

interface Props {
    message: string;
}

const LoadingModal: React.FC<Props> = ({ message }) => {

  return (
    <div 
      className='flex flex-col justify-center items-center gap-2 absolute w-max h-max p-10 rounded-lg shadow-md bg-white'
    >
      <TbLoader className='animate-spin'/>
      <span>{message}</span>
    </div>
  )
}

export default LoadingModal
