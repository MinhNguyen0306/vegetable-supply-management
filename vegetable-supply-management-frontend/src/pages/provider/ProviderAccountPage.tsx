import React from 'react';
import { AiOutlineUpload } from "react-icons/ai";
import Images from 'src/assets/images';
import FormFile from 'src/components/form/FormFile';
import FormInputChoice from 'src/components/form/FormInputChoice';

const ProviderAccountPage = () => {
  return (
    <div className='flex flex-col w-[95%] m-auto gap-5'>
      <div className='h-[50px] bg-white px-5'>
        <span>Trang thông tin </span>
      </div>
      
      <div className='flex flex-col bg-white w-full'>
        <div className='h-[50px] w-full border-b-4 border-b-gray-300 px-5'>
            <span>Thong tin tai khoan</span>
        </div>
        <div className='p-5 grid grid-cols-2 gap-2 justify-center items-center'>
            <div className='flex gap-2'>
                <span>Username: </span>
                <span>Minhnguyen001</span>
            </div>
            <div className='flex gap-2'>
                <span>Email: </span>
                <span>minhnguyen03062001@gmail.com</span>
            </div>
            <div className='flex gap-2'>
                <span>phone: </span>
                <span>0546465465</span>
            </div>
            <div className='flex gap-2'>
                <span>Address: </span>
                <span>Ninh Hoa Khanh Hoa</span>
            </div>
        </div>
      </div>

      <div className='flex flex-col bg-white w-full'>
            <div className='w-full h-[45px] flex items-center border-b-4 border-b-gray-300 px-5'>
                <span>Thong tin chung</span>
            </div>
            <div className='flex flex-col p-5 gap-5'>
                <div className='flex flex-col justify-center items-start'>
                    <h2>Logo</h2>
                    <div className='flex gap-5 items-center '>
                        <div>
                            <img src={Images.VEGE_BG} alt='No Image'
                            className='w-[50px] h-[50px]' />
                        </div>
                        <FormFile />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <h1>Kho hinh anh</h1>
                    <div className='flex flex-wrap items-center justify-start gap-2'>
                        <div>
                            <img src={Images.VEGE_BG} alt='No Image'
                            className='w-[50px] h-[50px]' />
                        </div>
                        <FormFile />
                    </div>
                </div>

                <div className='flex flex-col'>
                    <h1>Giay phep kinh doanh</h1>
                    <div className='flex flex-wrap items-center justify-start gap-2'>
                        <div>
                            <img src={Images.VEGE_BG} alt='No Image'
                            className='w-[50px] h-[50px]' />
                        </div>
                        <FormFile />
                    </div>
                </div>

                <div className='grid grid-cols-2 gap-5 '>
                    <div className='flex gap-2'>
                        <span>Diện tích sản xuất</span>
                        <FormInputChoice />
                    </div>
                    <div className='flex gap-2'>
                        <span>Sản lượng hàng năm</span>
                        <FormInputChoice />
                    </div>
                </div>
                
            </div>
        </div>
    </div>
  )
}

export default ProviderAccountPage
