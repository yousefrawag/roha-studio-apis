const cloudinary = require("cloudinary").v2;
cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUD_KEY,
  api_secret: process.env.CLOUD_SECRET,
});

exports.upload = (file, folder) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.upload(
      file,
      {
        resource_type: "auto",
        folder,
        type: "upload",
      },
      (error, result) => {
        if (error) {
          console.log(error);
          
          reject(error);
        } else {
          resolve({
            imageURL: result.secure_url,
            imageID: result.public_id,
          });
        }
      }
    );
  });
};

exports.delete = (publicId) => {
  return new Promise((resolve, reject) => {
    cloudinary.uploader.destroy(publicId, (error, result) => {
      if (error) {
        console.error(`Error deleting image with publicId ${publicId}:`, error);
        reject(error);
      } else {
        console.log(`Successfully deleted image with publicId: ${publicId}`);
        resolve(result);
      }
    });
  });
};