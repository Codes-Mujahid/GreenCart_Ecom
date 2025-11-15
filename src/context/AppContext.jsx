import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dummyProducts } from "../assets/assets.js";
import { toast } from "react-toastify";
export const AppContext = createContext();

export const AppContextProvider = (props) => {
  const navigate= useNavigate()
  // nav states
  const [user, setUser] = useState(false);
  const [isSeller, setIsSeller] = useState(false);
  const [showUserLogin, setShowUserLogin] = useState(false);
  // bestseller states
  const [products, setProducts]= useState([]);
  const [cartItems, setCartItems]= useState({})

  // search options
  const[searchQuery, setSearchQuery]= useState('')
  // address
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: ""
  });

  // fetching products
  const fetchProducts= async()=> {
    setProducts(dummyProducts)
  };
  useEffect(()=> {
    fetchProducts();
    
  },[])

  const addToCart= (productId)=> {
    const cartData= structuredClone(cartItems) // empty obj
    if(cartData[productId]) {
      cartData[productId] +=1
    }
    else{
      cartData[productId]= 1
    };
    setCartItems(cartData)
    toast.success('Added to cart')
    console.log(cartData);
  }
  const removeFromCart= (productId)=> {
    const cartData= structuredClone(cartItems);
    if(cartData[productId] > 1){
      cartData[productId] -=1
    } else {
      delete cartData[productId]
    }
    setCartItems(cartData)
    toast.error('Removed successfully')
    console.log(cartData);
  }

  const updateCart= (productId, quantity)=> {
    const cartData= structuredClone(cartItems);
    if(cartData[productId]){
      cartData[productId]= quantity
    }
    setCartItems(cartData)
  } 

  const getCartCount= ()=> {
    let count= 0;
    for (let key in cartItems) {
      count += cartItems[key]
      console.log(`key :${key} value:${cartItems[key]}`);
    }
    return count
  }

  const getCartAmount= ()=> {
    let totalAmount= 0; //cartItems{}
    for(let key in cartItems) {
      let product= products.find((el)=> el._id === key)
      if(cartItems[key] > 0) {
        totalAmount+= product.offerPrice * cartItems[key]
      }
    }
    return totalAmount
  }



  const value = {
    navigate,
    user,
    setUser,
    isSeller,
    setIsSeller,
    showUserLogin,
    setShowUserLogin,
    products,
    cartItems,
    addToCart,
    removeFromCart,
    updateCart,
    searchQuery,
    setSearchQuery,
    getCartCount,
    getCartAmount, address, setAddress
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};
