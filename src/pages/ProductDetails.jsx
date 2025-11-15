import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useParams } from "react-router-dom";
import { assets } from "../assets/assets";
import Cart from "../components/ProductCart";
import ProductCart from "../components/ProductCart";
const ProductDetails = () => {
    const {products, navigate, addToCart} = useContext(AppContext)

    const [thumbnail, setThumbnail] = useState(null);
    const {categoryPath, id}= useParams()
    const product= products.find((el)=> el._id === id)

    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
    const filtered = products.filter(
        (el) => el.category.toLowerCase() === categoryPath.toLowerCase()
    );
    setRelatedProducts(filtered);
    }, [products, categoryPath]);


    useEffect(()=> {
        setThumbnail(product.image[0])
    }, [product])


    return product && (
        <div className="mt-12">
            <p>
                <Link to={'/'}>Home</Link> /
                <Link to={'/products'}> Products</Link> /
                <Link to={`/products/${product.category.toLowerCase()}`}> {product.category}</Link> /
                <span className="color-primary"> {product.name}</span>
            </p>

            <div className="flex flex-col md:flex-row gap-16 mt-4">
                <div className="flex gap-3">
                    <div className="flex flex-col gap-3">
                        {product.image.map((image, index) => (
                            <div key={index} onClick={() => setThumbnail(image)} className="border max-w-24 border-gray-500/30 rounded overflow-hidden cursor-pointer" >
                                <img src={image} alt={`Thumbnail ${index + 1}`} />
                            </div>
                        ))}
                    </div>

                    <div className="border border-gray-500/30 max-w-100 rounded overflow-hidden">
                        <img src={thumbnail} alt="Selected product" className="w-full h-full object-cover" />
                    </div>
                </div>

                <div className="text-sm w-full md:w-1/2">
                    <h1 className="text-3xl font-medium">{product.name}</h1>

                    <div className="flex items-center gap-0.5 mt-1">
                        {Array(5).fill('').map((_, i) => (
                            <img className="w-3.5 md:w-4" src={i<4? assets.star_icon : assets.star_dull_icon} alt="" />
                        ))}
                        <p className="text-base ml-2">({4})</p>
                    </div>

                    <div className="mt-6">
                        <p className="text-gray-500/70 line-through">MRP: ${product.price}</p>
                        <p className="text-2xl font-medium">MRP: ${product.offerPrice}</p>
                        <span className="text-gray-500/70">(inclusive of all taxes)</span>
                    </div>

                    <p className="text-base font-medium mt-6">About Product</p>
                    <ul className="list-disc ml-4 text-gray-500/70">
                        {product.description.map((desc, index) => (
                            <li key={index}>{desc}</li>
                        ))}
                    </ul>

                    <div className="flex items-center mt-10 gap-4 text-base">
                        <button onClick={()=> addToCart(product._id)} className="w-full py-3.5 cursor-pointer font-medium bg-gray-100 text-gray-800/80 hover:bg-gray-200 transition" >
                            Add to Cart
                        </button>
                        <button onClick={()=> {addToCart(product._id); navigate('/cart')}} className="w-full py-3.5 cursor-pointer font-medium bg-primary text-white transition" >
                            Buy now
                        </button>
                    </div>
                </div>
            </div>

            {/* related products */}
            <div className="mt-12 mb-16">
                <div className="w-max flex flex-col items-end">
                    <h1 className="text-xl sm:text-2xl font-medium">Related Products</h1>
                    <div className="w-[50%] h-[2px] bg-green-600 rounded-full"></div>
                </div>

                <div className="pt-10 grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 md:gap-6">
                    {relatedProducts.filter((el)=> el.inStock).map((el)=> (
                        <ProductCart key={el._id} product={el}/>
                    ))}
                </div>

                <button onClick={()=> {navigate('/products'); scrollTo(0, 0)}} className="cursor-pointer border border-green-600 px-8 py-3 text-green-600 rounded-md mx-auto flex mt-12" type="button">See more</button>
            </div>
        
        </div>
    );
};

export default ProductDetails