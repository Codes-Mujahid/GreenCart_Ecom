import { useContext, useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { assets } from '../assets/assets.js'
import { AppContext } from '../context/AppContext.jsx'

const Navbar = () => {
    const[menu, setMenu]= useState(false)
    const{user, setUser, setShowUserLogin, navigate, setSearchQuery, searchQuery, getCartCount}=useContext(AppContext)
    const handleLogout= async()=> {
        setUser(null);
        setMenu(false)
        navigate('/')
    }

    useEffect(()=> {
        if(searchQuery.length > 0) {
            navigate('/products')
        }
    }, [searchQuery])
  return (
    <div className='flex flex-col gap-4 sm:flex-row justify-between items-center px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] py-4 border-b border-b-gray-300 '>
        <NavLink to='/' className='w-32 sm:w-32 lg:w-40 shrink-0' ><img src={assets.logo} alt="" /></NavLink>
        <div className='flex justify-between items-center gap-6 sm:gap-8 md:gap-10'>
            <div className='hidden md:flex font-medium text-sm sm:text-base gap-4'>
                <NavLink to='/' className='hover:text-green-600'>Home</NavLink>
                <NavLink to='/products' className='hover:text-green-600'>Products</NavLink>
                <NavLink to='/contact' className='hover:text-green-600'>Contact</NavLink>
            </div>
            <div className='flex text-sm border border-primary rounded-full px-4 py-2 items-center gap-2'>
                <input className='outline-none w-full' type="text" placeholder='Search products' onChange={(e)=> setSearchQuery(e.target.value)} />
                <img className='h-4.5 w-4.5' src={assets.search_icon} alt="" />
            </div>
            <div onClick={()=> navigate('/cart')} className='flex relative shrink-0 cursor-pointer'>
                <img className='w-5 sm:w-5 md:w-6 lg:w-7 opacity-80' src={assets.cart_icon} alt="" />
                <button className='absolute -top-2 -right-3 h-4.5 w-4.5 bg-primary rounded-full text-white text-xs' type="button">
                    {getCartCount()}
                </button>
            </div>
            {!user? 
            (<button onClick={()=>setShowUserLogin(true)} className='hidden md:block px-10 py-2 rounded-full bg-primary text-white font-medium cursor-pointer' type="button">Login</button>)
            :(
                <div className='relative group shrink-0 z-999   '>
                    <img src={assets.profile_icon} className='w-8 sm:w-10' alt="" />
                    <ul className='hidden group-hover:block absolute top-10 right-0 bg-white border border-gray-200 py-2.5 w-30 rounded-md text-sm shadow '>
                        <li onClick={()=>navigate('/orders')} className='p-1.5 pl-2 hover:text-green-700 cursor-pointer'>My Orders</li>
                        <li onClick={handleLogout} className='p-1.5 pl-2 hover:text-green-700 cursor-pointer'>Logout</li>
                    </ul>
                </div>
            )}
            <img onClick={()=>setMenu(!menu)} className='md:hidden' src={assets.menu_icon} alt="" />
        </div>




        {/* toogle menu options */}

        <div className={`absolute overflow-hidden top-0 right-0 bottom-0 transition-all bg-gray-200 ${menu? 'w-full': 'w-0'}`}>
            <div onClick={()=> setMenu(false)} className="flex items-center gap-2 px-5 py-3">
                <i className="fa-solid fa-arrow-left"></i>
                <p className="font-bold text-gray-600">Back</p>
            </div>
            <div className="flex flex-col text-sm">
                <NavLink onClick={()=>setMenu(false)} to='/' className=' pl-5 py-3'>HOME</NavLink>
                <NavLink onClick={()=>setMenu(false)} to='/products'className=' pl-5 py-3' >PRODUCTS</NavLink>
                {user && <NavLink onClick={()=>setMenu(false)} to='/products'className=' pl-5 py-3' >MY ORDERS</NavLink>}
                <NavLink onClick={()=>setMenu(false)} to='/contact' className=' pl-5 py-3'>CONTACT</NavLink>
            </div>
            <div className='flex justify-center mt-4'>
                {user? (<button onClick={handleLogout} className='px-15 py-2 bg-primary text-white font-medium cursor-pointer'type="button">Logout</button>)
                :(<button onClick={()=> {setMenu(!menu); setShowUserLogin(true)}} className='px-15 py-2 bg-primary text-white font-medium cursor-pointer'type="button">Login</button>)}
            </div>
        </div>

    </div>
  )
}

export default Navbar