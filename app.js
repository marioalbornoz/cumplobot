const { Telegraf } = require('telegraf')
const { message } = require('telegraf/filters')



const axios = require('axios');

let config = {
  method: 'get',
  maxBodyLength: Infinity,
  url: 'https://api-global.cumplo.com/operaciones/vitrina/CL',
  headers: { }
};

async function makeRequest() {
  try {
    const response = await axios.request(config);
    return response.data
  }
  catch (error) {
    console.log(error);
  }
}




const bot = new Telegraf("7017885521:AAEfaCijYWAfDfINUDIafd6T6bpfAqGiFJs")
bot.start((ctx) => { 
    ctx.reply('Hola mundo!');
    makeRequest().then(data => ctx.reply(JSON.stringify(data.data[0])));
    

 })
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on(message('sticker'), (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))