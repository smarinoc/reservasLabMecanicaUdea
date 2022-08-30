import React from 'react';
import { BsXLg } from 'react-icons/bs';

const BsXlgButton = ({ onClick }) => (
  <button type='button' onClick={onClick}>
    <BsXLg className='fill-red-700 hover:fill-red-400' />
  </button>
);

export default BsXlgButton;
