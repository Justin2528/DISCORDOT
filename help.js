const Discord = require("discord.js")

module.exports.run = async (bot, message, args) => {
  let help = new Discord.RichEmbed()
  .setTitle("Command List")
  .setDescription("Bot made by JuStIn2528#2211")
  .setColor("#bc0000")
  .addField(":exclamation:|", "Over 15 commands!")
  .addField(":x:|", "24/7")
  .addField(":white_check_mark:", "All Commands Are For Everyone!")
  .addField(":warning:", "This bot is just for fun, there has secret command! but it's not release... so don't try to use it!")
  .addField("Pickle Music|", "play [YT link] :white_check_mark:             stop :white_check_mark:          skip :x:")
  .addField("Pickle useful|", "ping :white_check_mark:         help :white_check_mark:            helpprivate :white_check_mark:")
  .addField("Pickle Fun|", "meme :white_check_mark:              A :white_check_mark:             rolldice :white_check_mark:      vote [something] :white_check_mark:")
  .addField("{Pickle} Code|", "npm [package] :white_check_mark:")
  .addField("Pickle Update|", "invitestats :white_check_mark:                 server :white_check_mark:                 serverstats :white_check_mark:")
  .addField("Pickle real life|", `translate (lang) (word)        weather (where) :white_check_mark:             math (QUICK MATH i mean the math) :white_check_mark:`)
  .addField("invite bot!", " https://discordapp.com/oauth2/authorize?client_id=459736331166154752&scope=bot&permissions=2146958591")
  message.channel.send(help).then(message.react('✅'));


}
module.exports.help = {
  name: "help"
}
