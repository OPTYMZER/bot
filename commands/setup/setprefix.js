const db = require("quick.db");
module.exports = {
 meta: {
     name: "setprefix",
     aliases: ["prefix", "newprefix"],
     usage: '[prefix]',
     description: "Postavite server prefix",
     hasArgs: true,
     category: "setup",
     devOnly: false,
     perms: {
        require: true,
        permissions: ["MANAGE_SERVER"]
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
  let prefix = await db.fetch(`newprefix_${message.guild.id}`);
  if (prefix === null) prefix = ".";

  if (!args[0]) {
    return message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - SetPrefix`, scope.user.displayAvatarURL())
      .setDescription(
        `${cfg.emojis.no} Morate uneti željeni prefix.\n${cfg.emojis.arrow} Koristite: ${prefix}setprefix \`[prefix]\``
      )
      .setColor(cfg.colors.no)
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp()
    );
  }
   if (args[0] === "reset" || args[0] === "delete" || args[0] === "default") {
    message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - SetPrefix`, scope.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.yes} Postavili ste server prefix na **default**`)
      .setColor(cfg.colors.yes)
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp()
    );
    db.delete(`newprefix_${message.guild.id}`);
    return;
  }

      let PostavljenPrefix = db.fetch(`newprefix_${message.guild.id}`)
             if(PostavljenPrefix !== null) { 
return message.channel.send(new Discord.MessageEmbed()
    .setAuthor(`${scope.user.username} - Set Logs`, scope.user.displayAvatarURL())
    .setDescription(
      `${cfg.emojis.no} Prefix je već postavljen na ovom serveru.\n${cfg.emojis.arrow} Koristite: ${prefix}setprefix \`[reset | delete | default]\``
    )
    .setColor(cfg.colors.main)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setTimestamp()
  ); 
}

 db.set(`newprefix_${message.guild.id}`, args.join("  "));
  message.channel.send(
  new Discord.MessageEmbed()
    .setAuthor(`${scope.user.username} - Set Logs`, scope.user.displayAvatarURL())
    .setDescription(
      `${cfg.emojis.yes} Promenili ste server prefix.\n${cfg.emojis.arrow} Prefix: \`${args.join("  ")}\``
    )
    .setColor(cfg.colors.main)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setTimestamp()
  );
}
}