import React from 'react'
import './App.css'
import ProtectRoute from './ProtectRoute';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {useStateContext} from './contexts/ContextProvider'
import { Navbar } from './components';
import {Home, Cart, Shop, Account, Signup, Login, ProductDetails} from './pages'
import { auth } from './firebase';

const App = () => {

 const {loggedIn, setLoggedIn} = useStateContext()
  var user = auth.currentUser;
    
  auth.onAuthStateChanged((user) => {
    if (user) {
      setLoggedIn(true);
      localStorage.setItem("isAuth",true)
      localStorage.setItem("uid",  auth.currentUser.uid)
    } else {
      setLoggedIn(false);
      localStorage.removeItem("isAuth")
    }
  }); 

  return (
    <div>
      
     <BrowserRouter>

          
      
      
    <div className='min-h-screen w-full'>
     <div className='fixed md:static  navbar w-full'>
          <Navbar/>
        </div>
      
      <div>
        <Routes>
        <Route path ="/" element = {<Home/>}/>
        <Route path ="home" element = {<Home/>}/>
        <Route path ="/cart" element = {<Cart/>}/>
        <Route path ="/shop" element = {<Shop/>}/>
        <Route element={<ProtectRoute/>}> 
        <Route path='/account' element={<Account/>}/>
        </Route>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/shop/:productId' element={<ProductDetails/>}/> 
        </Routes>
      </div>
      </div>
        
     </BrowserRouter>

    </div>
  )
}

export default App