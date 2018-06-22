const botconfig = require("./botconfig.json");
const  tokenfile= require("./token.json");
const Discord  = require("discord.js");
const fs = require("fs");
const YTDL = require("ytdl-core");
const bot = new Discord.Client({disableEveryone: true});
bot.commands = new Discord.Collection();
let cooldown = new Set();
let cdseconds = 3;

fs.readdir("./commands/", (err, files) => {

  if(err) console.log(err);

  let jsfile = files.filter(f => f.split(".").pop() === "js")
  if(jsfile.length <= 0){
    console.log("Couldn't find commands.");
    return;
  }

  jsfile.forEach((f, i) => {
    let props = require(`./commands/${f}`);
    console.log(`${f} loaded!`);
    bot.commands.set(props.help.name, props);
  });

});

function play(connection, message) {
  var server = servers[message.guild.id];

  server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

  server.queue.shift();

  server.dispatcher.on("end", function() {
    if (server.queue[0]) play(connection, message);
    else connection.disconnect();
  });
}

var servers = {};

bot.on("ready", async () => {
  console.log(`${bot.user.username} is online on ${bot.guilds.size} servers!`);
  bot.user.setActivity("p.help for Command list!");

});



bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefixes = JSON.parse(fs.readFileSync("./prefixes.json", "utf8"));
  if(!prefixes[message.guild.id]){
    prefixes[message.guild.id] = {
      prefixes: botconfig.prefix
    };
  }

  let prefix = prefixes[message.guild.id].prefixes;
  if(!message.content.startsWith(prefix)) return;
  if(cooldown.has(message.author.id)){
    message.delete();
    return message.reply("You have to wait 3 second between commands.")
  }
  //if (!message.member.hasPermission("ADMINISTRATOR")){
    cooldown.add(message.author.id);
  // }


  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  let commandfile = bot.commands.get(cmd.slice(prefix.length));
  if(commandfile) commandfile.run(bot,message,args);

  setTimeout(() => {
    cooldown.delete(message.author.id)
  }, cdseconds * 1000)

   if(cmd === `${prefix}`){
     message.channel.send(`This is the prefix (  ${prefix}  ) (use ${prefix}prefix <prefix you want>) to change the prefix).`)
   }

   if (cmd === `${prefix}play`){
     if(!args[1]) {
       message.channel.send("Please provide a link!");
       return;

     }

     if (!message.member.voiceChannel) {
       message.channel.send("You must in a voice channel!");
       return;

     }

     if(!servers[message.guild.id]) servers[message.guild.id] = {
       queue: []
     };

     var server = servers[message.guild.id];

     server.queue.push(args[1]);

     if (!message.guild.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);
     });
   }

    if(cmd === `${prefix}skip`){

      var server = servers[message.guild.id];

      if (server.disconnect) server.dispatcher.end();
    }

    if(cmd === `${prefix}stop`){
      var server = servers[message.guild.id];

      if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
    }

    if(cmd === `${prefix}serverinfo`){
      let sicon = message.guild.iconURL;
      let serverembed = new Discord.RichEmbed()
      .setDescription("Server Information")
      .setAuthor(message.guild.name)
      .setColor("#4274f4")
      .setThumbnail(sicon)
      .addBlankField(true)
      .addField("Bots", `**${message.guild.members.filter(member => member.user.bot).size}**`, true)
      .addField("Humans", `**${message.guild.members.filter(member => !member.user.bot).size}**`, true)
      .addField("Member Status", `**${message.guild.members.filter(o => o.presence.status === 'online').size}** Online\n**${message.guild.members.filter(i => i.presence.status === 'idle').size}** Idle/Away\n**${message.guild.members.filter(dnd => dnd.presence.status === 'dnd').size}** Do Not Disturb\n**${message.guild.members.filter(off => off.presence.status === 'offline').size}** Offline/Invisible\n**${message.guild.members.filter(s => s.presence.status === 'streaming').size}** Streaming`)
		  .setFooter(`Owner: ${message.guild.owner.user.tag}`)
      .addField("Total Members", message.guild.memberCount);

      return message.channel.send(serverembed);
    }



    if(cmd === `${prefix}botinfo`){

      let bicon = bot.user.displayAvatarURL;
      let botembed = new Discord.RichEmbed()
      .setDescription("Bot Information")
      .setColor("#4274f4")
      .setThumbnail(bicon)
      .addField("Bot Name", bot.user.username)
      .addField("Create On", bot.user.createdAt)
      .addField("How many server the bot is in?", `The bot is in ${bot.guilds.size} servers!`);

      return message.channel.send(botembed);
    }

});

bot.token(process.env.NDU5NzM2MzMxMTY2MTU0NzUy.Dg6uIw.R6TSa4gBz7zSQokTNaibV_yBGIg)
