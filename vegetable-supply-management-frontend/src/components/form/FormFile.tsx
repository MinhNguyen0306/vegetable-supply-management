import React from 'react'
import { AiOutlineUpload } from 'react-icons/ai'

const FormFile = () => {
  return (
    <div>
        <input type='file' id='file' accept='image/*' className='hidden'/>
        <label 
            htmlFor="file" 
            className='bg-yellow-500 px-5 py-2 rounded cursor-pointer hover:bg-yellow-400 flex gap-1
            items-center justify-center text-white'
        >
            <AiOutlineUpload />
            <span>Tải ảnh lên</span>
        </label>
    </div>
  )
}

export default FormFile
