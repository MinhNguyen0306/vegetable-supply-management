import React from 'react';
import { ListCategory } from 'src/types/category';

interface Props {
    id: string;
    name?: string;
    value?: any;
    label?: string | number;
    options: ListCategory,
    isRequired?: boolean;
    title: string;
    flex: 'col' | 'row';
}

const FormSelect = (props: Props) => {
    const {
        id,
        name, 
        value, 
        label, 
        options, 
        title, 
        flex, 
        isRequired 
    } = props
    return (
        <div className={`${flex === 'col' ? "flex flex-col items-start justify-center" : "flex items-center justify-start"} gap-5 cursor-pointer`}>
            {
                label && (
                    <label htmlFor={id} className='min-w-[120px] text-right'>
                        { isRequired && <span className='text-red-600 font-extrabold'>* </span> }
                        { label }
                    </label>
                )
            }
            
            <select 
                id={id} 
                defaultValue={title} 
                className='flex-1 outline-none border-2 border-gray-400 p-2 rounded-md text-center'
            >
                <option disabled hidden>{ title }</option>
                {
                    options.categories?.map((data, index) => (
                        <option key={index} value={data.id}>{data.categoryName}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default FormSelect
