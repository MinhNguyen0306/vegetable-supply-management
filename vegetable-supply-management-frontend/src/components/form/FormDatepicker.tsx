import { useFormik } from 'formik';
import React from 'react'
import ReactDatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { GoCalendar } from "react-icons/go";
import * as Yup from "yup";

interface Props {
    label?: string,
    isRequired?: boolean
    selected: Date | undefined | null
    onChange: (date: Date | null) => void
    showTimeSelect?: boolean
    showTimeInput?: boolean
    dateFormat?: string
    flex: 'row' | 'col'
}

const FormDatepicker = (props: Props) => {
    const { 
        label, 
        isRequired, 
        selected, 
        onChange, 
        showTimeSelect, 
        showTimeInput,
        dateFormat, 
        flex 
    } = props;

    const dateForm = useFormik({
        initialValues: {
            date: null
        },
        validationSchema: Yup.object({
            date: Yup.date()
            .min(new Date(), "Ngày chọn phải từ hôm nay trở đi")
            .required("Chọn ngày giao")
        }),
        onSubmit: () => {
            
        }
    })

    const date = new Date()
    const initDate = React.useRef<any>(date.setDate(date.getDate() + 1));

    return (
        <div className={`${flex === 'row' ? "flex" : "flex flex-col"} gap-2 items-center justify-between`} >
            { label && 
                <h2 className='flex gap-1'>
                    <span className={`${isRequired ? "block text-red-500" : "hidden"}`}>* </span>
                    {label}
                </h2> 
            }
            <form>
                <div className='flex items-center justify-around border border-gray-500 text-gray-500 rounded-md py-1 px-2'>
                    <ReactDatePicker 
                        selected={selected && selected.getTime() > new Date().getTime() ? selected : initDate.current}
                        onChange={(date) => onChange(date)}
                        dateFormat={dateFormat}
                        shouldCloseOnSelect={true}
                        showTimeSelect={showTimeSelect}
                        showTimeInput={showTimeInput}
                        className='outline-none'
                    />
                    <GoCalendar />
            </div>
            </form>
           
        </div>
    )
}

export default FormDatepicker
