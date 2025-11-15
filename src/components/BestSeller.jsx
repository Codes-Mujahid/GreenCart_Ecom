import React, { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import ProductCart from './ProductCart';

const BestSeller = () => {
    const {products}= useContext(AppContext);
  return (
    <div className='py-10'>
        <h1 className='text-2xl md:text-3xl font-medium'>Best Sellers</h1>
        <div className='pt-10 grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6'>
            {products.filter((el)=> el.inStock).slice(0, 5).map((el)=>
              (<ProductCart key={el._id} product={el} />)
            )}
        </div>
    </div>
  )
}

export default BestSeller