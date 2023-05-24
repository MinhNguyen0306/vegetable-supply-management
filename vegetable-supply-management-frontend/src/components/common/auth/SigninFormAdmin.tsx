import { useFormik } from 'formik';
import * as Yup from 'yup';
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Images from "../../../assets/images";
import { BsEyeSlash, BsEye } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { setErrorMessage, setModalLoading, setSuccessMessage } from 'src/redux/features/appState/appState.slice';
import authApi from 'src/api/modules/auth.api';
import { setIsAuthenticated, setUser } from 'src/redux/features/user/user.slice';
import { ErrorResponse } from 'src/types/base';
import FormPassword from 'src/components/form/FormPassword';
import FormInput from 'src/components/form/FormInput';
import Button from '../Button';

const SigninFormAdmin = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const signinFormAdminValidate = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(8, "Ít nhất 8 ký tự")
        .required("Không được để trống"),
      password: Yup.string()
        .min(8, "Ít nhất 8 ký tự")
        .required("Không được để trống")
    }),
    onSubmit: async values => {
      dispatch(setErrorMessage(undefined))
      dispatch(setSuccessMessage(undefined))
      dispatch(setModalLoading(true))
      const promise = await authApi.login(values)
      dispatch(setModalLoading(false))

      console.log(promise.response)

      if(promise.response) {
        signinFormAdminValidate.resetForm()
        dispatch(setSuccessMessage("Đăng nhập Admin thành công"))
        dispatch(setUser(promise.response))
        navigate("/admin/providers/all")
      }

      if(promise.error) {
        dispatch(setIsAuthenticated(false))
        const { message } = promise.error as ErrorResponse
        dispatch(setErrorMessage(message))
      }
    }
  })

  return (
    <>
      {/* Login Container */}
      <div className='bg-white flex rounded-3xl shadow-lg max-w-3xl p-5'>
        {/* Form */}
        <div className='w-1/2 px-14'>
          <h2 className='font-bold uppercase text-xl mb-4'>Đăng nhập Admin</h2>
          <form action='' className='flex flex-col gap-4' onSubmit={signinFormAdminValidate.handleSubmit}>
            <FormInput
              id='username'
              name='username'
              placeholder='Nhập email'
              type='text'
              rounded='large'
              errors={signinFormAdminValidate.touched.username && signinFormAdminValidate.errors.username !== undefined}
              helperText={signinFormAdminValidate.errors.username}
              onChange={signinFormAdminValidate.handleChange}
            />
            <FormPassword
              id='password'
              name='password'
              placeholder='Nhập mật khẩu'
              errors={signinFormAdminValidate.touched.password && signinFormAdminValidate.errors.password !== undefined}
              helperText={signinFormAdminValidate.errors.password}
              onChange={signinFormAdminValidate.handleChange}
            />
            <Button rounded type='submit'>
              Đăng nhập
            </Button>
          </form>

          <p className='mt-5 text-xs border-b border-gray-400 py-4'>Quên mật khẩu?</p>
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

export default SigninFormAdmin
