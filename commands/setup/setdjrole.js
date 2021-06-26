const db = require("quick.db");
module.exports = {
 meta: {
     name: "setdjrole",
     aliases: ["djrole", "setdj"],
     usage: '[@role]',
     description: "Postavite dj role",
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

  let djrole = message.mentions.roles.first();

  if (args[0] === "reset" || args[0] === "delete" || args[0] === "none") {
        message.channel.send(
new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Set DJ Role`, scope.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.yes} Resetovali ste DJ Role.`)
      .setColor(cfg.colors.yes)
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp());
    db.delete(`${message.guild.id}_djrole`);
    return;
  }

  if (!djrole) {
        message.channel.send(
new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Set DJ Role`, scope.user.displayAvatarURL())
      .setDescription(
        `${cfg.emojis.no} Morate tagovati role koji želite.\n${cfg.emojis.yes} Koristite: **${prefix}setdjrole @role**`
      )
      .setColor(cfg.colors.no)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setTimestamp());
    return;
  }

  let djroleid = djrole.id;
  let djroleTag = `<@&${djroleid}>`;

  db.set(`${message.guild.id}_djrole`, djroleid);

  message.channel.send(
new Discord.MessageEmbed()
    .setAuthor(`${scope.user.username} - Set DJ Role`, scope.user.displayAvatarURL())
    .setDescription(
      `${cfg.emojis.yes} Postavili ste <@&${djroleid}> kao **DJ** role!`
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
    .setAuthor(`${message.guild} | 🎵 DJ Role`, message.guild.iconURL())
    .addField(`${cfg.emojis.arrow} ` + " Promenio/la", message.author)
    .addField(`${cfg.emojis.arrow} ` + " Novi Role", djroleTag)
    .addField(`${cfg.emojis.arrow} ` + " Kanal", message.channel)
    .setColor(cfg.colors.main)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setThumbnail(message.author.avatarURL())
    .setTimestamp());
      
  }
}