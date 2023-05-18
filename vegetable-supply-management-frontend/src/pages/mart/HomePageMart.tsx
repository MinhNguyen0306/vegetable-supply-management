import React from 'react';
import Images from 'src/assets/images';
import {TiShoppingCart} from "react-icons/ti";
import { FaFileContract } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { MdOutlineShoppingBag, MdOutlineHandshake } from "react-icons/md";
import { IoTimeOutline } from "react-icons/io5";
import { TbCurrencyDong } from "react-icons/tb";
import HeroSlide from 'src/components/common/HeroSlide';

interface Props {
    children?: React.ReactNode
}

const dataProviders: {id:string|number, name:string, logo:any}[] = [
  {
    id: 1,
    name: "Vườn A",
    logo: Images.CAROT
  },
  {
    id: 2,
    name: "Vườn B",
    logo: Images.CAROT
  },
  {
    id: 3,
    name: "Vườn C",
    logo: Images.CAROT
  },
  {
    id: 4,
    name: "Vườn D",
    logo: Images.CAROT
  }
]

const recentVegetable: {
  id: number|string,
  name: string,
  logo: string,
  price: number,
  releaseDate: string
  provider: string,
}[] = [
  {
    id: "VG-051321",
    name: "Rau xanh da lat",
    logo: Images.MONGTOI,
    price: 200000,
    releaseDate: "1/2/2023",
    provider: "Nha cung cap 1"
  },
  {
    id: "VG-051321",
    name: "Rau xanh da lat",
    logo: Images.CAROT,
    price: 200000,
    releaseDate: "1/2/2023",
    provider: "Nha cung cap 1"
  },
  {
    id: "VG-051321",
    name: "Rau xanh da lat",
    logo: Images.CAROT,
    price: 200000,
    releaseDate: "1/2/2023",
    provider: "Nha cung cap 1"
  },
  {
    id: "VG-051321",
    name: "Rau xanh da lat",
    logo: Images.CAROT,
    price: 200000,
    releaseDate: "1/2/2023",
    provider: "Nha cung cap 1"
  },
]

const HomePageMart = ({ children }: Props) => {

  const navigate = useNavigate();

  const handleClickOrder = () => {
    navigate("/order")
  }

  const handleClickContract = () => {
    navigate("/contract")
  }

  return (
    <>
      {/* <HeroSlide /> */}
      <div className='w-50 min-h-screen'>
        <div className='w-full h-[450px] relative'>
          <img src={Images.FARM} alt='' className='w-full h-full bg-contain' />
          <div className='flex gap-40 w-[80%] h-[130px] rounded-2xl absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2'>
            <div className='group relative w-1/2 h-full border-4 border-white backdrop-blur-sm  rounded-2xl font-semibold 
            text-white text-center align-middle leading-[130px] cursor-pointer'>
              <span className='group-hover:opacity-0 group-hover:invisible transition-all duration-500'>Tạo đơn hàng</span>
              <button className='w-[100px] p-4 border-2 border-white rounded-xl absolute top-1/2 left-1/2 
                -translate-x-1/2 -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible
                duration-500 transition-all group-hover:scale-150' onClick={handleClickOrder}>
                <TiShoppingCart className='m-auto'/>
              </button>
            </div>
            <div className='group relative w-1/2 h-full border-4 border-white backdrop-blur-sm  rounded-2xl font-semibold
             text-white text-center align-middle leading-[130px] cursor-pointer'>
              <span className='group-hover:opacity-0 group-hover:invisible transition-all duration-500'>Ký hợp đồng với chúng tôi</span>
                <button className='w-[100px] p-4 border-2 border-white rounded-xl absolute top-1/2 left-1/2 
                  -translate-x-1/2 -translate-y-1/2 opacity-0 invisible group-hover:opacity-100 group-hover:visible
                  duration-500 transition-all group-hover:scale-150' onClick={handleClickContract}>
                  <FaFileContract className='m-auto'/>
                </button>
            </div>
          </div>
        </div>

        <div className='flex flex-col mt-10 gap-y-20 h-auto w-full p-4'>
          {/* Provider Section */}
          <div className='flex flex-col gap-5 h-auto w-full'>
            <div className='flex items-center justify-center gap-2 font-bold text-2xl'>
              <MdOutlineHandshake />
              <span>Đối tác của chúng tôi</span>
            </div>
            <ul className='grid grid-cols-6 gap-2 h-full'>
              {dataProviders.map((provider, index) => (
                <li key={index}>
                  <div className='flex flex-col justify-around items-center h-full rounded shadow-sm bg-white'>
                    <img src={provider.logo} alt='No Image' className='w-1/2 h-1/2' />
                    <div className='flex gap-2'>
                      <MdOutlineShoppingBag />
                      <span>{provider.name}</span>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          {/* End Provider Section */}

          {/* New Vegetable */}
          <div className='flex flex-col h-auto gap-5'>
            <div className='flex items-center justify-center gap-2 font-bold text-2xl'>
              <IoTimeOutline />
              <span>Sản phẩm mới nhất</span>
            </div>
            <ul className='grid grid-cols-3 gap-1 justify-center'>
              {
                recentVegetable.map((data, index) => (
                  <li key={index} className='border-2 border-gray-200 rounded hover:border-mainColorLight p-2 bg-white'>
                    <div className='flex flex-col gap-2'>
                      <h2 className='font-bold'>{ data.provider }</h2>
                      <div className='flex gap-2 w-full'>
                        <img src={ data.logo } alt='No Image' className='w-[70px] h-[70px]'/>
                        <div className='flex flex-col h-[70px] w-full justify-between'>
                          <h2>{ data.name }</h2>
                          <div className='flex justify-between w-full'>
                            <div className='flex gap-1 items-center'>
                              <IoTimeOutline />
                              <span>{ data.releaseDate }</span>
                            </div>
                            <div className='flex items-center'>
                              <span>{ data.price }</span>
                              <TbCurrencyDong />  
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>
          {/* End New Vegetable */}

          {/* Top Certification */}
          <div className='flex flex-col h-auto gap-5'>
            <div className='flex gap-1 items-center justify-center font-bold text-3xl'>
              <MdOutlineHandshake />
              <span>Chứng nhận tốt nhất</span>
            </div>
            <div className='h-auto w-full'>
              <ul className='grid grid-cols-6 gap-2 h-full'>
                {dataProviders.map((provider, index) => (
                  <li key={index}>
                    <div className='flex flex-col justify-around items-center h-full rounded shadow-sm bg-white'>
                      <img src={provider.logo} alt='No Image' className='w-1/2 h-1/2' />
                      <div className='flex gap-2'>
                        <MdOutlineShoppingBag />
                        <span>{provider.name}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {/* End Top Certification */}


        </div>
      </div>
    </>
  )
}

export default HomePageMart
