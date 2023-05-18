import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Images from "../../../assets/images";
import { useDispatch } from 'react-redux';
import authApi from "../../../api/modules/auth.api";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Button from "../Button";

const regexPhoneNumber: RegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const SignupForm = ({ switchAuthState }: { switchAuthState: () => void }) => {

  const dispatch = useDispatch()

  const [isRegisterRequest, setIsRegisterRequest] = useState<boolean>(false)
  const [errorMessage, setErrorMessage] = useState<string | undefined>("")
  const [isShowPassword, setIsShowPassword] = useState<boolean>(false)

  const SignupForm = useFormik({
    initialValues: {
      username: "",
      email: "",
      phone: "",
      address: "",
      password: "",
      confirmPassword: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "username minimum 8 characters")
        .required("username is required"),
      email: Yup.string()
        .email("Invalid email format")
        .required("email is required"),
      phone: Yup.string()
        .matches(regexPhoneNumber, "Phone number is not valid"),
      address: Yup.string()
        .min(4, "Address min 4 characters")
        .required("Address is required"),
      password: Yup.string()
        .min(8, "password minimum 8 characters")
        .required("password is required"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref('password')], "Password must match")
    }),
    onSubmit: async values => {
      setErrorMessage(undefined)
      setIsRegisterRequest(true)
      const { response, error } = await authApi.register(values);
    }
  })

  return (
    <>
      {/* Login Container */}
      <div className='bg-gray-300 flex rounded-3xl shadow-lg max-w-3xl p-5'>

        {/* Form */}
        <div className='w-1/2 px-14'>
          <h2 className='font-bold uppercase text-xl'>Đăng ký</h2>
          <form className='flex flex-col gap-4' onSubmit={SignupForm.handleSubmit}>
            <input className='rounded-xl p-2 px-3 outline-none mt-8' type="text" name="username" placeholder="Your username"/>
            <input className='rounded-xl p-2 px-3 outline-none' type="text" name="email" placeholder="Your email"/>
            <input className='rounded-xl p-2 px-3 outline-none' type="text" name="address" placeholder="Your address"/>
            <input className='rounded-xl p-2 px-3 outline-none' type="text" name="phone" placeholder="Your phone"/>
            <div className='relative rounded-xl px-1 w-full bg-white'>
              <input className='bg-transparent w-[85%] h-full outline-none p-2' type={isShowPassword ? "text" : "password"}
              name="password" placeholder="Your password"/>
              <div className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer hover:bg-slate-300 h-full w-[15%]
                rounded-lg grid content-center justify-center hover:text-slate-700" 
                onClick={() => setIsShowPassword(!isShowPassword)}>
                { isShowPassword ? <BsEyeSlash /> : <BsEye /> }
              </div>
            </div>
            <Button rounded type="submit">Đăng ký</Button>
          </form>

          <div className='grid grid-cols-3 mt-5 items-center text-gray-400'>
            <hr className='border-gray-400'/>
            <p className='text-center'>HOẶC</p>
            <hr className='border-gray-400'/>
          </div>

          <div className='mt-3 text-xs flex justify-between items-center'>
            <p>Nếu đã có tài khoản?</p>
            <Link to="/login">
              <button className='py-2 px-5 bg-white border rounded-xl hover:bg-slate-400 hover:text-slate-600' 
                onClick={() => switchAuthState()}
              >
                Đăng nhập
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
      </div>
    </>
    
  )
}

export default SignupForm
