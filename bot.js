// @ts-check

require('dotenv').config();

const {Client, Intents} = require('discord.js');
const client = new Client({intents: [Intents.FLAGS.GUILDS]});

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('interactionCreate', async (interaction) => {
    if (!interaction.isCommand()) return;

    if (interaction.commandName === 'hello') {
        await interaction.reply(`Hello, <@${interaction.member.user.id}>`);
    }
});

client.login(process.env.TOKEN);
