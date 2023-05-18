import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import LoadingModal from './LoadingModal';
import ErrorModal from './ErrorModal';
import SuccessModal from './SuccessModal';
import { useDelayTimeout } from 'src/hooks/useDelayTimeout';
import { setOverlayOpen } from 'src/redux/features/appStateSlice';

interface Props {
    type: 'loading' | 'error' | 'success' | 'confirm';
    message: any;
    object?: any;
}

const OverlayModal: React.FC<Props> = ({ type, message, object }) => {
    const dispatch = useDispatch();
    const { overlayOpen } = useSelector((state: any) => state.appState); 
    let children = useRef<React.ReactElement>();

    useEffect(() => {
        const delay = setTimeout(() => {
            if (type === 'error' || type === 'success') {
                dispatch(setOverlayOpen(false))
           }
        }, 2000)

        return () => {
            clearTimeout(delay)
        }
    }, [])

    switch(type) {
        case 'loading':
            children.current = <LoadingModal message={message} />
            break;
        case 'error': 
            children.current = <ErrorModal message={message} />
            break;
        case 'success': 
            children.current = <SuccessModal message={message} />
            break;
        case 'confirm': 
            break;
        default:
            console.log("Missing type")
    }

    useEffect(() => {
        if(overlayOpen) document.body.style.overflow = 'hidden'
        else document.body.style.overflow=''
    }, [overlayOpen])

    return (
        <div 
            className={`w-screen h-screen z-[9999] bg-black/70 fixed inset-0 justify-center items-center overflow-hidden'
            ${overlayOpen ? "flex" : "hidden"} `}
        >
            {children.current}
        </div>
    )
}

export default OverlayModal
