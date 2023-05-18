import React, { ChangeEventHandler, useEffect, useRef, useState } from 'react';
import * as yup from "yup";
import { toastMessage } from "../../utils/toast";
import Images from "../../assets/images";
import FormInputLabel from 'src/components/form/FormInputLabel';
import FormSelect from 'src/components/form/FormSelect';
import { useFormik } from 'formik';
import vegetableApi from "../../api/modules/vegetable.api";
import { Vegetable, VegetablePayload } from 'src/types/vegetable';
import FormTextarea from 'src/components/form/FormTextarea';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'src/components/common/Button';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import OverlayModal from 'src/components/common/modal/OverlayModal';
import { setOverlayOpen } from 'src/redux/features/appState/appState.slice';

const units = [
  {id: 1, dataName:'200g/bó'},
  {id: 2, dataName:'500g/rổ'}, 
  {id: 3, dataName:'700g/rổ'}, 
  {id: 4, dataName:'1kg/thùng'}
]

const categories = [
  {id:1, dataName:'Rau'},
  {id:1, dataName:"Củ"},
  {id:1, dataName:"Quả"}
]

const AddProduct = () => {

  const { providerId } = useParams();
  const dispatch = useDispatch();

  const [isRequestLoading, setIsRequestLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<any>(null);
  const [successMessage, setSuccessMessage] = useState<any>(null);
  const [images, setImages] = useState<string[]>([]);
  const [videos, setVideos] = useState<string[]>([]);

  const fileInput = useRef<HTMLInputElement>(null);

  const handlePreviewImages = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files: FileList = target.files as FileList
    // const filesUrl: string[] = []

    const url =  window.URL.createObjectURL(files[0])
    setImages([...images, url])
  }

  const AddProductForm = useFormik({
    initialValues: {
      vegetableName: "",
      description: "",
      categoryId: 0,
      unitId: 0,
      cross: "",
      currentPricing: 0.0,
      currentStock: 0,
      fee: 0.0,
    },
    validationSchema: yup.object({
      vegetableName: yup.string()
        .min(10,"Tên sản phẩm quá ngắn, Vui lòng nhập ít nhất 10 ký tự")
        .required("Không được để trống"),
      description: yup.string()
        .min(50, "Mô tả quá ngắn. Vui lòng nhập ít nhất 50 ký tự")
        .required("Không được để trống"),
      categoryId: yup.string()
        .required("Vui lòng chọn danh mục"),
      unitId: yup.string()
        .required("Vui lòng chọn đơn vị"),
      currentPricing: yup.number()
        .min(1000, "Giá ít nhất 1000")
        .required("Không được để trống"),
      currentStock: yup.number()
        .min(1, "Số lượng hiện tại phải lớn hơn 0")
        .max(1000000, "Số lượng hiện tại phải bé hơn 100000")
        .required("Không được để trống")
    }),
    onSubmit: async values => {
      const { 
        vegetableName, 
        description, 
        categoryId, 
        unitId, 
        cross, 
        currentPricing,
        currentStock,
        fee 
      } = values
      const vegetable: Vegetable = {vegetableName, currentPricing, currentStock, description};
      const medias = fileInput.current?.files
      const vegetableFormData: VegetablePayload = { providerId, categoryId, unitId, vegetable, medias }
      console.log(values)
      setErrorMessage(undefined)
      setSuccessMessage(undefined)
      setIsRequestLoading(true)
      dispatch(setOverlayOpen(true))
      const { response, error } = await vegetableApi.addVegetable(vegetableFormData);
      setIsRequestLoading(false)
      dispatch(setOverlayOpen(false))

      if(response) {
        AddProductForm.resetForm()
        setSuccessMessage("Add new vegetable success")
        toast.success("Add new vegetable success")
      }

      if(error) {
        setErrorMessage(error)
        dispatch(setOverlayOpen(true))
      }
    }
  })

  return (
    <>
      { isRequestLoading && <OverlayModal type='loading' message="Adding vegetable..."/> }
      { errorMessage && <OverlayModal type='error' message="Error add vegetable!" /> }
      { successMessage && <OverlayModal type='success' message="Added success" /> }
    
      <div className='bg-white w-5/6 text-base p-7 ml-5'>
        <h1 className='font-bold text-mainColor text-xl mb-8'>Thêm sản phẩm</h1>
        <form className='flex flex-col justify-center items-start' onSubmit={AddProductForm.handleSubmit}>
          <div className='flex gap-5 w-full'>
            <label className='min-w-[120px] text-right'>Hình ảnh sản phẩm</label>
            <div className='flex flex-1 flex-wrap'>
              <div 
                className='relative flex flex-col items-center justify-center w-[100px] h-[100px] p-1
                border-dashed border-2 rounded-md border-gray-400 text-gray-500 text-xs'
              >
                <img className='filter opacity-20' src={Images.UPLOAD} alt=''/>
                <label htmlFor='files'>Thêm hình ảnh</label>
                <input 
                  ref={fileInput} 
                  id='files' 
                  name='medias' 
                  type='file' 
                  accept='image/*' 
                  multiple
                  onChange={(e: React.FormEvent<HTMLInputElement>) => handlePreviewImages(e)}
                  className='absolute top-0 left-0 w-full h-full z-50 opacity-0 cursor-pointer'  
                />
              </div>
              {
                images.length > 0 && 
                images.map((image, index) => (
                  <img src={image} alt='' className='w-[50px] h-[50px]' />
                ))
              }
            </div>
          </div>

          <div className='flex gap-5 w-full my-4'>
            <label className='min-w-[120px] text-right'>Video sản phẩm</label>
            <div className='flex-1'>
              <div 
                className='relative flex flex-col items-center justify-center w-[100px] h-[100px] p-1 border-dashed border-2 
                rounded-md border-gray-400 text-gray-500 text-xs'
              >
                <img className='filter opacity-20' src={Images.UPLOAD} alt=''/>
                <label htmlFor='files'>Thêm video</label>
                <input 
                  ref={fileInput} 
                  id='files' 
                  name='medias' 
                  type='file' 
                  accept='video/*' 
                  multiple
                  className='absolute top-0 left-0 w-full h-full z-50 opacity-0 cursor-pointer'  
                />
              </div>
            </div>
          </div>
          
          <div className='flex flex-col w-full'>
            <FormInputLabel
              id='vegetableName'
              name='vegetableName'
              type='text'
              flex='row'
              label='Tên sản phẩm'
              isRequired
              errors={AddProductForm.touched.vegetableName && AddProductForm.errors.vegetableName !== undefined}
              helperText={AddProductForm.errors.vegetableName}
              onChange={AddProductForm.handleChange}
            />
            <FormTextarea 
              id='description'
              rows={5}
              flex='row'
              label='Mô tả sản phẩm'
              isRequired
              errors={AddProductForm.touched.description && AddProductForm.errors.description !== undefined}
              helperText={AddProductForm.errors.description}
              onChange={AddProductForm.handleChange}
            />

            <div className='flex'>
              <FormSelect
                id='categoryId'
                label='Danh mục'
                title='-- Chọn danh mục --'
                flex='row'
                datas={categories}
                isRequired
              />

              <FormSelect 
                id='unitId'
                label='Đơn vị'
                title='-- Chọn đơn vị --'
                flex='row'
                datas={units}
                isRequired
              />
            </div>    
            
            <FormInputLabel 
              id='currentStock'
              name='currentStock'
              type='number'
              flex='row'
              label='Số lượng'
              isRequired
              errors={AddProductForm.touched.currentStock && AddProductForm.errors.currentStock !== undefined}
              helperText={AddProductForm.errors.currentStock}
              onChange={AddProductForm.handleChange}
            />

            <FormInputLabel 
              id='fee'
              name='fee'
              type='number'
              flex='row'
              label='Phí vận chuyển'
            />
            
            <FormInputLabel 
              id='cross'
              name='cross'
              type='text'
              flex='row'
              label='Xuất xứ'
            />

            <FormInputLabel 
              id='currentPricing'
              name='currentPricing'
              type='number'
              flex='row'
              label="Giá"
              isRequired
              errors={AddProductForm.touched.currentPricing && AddProductForm.errors.currentPricing !== undefined}
              helperText={AddProductForm.errors.currentPricing}
              onChange={AddProductForm.handleChange}
            />

          </div>
          <div className='flex justify-end w-full mt-10'>
            <Button type='submit'>Submit</Button>
          </div>
        </form>
      </div>
     
    </>
  )
}

export default AddProduct
