const db = require("quick.db");
module.exports = {
 meta: {
     name: "setmuterole",
     aliases: ["muterole", "setmute"],
     usage: '[@role]',
     description: "Postavite mute role",
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

  let muterole = message.mentions.roles.first();

  if (args[0] === "reset" || args[0] === "delete" || args[0] === "none") {
        message.channel.send(
new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Set Mute Role`, scope.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.yes} Resetovali ste Mute Role.`)
      .setColor(cfg.colors.yes)
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp());
    db.delete(`${message.guild.id}_muterole`);
    return;
  }

  if (!muterole) {
        message.channel.send(
new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Set Mute Role`, scope.user.displayAvatarURL())
      .setDescription(
        `${cfg.emojis.no} Morate tagovati role koji želite.\n${cfg.emojis.yes} Koristite: **${prefix}setmuterole @role**`
      )
      .setColor(cfg.colors.no)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setTimestamp());
    return;
  }

  let muteroleid = muterole.id;
  let muteroleTag = `<@&${muteroleid}>`;

  db.set(`${message.guild.id}_muterole`, muteroleid);

  message.channel.send(
new Discord.MessageEmbed()
    .setAuthor(`${scope.user.username} - Set Mute Role`, scope.user.displayAvatarURL())
    .setDescription(
      `${cfg.emojis.yes} Postavili ste <@&${muteroleid}> kao **Mute** role!`
    )
    .setColor(cfg.colors.yes)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setTimestamp());

  let logs = await db.fetch(`lchannel_${message.guild.id}`);

  if (!logs) {
    return;
  }
  const modlog = scope.channels.cache.get(logs.id);
  modlog.send(
new Discord.MessageEmbed()
    .setAuthor(`${message.guild} | 🔇 Mute Role`, message.guild.iconURL())
    .addField(`${cfg.emojis.arrow} ` + " Promenio/la", message.author)
    .addField(`${cfg.emojis.arrow} ` + " Novi Role", muteroleTag)
    .addField(`${cfg.emojis.arrow} ` + " Kanal", message.channel)
    .setColor(cfg.colors.main)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setThumbnail(message.author.avatarURL())
    .setTimestamp());
      
  }
}