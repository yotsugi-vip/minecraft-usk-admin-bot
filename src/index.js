const { Client, GatewayIntentBits, Events, REST, Routes } = require('discord.js');
require('dotenv').config();

const client = new Client({ intents: [GatewayIntentBits.Guilds] });
const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_API);

const commands = [
    {
        name: 'wakeup',
        description: 'サーバーを起動します',
    },
    {
        name: 'shutdown',
        description: 'サーバーをシャットダウンします'
    },
    {
        name: 'ip',
        description: 'サーバーのIPアドレスを表示します'
    }
];

client.once(Events.ClientReady, c => {
    console.log(`Ready! Logged in as ${c.user.tag}`);
});

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    if (interaction.commandName === 'wakeup') {
        await interaction.reply('サーバーを起動しています。。。');
    }

    if (interaction.commandName === 'shutdown') {
        await interaction.reply('サーバーをシャットダウンしています。。。');
    }

    if (interaction.commandName === 'ip') {
        await interaction.reply('サーバーIPは 000.000.0000 です');
    }
});

const deployCommands = async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(
            Routes.applicationGuildCommands(process.env.CLIENT_ID, process.env.GUILD_ID),
            { body: commands },
        );

        console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
        // And of course, make sure you catch and log any errors!
        console.error(error);
    }
};


deployCommands().then(() => {
    console.log('deployed commands');
});

client.login(process.env.DISCORD_API);