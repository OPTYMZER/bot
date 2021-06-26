const db = require("quick.db");
module.exports = {
 meta: {
     name: "withdraw",
     aliases: ["wd", "w"],
     usage: '[all | novac]',
     description: "Uzimate pare iz banke",
     hasArgs: false,
     category: "economy",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
      
        let user = message.author;

        let member = db.fetch(`money_${message.guild.id}_${user.id}`)
        let member2 = db.fetch(`bank_${message.guild.id}_${user.id}`)
      
       let prefix = db.get(`newprefix_${message.guild.id}`)
       if(prefix === null) prefix = '.'
      
        if (args[0] == 'all') {

          let money = await db.fetch(`bank_${message.guild.id}_${user.id}`)
          if(money === null) money = 0
          if(money === 0) return message.channel.send(
            new Discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Withdraw`, scope.user.displayAvatarURL())
        .setDescription(`${cfg.emojis.no} Nemate novca u banci.`)
        .setColor(cfg.colors.no)
        .setTimestamp()
        .setFooter(message.member.displayName, message.author.displayAvatarURL())
        )
          db.subtract(`bank_${message.guild.id}_${user.id}`, money)
          db.add(`money_${message.guild.id}_${user.id}`, money)

        message.channel.send(
            new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Withdraw`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.yes} Podigli ste **$${member2}** iz banke.`)
          .setColor(cfg.colors.yes)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        )
        
        } else {
        
        if (!args[0]) {
            return message.channel.send(
                new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Withdraw`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.no} Morate uneti određenu cifru. \n${cfg.emojis.arrow} Koristite: ${prefix}withdraw \`[all | novac]\``)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            )
        }
  
        if (message.content.includes('-')) { 
        return message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Withdraw`, scope.user.displayAvatarURL())
        .setDescription(`${cfg.emojis.no} Nemate toliko novca u banci.`)
        .setColor(cfg.colors.no)
        .setTimestamp()
        .setFooter(message.member.displayName, message.author.displayAvatarURL())
            )
        }
      
      
        if (member2 < args[0]) {
            return message.channel.send(
                new Discord.MessageEmbed()
              .setAuthor(`${scope.user.username} - Withdraw`, scope.user.displayAvatarURL())
              .setDescription(`${cfg.emojis.no} Nemate toliko novca u banci.`)
              .setColor(cfg.colors.no)
              .setTimestamp()
              .setFooter(message.member.displayName, message.author.displayAvatarURL())
            )
        }
      

        let embed5 = new Discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Withdraw`, scope.user.displayAvatarURL())
        .setDescription(`${cfg.emojis.yes} Podigli ste **$${args[0]}** iz banke.`)
        .setColor(cfg.colors.yes)
        .setTimestamp()
        .setFooter(message.member.displayName, message.author.displayAvatarURL())
        message.channel.send(embed5)
        db.subtract(`bank_${message.guild.id}_${user.id}`, args[0])
        db.add(`money_${message.guild.id}_${user.id}`, args[0])
        }

  }
} 