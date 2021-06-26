const db = require("quick.db");
module.exports = {
 meta: {
     name: "setsupportrole",
     aliases: ["supportrole", "setsupport"],
     usage: '[@role]',
     description: "Postavite support role",
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

  let supportrole = message.mentions.roles.first();

  if (args[0] === "reset" || args[0] === "delete" || args[0] === "none") {
        message.channel.send(
new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Set Support Role`, scope.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.y} Resetovali ste Support Role.`)
      .setColor(cfg.colors.yes)
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp());
    db.delete(`${message.guild.id}_supportrole`);
    return;
  }

  if (!supportrole) {
        message.channel.send(
new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Set Support Role`, scope.user.displayAvatarURL())
      .setDescription(
        `${cfg.emojis.no} Morate tagovati role koji želite.\n${scope.y} Koristite: **${prefix}setsupportrole @role**`
      )
      .setColor(cfg.colors.no)
     .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setTimestamp());
    return;
  }

  let supportroleid = supportrole.id;
  let supportroleTag = `<@&${supportroleid}>`;

  db.set(`${message.guild.id}_supportrole`, supportroleid);

  message.channel.send(
new Discord.MessageEmbed()
    .setAuthor(`${scope.user.username} - Set Support Role`, scope.user.displayAvatarURL())
    .setDescription(
      `${cfg.emojis.yes} Postavili ste <@&${supportroleid}> kao **Support** role!`
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
    .setAuthor(`${message.guild} | 🔧 Support Role`, message.guild.iconURL())
    .addField(`${cfg.emojis.arrow} ` + " Promenio/la", message.author)
    .addField(`${cfg.emojis.arrow} ` + " Novi Role", supportroleTag)
    .addField(`${cfg.emojis.arrow} ` + " Kanal", message.channel)
    .setColor(cfg.colors.main)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setThumbnail(message.author.avatarURL())
    .setTimestamp());
      
  }
}