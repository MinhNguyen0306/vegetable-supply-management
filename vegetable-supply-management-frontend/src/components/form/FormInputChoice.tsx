import React from 'react'

interface Props {
    options?: any
}

const FormInputChoice = (props: Props) => {

    const { options } = props

    const ulRef = React.useRef<HTMLUListElement>(null)
    const spanRef = React.useRef<HTMLSpanElement>(null)

    React.useEffect(() => {
        const handleClick = (e: any) => {
            console.log(e.target)
            if(spanRef.current?.classList.contains(e.target) || e.target === spanRef.current) {
                if(ulRef.current?.classList.contains('hidden')) {
                    ulRef.current.classList.add('flex');
                    ulRef.current.classList.remove('hidden');
                } else {
                    ulRef.current?.classList.add('hidden');
                    ulRef.current?.classList.remove('flex');
                }
            } else {
                ulRef.current?.classList.add('hidden');
                ulRef.current?.classList.remove('flex');
            }
        }

        document.addEventListener('click', handleClick);

        return () => {
            document.removeEventListener('click', handleClick);
        }
    })

    return (
        <div className='relative'>
            <div className='flex h-[35px] border border-gray-700 rounded items-center justify-between'>
                <input type='number' className='outline-none w-full px-5'/>
                <span ref={spanRef} className='px-5 border-l-2 border-l-black'>KM2</span>
            </div>
            <ul ref={ulRef} className='absolute flex-col top-full mt-2 h-[100px] w-full bg-white shadow-lg rounded-md'>
                <li className='p-2 hover:bg-gray-300 rounded-md'>
                    Hecta
                </li>
                <li>
                    Km2
                </li>
            </ul>
        </div>
    )
}

export default FormInputChoice
