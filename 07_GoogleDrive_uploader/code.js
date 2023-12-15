import path from 'path';
import inquirer from 'inquirer';
import { authenticate, uploadFile } from './googleDrive.js';
import axios from 'axios';

const uploadFolderId = 'Your_folder_id';

const tinyUrlApiEndpoint = 'your_Tinyurl_API_token(POST)';

async function main() {
  try {
    
    const auth = await authenticate();

    
    const { imagePath, rename } = await inquirer.prompt([
      {
        type: 'input',
        name: 'imagePath',
        message: 'Drag and drop an image:',
      },
      {
        type: 'confirm',
        name: 'rename',
        message: 'Do you want to rename the image?',
        default: false,
      },
    ]);

    
    const fileName = path.basename(imagePath);
    const fileExt = path.extname(imagePath);

    
    const newFileName = rename
      ? (await inquirer.prompt({
          type: 'input',
          name: 'newFileName',
          message: 'Enter the new file name:',
        })).newFileName + fileExt
      : fileName;

    
    const fileId = await uploadFile(auth, imagePath, uploadFolderId, newFileName);
    console.log(`Image uploaded to Google Drive with file ID: ${fileId}`);

    
    const fileUrl = `https://drive.google.com/uc?id=${fileId}`;
    console.log(fileUrl);
    const response = await axios.post(tinyUrlApiEndpoint, {
      url: fileUrl,
    });
    const shortUrl = response.data.data.tiny_url;
    console.log(`Shortened URL: ${shortUrl}`);
  } catch (error) {
    console.error('Error:', error.message);
  }
}


main();
