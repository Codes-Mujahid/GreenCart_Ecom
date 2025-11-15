import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../context/AppContext'
import ProductCart from '../components/ProductCart'

const AllProducts = () => {
  const {products, searchQuery}= useContext(AppContext);
  const [filteredProducts, setFilteredProducts]= useState([]);
  console.log(searchQuery);

  useEffect(()=> {
    if(searchQuery.length > 0){
      setFilteredProducts(()=>(
        products.filter((el)=> el.name.toLowerCase().includes(searchQuery.toLowerCase()))
      ))
    } else{
      setFilteredProducts(products)
    }
  }, [products, searchQuery])
  return (
    <div className='flex flex-col mb-20'>
      <div className='flex flex-col items-end w-max'>
          <h1 className='text-xl sm:text-2xl font-medium'>ALL PRODUCTS</h1>
          <div className='h-[2px] w-16 bg-green-600 rounded-full'></div>
      </div>
      <div className='pt-10 grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6'>
          {filteredProducts.filter((el)=> el.inStock).map((el)=> (
            <ProductCart key={el._id} product={el} />
          ))}
      </div>
    </div>
  )
}

export default AllProducts