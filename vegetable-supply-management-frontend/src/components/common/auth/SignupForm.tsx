import { useState } from "react";
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Images from "../../../assets/images";
import { useDispatch } from 'react-redux';
import authApi from "../../../api/modules/auth.api";
import { BsEye, BsEyeSlash } from "react-icons/bs";
import Button from "../Button";
import { setErrorMessage, setModalLoading, setSuccessMessage } from "src/redux/features/appState/appState.slice";
import FormPassword from "src/components/form/FormPassword";
import FormInput from "src/components/form/FormInput";

const regexPhoneNumber: RegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const SignupForm = ({ switchAuthState }: { switchAuthState: () => void }) => {

  const dispatch = useDispatch()
  
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
      dispatch(setErrorMessage(undefined))
      dispatch(setSuccessMessage(undefined))
      dispatch(setModalLoading(true))
      const { response, error } = await authApi.register(502,values);
      dispatch(setModalLoading(false))

      if(response) {
        SignupForm.resetForm();
        dispatch(setSuccessMessage("Đăng ký thành công"))
      }

      if(error) {
        dispatch(setErrorMessage("Đăng ký thất bại"))
      }
    }
  })

  return (
    <>
      {/* Login Container */}
      <div className='bg-white flex rounded-3xl shadow-lg max-w-3xl p-5'>

        {/* Form */}
        <div className='w-1/2 px-14'>
          <h2 className='font-bold uppercase text-xl mb-4'>Đăng ký</h2>
          <form className='flex flex-col gap-4' onSubmit={SignupForm.handleSubmit}>
            <FormInput
              id="username"
              name="username"
              placeholder="Nhập username"
              type="text"
              rounded="large"
              errors={SignupForm.touched.username && SignupForm.errors.username !== undefined}
              helperText={SignupForm.errors.username}
              onChange={SignupForm.handleChange}
            />
            <FormInput
              id="email"
              name="email"
              placeholder="Nhập email"
              type="text"
              rounded="large"
              errors={SignupForm.touched.email && SignupForm.errors.email !== undefined}
              helperText={SignupForm.errors.email}
              onChange={SignupForm.handleChange}
            />
            <FormInput
              id="address"
              name="address"
              placeholder="Nhập địa chỉ"
              type="text"
              rounded="large"
              errors={SignupForm.touched.address && SignupForm.errors.address !== undefined}
              helperText={SignupForm.errors.address}
              onChange={SignupForm.handleChange}
            />
            <FormInput
              id="phone"
              name="phone"
              placeholder="Nhập số điện thoại"
              type="text"
              rounded="large"
              errors={SignupForm.touched.phone && SignupForm.errors.phone !== undefined}
              helperText={SignupForm.errors.phone}
              onChange={SignupForm.handleChange}
            />
            <FormPassword
              id="password"
              name="password"
              placeholder="Nhập mật khẩu"
              errors={SignupForm.touched.password && SignupForm.errors.password !== undefined}
              helperText={SignupForm.errors.password}
              onChange={SignupForm.handleChange} 
            />
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
