const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  if(message.author.id != "389428200565899264") return;
  message.react('👍').then(message.react('👎'));

}

module.exports.help = {
  name: "vote"
}
