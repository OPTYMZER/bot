const discord = require('discord.js');
const fs = require('fs');
const db = require('quick.db')
const cfg = require('../../data/config.json');

module.exports = async (scope, message) => {
  
  if(message.author.bot || message.channel.type === "dm") return;
  if (message.author.id == "528882182991904768") return;

  let prefix = await db.fetch(`newprefix_${message.guild.id}`);
  if (prefix === null) prefix = ".";
  
  let args = message.content.slice(prefix.length).trim().split(/ +/g);
  let siEmDi = args.shift().toLowerCase();
  
  if (!message.content.startsWith(prefix)) return;
  
  let komanda = scope.commands.get(siEmDi) || scope.commands.get(scope.aliases.get(siEmDi));
  if(!komanda) return;

  //let dozvolice = komanda.meta.perms.permissions.toString();
  
  if (komanda.meta.perms.require) {
  let dozvolice = komanda.meta.perms.permissions.toString();
    if (!message.member.hasPermission(komanda.meta.perms.permissions)) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setColor(cfg.colors.no)
          .setAuthor(`${scope.user.username} - ${komanda.meta.name.charAt(0).toUpperCase() + komanda.meta.name.slice(1)}`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.no} Nemate permisiju za ovu komandu.\n${cfg.emojis.arrow} Permisija: \`${dozvolice}\``)
          .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
          .setColor(cfg.colors.no)
          .setTimestamp());
    };
  };

  if (komanda.meta.hasArgs && !args.length) return message.channel.send(
    new discord.MessageEmbed()
    .setColor(cfg.colors.no)
    .setAuthor(`${scope.user.username} - ${komanda.meta.name.charAt(0).toUpperCase() + komanda.meta.name.slice(1)}`, scope.user.displayAvatarURL())
    .setDescription(`${cfg.emojis.no} Iskoristite komandu pravilno.\n${cfg.emojis.arrow} Koristite: ${prefix}${komanda.meta.name} \`${komanda.meta.usage}\``)
    .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
    .setColor(cfg.colors.no)
    .setTimestamp());
  
  if (komanda.meta.devOnly) {
  if (message.author.id !== "379738998207283209" && message.author.id !== "294225541316476928" && message.author.id !== "464744770624028692" && message.author.id !== "253932552253865985") return;
  };
  
  try {
    komanda.pokreni(scope, message, args, cfg, discord);
  } catch (error) {
    return message.channel.send(`Sjebos nesto: \n \```${error}\````);
  };
}