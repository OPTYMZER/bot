const db = require("quick.db");
module.exports = {
 meta: {
     name: "setlogchannel",
     aliases: ["setlog", "setlogs"],
     usage: '[#kanal]',
     description: "Postavite kanal za logove",
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
      .setAuthor(`${scope.user.username} - Set Logs`, scope.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.yes} Resetovali ste kanal za logove.`)
      .setColor(cfg.colors.yes)
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp()
    );
    db.delete(`logschannel_${message.guild.id}`);
    return;
  }
 


  let channel = message.mentions.channels.first();

  if (!channel) {
    return message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Set Logs`, scope.user.displayAvatarURL())
      .setDescription(
        `${cfg.emojis.no} Morate tagovati kanal.\n${cfg.emojis.arrow} Koristite: ${prefix}setlogchannel \`[#kanal]\``
      )
      .setColor(cfg.colors.no)
      .setFooter(message.member.displayName, message.author.displayAvatarURL())
      .setTimestamp()
    );
  }

      let PostavljenKanal = db.fetch(`logschannel_${message.guild.id}`)
             if(PostavljenKanal !== null) { 
return message.channel.send(new Discord.MessageEmbed()
    .setAuthor(`${scope.user.username} - Set Logs`, scope.user.displayAvatarURL())
    .setDescription(
      `${cfg.emojis.no} Kanal za logove je već postavljen na ovom serveru.\n${cfg.emojis.arrow} Koristite: ${prefix}setlogchannel \`[reset | delete | none]\``
    )
    .setColor(cfg.colors.main)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setTimestamp()
  ); 
}

  db.set(`logschannel_${message.guild.id}`, channel);
  message.channel.send(
  new Discord.MessageEmbed()
    .setAuthor(`${scope.user.username} - Set Logs`, scope.user.displayAvatarURL())
    .setDescription(
      `${cfg.emojis.yes} Kanal za logove je postavljen.\n${cfg.emojis.arrow} Kanal: <#${channel.id}> \`[${channel.id}]\``
    )
    .setColor(cfg.colors.main)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setTimestamp()
  );
  }
}