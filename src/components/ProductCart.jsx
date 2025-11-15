import { useContext } from "react";


import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";
const ProductCart = ({product}) => {
    const {cartItems, addToCart, removeFromCart, navigate}= useContext(AppContext)
    return(
        <div onClick={()=>{navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0)}} className="border border-gray-500/20 rounded-md md:px-4 px-3 py-2 bg-white w-full sm:max-w-[200px] md:max-w-[220px] lg:max-w-[250px]">
            <div className="group cursor-pointer flex items-center justify-center px-2">
                <img className="group-hover:scale-105 transition max-w-26 md:max-w-36" src={product.image} alt={product.name} />
            </div>
            <div className="text-gray-500/60 text-sm">
                <p>{product.category}</p>
                <p className="text-gray-700 font-medium text-lg truncate w-full">{product.name}</p>
                <div className="flex items-center gap-0.5">
                    {Array(5).fill('').map((_, i) => (
                        
                        <img key={i} className="w-3 md:w-3.5" src={i<4 ? assets.star_icon : assets.star_dull_icon} />

                    ))}
                    <p>({4})</p>
                </div>
                <div className="flex items-end justify-between mt-3">
                    <p className="md:text-xl text-base font-medium color-primary">
                        ${product.offerPrice} <span className="text-gray-500/60 md:text-sm text-xs line-through">${product.price}</span>
                    </p>
                    <div onClick={(e)=> e.stopPropagation()} className="color-primary">
                        {!cartItems[product._id] ? ( // true karon cartItem akhon empty obj
                            <button className="flex items-center justify-center gap-1 color-primary border border-color-primary md:w-[80px] w-[64px] h-[34px] rounded color-primary font-medium cursor-pointer" onClick={() => addToCart(product._id)}>
                                
                                <img src={assets.cart_icon} alt="" />
                                Add
                            </button>
                        ) : (
                            <div className="flex items-center justify-center gap-2 md:w-20 w-16 h-[34px] bg-green-100 rounded select-none font-medium">
                                <button onClick={() => {removeFromCart(product._id); } } className="font-medium cursor-pointer text-md px-2 h-full" >
                                    -
                                </button>
                                <span className="w-5 text-center">{cartItems[product._id]}</span>
                                <button onClick={() => addToCart(product._id)} className="font-medium cursor-pointer text-md px-2 h-full" >
                                    +
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCart