import React, { useRef, useState } from 'react';
import * as yup from "yup";
import Images from "../../assets/images";
import FormInputLabel from 'src/components/form/FormInputLabel';
import { useFormik } from 'formik';
import vegetableApi from "../../api/modules/vegetable.api";
import { Vegetable, VegetablePayload } from 'src/types/vegetable';
import FormTextarea from 'src/components/form/FormTextarea';
import { useParams } from 'react-router-dom';
import Button from 'src/components/common/Button';
import { useDispatch, useSelector } from 'react-redux';
import OverlayModal from 'src/components/common/modal/OverlayModal';
import { setErrorMessage, setModalLoading, setOverlayOpen, setSuccessMessage } from 'src/redux/features/appState/appState.slice';
import { IoMdCloudUpload } from "react-icons/io";
import { RootState, useAppDispatch } from 'src/redux/store';
import { getAllCategories } from 'src/redux/features/category/category.thunks';
import SelectForm from 'src/components/form/SelectForm';
import { getAllUnit } from 'src/redux/features/unit/unit.thunks';
import { Category } from 'src/types/category';
import { Unit } from 'src/types/unit';
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";

const masss = [
  "g", "Kg"
]

const containers = [
  "Bó", "Thùng", "Giỏ"
]

const AddProduct = () => {

  const dispatch = useDispatch();
  const dispatchAsync = useAppDispatch()
  const listCategory = useSelector((state: RootState) => state.category.listCategory)
  const listUnit = useSelector((state: RootState) => state.unit.listUnit);
  const user = useSelector((state: RootState) => state.user.user)
  const fileInput = useRef<HTMLInputElement>(null);
  const addUnitRef = useRef<HTMLDivElement>(null)


  const [images, setImages] = useState<string[]>([]);
  const [category, setCategory] = useState<Category>();
  const [units, setUnits] = useState<string[]>([]);
  const [mass, setMass] = useState<number>(0);
  const [indexMass, setIndexMass] = useState<number>(0);
  const [container, setContainer] = useState<number>(1);  
  const [indexContainer, setIndexContainer] = useState<number>(0);

  function handleMass () {
    if(indexMass == masss.length - 1) {
      setIndexMass(0)
    } else {
      setIndexMass(prev => prev + 1)
    }
  }

  function handleChangeMass (e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number.parseInt(e.target.value.trim())
    if(value >= 1000) {
      setMass(1)
      setIndexMass(1)
    } else {
      setMass(value)
    }
  }
  
  function handleChangeContainer (e: React.ChangeEvent<HTMLInputElement>) {
    const value = Number.parseInt(e.target.value.trim())
    if(value > 100) {
      setContainer(1)
    } else {
      setContainer(value)
    }
  }

  function handleContainer () {
    if(indexContainer == containers.length - 1) {
      setIndexContainer(0)
    } else {
      setIndexContainer(prev => prev + 1)
    }
  }

  function handleAddUnit () {
    if(mass !== 0 || container !== 0) {
      const unitValue = `${mass}${masss[indexMass]} / ${container} ${containers[indexContainer]}`
      setUnits(prev => [...prev, unitValue])
      setMass(0)
      setContainer(1)
      setIndexMass(0)
      setIndexContainer(0)
    }
  }

  function handleRemoveUnit (index: number) {
    setUnits(prev => prev.splice(index, 1))
  }

  const handlePreviewImages = (e: React.FormEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const files: FileList = target.files as FileList

    const result = []

    for(let i = 0; i < files.length; i++) {
      let url = window.URL.createObjectURL(files[i])
      result.push(url)
    }

    setImages([...images, ...result])
  }

  function handleShowAddUnit () {
    if(addUnitRef.current?.classList.contains('flex')) {
      addUnitRef.current.classList.remove('flex')
      addUnitRef.current.classList.add('hidden')
    } else {
      addUnitRef.current?.classList.remove('hidden')
      addUnitRef.current?.classList.add('flex')
    }
  }

  React.useEffect(() => {
    const categories = dispatchAsync(getAllCategories())
    const units = dispatchAsync(getAllUnit())
    return () => {
      categories.abort()
      units.abort()
    }
  }, [dispatchAsync])

  const AddProductForm = useFormik({
    initialValues: {
      vegetableName: "",
      description: "",
      currentPricing: 0.0,
      currentStock: 0,
    },
    validationSchema: yup.object({
      vegetableName: yup.string()
        .min(10,"Tên sản phẩm quá ngắn, Vui lòng nhập ít nhất 10 ký tự")
        .required("Không được để trống"),
      description: yup.string()
        .min(50, "Mô tả quá ngắn. Vui lòng nhập ít nhất 50 ký tự")
        .required("Không được để trống"),
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
        currentPricing,
        currentStock,
      } = values
      const vegetable: Vegetable = {vegetableName, currentPricing, currentStock, description};
      const medias = fileInput.current?.files
      const providerId = user?.provider.id
      const categoryId = category?.id
      const vegetableFormData: VegetablePayload = { providerId, categoryId, units, medias, vegetable }
      
      dispatch(setErrorMessage(undefined))
      dispatch(setSuccessMessage(undefined))
      dispatch(setModalLoading(true))
      const { response, error } = await vegetableApi.addVegetable(vegetableFormData);
      dispatch(setModalLoading(false))

      console.log(response)

      if(response) {
        AddProductForm.resetForm()
        dispatch(setSuccessMessage("Thêm thành công"))
      }

      if(error) {
        dispatch(setErrorMessage("Thêm thất bại"))
      }
    }
  })

  return (
    <>
      <div className='bg-white w-5/6 text-base p-7 ml-5'>
        <h1 className='font-bold text-mainColor text-xl mb-8'>Thêm sản phẩm</h1>
        <form className='flex flex-col justify-center items-start' onSubmit={AddProductForm.handleSubmit}>
          <div className='flex gap-5 w-full'>
            <label className='min-w-[120px] text-right'>Hình ảnh sản phẩm</label>
            <div className='flex flex-1 flex-wrap'>
              <div 
                className='relative'
              >
                <input 
                  ref={fileInput} 
                  id='files' 
                  name='medias' 
                  type='file' 
                  accept='image/*' 
                  multiple
                  onChange={(e: React.FormEvent<HTMLInputElement>) => handlePreviewImages(e)}
                  className='hidden'  
                />
                <label htmlFor='files' className='flex flex-col items-center justify-center cursor-pointer
                border-2 border-dashed border-gray-400 text-gray-400 w-[100px] h-[100px] rounded-md'>
                  <span>Thêm ảnh</span>
                  <IoMdCloudUpload className='text-5xl'/>
                </label>
              </div>
              {
                images.length > 0 && 
                images.map((image, index) => (
                  <img key={index} src={image} alt='' className='w-[50px] h-[50px]' />
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

            <div className='flex items-center mb-5'>
              <SelectForm
                name='categoryId'
                label='Danh mục'
                title='-- Chọn danh mục --'
                flex='row'
                options={listCategory as any}
                keyValue="id"
                keyDisplay='categoryName'
                isRequired
                selectedOption={category}
                onChange={(o) => setCategory(o)}
              />

              {/* <SelectForm
                name='unitId'
                label=' Đơn vị'
                title='-- Chọn đơn vị --'
                flex='row'
                options={listUnit as any}
                keyValue="id"
                keyDisplay='unitName'
                isRequired
                selectedOption={unit}
                onChange={(u) => setUnit(u)}
              /> */}
              <div 
                onClick={handleShowAddUnit}
                className='flex items-center justify-center w-[60%] border-dashed border border-gray-400 h-[30px]
                ml-5 cursor-pointer gap-2 text-mainColor hover:border-mainColor hover:bg-green-100'
              >
                <AiOutlinePlus />
                <span>Thêm đơn vị</span>
              </div>
            </div>  

            {/*  Add Unit Section  */}
            <div ref={addUnitRef} className='flex h-[200px] w-auto ml-[140px] border border-black mb-5'>
              <div className='flex flex-col items-center justify-center flex-1 h-full border-r border-r-black p-5'>
                <div className='flex justify-between border border-gray-500 rounded-md h-[35px] w-3/4 mb-5'>
                  <input
                    type='number'
                    value={mass}
                    className='outline-none px-2 py-1 bg-transparent'
                    onChange={(e) => handleChangeMass(e)}
                  />
                  <button 
                    type='button' 
                    className='w-[60px] h-full border-l border-l-gray-500 rounded-r-md hover:bg-gray-200 font-bold'
                    onClick={handleMass}
                  >
                    {masss[indexMass]}
                  </button>
                </div>
                <div className='flex justify-between border border-gray-500 rounded-md h-[35px] w-3/4'>
                  <input
                    type='number'
                    value={container}
                    className='outline-none px-2 py-1 bg-transparent'
                    onChange={(e) => handleChangeContainer(e)}
                  />
                  <button 
                    type='button' 
                    className='w-[60px] h-full border-l border-l-gray-500 rounded-r-md hover:bg-gray-200 font-bold'
                    onClick={handleContainer}
                  >
                    {containers[indexContainer]}
                  </button>
                </div>
                <button 
                  type='button'
                  className='w-3/4 bg-blue-800 rounded-md text-white mt-3 py-2 hover:bg-blue-700'
                  onClick={handleAddUnit}
                >
                  Thêm đơn vị
                </button>
              </div>
              <div className='flex-1 flex justify-center h-full p-5'>
                <ul className='w-2/3 h-full flex flex-col gap-2 overflow-y-scroll'>
                  {
                    units.map((unit, index) => (
                      <li 
                        key={index} 
                        className='flex items-center justify-between'
                      >
                        <span>{unit}</span>
                        <AiOutlineClose 
                          onClick={() => handleRemoveUnit(index)}
                          className='cursor-pointer hover:border border-gray-400'
                        />
                      </li>
                    ))
                  }
                </ul>
              </div>
            </div>  
            {/*  End Add Unit Section  */}

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
