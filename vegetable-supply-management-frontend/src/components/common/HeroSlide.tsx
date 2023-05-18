import React from 'react'
import Images from 'src/assets/images'
import { Autoplay } from 'swiper'
import { Swiper, SwiperSlide} from 'swiper/react'

const banners: string[] = [
    Images.FARM,
    Images.VEGE_BG
]

const HeroSlide = () => {
  return (
    <div
        className='relative text-white before:content-none before:w-full before:h-full before:absolute
        before:z-10 before:inset-0 pointer-events-none bg-gradient-to-b from-slate-800 to-black'
    >
        <Swiper
            grabCursor={true}
            loop={true}
            pagination={{
                dynamicBullets: true
            }}
            slidesPerView={1}
            // autoplay={{
            //     delay: 3000,
            //     disableOnInteraction: false,
            // // }}
            // modules={[Autoplay]}
            className='w-full h-max'
        >
            {
                banners.map((banner, index) => (
                    <SwiperSlide key={index}>
                        <div className='h-[450px] relative'>
                            <img src={banner} alt='' className=''/>
                        </div>
                    </SwiperSlide>
                ))
            }
            
        </Swiper>
    </div>
  )
}

export default HeroSlide
