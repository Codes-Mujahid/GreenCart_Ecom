import React, { useContext } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import AllProducts from './pages/AllProducts'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import Footer from './components/Footer'
import { AppContext } from './context/AppContext'
import Login from './components/Login'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductCategory from './pages/ProductCategory'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import AddAddress from './pages/AddAddress'


const App = () => {
  
  const isSellerPath= useLocation().pathname.includes('seller')
  const {showUserLogin}= useContext(AppContext)

  return (
    <div>
      {isSellerPath? null: <Navbar/>}
      {showUserLogin ? <Login/> : null}
      
      <div className={`${isSellerPath ? '' : 'mt-4 sm:mt-6 md:mt-8 lg:mt-10 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]'}`}>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/products' element={<AllProducts/>} />
          <Route path='/contact' element={<Contact/>} />
          <Route path='/products/:categoryPath' element={<ProductCategory/>} />
          <Route path='/products/:categoryPath/:id' element={<ProductDetails/>} />
          <Route path='/cart' element={<Cart/>} />
          <Route path='/add-address' element={<AddAddress/>} />
        </Routes>
      </div>
      {isSellerPath? null: <Footer/>}

      {/* react-toast */}
        <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  )
}

export default App