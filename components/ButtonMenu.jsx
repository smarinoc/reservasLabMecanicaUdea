import { Menu, MenuItem } from '@mui/material';
import Link from 'next/link';
import React, { useState } from 'react';

const ButtonMenu = ({ name, options }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <div>
      <button
        type='button'
        className='text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium'
        onClick={handleClick}
      >
        {name}
      </button>
      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {options.map((item) => (
          <MenuItem onClick={handleClose}>
            <Link
              key={item.name}
              href={item.href}
              className='px-3 py-2 rounded-md text-sm font-medium'
            >
              {item.name}
            </Link>
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};

export default ButtonMenu;
