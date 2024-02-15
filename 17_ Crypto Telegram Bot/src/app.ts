import constants from "./constants";
import TelegramBot from 'node-telegram-bot-api';
import PriceDataService from "./services/priceDataService";
import { addCurrenciesToDb } from "./services/databaseInitializer";
import { updatePrices, deleteLegacyData } from "./services/cornTasks";


const token = constants.Token;
const bot = new TelegramBot(token, { polling: true });

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  
  const keyboard = {
    reply_markup: {
      keyboard: [
        [{ text: '/help' }],
      ],
      resize_keyboard: true,
    },
  };

  bot.sendMessage(chatId, 'Welcome to Crypto_currency_Bot!', keyboard);
});

bot.onText(/\/help/, (msg) => {
  const chatId = msg.chat.id;

  bot.sendMessage(chatId, '/listRecent - Retrieve a concise list of "hyped" cryptocurrencies.\n/{currency_symbol} - Obtain detailed information about a specific cryptocurrency.\n/addToFavourite {currency_symbol} - Add a cryptocurrency to the "favorites" section.\n/listFavourite - Return a list of favorite cryptocurrencies in the format of /listRecent\n/deleteFavourite {currency_symbol} - Remove a cryptocurrency from the favorites');
});

bot.onText(/\/listRecent/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await PriceDataService.getExchangeRates();
    bot.sendMessage(chatId, response.toString());
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'Error');
  }
});

bot.onText(/\/\{([^}]+)\}/, async(msg, match) => {
  const chatId = msg.chat.id;
  if (match) {
  const currency_symbol = match[1];
  try{
    const response = await PriceDataService.Info(currency_symbol);
    bot.sendMessage(chatId, response.toString());
    }catch(error){
      console.error(error);
      bot.sendMessage(chatId, 'Error');
    }

  } else {
    bot.sendMessage(chatId, 'Помилка: не вдалося отримати слово.');
  }


});

bot.onText(/\/addToFavourite\{([^}]+)\}/, async(msg, match) => {
  const chatId = msg.chat.id;
  if (match) {
  const currency_symbol = match[1];
  try{
    await PriceDataService.Fav(currency_symbol);
    bot.sendMessage(chatId, 'succesfully added');
    }catch(error){
      console.error(error);
      bot.sendMessage(chatId, 'Error');
    }

  } else {
    bot.sendMessage(chatId, 'Помилка: не вдалося отримати слово.');
  }


});

bot.onText(/\/deleteFavourite\{([^}]+)\}/, async(msg, match) => {
  const chatId = msg.chat.id;
  if (match) {
  const currency_symbol = match[1];
  try{
    await PriceDataService.DelFav(currency_symbol);
    bot.sendMessage(chatId, 'succesfully deleted');
    }catch(error){
      console.error(error);
      bot.sendMessage(chatId, 'Error');
    }
  } else {
    bot.sendMessage(chatId, 'Помилка: не вдалося отримати слово.');
  }

});

bot.onText(/\/listFavourite/, async (msg) => {
  const chatId = msg.chat.id;
  try {
    const response = await PriceDataService.Get();
    bot.sendMessage(chatId, response.toString());
  } catch (error) {
    console.error(error);
    bot.sendMessage(chatId, 'Error');
  }
});

addCurrenciesToDb();
updatePrices.start();
deleteLegacyData.start();

