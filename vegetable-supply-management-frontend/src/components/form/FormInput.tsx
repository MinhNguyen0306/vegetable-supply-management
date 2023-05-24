import React, { useRef } from 'react'

interface Props {
  id: string,
  name: string,
  placeholder?: string,
  type: 'button' | 'checkbox' | 'email' | 'password' | 'number' | 'submit' | 'text' | 'radio' | 'file' | 'hidden' | undefined;
  rounded?: 'small' | 'medium' | 'large';
  size?: 'small' | 'medium' | 'full',
  errors?: boolean | undefined;
  helperText?: string | false | undefined;
  onChange?: (e: any) => void
  value?: any
}

const FormInput = (props: Props) => {
  const {
    id,
    name, 
    placeholder, 
    value,
    rounded,
    type,
    size,
    errors,
    helperText,
    onChange 
  } = props;

  const roundedType = useRef<string>();

  switch(rounded) {
    case 'small':
      roundedType.current = 'rounded-sm';
      break;
    case 'medium':
      roundedType.current = 'rounded-md';
      break;
    case 'large':
      roundedType.current = 'rounded-lg';
      break;
  }

  return (
    <div className={`flex flex-col ${size === 'full' ? 'w-full' : "" }`}>
      <input 
        id={id}
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange ? (e) => onChange(e) : undefined}
        className={`outline-none border-2 border-gray-200 py-1 px-2 ${roundedType.current} ${helperText && "border-red-500"}`}
      >
      </input>
      {errors ? <div className='text-red-500 text-sm'>{helperText ? helperText : ""}</div> : null}
    </div>
  )
}

export default FormInput
