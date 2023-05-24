import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import Images from "../../../assets/images";
import FormInput from 'src/components/form/FormInput';
import FormPassword from 'src/components/form/FormPassword';
import { useDispatch } from 'react-redux';
import {
  setErrorMessage,
  setSuccessMessage,
  setModalLoading,
} from "../../../redux/features/appState/appState.slice";
import authApi from 'src/api/modules/auth.api';
import { setUser } from 'src/redux/features/user/user.slice';
import Button from '../Button';
import { ErrorResponse } from 'src/types/base';

const SigninFormProvider = ({ switchAuthState }: { switchAuthState: () => void }) => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const SigninFormProvider = useFormik({
    initialValues: {
      username: "",
      password: ""
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .email("Email không phù hợp")
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
      if(promise.response) {
        SigninFormProvider.resetForm()
        dispatch(setUser(promise.response))
        dispatch(setSuccessMessage("Đăng nhập thành công"))
        navigate("/provider/product/list/all")
        console.log(promise.response)
      } 
      if(promise.error) {
        const { message } = promise.error as ErrorResponse
        dispatch(setErrorMessage(message))
      }

      // if(response) {
      //   SigninFormProvider.resetForm();
      //   dispatch(setUser(response))
      //   dispatch(setSuccessMessage("Đăng nhập thành công"))
      //   navigate("/provider/product/add-product")
      // }

      // if(error) {
      //   dispatch(setErrorMessage("Đăng nhập thất bại"))
      // }
    }
  })

  return (
    <>
      {/* Login Container */}
      <div className='bg-white flex rounded-3xl shadow-lg max-w-3xl p-5'>
        {/* Form */}
        <div className='w-1/2 px-14'>
          <h2 className='font-bold uppercase text-xl mb-4'>Đăng nhập nhà cung cấp</h2>
          <form action='' className='flex flex-col gap-4' onSubmit={SigninFormProvider.handleSubmit}>
            <FormInput
              id="username"
              name="username"
              type="text"
              placeholder="Nhập email"
              rounded='large'
              errors={SigninFormProvider.touched.username && SigninFormProvider.errors.username !== undefined}
              helperText={SigninFormProvider.errors.username}
              onChange={SigninFormProvider.handleChange}
            />
            <FormPassword 
              id='password'
              name='password'
              placeholder="Mật khẩu"
              errors={SigninFormProvider.touched.password && SigninFormProvider.errors.password !== undefined}
              helperText={SigninFormProvider.errors.password}
              onChange={SigninFormProvider.handleChange}
            />
            <Button type='submit' rounded>
              Đăng nhập
            </Button>
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
            <Link to="/provider/register">
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

export default SigninFormProvider
