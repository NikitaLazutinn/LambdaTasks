import { google } from 'googleapis';
import fs from 'fs';
import inquirer from 'inquirer';

const SCOPES = ['https://www.googleapis.com/auth/drive.file'];
const TOKEN_PATH = 'token.json';


async function authenticate() {
  const content = fs.readFileSync('credentials.json');
  const credentials = JSON.parse(content);

  const { client_secret, client_id, redirect_uris } = credentials.installed;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);

  try {
    const token = fs.readFileSync(TOKEN_PATH);
    oAuth2Client.setCredentials(JSON.parse(token));
  } catch (err) {
    await getNewToken(oAuth2Client);
  }

  return oAuth2Client;
}


async function getNewToken(oAuth2Client) {
  const authUrl = oAuth2Client.generateAuthUrl({
    access_type: 'offline',
    scope: SCOPES,
  });

  console.log('It looks like you are using this program for the first time. The program requires permission to make changes to your Google drive.\n Authorize this app by visiting this URL:', authUrl);
  const { code } = await inquirer.prompt([{ type: 'input', name: 'code', message: 'Enter the code from that page here:' }]);
  const { tokens } = await oAuth2Client.getToken(code);
  oAuth2Client.setCredentials(tokens);
  fs.writeFileSync(TOKEN_PATH, JSON.stringify(tokens));
  return oAuth2Client;
}


async function uploadFile(auth, filePath, folderId, fileName) {
  const drive = google.drive({ version: 'v3', auth });

  const fileMetadata = {
    name: fileName,
    parents: [folderId],
  };

  const media = {
    mimeType: 'image/jpeg', 
    body: fs.createReadStream(filePath),
  };

  const res = await drive.files.create({
    resource: fileMetadata,
    media: media,
    fields: 'id',
  });

  return res.data.id;
}

export { authenticate, uploadFile };
