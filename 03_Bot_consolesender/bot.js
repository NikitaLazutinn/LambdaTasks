import TelegramBot from 'node-telegram-bot-api';
import { Command } from 'commander';

const program = new Command();
program.version('1.0.0');

const botToken = '5902059328:AAFo8reOP1v-dP0fP1TaQ2__PnCaHBsxc9g';
const bot = new TelegramBot(botToken, { polling: true });

let chatId = "0";

function processCommand(input) {
  let stringLength = input.length;
  let a = [];
  let str = "";
  for(let i = 0; i < stringLength; i++)
  {
    if(input[i] == ' ')
    {
      a.push(str);
      str = "";
      continue;
    }
      if(input[i] == '\'')
      {
          i+=1
          for(i; input[i] != '\''; i++)
          {
              str += input[i]; 
          }
          a.push(str);
          break;
      }
      str += input[i];
  }
    //console.log(a);
 // program.parse(input.split(' '));
 program.parse(a);


  program
    .command('message <text>')
    .description('Send a message to the Telegram bot')
    .action((text) => {
      bot.sendMessage(chatId, text);
    });

    program
    .command('photo <path>')
    .description('Send a photo to the Telegram bot')
    .action((path) => {
        bot.sendPhoto(chatId, path);
      
    });  
}

bot.onText(/\/start/, (msg) => {
  chatId = msg.chat.id;
  bot.sendMessage(chatId, 'Hello! I am a bot that greets you!');
  console.log('Enter your command, for example, node bot.js message text');
});


process.stdin.setEncoding('utf8');
processCommand('h');
process.stdin.on('data', (data) => {
  const input = data.trim();

  if (input == 'exit') {
    
    process.exit();
  } else {
   
    processCommand(input);
  }
});










