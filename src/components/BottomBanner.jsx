import React from 'react'
import { assets, features } from '../assets/assets'

const BottomBanner = () => {
  return (
    <div className=' relative flex flex-col sm:flex-col py-4 sm:py-8 md:py-12'>
        <img className='hidden w-full md:block' src={assets.bottom_banner_image} alt="" />
        <img className='hidden sm:block md:hidden' src={assets.bottom_banner_image_sm} alt="" />
        <div className='md:absolute inset-0 flex flex-col justify-start md:justify-center pr-0 mt-40 md:mt-0 md:pr-20 items-center md:items-end '>
            <div>
                <h1 className='text-3xl md:hidden lg:block lg:text-3xl font-semibold color-primary lg:mb-6 mb-16 md:mb-0'>Why We Are the Best?</h1>
                {features.map((el, idx)=> (
                    <div key={idx} className='flex items-center gap-2 mt-8 md:mt-4'>
                        <img className='w-12 md:w-11 shrink-0 ' src={el.icon} />
                        <div className='flex flex-col'>
                            <h3 className='text-lg md:text-lg font-semibold'>{el.title}</h3>
                            <p className='text-gray-500/70 text-sm md:text-sm'>{el.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  )
}

export default BottomBanner