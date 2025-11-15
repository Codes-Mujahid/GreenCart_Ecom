import { useContext } from 'react'
import { AppContext } from '../context/AppContext'
import { useParams } from 'react-router-dom'
import { categories } from '../assets/assets.js'
import ProductCart from '../components/ProductCart'

const ProductCategory = () => {
    const {products}= useContext(AppContext)
    const {categoryPath}= useParams()
    const searchCategoryObj= categories.find((el)=> el.path.toLowerCase()=== categoryPath)
    const filteredProducts= products.filter((el)=> el.category.toLowerCase()=== categoryPath)
  return (
    <div className='mt-16'>
        {searchCategoryObj && (
            <div className='flex flex-col w-max'>
                <div className='flex flex-col w-max items-end'>
                  <p className='text-2xl font-medium'>{searchCategoryObj.text.toUpperCase()}</p>
                  <div className='h-[2px] w-[40%] bg-green-600'></div>
                </div>
                <div className='pt-10 grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6 mb-20'>
                    {filteredProducts.filter((el)=> el.inStock).map((el)=> (
                      <ProductCart key={el._id} product={el} />
                    ))}
                </div>
            </div>
        )}
    </div>
  )
}

export default ProductCategory