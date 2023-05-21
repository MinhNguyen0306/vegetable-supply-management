import React from 'react';
import menuConfigs from 'src/configs/menu.config';
import VegetableItem from './VegetableItem';

const VegetableGrid = () => {
  return (
    <ul className='grid grid-cols-2 mt-5 gap-3'>
        {
            menuConfigs.recentVegetable.map((data, index) => (
                <VegetableItem data={data}/>
            ))
        }
    </ul>
  )
}

export default VegetableGrid
