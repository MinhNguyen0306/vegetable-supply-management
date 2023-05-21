import React from 'react'
import { useToggle } from 'src/hooks/useToggle';
import { BsEyeSlash, BsEye } from "react-icons/bs";

interface Props {
    id: string,
    name: string
    placeholder: string,
    errors?: boolean | undefined;
    helperText?: string | false | undefined;
    onChange?: (e: any) => void
}

const FormPassword = (props: Props) => {
    const { id, name, placeholder, errors, helperText, onChange } = props
    const [isShowPassword, setIsShowPassword] = useToggle(false)

    return (
        <div className='flex flex-col'>
            <div className='relative rounded-xl px-1 w-full bg-white border border-gray-500'>
                <input 
                    id={id}
                    name={name}
                    className={`bg-transparent w-[85%] h-full outline-none p-2 ${helperText && "border-red-500"}`}
                    type={isShowPassword ? "text" : "password"}
                    placeholder={placeholder}
                    onChange={onChange}
                />
                <div className="absolute top-1/2 -translate-y-1/2 right-0 cursor-pointer hover:bg-slate-300 h-full w-[15%]
                rounded-lg grid content-center justify-center hover:text-slate-700" 
                onClick={setIsShowPassword}>
                { isShowPassword ? <BsEyeSlash /> : <BsEye /> }
                </div>
            </div>
            {errors ? <div className='text-red-500 text-sm'>{helperText ? helperText : ""}</div> : null}
        </div>
    )
}

export default FormPassword
