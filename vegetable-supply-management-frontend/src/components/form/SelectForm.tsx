import React, { MouseEvent, MouseEventHandler, useRef, useState } from 'react';
import { IoMdArrowDropdown } from "react-icons/io";
import OptionItem from './OptionItem';
import { useToggle } from 'src/hooks/useToggle';

interface Props {
    name: string;
    isRequired?: boolean;
    label: string;
    variant?: 'standard' | 'contained' | 'outlined'
    options: any[];
    keyValue: string | number;
    keyDisplay: string; 
    disable?: boolean;
    size?: 'small' | 'medium';
    handleChange?: () => void;
}


const SelectForm = (props: Props) => {
    const { 
        name, 
        isRequired, 
        label, 
        variant, 
        options, 
        keyValue, 
        keyDisplay, 
        disable = false, 
        size, 
        handleChange 
    } = props;

    const [selectedOption, setSelectedOption] = useState<any>(null);
    let isDropdown = React.useRef<boolean>(false)

    const selectFormRef = useRef<HTMLDivElement>(null);
    const ulRef = useRef<HTMLUListElement>(null)

    const handleSelectOption = (option: any) => {
        setSelectedOption(option)
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
            className={`${ disable ? "pointer-events-none opacity-50" : "" } relative flex flex-col gap-1 w-full cursor-pointer`}
        >
            {/* Selection Box */}
            <div ref={selectFormRef} className="w-auto h-full flex justify-end items-center p-1 border-2 bg-white border-gray-200 
            hover:border-gray-300"
            >
                <span className='px-4 w-full text-left'>{ selectedOption ? selectedOption[keyDisplay] : label }</span>
                <div>
                    <IoMdArrowDropdown />
                </div>
            </div>

            {/* Dropdown Select Option */}
            <ul 
                ref={ulRef}
                className={`hidden absolute top-full left-0 mt-1 z-50 bg-white
                justify-start w-full h-max shadow-xl rounded-sm`}
            >
                {
                    options.length && options.map((option, index) => (
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
    )
}

export default SelectForm
