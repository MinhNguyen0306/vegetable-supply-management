import React from 'react';
import menuConfigs from 'src/configs/menu.config';
import VegetableItem from './VegetableItem';
import Button from './Button';
import { RootState, useAppDispatch } from 'src/redux/store';
import { useSelector } from 'react-redux';
import { PageRequest } from 'src/types/base';
import { getAllVegetable } from 'src/redux/features/vegetable/vegetable.thunks';

const VegetableGrid = () => {
  const dispatchThunk = useAppDispatch()

  const { listVegetable } = useSelector((state: RootState) => state.vegetable)

  const [pageNumber, setPageNumber] = React.useState<number>(0);
  const [pageSize, setPageSize] = React.useState<number>(4);
  const [sortBy, setSortBy] = React.useState<string>('id');
  const [sortDir, setSortDir] = React.useState<string>('asc');

  React.useEffect(() => {
    const pageRequest: PageRequest = { pageNumber: pageNumber, pageSize: pageSize, sortBy: sortBy, sortDir: sortDir }
    const vegetablesPromise = dispatchThunk(getAllVegetable({request: pageRequest}))
    return () => {
      vegetablesPromise.abort()
    }
  }, [dispatchThunk])

  const loadMore = async () => {
    const pageRequest: PageRequest = {pageNumber: pageNumber, pageSize: pageSize + pageSize, sortBy: sortBy, sortDir: sortDir }
    dispatchThunk(getAllVegetable({request: pageRequest}))
    setPageSize(prev => prev + prev)
  }

  return (
    <>
      <ul className='grid grid-cols-2 mt-5 gap-3'>
        {
            listVegetable.content.map((data, index) => (
                <VegetableItem key={index} vegetable={data}/>
            ))
        }
      </ul>
      {
        pageSize < listVegetable.totalElements ? (
          <div className='w-full flex justify-center my-10'>
            <Button rounded outlined onClick={loadMore}>
              Xem thêm
            </Button>
          </div>
        ) : null
      }
    </>
  
  )
}

export default VegetableGrid
