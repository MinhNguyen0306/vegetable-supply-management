import React from 'react';

interface FormSelect {
    id: string;
    name?: string;
    value?: any;
    label?: string | number;
    datas: {
        id: number,
        dataName: string,
    }[];
    isRequired?: boolean;
    title: string;
    flex: 'col' | 'row';
}

const FormSelect: React.FC<FormSelect> = ({...props}) => {
    const { id, name, value, label, datas, title, flex, isRequired } = props

    return (
        <div className={`${flex === 'col' ? "flex flex-col items-start justify-center" : "flex items-center justify-start"} gap-5`}>
            {
                label && (
                    <label htmlFor={id} className='min-w-[120px] text-right'>
                        { isRequired && <span className='text-red-600 font-extrabold'>* </span> }
                        { label }
                    </label>
                )
            }
            
            <select id={id} defaultValue={title} className='flex-1 outline-none border-2 border-gray-400 p-2 rounded-md text-center'>
                <option disabled hidden>{ title }</option>
                {
                    datas.map((data, index) => (
                        <option key={index} value={data.id}>{data.dataName}</option>
                    ))
                }
            </select>
        </div>
    )
}

export default FormSelect
