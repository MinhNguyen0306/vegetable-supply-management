import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingModal from './LoadingModal';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
import { setErrorMessage, setOverlayOpen, setSuccessMessage } from 'src/redux/features/appState/appState.slice';
import OrderDetailModal from './OrderDetailModal';

interface Props {
    type: 'loading' | 'error' | 'success' | 'confirm' | 'order-detail';
    data?: any;
}

const OverlayModal: React.FC<Props> = ({ type, data }) => {
    const dispatch = useDispatch();
    const { overlayOpen } = useSelector((state: any) => state.appState); 
    let children = useRef<React.ReactNode>(null);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (type === 'error' || type === 'success') {
                dispatch(setOverlayOpen(false));
                dispatch(setErrorMessage(undefined))
                dispatch(setSuccessMessage(undefined))
                children.current = null;
           }
        }, 2000)

        return () => {
            clearTimeout(delay)
        }
    }, [])

    useEffect(() => {
        if(overlayOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow='unset'
    }, [overlayOpen])

    switch(type) {
        case 'loading':
            children.current = <LoadingModal message={data} />
            break;
        case 'error': 
            children.current = <ErrorModal message={data} />
            break;
        case 'success': 
            children.current = <SuccessModal message={data} />
            break;
        case 'confirm': 
            children.current = <SuccessModal message={data} />
            break;
        case 'order-detail':
            children.current = <OrderDetailModal data={data}/>
            break;
        default:
            console.log("Missing type")
    }

    return (
        <div 
            className={`w-screen h-screen z-[9999] bg-black/70 fixed inset-0 justify-center items-center overflow-hidden
            flex`}
        >
            {children.current}
        </div>
    )
}

export default OverlayModal
