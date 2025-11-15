import React, { useContext } from 'react'
import { categories } from '../assets/assets.js'
import { AppContext } from '../context/AppContext.jsx'
const Categories = () => {
  const {navigate}= useContext(AppContext)
  return (
    <div className='py-10'>
      <h1 className='text-2xl md:text-3xl font-medium'>Categories</h1>
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-6 mt-6'>
        {categories.map((el, idx)=> (
        <div key={idx} className='group flex flex-row px-3 py-5 justify-center items-center rounded-lg cursor-pointer' style={{backgroundColor:el.bgColor}}
        onClick={() => {
          navigate(`/products/${el.path.toLowerCase()}`);
          scrollTo(0, 0);
        }}>
          <div className='flex flex-col'>
            <img className='max-w-28 transition group-hover:scale-110' src={el.image} alt="" />
            <p className='text-sm font-medium'>{el.text}</p>
          </div>
        </div>
      ))}
      </div>
    </div>
  )
}

export default Categories