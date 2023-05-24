import React , { useEffect }from 'react'
import SelectForm from 'src/components/form/SelectForm';
import FormInput from 'src/components/form/FormInput';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import ManageVegetableContainer from './component/ManageVegetableContainer';

interface FilterBy {
    value: string | number,
    label: string,
}

const filterBys: FilterBy[] = [
    {value: 1, label: "ten san pham"},
    {value: 2, label: "Gia san pham"},
    {value: 3, label: "Ma san pham"},
]

const ManageVegetable = () => {

    const [filterBy, setFilterBy] = React.useState<FilterBy>(filterBys[0])

    return (
        <div className='flex flex-col gap-2 w-full items-center text-base min-h-screen'>
            {/* Section filter */}
            <div className='flex flex-col items-center justify-center bg-white w-11/12 h-[200px] px-5'>
                <div className='flex w-full'>
                        <SelectForm 
                            name='filterBy'
                            title='-- Lọc theo --'
                            flex='row'
                            options={filterBys}
                            keyValue='value'
                            keyDisplay='label'
                            selectedOption={filterBy}
                            onChange={(e) => setFilterBy(e)}
                        />
                    
                        <FormInput 
                            id='filter'
                            name='filter'
                            type='text' 
                            placeholder='Nhap tu khoa ...'
                            rounded='small'
                            size='full'
                        />
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
