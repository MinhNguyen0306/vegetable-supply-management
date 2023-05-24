import React from 'react'

interface Props {
    id: string;
    type: 'button' | 'checkbox' | 'email' | 'password' | 'number' | 'submit' | 'text' | 'radio' | 'file' | 'hidden' | undefined;
    name: string;
    value?: any;
    label: string | number;
    isRequired?: boolean
    flex: 'col' | 'row';
    errors?: boolean | undefined;
    helperText?: string | false | undefined;
    onChange?: (e: any) => void
}

const FormInputLabel: React.FC<Props> = (props) => {
    const { 
        id, 
        type,
        name, 
        value, 
        label, 
        isRequired = false, 
        flex, 
        errors = false,
        helperText,
        onChange} = props
    return (
        <div className='flex flex-col'>
            <div className={`${ flex === 'col' ? "flex flex-col items-start justify-center" : 'flex items-center justify-start'} 
                gap-5 mb-4`}
            >
                <label 
                    htmlFor={id} 
                    className='min-w-[120px] text-right flex items-center justify-end min-h-[40px]'
                >
                    { isRequired && <span className='text-red-600 font-extrabold'>* </span> }
                    { label }
                </label>
                <div className='flex-1'>
                    <input 
                        id={id} 
                        type={type} 
                        name={name} 
                        value={value} 
                        onChange={onChange ? (e) => onChange(e) : undefined}
                        className={`rounded-md outline-none py-1 px-2 border-2 w-full
                        basis-full border-gray-400 ${helperText && "border-red-500"}`}
                    />
                    {errors ? <div className='text-red-500 text-sm'>{helperText ? helperText : ""}</div> : null}
                </div>        
            </div>
        </div>
    )
}

export default FormInputLabel
