import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

/**
 * Upload an image to Cloudinary
 * @param {string} filePath - Path to the image file.
 * @param {Object} options - Options for uploading.
 * @param {string} [options.folder] - Folder to store the image.
 * @param {string} [options.publicId] - Custom public ID for the image.
 * @param {Object} [options.transformation] - Transformation options for the image.
 * @returns {Object} - Upload result from Cloudinary.
 */
export const uploadImageOnCloudinary = async (
  filePath,
  { folder = 'default', publicId = null, transformation = {} } = {}
) => {
  try {
    const uploadOptions = {
      folder,
      ...transformation,
    };

    if (publicId) {
      uploadOptions.public_id = publicId;
    } else {
      uploadOptions.public_id = `file_${Date.now()}`; // Default unique public ID
    }

    const uploadResult = await cloudinary.v2.uploader.upload(filePath, uploadOptions);

    console.log(`Image uploaded to Cloudinary: ${uploadResult.secure_url}`);
    return uploadResult;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error.message);
    throw new Error(`Cloudinary upload failed: ${error.message}`);
  }
};

/**
 * Delete an image from Cloudinary
 * @param {string} publicId - Public ID of the image to delete.
 * @returns {void}
 */
export const deleteImageFromCloudinary = async (publicId) => {
  try {
    const deleteResult = await cloudinary.v2.uploader.destroy(publicId);
    console.log(`Image deleted from Cloudinary: ${publicId}`);
    return deleteResult;
  } catch (error) {
    console.error(`Failed to delete image from Cloudinary: ${error.message}`);
    throw new Error(`Failed to delete image from Cloudinary: ${error.message}`);
  }
};

/**
 * Utility function to get Cloudinary URL for an image.
 * @param {string} publicId - Public ID of the image.
 * @param {Object} [options] - Options for generating the URL.
 * @returns {string} - Generated Cloudinary URL.
 */
export const getCloudinaryUrl = (publicId, options = {}) => {
  try {
    const url = cloudinary.v2.url(publicId, options);
    console.log(`Generated Cloudinary URL: ${url}`);
    return url;
  } catch (error) {
    console.error('Error generating Cloudinary URL:', error.message);
    throw new Error(`Failed to generate Cloudinary URL: ${error.message}`);
  }
};
