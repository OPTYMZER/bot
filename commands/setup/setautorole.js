const db = require("quick.db");
module.exports = {
 meta: {
     name: "setautorole",
     aliases: ["autorole", "setrole"],
     usage: '[@role]',
     description: "Postavite auto role",
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

   if (args[0] === "reset" || args[0] === "delete" || args[0] === "none") {
    message.channel.send(
new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Set Auto Role`, scope.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.yes} Resetovali ste AutoRole.`)
      .setColor(cfg.colors.yes)
      .setTimestamp());
    db.delete(`${message.guild.id}_arole`);
    return;
  }

  let role = message.mentions.roles.first();
  if (!role) {
    message.channel.send(
new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Set Auto Role`, scope.user.displayAvatarURL())
      .setDescription(
        `${cfg.emojis.no} Morate tagovati role koji želite.\n${cfg.emojis.yes} Koristite: **${prefix}setautorole @role**`
      )
      .setColor(scope.no)
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp());
    return;
  }

  let roleID = role.id;

  db.set(`${message.guild.id}_arole`, roleID);
      
  message.channel.send(
new Discord.MessageEmbed()
    .setAuthor(`${scope.user.username} - Set Auto Role`, scope.user.displayAvatarURL())
    .setDescription(`${cfg.emojis.yes} Postavili ste autorole u <@&${roleID}>`)
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
    .setAuthor(`${message.guild} | 👥 AutoRole`, message.guild.iconURL())
    .addField(`${cfg.emojis.arrow} ` + " Promenio/la", message.author)
    .addField(`${cfg.emojis.arrow} ` + " Novi Role", role)
    .addField(`${cfg.emojis.arrow} ` + " Kanal", message.channel)
    .setColor(cfg.emojis.main)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setThumbnail(message.author.avatarURL())
    .setTimestamp());
      
  }
}