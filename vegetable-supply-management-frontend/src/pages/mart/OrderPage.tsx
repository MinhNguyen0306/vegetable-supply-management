import React from 'react';
import FormInput from "../../components/form/FormInput";
import menuConfigs from 'src/configs/menu.config';
import Button from 'src/components/common/Button';
import SelectForm from 'src/components/form/SelectForm';
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useToggle } from 'src/hooks/useToggle';
import { useSelector } from 'react-redux';
import { getAllCategories } from 'src/redux/features/category/category.thunks';
import { RootState, useAppDispatch } from 'src/redux/store';
import VegetableGrid from 'src/components/common/VegetableGrid';
import { Category } from 'src/types/category';
import { Unit } from 'src/types/unit';
import { getAllUnit } from 'src/redux/features/unit/unit.thunks';
import { getAllVegetable } from 'src/redux/features/vegetable/vegetable.thunks';
import { PageRequest } from 'src/types/base';

const OrderPage = () => {

  const dispatchThunk = useAppDispatch()

  const listCategory = useSelector((state: RootState) => state.category.listCategory)
  const listUnit = useSelector((state: RootState) => state.unit.listUnit)

  const [ isDropdownSearchAdvanced, setIsDropdownSearchAdvanced ] = useToggle(false);

  const searchBoxRef = React.useRef<HTMLDivElement>(null);

  const [category, setCategory] = React.useState<Category>();
  const [unit, setUnit] = React.useState<Unit>();
  const [area, setArea] = React.useState<any>();
  const [date, setDate] = React.useState<any>();
  const [certificate, setCertificate] = React.useState<any>();
  const [price, setPrice] = React.useState<any>();

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
    const categoriesPromise = dispatchThunk(getAllCategories())
    const unitPromise = dispatchThunk(getAllUnit())
    return () => {
      categoriesPromise.abort()
      unitPromise.abort()
    }
  }, [dispatchThunk])


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
              options={listCategory as any}
              keyValue='id'
              keyDisplay='categoryName'
              flex='row'
              title='Tất cả danh mục'  
              selectedOption={category}
              onChange={(c) => setCategory(c)}
            />

            <SelectForm
              name='unit'
              options={listUnit}
              keyValue='id'
              keyDisplay='unitName'
              title='Tất cả unit'
              flex='row'
              selectedOption={unit}
              onChange={(u) => setUnit(u)}
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
                  keyValue='id'
                  keyDisplay='dataName'
                  flex='row'
                  title='Khu vực'
                  selectedOption={area}
                  onChange={(e) => setArea(e)}
                />
                 <SelectForm
                  name='date'
                  options={menuConfigs.categories}
                  keyValue='id'
                  keyDisplay='dataName'
                  flex='row'
                  title='Mới nhất'
                  selectedOption={date}
                  onChange={(e) => setDate(e)}
                />
                 <SelectForm
                  name='certificate'
                  options={menuConfigs.categories}
                  keyValue='id'
                  keyDisplay='dataName'
                  flex='row'
                  title='Chứng nhận'
                  selectedOption={certificate}
                  onChange={(e) => setCertificate(e)}
                />
                 <SelectForm
                  name='price'
                  options={menuConfigs.categories}
                  keyValue='id'
                  keyDisplay='dataName'
                  flex='row'
                  title='Khoảng giá'
                  selectedOption={price}
                  onChange={(e) => setPrice(e)}
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
      <VegetableGrid />
      {/* End List Vegetable Section */}
    </div>
  )
}

export default OrderPage
