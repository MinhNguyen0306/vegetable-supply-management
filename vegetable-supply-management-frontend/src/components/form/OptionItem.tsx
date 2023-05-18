import React from 'react'

interface Props {
    isSelected?: boolean;
    display: string | number;
    value: string | number;
    handleSelected: (v: any) => void; 
}

const OptionItem = (props: Props) => {
    const { isSelected = false, display, value , handleSelected} = props;

    return (
        <li 
            className={`w-full p-2 hover:bg-gray-300 cursor-pointer ${isSelected ? "text-mainColor" : ""}`}
            onClick={() => handleSelected(value)}
        >
            {display}
        </li>
    )
}

export default OptionItem
