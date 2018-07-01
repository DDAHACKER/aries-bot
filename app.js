const Discord = require('discord.js');
const fs = require('fs');
const ms = require('ms');
//const moment = require('moment');
const bot = new Discord.Client();
const config = require('./config.json');
let prefix = config.prefix;
bot.on("ready", async() => {
  console.log("I'm online!");
  try{
    let link = await bot.generateInvite(["ADMINISTRATOR"]);
    console.log(link);
  }catch(e){
    console.log(e.stack);
  }
});
bot.on("message", async message => {
  let msg = message.content.toLowerCase();
  let args = message.content.slice(prefix.length).trim().split();
  let cmd = args.shift.toLowerCase();
  if(message.author.bot) return;
  if(msg.startsWith(prefix)) return;
  try{
    let ops = {
      prefix:config.prefix,
      modRole:message.member.roles.find("name", "=>")
    }
    let commandFile = require(`./commands/${cmd}.js`);
    commandFile.run(bot,message,args,ops);
  }catch(e){
    console.log(e.stack);
  }
});
bot.login(process.env.TOKEN);
