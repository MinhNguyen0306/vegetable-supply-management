import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';
import Images from "../../../assets/images";
import { useDispatch } from 'react-redux';
import authApi from "../../../api/modules/auth.api";
import Button from "../Button";
import FormInput from "src/components/form/FormInput";
import FormPassword from "src/components/form/FormPassword";
import {
  setErrorMessage,
  setSuccessMessage,
  setModalLoading,
} from "../../../redux/features/appState/appState.slice";

const regexPhoneNumber: RegExp = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;

const SignupFormProvider = ({ switchAuthState }: { switchAuthState: () => void }) => {

  const dispatch = useDispatch()

  const SignupFormProvider = useFormik({
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
        .min(8, "Ít nhất 8 ký tự")
        .required("Username là bắt buộc"),
      email: Yup.string()
        .email("Email không hợp lệ")
        .required("Email là bắt buộc"),
      phone: Yup.string()
        .matches(regexPhoneNumber, "Số điện thoại không hợp lệ")
        .required("Số điện thoại là bắt buộc"),
      address: Yup.string()
        .min(4, "Ít nhất 5 ký tự")
        .required("Địa chỉ là bắt buộc"),
      password: Yup.string()
        .min(8, "Ít nhất 8 ký tự")
        .required("Mật khẩu là bắt buộc"),
    }),
    onSubmit: async values => {
      dispatch(setErrorMessage(undefined))
      dispatch(setSuccessMessage(undefined))
      dispatch(setModalLoading(true))
      const { response, error } = await authApi.register(503, values);
      dispatch(setModalLoading(false))

      if(response) {
        SignupFormProvider.resetForm()
        dispatch(setSuccessMessage("Đăng ký nhà cung cấp thành công"))
      }

      if(error) {
        dispatch(setErrorMessage("Đăng ký nhà cung cấp thất bại"))
      }
    }
  })

  return (
    <>
      {/* Login Container */}
      <div className='bg-white flex rounded-3xl shadow-lg max-w-3xl p-5'>

        {/* Form */}
        <div className='w-1/2 px-14'>
          <h2 className='font-bold uppercase text-xl mb-4'>Đăng ký nhà cung cấp</h2>
          <form className='flex flex-col gap-4' onSubmit={SignupFormProvider.handleSubmit}>
            <FormInput
              id="username"
              name="username"
              type="text"
              placeholder="Nhập username"
              rounded='large'
              errors={SignupFormProvider.touched.username && SignupFormProvider.errors.username !== undefined}
              helperText={SignupFormProvider.errors.username}
              onChange={SignupFormProvider.handleChange}
            />
            <FormInput
              id="email"
              name="email"
              type="text"
              placeholder="Nhập email"
              rounded='large'
              errors={SignupFormProvider.touched.email && SignupFormProvider.errors.email !== undefined}
              helperText={SignupFormProvider.errors.email}
              onChange={SignupFormProvider.handleChange}
            />
            <FormInput
              id="address"
              name="address"
              type="text"
              placeholder="Nhập địa chỉ"
              rounded='large'
              errors={SignupFormProvider.touched.address && SignupFormProvider.errors.address !== undefined}
              helperText={SignupFormProvider.errors.address}
              onChange={SignupFormProvider.handleChange}
            />
            <FormInput
              id="phone"
              name="phone"
              type="text"
              placeholder="Nhập số điện thoại"
              rounded='large'
              errors={SignupFormProvider.touched.phone && SignupFormProvider.errors.phone !== undefined}
              helperText={SignupFormProvider.errors.phone}
              onChange={SignupFormProvider.handleChange}
            />
            <FormPassword 
              id="password"
              name="password"
              placeholder="Mật khẩu"
              errors={SignupFormProvider.touched.password && SignupFormProvider.errors.password !== undefined}
              helperText={SignupFormProvider.errors.password}
              onChange={SignupFormProvider.handleChange}
            />
            {/* <FormPassword 
              placeholder="Nhập lại mật khẩu"
              errors={SignupFormProvider.touched.confirmPassword && SignupFormProvider.errors.confirmPassword !== undefined}
              helperText={SignupFormProvider.errors.confirmPassword}
              onChange={SignupFormProvider.handleChange}
            /> */}
            <Button rounded type="submit">Đăng ký</Button>
          </form>

          <div className='grid grid-cols-3 mt-5 items-center text-gray-400'>
            <hr className='border-gray-400'/>
            <p className='text-center'>HOẶC</p>
            <hr className='border-gray-400'/>
          </div>

          <div className='mt-3 text-xs flex justify-between items-center'>
            <p>Nếu đã có tài khoản?</p>
            <Link to="/provider/login">
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

export default SignupFormProvider
