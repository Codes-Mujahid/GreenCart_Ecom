import { useContext, useEffect, useState } from "react"
import { AppContext } from "../context/AppContext"
import { assets } from "../assets/assets"

const Cart = () => {
    const {cartItems, navigate, products, getCartCount, updateCart, removeFromCart,getCartAmount, address}= useContext(AppContext)
    const [cartArr, setCartArr]= useState([])
    
    const [paymentOption, setPaymentOption]= useState('COD')
    
    function getCartArr() {
        let tempArr= []
        for( let key in cartItems) { // quf65dwf(key)= 3
            let product= products.find((el)=> el._id=== key);
            product.quantity= cartItems[key]
            tempArr.push(product)
        };
        setCartArr(tempArr)
    };

    useEffect(()=> {
        if(products.length >0 && cartItems) {
            getCartArr()
        }
    },[cartItems,products])

    const placeOrder=async ()=> {

    }


    return (
        <div className="flex flex-col md:flex-row py-16 max-w-6xl w-full px-6 mx-auto">
            <div className='flex-1 max-w-4xl'>
                <h1 className="text-3xl font-medium mb-6">
                    Shopping Cart <span className="text-sm color-primary">{getCartCount()} Items</span>
                </h1>

                <div className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 text-base font-medium pb-3">
                    <p className="text-left">Product Details</p>
                    <p className="text-center">Subtotal</p>
                    <p className="text-center">Action</p>
                </div>

                {cartArr.map((product, index) => (
                    <div key={index} className="grid grid-cols-[2fr_1fr_1fr] text-gray-500 items-center text-sm md:text-base font-medium pt-3">
                        <div className="flex items-center md:gap-6 gap-3">
                            <div onClick={()=> {navigate(`/products/${product.category.toLowerCase()}/${product._id}`); scrollTo(0, 0)}} className="cursor-pointer w-24 h-24 flex items-center justify-center border border-gray-300 rounded overflow-hidden">
                                <img className="max-w-full h-full object-cover" src={product.image[0]} alt={product.name} />
                            </div>
                            <div>
                                <p className="hidden md:block font-semibold">{product.name}</p>
                                <div className="font-normal text-gray-500/70">
                                    <p>Weight: <span>{product.weight || "N/A"}</span></p>
                                    <div className='flex items-center'>
                                        <p>Qty:</p>
                                        <select className='outline-none' value={cartItems[product._id]} onChange={(e)=>updateCart(product._id, Number(e.target.value))}>
                                            {Array(5).fill('').map((_, index) => (
                                                <option key={index} value={index + 1}>{index + 1}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p className="text-center">${product.offerPrice * product.quantity}</p>
                        <button onClick={()=>removeFromCart(product._id)} className="cursor-pointer mx-auto">
                            <img className="w-6" src={assets.remove_icon} alt="" />
                        </button>
                    </div>)
                )}

                <button onClick={()=> {navigate('/products'); scrollTo(0, 0)}} className="group cursor-pointer flex items-center mt-8 gap-2 color-primary font-medium">
                    <img className="group-hover:-translate-x-1 transition" src={assets.arrow_right_icon_colored} alt="" />
                    Continue Shopping
                </button>

            </div>

            <div className="max-w-[360px] w-full bg-gray-100/40 p-5 max-md:mt-16 border border-gray-300/70">
                <h2 className="text-xl md:text-xl font-medium">Order Summary</h2>
                <hr className="border-gray-300 my-5" />

                <div className="mb-6">
                    <p className="text-sm font-medium uppercase">Delivery Address</p>
                    <div className="relative flex justify-between items-start mt-2">
                    <p className="text-gray-500">
                        {address.street 
                        ? `${address.street}, ${address.city}, ${address.state}, ${address.country}`
                        : 'No address added yet'}</p>
                    <button onClick={() => navigate('/add-address')} className="color-primary hover:underline cursor-pointer">
                        {address.street ? 'Change' : 'Add'}
                    </button>
                    </div>
                    <p className="text-sm font-medium uppercase mt-6">Payment Method</p>

                    <select className="w-full border border-gray-300 bg-white px-3 py-2 mt-2 outline-none" onChange={(e)=> setPaymentOption(e.target.value)}>
                        <option value="COD">Cash On Delivery</option>
                        <option value="Online">Online Payment</option>
                    </select>
                </div>

                <hr className="border-gray-300" />

                <div className="text-gray-500 mt-4 space-y-2">
                    <p className="flex justify-between">
                        <span>Price</span>{getCartAmount()} $
                    </p>
                    <p className="flex justify-between">
                        <span>Shipping Fee</span><span className="text-green-600">Free</span>
                    </p>
                    <p className="flex justify-between">
                        <span>Tax (2%)</span> {getCartAmount() * 2/100} $
                    </p>
                    <p className="flex justify-between text-lg font-medium mt-3">
                        <span>Total Amount:</span> {getCartAmount() + getCartAmount()* 2/100 }  $
                    </p>
                </div>

                <button onClick={placeOrder} className="w-full py-3 mt-6 cursor-pointer bg-primary text-white font-medium transition">
                    {paymentOption === 'COD' ? 'Place Order' : 'Proceed to Checkout'}
                </button>
            </div>
        </div>
    )
}

export default Cart