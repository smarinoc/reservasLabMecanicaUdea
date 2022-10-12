import Image from 'next/image';
import React from 'react';
import ImageUploading from 'react-images-uploading';
import Button from '@components/Button';

const UploadImage = ({ image, setImage }) => (
  <ImageUploading value={image} onChange={setImage} dataURLKey='data_url'>
    {({ imageList, onImageUpload, isDragging, dragProps }) => (
      <div className='w-fit flex flex-col gap-2'>
        <div className='border-2 border-gray-300 w-[400px] h-[250px]'>
          <button
            type='button'
            onClick={onImageUpload}
            {...dragProps}
            className={`w-full h-full items-center ${
              isDragging ? 'bg-slate-200 border-2 border-[#26DB84]' : ''
            }`}
          >
            {imageList[0] ? (
              <Image
                src={imageList[0]?.data_url || image}
                alt='no'
                width={400}
                height={250}
              />
            ) : (
              <span> Click o Arrastra aquí la imagen </span>
            )}
          </button>
        </div>
        {imageList[0] ? (
          <div className='flex flex-row w-full justify-center gap-6'>
            <Button text='Cambiar foto' onClick={onImageUpload} />
          </div>
        ) : (
          <></>
        )}
      </div>
    )}
  </ImageUploading>
);

export default UploadImage;
