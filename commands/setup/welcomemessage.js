const db = require("quick.db");
module.exports = {
 meta: {
     name: "welcomemessage",
     aliases: ["setwm", "setwelcomemessage"],
     usage: '[message]',
     description: "Postavite welcome poruku",
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



  let channel = db.fetch(`welcomechannel_${message.guild.id}`);
  if (channel === null) {
        return message.channel.send(
new Discord.MessageEmbed()
    .setAuthor(`${scope.user.username} - Welcome Message`, scope.user.displayAvatarURL())
    .setDescription(
      `${cfg.emojis.no} Prvo morate postaviti **welcome** kanal. \n${cfg.emojis.yes} Koristite: **${prefix}setwelcomechannel <kanal>**`
    )
    .setColor(cfg.colors.no)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setTimestamp());
  }

  let WelcomeMessage = args.join(" ");
  if (!WelcomeMessage) {

    channel.send(
new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Welcome Message`, scope.user.displayAvatarURL())

      .setDescription(
        `> :new:・Novi Member {member.tag} \n> :globe_with_meridians:・Dobrodošao/la na {server} \n> :art:・Uzmi besplatnu ulogu u <#849416133614239765> \n> :rose:・Uživaj na serveru.**`
      )
      .setColor(cfg.colors.main)
      .setTimestamp()
      .setFooter(message.member.displayName, message.author.displayAvatarURL()));
    return;
  }

  db.set(`welcomemessage_${message.guild.id}`, WelcomeMessage);

  let logs = db.fetch(`lchannel_${message.guild.id}`);
  if (logs === null) {
    return;
  }

  const modlog = scope.channels.cache.get(logs.id);

  if (modlog === null) {
    return;
  }

 /* modlog.send(
    new Discord.MessageEmbed()
    .setAuthor(`${message.guild} | Welcome Message`, message.guild.iconURL())
    .addField(`${cfg.emojis.arrow} ` + "Promenio/la", message.author)
    .addField(`${cfg.emojis.arrow} ` + " Poruka", WelcomeMessage)
    .addField(`${cfg.emojis.arrow} ` + " Kanal", message.channel)
    .setColor(cfg.colors.main)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setThumbnail(message.author.avatarURL())
    .setTimestamp()*/
      
  }
}