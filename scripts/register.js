// @ts-check

require('dotenv').config();

const fs = require('fs');
const readline = require('readline');
const path = require('path');
const {REST} = require('@discordjs/rest');
const {Routes} = require('discord-api-types/v9');

const CLIENT_ID = process.env.CLIENT_ID;

const rest = new REST({version: '9'}).setToken(process.env.TOKEN);

const commandsFile = fs.readFileSync(path.join(__dirname, 'commands.json'));
const serversFile = readline.createInterface({
    input: fs.createReadStream(path.join(__dirname, 'servers.txt')),
    output: process.stdout,
    terminal: false,
});
const commands = JSON.parse(commandsFile.toString())['commands'];
const servers = [];


serversFile.on('line', (text) => {
    servers.push(parseInt(text));
}).on('close', async () => {
    try {
        console.log('Started refreshing application (/) commands.');

        for (const server of servers) {
            await rest.put(
                Routes.applicationGuildCommands(CLIENT_ID, server),
                {body: commands},
            );
        }
        console.log('Successfully reloaded application (/) commands.');
    } catch (error) {
        console.error(error);
    }
});
