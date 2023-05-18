import React from 'react'
import Images from 'src/assets/images'

const Footer = () => {

  const topRef = React.useRef<HTMLDivElement>(null);

  const handleBackToTop = () => {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0
  }

  return (
    <>
      <div 
        ref={topRef}
        className='text-center bg-[#37475A] text-white mt-2 py-3 cursor-pointer hover:bg-[#45586e]'
        onClick={handleBackToTop}
      >
        Back to top
      </div>
      <div className='bg-[#232F3E] h-auto px-20 py-5 text-white'>
        <div className='grid grid-cols-3 justify-evenly justify-items-center content-evenly '>
          <div className='flex flex-col justify-self-start'>
            <h3 className='font-bold mb-5'>Chăm sóc khách hàng</h3>
            <div className='flex flex-col gap-3 text-left text-[#DDDDDD]'>
              <span>Trung tâm trợ giúp</span>
              <span>Hướng dẫn đặt hàng</span>
              <span>Hướng dẫn bán hàng</span>
              <span>Thanh toán</span>
              <span>Hoàn tiền</span>
              <span>Chăm sóc khách hàng</span>
              <span>Khiếu nại</span>
              <span>Chính sách bảo hành</span>
              <span>Chính sách bán hàng</span>
              <span>Chính sách hợp đồng</span>
            </div>
          </div>

          <div className='flex flex-col'>
            <h3 className='font-bold mb-5'>Về chúng tôi</h3>
            <div className='flex flex-col gap-3 text-left text-[#DDDDDD]'>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
                dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
                It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged
              </p>
            </div>
          </div>

          <div className='flex flex-col'>
            <h3 className='font-bold mb-5'>Thanh toán</h3>
            <div className='grid grid-cols-3 gap-3 text-left text-[#DDDDDD]'>
              <div className='bg-white px-2 py-1 rounded-sm shadow-sm'>
                <img src={Images.MASTER_CARD} alt='' className='w-[25px] h-[25px] m-auto' />
              </div>
              <div className='bg-white px-2 py-1 rounded-sm shadow-sm'>
                <img src={Images.MASTER_CARD} alt='' className='w-[25px] h-[25px] m-auto' />
              </div>
              <div className='bg-white px-2 py-1 rounded-sm shadow-sm'>
                <img src={Images.MASTER_CARD} alt='' className='w-[25px] h-[25px] m-auto' />
              </div>
              <div className='bg-white px-2 py-1 rounded-sm shadow-sm'>
                <img src={Images.MASTER_CARD} alt='' className='w-[25px] h-[25px] m-auto' />
              </div>
              <div className='bg-white px-2 py-1 rounded-sm shadow-sm'>
                <img src={Images.MASTER_CARD} alt='' className='w-[25px] h-[25px] m-auto' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
    
  )
}

const FooterAdmin = () => {
  return (
    <div className='bg-[#232F3E] h-max mt-2 ml-[250px] p-2'>
      <div className='flex justify-around items-center'>
        
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
          dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
          It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
        dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
        <p>Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard 
        dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
        It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.</p>
      </div>
    </div>
  )
}

export { Footer, FooterAdmin}
