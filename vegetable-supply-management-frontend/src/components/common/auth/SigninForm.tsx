import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import Images from "../../../assets/images";
import { BsEyeSlash, BsEye } from 'react-icons/bs';

const SigninForm = ({ switchAuthState }: { switchAuthState: () => void }) => {

  const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

  const signinForm = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "username minimum 8 characters")
        .required("username is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required")
    }),
    onSubmit: async values => {

    }
  })

  return (
    <>
      {/* Login Container */}
      <div className='bg-gray-200 flex rounded-3xl shadow-lg max-w-3xl p-5'>
        {/* Form */}
        <div className='w-1/2 px-14'>
          <h2 className='font-bold uppercase text-xl'>Đăng nhập</h2>
          <form action='' className='flex flex-col gap-4'>
            <input className='rounded-xl p-2 px-3 outline-none mt-8' type="text" name="email" placeholder="Your Email"/>
            <div className='relative rounded-xl px-1 w-full bg-white'>
              <input className='bg-transparent w-[85%] h-full outline-none p-2' type={isShowPassword ? "text" : "password"}
              name="password" placeholder="Your password"/>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer hover:bg-slate-300 h-full w-[15%]
                rounded-lg grid content-center justify-center hover:text-slate-700" 
                onClick={() => setIsShowPassword(!isShowPassword)}>
                { isShowPassword ? <BsEyeSlash /> : <BsEye /> }
              </div>
            </div>
            <button className='rounded-xl bg-[#002D74] hover:bg-[#0f4191] text-white font-bold py-2 my-5'>Đăng nhập</button>
          </form>

          <div className='grid grid-cols-3 mt-5 items-center text-gray-400'>
            <hr className='border-gray-400'/>
            <p className='text-center'>HOẶC</p>
            <hr className='border-gray-400'/>
          </div>
          
          <button className='bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm'>
            <svg xmlns="http://www.w3.org/2000/svg" className='mr-3' width="25px" height="25px" preserveAspectRatio="xMidYMid" viewBox="0 0 256 262"><path fill="#4285F4" d="M255.878 133.451c0-10.734-.871-18.567-2.756-26.69H130.55v48.448h71.947c-1.45 12.04-9.283 30.172-26.69 42.356l-.244 1.622 38.755 30.023 2.685.268c24.659-22.774 38.875-56.282 38.875-96.027"/><path fill="#34A853" d="M130.55 261.1c35.248 0 64.839-11.605 86.453-31.622l-41.196-31.913c-11.024 7.688-25.82 13.055-45.257 13.055-34.523 0-63.824-22.773-74.269-54.25l-1.531.13-40.298 31.187-.527 1.465C35.393 231.798 79.49 261.1 130.55 261.1"/><path fill="#FBBC05" d="M56.281 156.37c-2.756-8.123-4.351-16.827-4.351-25.82 0-8.994 1.595-17.697 4.206-25.82l-.073-1.73L15.26 71.312l-1.335.635C5.077 89.644 0 109.517 0 130.55s5.077 40.905 13.925 58.602l42.356-32.782"/><path fill="#EB4335" d="M130.55 50.479c24.514 0 41.05 10.589 50.479 19.438l36.844-35.974C195.245 12.91 165.798 0 130.55 0 79.49 0 35.393 29.301 13.925 71.947l42.211 32.783c10.59-31.477 39.891-54.251 74.414-54.251"/></svg>
            Đăng nhập với Google
          </button>

          <p className='mt-5 text-xs border-b border-gray-400 py-4'>Quên mật khẩu?</p>

          <div className='mt-3 text-xs flex justify-between items-center'>
            <p>Chưa có tài khoản?</p>
            <Link to="/register">
              <button className='py-2 px-5 bg-white border rounded-xl hover:bg-slate-400 hover:text-slate-600' 
                onClick={() => switchAuthState()}
              >
                Đăng ký
              </button>
            </Link>
          </div>
        </div>
        {/* End form */}

        {/* Image right */}
        <div className='w-1/2'>
          <img className='rounded-2xl h-full' src={Images.VEGE_BG} alt="" />
        </div>
        {/* Image right */}
      
          {/* Signin Form
          <Link to='/register'>
            <h2 onClick={() => switchAuthState()}>Click here to sign up</h2>
          </Link> */}
      </div>
    </>
    
  )
}

export default SigninForm
