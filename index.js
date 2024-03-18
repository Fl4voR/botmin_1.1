require('dotenv').config()
const { Bot, Keyboard, InlineKeyboard, GrammyError, HttpError } = require('grammy');
const {hydrate } = require('@grammyjs/hydrate')
const bot = new Bot(process.env.BOT_API_KEY)

bot.use(hydrate());



// bot.api.setMyCommands([{
//     command: 'start', description:'запуск бота'
    
// }
// ])




const linkArray =  [
    'https://ibb.co/8mCPz7q',
    'https://ibb.co/9GkvyVy',
    'https://ibb.co/k5mbsgz',
    'https://ibb.co/2WTtW0g',
    'https://ibb.co/8mCPz7q',
    'https://ibb.co/0h6jv9x',
    'https://ibb.co/g70nLzX',
    'https://ibb.co/5W3Xbfs',
    'https://ibb.co/Jtr8JLp',
    'https://ibb.co/ss77Pqh',
    'https://ibb.co/mzzyS6N',
    'https://ibb.co/zWvMnQf',
    'https://ibb.co/Jtr8JLp',
    'https://ibb.co/CQg6t6L',
    'https://ibb.co/qW02h7t',
    'https://ibb.co/zWvMnQf',
    'https://ibb.co/k5mbsgz',
    'https://ibb.co/YN2m4Dw',
    'https://ibb.co/j3MmTyx',
    'https://ibb.co/9GkvyVy',
    'https://ibb.co/q7V4Kgn',
    'https://ibb.co/tK5X76c',
    'https://ibb.co/CP84CRd',
    'https://ibb.co/7NSTQ1K',
    'https://ibb.co/F0JGZbz',
    'https://ibb.co/PzgGVpR',
    'https://ibb.co/FxL7tQ0',
    'https://ibb.co/5nfLWNd',
    'https://ibb.co/wzn54V1',
    'https://ibb.co/jLCvrWm',
    'https://ibb.co/PMcw0Vz',

  ];
  






bot.command('start', async (ctx) => {
    isRegistered = false;
    const inlineKeyboard = new InlineKeyboard()
        .text('РЕГИСТРАЦИЯ', 'GetRegister');
    await ctx.replyWithPhoto('https://i.ytimg.com/vi/D4BORFJpqa0/maxresdefault.jpg');
    await ctx.reply('Добро пожаловать в 💎MINES V2💎 \n\n💣 Mines - это гэмблинг игра в букмекерской конторе \"1WIN\", которая основывается на классическом “Сапёре”.\nВаша цель - открывать безопасные ячейки и не попадаться в ловушки.\n\nНаш бот основан на нейросети от Bitsgap \nОн может предугадать расположение звёзд с вероятностью 87%.', {
        reply_markup: inlineKeyboard
    });
  });



  bot.on('callback_query:data', async (ctx) => {
    if (ctx.callbackQuery.data === 'GetRegister') {
        const inlineKeyboard = new InlineKeyboard().text('ПРОВЕРИТЬ ID', 'CheckId');
        await ctx.replyWithPhoto('https://postimg.cc/BjdJzX6S');
        await ctx.reply('1. Для начала зарегистрируйтесь по ссылке на сайте 1WIN (CLICK) (https://1wgtqa.life/v3/landing-page/casino#uihs)\n2. После успешной регистрации cкопируйте ваш айди на сайте (Вкладка \'пополнение\' и в правом верхнем углу будет ваш ID).\n3. После нажмите на кнопку "проверить id" и напишите свой id', {
            reply_markup: inlineKeyboard
        });
    }
    else if (ctx.callbackQuery.data === 'CheckId') {
        isRegistered = true;
    }
  
    if (ctx.callbackQuery.data === 'GetSignal') {
        const SignalKeyboard = new InlineKeyboard()
        .text('ПОЛУЧИТЬ СИГНАЛ','GetSignalGlav');
    
        const randomIndex = Math.floor(Math.random() * linkArray.length);
        // Get the random link from the array
        const randomLink = linkArray[randomIndex];
        await ctx.replyWithPhoto(randomLink, {
          reply_markup: SignalKeyboard
        });
      }





      if (ctx.callbackQuery.data === 'GetSignalGlav') {
        const SignalKeyboard = new InlineKeyboard().text('ПОЛУЧИТЬ СИГНАЛ', 'GetSignalGlav');
        
        // Удаление предыдущего сообщения
        if (ctx.msg.message_id) {
            await ctx.api.deleteMessage(ctx.msg.chat.id, ctx.msg.message_id);
        }
    
        // Имитация загрузки в процентах с отображением прогресса
        let statusMessage = await ctx.reply(`Загрузка: 1%`);
    
        for (let i = 2; i <= 100; i += 10) {
            // Генерация случайного значения прогресса между i-10% и i%
            const randomProgress = Math.floor(Math.random() * 11 + (i > 10 ? i - 10 : 0));
            
            await ctx.api.sendChatAction(ctx.msg.chat.id, 'upload_photo', { progress: randomProgress });
            await new Promise(resolve => setTimeout(resolve, 500));
            await statusMessage.editText(`Загрузка: ${randomProgress}%`).catch(() => {});;
        }
    
         await statusMessage.editText("Готово!");

         setTimeout(() => statusMessage.delete().catch(() => {}), 500);

    
        // Удаление сообщения "Done!" через 2 секунды
    
    
        // Отображение прогресса загрузки в чате с отправкой сообщения с фото
        const randomIndex = Math.floor(Math.random() * linkArray.length);
        const randomLink = linkArray[randomIndex];
    
        // Отправка нового сообщения с фото и клавиатурой
        const newStatusMessage = await ctx.replyWithPhoto(randomLink, {
            reply_markup: SignalKeyboard
        });
    

    
        // Остановка имитации загрузки
        await ctx.api.sendChatAction(ctx.msg.chat.id, 'typing');
    }








  });


  let isRegistered = false;

  bot.hears(/.*/, async function registrationHandler(ctx) {
    const SignalKeyboard = new InlineKeyboard()
    .text('ПОЛУЧИТЬ СИГНАЛ','GetSignal');
    if (isRegistered) {
        
        if (ctx.message.text.length !== 8 || !/^\d+$/.test(ctx.message.text)) {
            await ctx.reply('Неверный формат регистрационного номера, регистрация не пройдена');
        } else {
            await ctx.reply('Регистрация прошла успешно', {
              
                reply_markup: SignalKeyboard
                
            });
            isRegistered = false;
        }
    }
  });










//   bot.on("message", async (ctx) => {
//     const statusMessage = await ctx.reply("Processing");
//     // await doWork(ctx.msg.photo); // some long image processing
//     await statusMessage.editText("Done!"); // so easy!
//     setTimeout(() => statusMessage.delete().catch(() => {}), 3000);
//   });







  bot.catch((err) => {
    const ctx = err.ctx;
    console.error(`Error while handling update ${ctx.update.update_id}:`);
    const e = err.error;
    if (e instanceof GrammyError) {
      console.error("Error in request:", e.description);
    } else if (e instanceof HttpError) {
      console.error("Could not contact Telegram:", e);
    } else {
      console.error("Unknown error:", e);
    }
  });

bot.start()