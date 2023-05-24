import React from 'react'
import { AiOutlineEdit, AiOutlineLock, AiOutlineUnlock } from 'react-icons/ai'
import { GoIssueOpened } from 'react-icons/go'
import vegetableApi from 'src/api/modules/vegetable.api'
import { VegetableDetail } from 'src/types/vegetable'

const LockAction = ({ data }: { data: VegetableDetail }) => {
    const [lock, setLock] = React.useState(data.lock)

    const handleLockVegetable = (vegetable: VegetableDetail) => {
        console.log(vegetable)
        const fetch = async () => {
            const { response, error } = await vegetableApi.lockVegetable(vegetable.id);
        }
        fetch()
        setLock(prev => !prev)
    }

  return (
    <div className='flex items-center justify-center gap-2 text-gray-600'>
        <GoIssueOpened 
            onClick={() => console.log(data)}
        />
        <AiOutlineEdit />
        <div onClick={() => handleLockVegetable(data)}>
            { data.lock ? 
                <AiOutlineLock 
                    className='text-green-600'
                /> 
                :
                <AiOutlineUnlock 
                    className='text-red-600'
                />
            }
        </div>
    </div>
  )
}

export default LockAction
