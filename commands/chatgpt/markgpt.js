const { SlashCommandBuilder } = require('discord.js')
const { Configuration, OpenAIApi } = require('openai')
const { chatgpt } = require('../../config.json')

const configuration = new Configuration({
  apiKey: chatgpt,
})
const openai = new OpenAIApi(configuration)

module.exports = {
  data: new SlashCommandBuilder()
    .setName('markgpt')
    .setDescription('chat gpt interface')
    .addStringOption((option) =>
      option
        .setName('prompt')
        .setDescription('prompt to be sent to chat gpt')
        .setRequired(true)
    ),
  async execute(interaction) {
    try {
      const prompt = interaction.options.getString('prompt')

      await interaction.deferReply()

      const completion = await openai.createCompletion({
        model: 'text-davinci-003',
        max_tokens: 1000,
        prompt,
      })

      await interaction.editReply(prompt + completion.data.choices[0].text)
    } catch (error) {
      if (error.response) {
        console.log(error.response.status)
        console.log(error.response.data)
      } else {
        console.log(error.message)
      }
    }
  },
}
