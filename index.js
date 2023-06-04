const { Client, Events, GatewayIntentBits } = require('discord.js')
const { discord_token } = require('./config.json')

const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.once(Events.ClientReady, () => {
  console.log('Ready!')
})

client.login(discord_token)
