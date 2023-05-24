import React from 'react'

interface Props {
    id: string;
    name?: string;
    value?: any;
    label?: string | number;
    placeholder?:string;
    isRequired?: boolean
    rows: number | undefined;
    cols?: number | undefined;
    errors?: boolean | undefined;
    helperText?: string | false | undefined;
    onChange?: (e: any) => void;
    flex: 'col' | 'row';
    fullWidth?: boolean,
}

const FormTextarea: React.FC<Props> = (props) => {

  const {
    id, 
    name, 
    value, 
    label, 
    placeholder,
    isRequired, 
    rows, 
    cols, 
    flex,
    fullWidth,
    errors = false,
    helperText,
    onChange
  } = props


  return (
    <div className={`${ flex === 'col' ? "flex flex-col items-start justify-center" : 'flex items-start justify-start'}
      ${fullWidth ? "w-full" : ''} gap-5 mb-4`}
    >
        {
          label ? (
            <label htmlFor={id} className='min-w-[120px] text-right'>
              { isRequired && <span className='text-red-600 font-extrabold'>* </span> }
              { label }
            </label>
          ) : null
        }
        <div className={`${label ? 'flex-1' : 'w-full'} `}>
          <textarea 
            id={id} 
            rows={rows} 
            cols={cols} 
            name={name} 
            placeholder={placeholder}
            value={value} 
            onChange={onChange ? (e) => onChange(e) : undefined}
            className={`flex-1 w-full rounded-md outline-none p-2 border-2
            basis-full border-gray-400 resize-none ${helperText && "border-red-500"}`}
          />
          {!errors ? <div className='text-red-500 text-sm'>{helperText ? helperText : ""}</div> : null}
        </div>
    </div>
  )
}

export default FormTextarea
