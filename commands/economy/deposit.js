const db = require("quick.db");
const ms = require('parse-ms');
module.exports = {
 meta: {
     name: "deposit",
     aliases: ["dep", "d"],
     usage: '[all | novac]',
     description: "Prebacujete novac u banku",
     hasArgs: false,
     category: "economy",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
      
        let user = message.author;

        let member = db.fetch(`money_${message.guild.id}_${user.id}`);
        let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`);
      
        if (args[0] == "all") {
          let money = await db.fetch(`money_${message.guild.id}_${user.id}`);
          let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`);
      if(money === null) money = 0
          if (money === 0) return message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Deposit`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.no} Nemate novca u novčaniku.`)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
          );
      
          db.add(`bank_${message.guild.id}_${user.id}`, money);
          db.subtract(`money_${message.guild.id}_${user.id}`, money);
          message.channel.send(
            new Discord.MessageEmbed()

            .setAuthor(`${scope.user.username} - Deposit`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.yes} Ostavili ste **$${money.toLocaleString()}** u banku.`)
            .setColor(cfg.colors.yes)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
          );
        } else {

          let prefix = await db.fetch(`newprefix_${message.guild.id}`)
          if(prefix === null) prefix = '.'

          if (!args[0]) {
            return message.channel.send(
                new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Deposit`, scope.user.displayAvatarURL())
            .setDescription(
              `${cfg.emojis.no} Morate uneti određenu cifru. \n${cfg.emojis.yes} Koristite: ${prefix}deposit \`[all | novac]\``)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            ).catch(err => console.log(err));
          }
      
          if (message.content.includes("-")) {
            return message.channel.send(
                new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Deposit`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.no} Nemate toliko novca u novčaniku.`)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            );
          }

          if (member < args[0]) {
            return message.channel.send(
                new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Deposit`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.no} Nemate toliko novca u novčaniku.`)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            );
          }
      
          message.channel.send(
            new Discord.MessageEmbed()
            
            .setAuthor(`${scope.user.username} - Deposit`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.yes} Ostavili ste **$${args[0].toLocaleString()}** u banku.`)
            .setColor(cfg.colors.yes)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
          );

          db.add(`bank_${message.guild.id}_${user.id}`, args[0]);
          db.subtract(`money_${message.guild.id}_${user.id}`, args[0]);
        };

  }
} 