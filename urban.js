const urban = require('relevant-urban'), // This is for fetching results
  Discord = require('discord.js'); // This is for forming embeds

// We can call our command handler here
module.exports.run = async (bot, message, args) => {

  // First, we need to verify that they wrote text
  if (!args[0]) return message.channel.send(`***Please specify some text!***`);
  // This will return and send a message, (args[0] is the first word after the command)

  // Now, we can fetch the word from Urbandictionary
  let res = await urban(args.join(' ')).catch(e => { // This uses await, so the response will be held in the `res` variable
    // Although, if an error is found (word not found), this .catch() will run
    return message.channel.send('***Sorry, that word was not found!***');
  });

  // Now, we can form the response embed
  let embed = new Discord.RichEmbed()
    .setColor('RANDOM') // This sets a random color each time the response is sent
    .setTitle(res.word) // The title now holds the word you fetched
    .setURL(res.urbanURL) // The title is now clickable, and leads to the urbandictionary page
    .setDescription(`**Definition:**\n*${res.definition}*\n\n**Example:**\n*${res.example}*`) // The description now holds the main response
    .addField('Author', res.author, true) // This adds an inline(by setting true) field, with the author
    .addField('Rating', `**\`Upvotes: ${res.thumbsUp} | Downvotes: ${res.thumbsDown}\`**`) // This adds an inline field, with the rating

  // There are also some optional fields(or fields that may be empty with a response)
  if (res.tags.length > 0 && res.tags.join(' ').length < 1024) {
    // This verifies that there are tags, and they dont exceed 1024 characters when joined together
    embed.addField('Tags', res.tags.join(', '), true) // This also creates an inline field holding the tags
  }

  // Now, we can send the response to chat
  message.channel.send(embed); // We can now test it!

}
module.exports.help = {
  name: "urban"
}
