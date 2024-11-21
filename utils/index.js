// utils.js
const extractPublicId = (fileID) => {
    if (fileID && typeof fileID === 'string') {
      return fileID.split('/').pop();
    }
    return null;
  };
  
  module.exports = { extractPublicId };
  