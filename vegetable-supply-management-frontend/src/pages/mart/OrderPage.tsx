import React from 'react';
import FormInput from "../../components/form/FormInput";
import FormSelect from 'src/components/form/FormSelect';
import menuConfigs from 'src/configs/menu.config';
import Button from 'src/components/common/Button';
import SelectForm from 'src/components/form/SelectForm';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { TbCurrencyDong } from "react-icons/tb";
import { useToggle } from 'src/hooks/useToggle';
import categoryApi from 'src/api/modules/category.api';
import { useDispatch, useSelector } from 'react-redux';
import { getAllCategories } from 'src/redux/features/category/category.thunks';
import { useAppDispatch } from 'src/redux/store';

const OrderPage = () => {

  const dispatch = useAppDispatch()
  const { loading, error, categoryDetail, listCategory } = useSelector((state: any) => state.category)

  const [ isDropdownSearchAdvanced, setIsDropdownSearchAdvanced ] = useToggle(false);

  const searchBoxRef = React.useRef<HTMLDivElement>(null);

  const handleDropdownSearchAdvanced = () => {
    setIsDropdownSearchAdvanced()
  }

  React.useEffect(() => {
    const fixedSearchBox = () => {
      if(document.body.scrollTop > 21 || document.documentElement.scrollTop > 21) {
        searchBoxRef.current?.classList.add('fixedBox');
      } else {
        searchBoxRef.current?.classList.remove("fixedBox");
      }
    }
    window.addEventListener('scroll', fixedSearchBox);

    return () => {
      window.removeEventListener('scroll', fixedSearchBox);
    }
  }, [])

  React.useEffect(() => {
    const promise = dispatch(getAllCategories())
    console.log(listCategory)
    return () => {
      promise.abort()
    }
  }, [dispatch])


  return (
    <div className='relative'>
      {/* Box Search */}
      <div ref={searchBoxRef} className='relative w-full h-max bg-mainColorLight rounded-lg flex flex-col py-4'>
        {/* Box Search Container */}
        <div className='flex gap-2 w-[95%] mx-auto items-center'>
          <div className='grid grid-cols-3 flex-1 items-center gap-2'>
            <FormInput 
              id='search'
              name='search'
              type='text'
              placeholder='Tìm kiếm sản phẩm...'
              rounded='small'
            />
            <SelectForm
              name='category'
              options={menuConfigs.categories}
              label='Tất cả danh mục' 
              keyValue='id'
              keyDisplay='dataName'
            />

            <SelectForm
              name='unit'
              options={menuConfigs.categories}
              label='Tất cả unit' 
              keyValue='id'
              keyDisplay='dataName'
            />
          </div>

          <div className='flex flex-2 gap-2'>
            <Button type='button' rounded>
              Tìm kiếm
            </Button>
            <Button
             type='button'
             rounded
             onClick={handleDropdownSearchAdvanced}
            >
              Tìm kiếm nâng cao
            </Button>
          </div>  
          {/* End Box Search Container */}

          {/* Box Advanced Search */}
          <div 
            className={`${isDropdownSearchAdvanced ? "block" : "hidden"} w-full absolute top-full mt-2 right-0 
            py-4 bg-white shadow-lg rounded-lg`}
          >
            <div className='w-[95%] mx-auto flex items-center gap-2'>
              <h2>Loc nang cao: </h2>
              <div className='flex-1 grid grid-cols-4 gap-2 items-center'>
                <SelectForm
                  name='area'
                  options={menuConfigs.categories}
                  label='Khu vực' 
                  keyValue='id'
                  keyDisplay='dataName'
                />
                 <SelectForm
                  name='date'
                  options={menuConfigs.categories}
                  label='Mới nhất' 
                  keyValue='id'
                  keyDisplay='dataName'
                />
                 <SelectForm
                  name='certificate'
                  options={menuConfigs.categories}
                  label='Chứng nhận' 
                  keyValue='id'
                  keyDisplay='dataName'
                />
                 <SelectForm
                  name='price'
                  options={menuConfigs.categories}
                  label='Khoảng giá' 
                  keyValue='id'
                  keyDisplay='dataName'
                />
              </div>
              <div className='w-max flex items-center'>
                <span className='flex gap-2 items-center cursor-pointer'>
                  <span className='text-red-500 font-bold hover:scale-90'>Xóa chọn</span>
                  <span className='text-gray-500 font-bold'>|</span>
                  <span 
                    className='text-xl text-gray-700 hover:scale-90'
                    onClick={handleDropdownSearchAdvanced}
                  >
                    <AiOutlineCloseCircle />
                  </span>
                </span>
              </div>
            </div>
          </div>
          {/* End Box Advanced Search */}
        </div>
        {/* End Box Search Container */}
      </div>
      {/* End Box Search */}

      {/* List Vegetable Section */}
      <ul className='grid grid-cols-2 mt-5 gap-3'>
        {
            menuConfigs.recentVegetable.map((data, index) => (
            <li key={index} className='border-2 border-gray-200 rounded hover:border-mainColorLight p-2 bg-white'>
              <div className='flex flex-col gap-2'>
                <h2 className='font-bold'>{ data.provider }</h2>
                <div className='flex gap-2 w-full'>
                  <img src={ data.logo } alt='No Image' className='w-[70px] h-[70px]'/>
                  <div className='flex flex-col h-[70px] w-full justify-between'>
                    <h2>{ data.name }</h2>
                    <div className='flex justify-between w-full'>
                      <div className='flex items-center'>
                        <span>{ data.price }</span>
                        <TbCurrencyDong />  
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          ))
        }
      </ul>
      {/* End List Vegetable Section */}
    </div>
  )
}

export default OrderPage
