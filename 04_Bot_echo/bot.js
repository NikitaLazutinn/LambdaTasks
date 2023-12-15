const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios');

const token = 'token';
const bot = new TelegramBot(token, { polling: true });

bot.on('message', async (msg) => {
    const chatId = msg.chat.id;
    const messageText = msg.text.toLowerCase();
    const userName = msg.from.first_name + " " + msg.from.last_name;

    console.log(`user ${userName} entered: ${msg.text}`);

    if (messageText.includes('photo')) {

            const response = await axios.get('https://picsum.photos/200/300', { responseType: 'arraybuffer' });
     
            await bot.sendPhoto(chatId, Buffer.from(response.data));
    } else {
      
        bot.sendMessage(chatId, `You said: ${msg.text}`);
    }
});

