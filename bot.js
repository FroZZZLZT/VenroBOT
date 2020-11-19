const { Telegraf } = require('telegraf')
const Extra = require('telegraf/extra')
const Markup = require('telegraf/markup')
const fetch = require('node-fetch');

const bot = new Telegraf('1428462356:AAGhklOGF60_ccAPeTnZenQHpC3OywRzqSM')
    //bot.start((ctx) => ctx.reply('Welcome!'))
bot.help((ctx) => ctx.reply('Send me a sticker'))
bot.on('sticker', (ctx) => ctx.reply('👍'))
bot.hears('hi', (ctx) => ctx.reply('Hey there'))
bot.launch()


bot.command('start', ({ reply }) =>
    reply('Выберите что вы хотите сделать', Markup
        .keyboard(['Накрутить', 'Баланс', 'Данные о заказах'])
        .oneTime()
        .resize()
        .extra()
    )
)
bot.hears('Накрутить', (ctx) => {
    ctx.reply('Укажите токен:');
    bot.hears(/^[0-9A-Z]+$/i, ctx => ctx.reply('Укажите id накрутки'));
})


bot.hears('Баланс', (ctx) => {

    async function getBalance() {

        let balance = await fetch('https://venro.ru/api/orders?action=balance&key=7cf3e09708bbe55eacec9da21053591f');
        let balanceContent = await balance.text()
        return ctx.reply(balanceContent)
    }
    getBalance()
})

//