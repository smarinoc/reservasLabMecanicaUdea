/* eslint-disable no-promise-executor-return */
const cloudinary = require('cloudinary');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  upload_preset: process.env.UPLOAD_PRESET,
});


const uploadCloudinary = async (image) => {
  const { url } = await cloudinary.v2.uploader.upload(image, {
    folder: process.env.FOLDER,
  });

  return url;
};

export { uploadCloudinary };
