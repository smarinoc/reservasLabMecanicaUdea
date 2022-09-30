import { IconButton } from '@material-tailwind/react';
import React from 'react';

const BasicFilter = ({ isSortedDesc, toggleSortBy, Header, children }) => {
  let icon;
  if (isSortedDesc === undefined) {
    icon = 'fas fa-grip-lines';
  } else if (isSortedDesc) {
    icon = 'fas fa-arrow-down';
  } else {
    icon = 'fas fa-arrow-up';
  }
  return (
    <div className='flex flex-col my-3 gap-2 w-fulls'>
      <span className='block text-sm font-medium text-white'>{Header}</span>
      <div className='flex flex-row gap-1 mx-2'>
        {children}
        <IconButton
          variant='text'
          color='white'
          size='lg'
          onClick={() => {
            toggleSortBy(!isSortedDesc);
          }}
        >
          <i className={icon} />
        </IconButton>
      </div>
    </div>
  );
};

export default BasicFilter;
