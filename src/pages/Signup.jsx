import React,{useState} from 'react'
import { useNavigate } from 'react-router-dom'
import { auth, googleProvider } from "../firebase"
import { createUserWithEmailAndPassword, signInWithPopup } from "firebase/auth"
import { Popup } from '../components'
import { useStateContext } from '../contexts/ContextProvider'
const Signup = () => {

    const {setpopupOpen,popupOpen} = useStateContext()
    const [email, setEmail] = useState("")
    const [password, setPassowrd] = useState("")
    const navigate = useNavigate()
    const [errType, setErrType] = useState("")

    const signUp =async() => {
      try{
      await createUserWithEmailAndPassword(auth, email, password)
      navigate('/account')
      } catch(err){
          console.error(err)
          setErrType(err.code)
          setpopupOpen((prev)=>!prev)
      }
  }
    
    const signInwithGoogle =async() => {
      try{
      await signInWithPopup(auth, googleProvider)
      navigate('/account')
      } catch(err){
          console.error(err)
          setErrType(err.code)
          setpopupOpen((prev)=>!prev)
      }
  }
 
  return (
    <div className='md:mt-10 mt-16 text-center'>
    <label className='font-bold md:text-4xl text-3xl'> Create an account</label>
    <p className='mt-1 font-normal'>Start selling your clothes </p>
  <div className='md:mt-16 mt-12'> 
  <section >
    <div className="min-[1220px]:w-1/3 max-xl:w-[40%] max-lg:w-1/2 max-md:w-3/4 max-sm:w-full px-4 mx-auto pt-6 ">
      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg  border-0">

        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
          
            <div className="relative w-full mb-3">
              <label className="block uppercase text-xs font-bold mb-2">Email</label>
              <input  
              className="border-0 px-3 py-3   bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
              placeholder="Email"
              onChange={(e)=> setEmail(e.target.value)}/>
            </div>
            <div className="relative w-full mb-3">
              <label className="block uppercase text-xs font-bold mb-2" >Password</label>
              <input  
              className="border-0 px-3 py-3   bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150" 
              placeholder="Password"
              type='password'
              onChange={(e)=> setPassowrd(e.target.value)}/>
            </div>
            <div className="text-center mt-6">
              <button 
              className=" text-black active:bg-[rgb(91,153,255,0.5)] text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full ease-linear transition-all duration-150" 
              onClick={signUp}>
                 Register 
                 </button>
            </div>
        
          <hr className="mt-8 border-b-1"/> 
        </div>
        <div className="rounded-t mb-0 px-6 py-6">
          <div className=" text-center ">
            <button className="bg-white  active:bg-[rgb(91,153,255,0.5)] px-4 py-2 rounded outline-none focus:outline-none mr-1 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs ease-linear transition-all duration-150"
             onClick={signInwithGoogle}>
              <img alt="..." className="w-5 mr-1" src="https://demos.creative-tim.com/notus-js/assets/img/google.svg"/>Sign in with Google </button>

              <p className='mt-2'>If you are already a member, <a className='underline text-[rgb(91,153,255,0.8)]' href="/login">login</a></p>
          </div>
          
        </div>
      </div>
    </div>

  </section>
  </div>
  {popupOpen && <Popup msg={"An error occured: "+ errType.replace("auth/","") + ", please try again"} />}
  </div>
  )
  }

export default Signup