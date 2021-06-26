 const db = require("quick.db");
module.exports = {
 meta: {
     name: "pay",
     aliases: ["pay"],
     usage: '[osoba] | [novac]',
     description: "Šaljete korisniku novac",
     hasArgs: false,
     category: "economy",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
      
        let user = message.mentions.members.first();

        let member = db.fetch(`money_${message.guild.id}_${message.author.id}`);
      
        let prefix = await db.fetch(`newprefix_${message.guild.id}`);
        if (prefix === null) prefix = ".";
        if (!user) {
          return message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Pay`, scope.user.displayAvatarURL())
            .setDescription(
              `${cfg.emojis.no} Morate tagovati nekoga\n${cfg.emojis.yes} Koristite: ${prefix}pay \`[@Korisnik | novac]\``)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
          );
        }
        if (!args[1]) {
          return message.channel.send(new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Pay`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.no} Morate uneti odredjenu cifru!`)
          .setColor(cfg.colors.no)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
          );
        }
        if (message.content.includes("-")) {
          return message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Pay`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.no} Cifra ne moze biti manja od nule!`)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
          );
        }
      
        if (member < args[1]) {
          return message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Pay`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.no} Nemate toliko novca na računu!`)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
          );
        }
      
        let transakcije = db.fetch(`transakcije_${message.guild.id}_${message.author.id}`) || [];
        transakcije.unshift(`[**- $${args[1].toLocaleString()}**] Uplatili ste korisniku **${user.user.username}**.`); 
        db.set(`transakcije_${message.guild.id}_${message.author.id}`, transakcije);
      
        let transakcije2 = db.fetch(`transakcije_${message.guild.id}_${user.id}`) || [];
        transakcije2.unshift(`[**+ $${args[1]}**] Dobili ste novac od **${message.author.username}**.`);
        db.set(`transakcije_${message.guild.id}_${user.id}`, transakcije2);
      
        message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Pay`, scope.user.displayAvatarURL())
            .setDescription(
              `${cfg.emojis.yes} Poslali ste **$${args[1]}** korisniku **${user.user.tag}**`)
            .setColor(cfg.colors.yes)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
        
        db.add(`money_${message.guild.id}_${user.id}`, args[1]);
        db.subtract(`money_${message.guild.id}_${message.author.id}`, args[1]);

  }
} 