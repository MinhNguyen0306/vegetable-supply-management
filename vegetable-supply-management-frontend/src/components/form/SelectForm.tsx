import React, { MouseEvent, MouseEventHandler, useRef, useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import OptionItem from './OptionItem';
import { useToggle } from 'src/hooks/useToggle';

interface Props {
    name: string;
    isRequired?: boolean;
    label?: string;
    title: string,
    variant?: 'standard' | 'contained' | 'outlined'
    options: any[];
    keyValue: string | number;
    keyDisplay: string; 
    disable?: boolean;
    selectedOption: any 
    flex: 'row' | 'col'
    size?: 'small' | 'medium' | 'full';
    onChange: (option: any) => void 
}


const SelectForm = (props: Props) => {
    const { 
        name, 
        isRequired, 
        label, 
        title,
        variant, 
        selectedOption,
        options, 
        keyValue, 
        keyDisplay,
        flex,
        disable = false, 
        size, 
        onChange
    } = props;


    const selectFormRef = useRef<HTMLDivElement>(null);
    const ulRef = useRef<HTMLUListElement>(null);
    let spanRef = useRef<HTMLSpanElement>(null);

    const handleSelectOption = (option: any) => {
        onChange(option)
    }

    React.useEffect(() => {
        const closeAllDropdown = () => {
            var dropdowns = document.getElementsByClassName('dropdown-expand');
            for(var i = 0; i < dropdowns.length; i++) {
                dropdowns[i].classList.remove('dropdown-expand')
            }
        }

        const handleClick = (e: any) => {
            const eTarget = e.target as HTMLDivElement
            if(eTarget === selectFormRef.current || selectFormRef.current?.contains(eTarget)) {
                if(ulRef.current?.classList.contains('hidden')) {
                    ulRef.current?.classList.add('dropdown-expand')
                    ulRef.current?.classList.remove('hidden')
                } else {
                    closeAllDropdown()
                    ulRef.current?.classList.add('hidden')
                }
            } else {
                closeAllDropdown()
                ulRef.current?.classList.add('hidden')
            }
        }
        document.addEventListener('click', handleClick)

        return () => {
            document.removeEventListener('click', handleClick)
        }
    }, [])

    return (
        <div 
            className={`${flex === 'col' ? "flex-col gap-2" : "gap-5"} ${ disable ? "pointer-events-none opacity-50" : "" } 
            flex relative w-full cursor-pointer`}
        >
            {
                label && (
                    <label className={`min-w-[120px] ${flex === 'col'? "text-left" : "text-right"}`}>
                        { isRequired && <span className='text-red-600 font-extrabold'>* </span> }
                        { label }
                    </label>
                )
            }
            {/* Selection Box */}
            <div ref={selectFormRef} className="relative w-full h-full flex justify-end items-center p-1 border-2 bg-white 
            border-gray-200 hover:border-gray-300"
            >
                <span ref={spanRef} className='px-4 w-full text-left'>{ selectedOption ? selectedOption[keyDisplay] : title }</span>
                <div>
                    <IoMdArrowDropdown />
                </div>
                {/* Dropdown Select Option */}
                <ul 
                    ref={ulRef}
                    className={`hidden absolute top-full left-0 mt-1 z-50 bg-white
                    justify-start w-full h-max shadow-lg rounded-sm max-h-[150px] overflow-y-scroll`}
                >
                    {
                        options.length > 0 && options.map((option, index) => (
                            <OptionItem 
                                key={index}
                                display={option[keyDisplay]}
                                value={option[keyValue]}
                                handleSelected={() => handleSelectOption(option)}
                                isSelected={selectedOption === option ? true : false}
                            />
                        ))
                        
                    }
                </ul>
                {/* End Dropdown Select Option */}
            </div>            
        </div>
    )
}

export default SelectForm
