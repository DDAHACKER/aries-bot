const ytdl = require('ytdl-core');
module.exports.run = async (bot,message,args,ops) => {
  if(!ops.modRole) return;
  if(!message.member.voiceChannel) return message.channel.send("You must be connected to a voice channel!").then(m=>m.delete(7500));
  if(message.guild.me.voiceChannel) return message.channel.send("I am already connect to a different channel!").then(m=>m.delete(7500));
  if(!args[0]) return message.channel.send("You must provide a link to play").then(m=>m.delete(7500));
  let validate = await ytdl.validateURL(args[0]);
  if(!validate) return message.channel.send("You must provide a valid link!").then(m=>m.delete(7500));
  let info = await ytdl.getInfo(args[0]);
  let connection = await message.member.voiceChannel.join();
  let dispatcher = await connection.playStream(ytdl(args[0], {filter:'audioonly'}));
  message.channel.send(`**Now Playing: ** ${info.title}`);
}
