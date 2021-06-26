const db = require("quick.db");
module.exports = {
 meta: {
     name: "leavemessage",
     aliases: ["setlm", "setleavemessage"],
     usage: '[message]',
     description: "Postavite leave poruku",
     hasArgs: true,
     category: "setup",
     devOnly: false,
     perms: {
        require: true,
        permissions: ["ADMINISTRATOR"]
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {

  let prefix = await db.fetch(`newprefix_${message.guild.id}`);
  if (prefix === null) prefix = ".";

  let channel = db.fetch(`leavechannel_${message.guild.id}`);
  if (channel === null) {
    return message.channel.send(
new Discord.MessageEmbed()
    .setAuthor(`${scope.user.username} - Leave Message`, scope.user.displayAvatarURL())
    .setDescription(
      `${cfg.emojis.no} Prvo morate postaviti **leave** kanal. \n${cfg.emojis.yes} Koristite: **${prefix}setleavechannel <kanal>**`
    )
    .setColor(cfg.colors.no)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setTimestamp());
  }


  let logs = db.fetch(`lchannel_${message.guild.id}`);
  if (logs === null) {
return;
}
 
  const modlog = scope.channels.cache.get(logs.id);

  if (modlog === null) {
    return;
  }

  let LeaveMessage = args.join(" ");
  if (!LeaveMessage) {
    message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Leave Message`, scope.user.displayAvatarURL())

      .setDescription(
        `${cfg.emojis.no} Morate uneti poruku! \n${cfg.emojis.yes} Koristite: **${prefix}leavemessage <poruka>**`
      )
      .setColor(cfg.colors.no)
      .setTimestamp()
      .setFooter(message.member.displayName, message.author.displayAvatarURL()));
    return;
  }

  db.set(`leavemessage_${message.guild.id}`, LeaveMessage);


  if (LeaveMessage === "reset" || args[0] === "delete" || args[0] === "none") {
    message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Leave Message`, scope.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.yes} Resetovali ste **leave** poruku.`)
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setColor(cfg.emojis.yes)
      .setTimestamp());
    return;
  }

  message.channel.send(
  new Discord.MessageEmbed()
    .setAuthor(`${scope.user.username} - Leave Message`, scope.user.displayAvatarURL())
    .setDescription(
      `${cfg.emojis.arrow} Postavili ste leave poruku. \n${cfg.emojis.arrow} Poruka: ${LeaveMessage} \n\n${cfg.emojis.arrow} Ako želite da resetujete poruku\n${cfg.emojis.arrow} Koristite: **${prefix}leavemessage <reset/delete/none>**`
    )

    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setColor(cfg.emojis.main)
    .setTimestamp())

  modlog.send(
    new Discord.MessageEmbed()
    .setAuthor(`${message.guild} | Leave Message`, message.guild.iconURL())
    .addField(`${cfg.emojis.arrow} ` + "Promenio/la", message.author)
    .addField(`${cfg.emojis.arrow} ` + " Poruka", LeaveMessage)
    .addField(`${cfg.emojis.arrow} ` + " Kanal", message.channel)
    .setColor(cfg.colors.main)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()
  );
      
  }
}