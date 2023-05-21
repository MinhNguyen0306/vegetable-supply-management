import React , { useEffect }from 'react'
import SelectForm from 'src/components/form/SelectForm';
import FormInput from 'src/components/form/FormInput';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ManageVegetableContainer from './component/ManageVegetableContainer';

const filberBy: {}[] = [
    {id: 1, display: "ten san pham"},
    {id: 2, display: "Gia san pham"},
    {id: 3, display: "Ma san pham"},
]

const ManageVegetable = () => {

    return (
        <div className='flex flex-col gap-2 w-full items-center text-base min-h-screen'>
            {/* Section filter */}
            <div className='flex flex-col items-center justify-center bg-white w-11/12 h-[200px] '>
                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex flex-col gap-2'>   
                        <div className='flex'>
                            <SelectForm 
                                name='filterBy'
                                label='--Loc theo --'
                                options={filberBy}
                                keyValue='id'
                                keyDisplay='display'
                            />
                            <FormInput 
                                id='filter'
                                name='filter'
                                type='text' 
                                placeholder='Nhap tu khoa ...'
                                rounded='small'
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* End seciton filter */}

            {/* Section List Vegetable */}
            <ManageVegetableContainer />
            {/* End section List Vegetable */}
        </div>
    )
}

export default ManageVegetable
