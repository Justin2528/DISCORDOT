var Discord = require('discord.js');
    var osu = require('os-utils');
    var os = require('os');
    var cpu = require('windows-cpu')
    var platform = require('platform')
    var prettyMs = require('pretty-ms');

module.exports.run = async (bot, message, args) => {



    let FooterHinami = [
        `${bot.user.username} is here to support!`,
        `${bot.user.username} brought some coffee!`,
        `${bot.user.username} is providing any assistance when ready`,
        `${bot.user.username} is stalking you`,
        `${bot.user.username} is accepting your support..\nTreat ${bot.user.username} well or she will haunt you.`
      ]
      try {
        cpu.cpuInfo().then(cpus => {        })
        let cpus = await cpu.cpuInfo();
        let datainfoEmbed = new Discord.RichEmbed(message)
        .setAuthor(bot.user.username, bot.user.avatarURL)
        .setFooter(FooterHinami[Math.floor(Math.random() * FooterHinami.length)])
        .setColor(0x0000ff)
        .addField("Neural Network Terminal [NNL]", "Statics for the server as well as the server I am being run on!\n Yay for me to exist & to serve Coffee!", false)
        .addField("Total Memory", `${(os.totalmem() / 1024 / 1024).toFixed(2)} MB`, true)
        .addBlankField(true)
        .addField("CPU Usage", `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`, true)
        .addField("Current System CPU", `${cpus}`, true)
        .addBlankField(true)
        .addField(`Users Logged`, `${bot.users.size}`, true)
        .addField(`Servers Logged`, `${bot.guilds.size}`, true)
        .addField(`Channels Logged`, `${bot.channels.size}`, true)
        .addField(`Current Operating System`, `${platform.os}`, true)
        .addField(`Hinami System Time`, `${prettyMs(osu.processUptime())}`, true)
        .addField(`Datacentre Server Time`, `${prettyMs(osu.sysUptime())}`, true)
        message.channel.send(datainfoEmbed)

      } catch (err) {console.log("Error With Stats - Please see below\n"+err)}

}

module.exports.help = {
  name: "serverstats"
}
