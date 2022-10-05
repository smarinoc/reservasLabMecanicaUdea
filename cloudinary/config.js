/* eslint-disable no-promise-executor-return */
const cloudinary = require('cloudinary');
const { createWriteStream } = require('fs');

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  upload_preset: process.env.UPLOAD_PRESET,
});

const saveImagesWithStream = ({ filename, mimetype, createReadStream }) => {
  const stream = createReadStream();
  const path = `cloudinary/images/${filename}`;
  return new Promise((resolve, reject) =>
    stream
      .pipe(createWriteStream(path))
      .on('finish', () => resolve({ path, filename, mimetype }))
      .on('error', reject)
  );
};

const uploadCloudinary = async (file) => {
  const { path } = await saveImagesWithStream(file);
  const { url } = await cloudinary.v2.uploader.upload(path, {
    folder: process.env.FOLDER,
  });

  return url;
};

export { uploadCloudinary };
