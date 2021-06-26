const db = require("quick.db");
const ms = require("parse-ms");
module.exports = {
 meta: {
     name: "rob",
     aliases: ["orobi", "opljackaj"],
     usage: '[osoba]',
     description: "Pljačkate korisnika",
     hasArgs: false,
     category: "economy",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
      
        let rob = await db.fetch(`rob_${message.guild.id}_${message.author.id}`);
        let timeout = 1800000
        let user = message.mentions.members.first();
        let author = await db.fetch(`money_${message.guild.id}_${message.author.id}`);
        let prefix = await db.fetch(`newprefix_${message.guild.id}`);
        if (prefix === null) prefix = ".";
      
        if (!user) {
          return message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Rob`, scope.user.displayAvatarURL())
            .setDescription(
              `${cfg.emojis.no} Morate tagovati nekoga. \n${cfg.emojis.arrow} Koristite: ${prefix}rob \`[Korisnik | ID Korisnika]\``)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
          );
        }

        if(user.id === message.author.id){
            return message.channel.send(
                new Discord.MessageEmbed()
                .setAuthor(`${scope.user.username} - Rob`, scope.user.displayAvatarURL())
                .setDescription(`${cfg.emojis.no} Morate tagovati nekoga. \n${cfg.emojis.arrow} Koristite: **${prefix}rob \`[Korisnik | ID Korisnika]\``)
                .setColor(cfg.colors.no)
                .setTimestamp()
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
              );
        }

        if (author < 250) {
          return message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Rob`, scope.user.displayAvatarURL())
            .setDescription(
              `${cfg.emojis.no} Morate imati najmanje **$250** da biste opljačkali nekoga.`)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
          );
        }
      
        let targetuser = await db.fetch(`money_${message.guild.id}_${user.id}`);
      
        if (targetuser < 200) {
          return message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Rob`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.no} ${user.tag} Nema novca na svom računu!`)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
          );
        }

        if (targetuser < -0) {
            return message.channel.send(
                new Discord.MessageEmbed()
                .setAuthor(`${scope.user.username} - Rob`, scope.user.displayAvatarURL())
                .setDescription(`${cfg.emojis.no} ${user.tag} Nema novca na svom računu.`)
                .setColor(cfg.colors.no)
                .setTimestamp()
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
              );
        }
      
        let random = Math.floor(Math.random() * 700) + 1;
      
        if (rob !== null && timeout - (Date.now() - rob) > 0) {
            let time = ms(timeout - (Date.now() - rob));
            message.channel.send(
                new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Rob`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.no} Već ste opljačkali nekog korisnika. \n${cfg.emojis.arrow} Možete ponovo pljačkati za: **${time.minutes}** minuta & **${time.seconds}** sekundi`)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            )
      
        }else{
        message.channel.send(
            new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Rob`, scope.user.displayAvatarURL())
          .setDescription(
            `${cfg.emojis.yes} Uspešno ste opljačkali **${user.user.tag}** i uzeli ste mu **$${random.toLocaleString()}**.`)
          .setColor(cfg.colors.yes)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
      
         let transakcije = db.fetch(`transakcije_${message.guild.id}_${message.author.id}`) || [];
         transakcije.unshift(`[**+ $${random}**] Upešno ste obavili pljačku.`); 
         db.set(`transakcije_${message.guild.id}_${message.author.id}`, transakcije);

         let transakcije2 = db.fetch(`transakcije_${message.guild.id}_${user.id}`) || [];
         transakcije2.unshift(`[**- $${random}**] Neko vas je opljačkao.`); 
         db.set(`transakcije_${message.guild.id}_${user.id}`, transakcije2);
 
        db.subtract(`money_${message.guild.id}_${user.id}`, random);
        db.add(`money_${message.guild.id}_${message.author.id}`, random);
        db.set(`rob_${message.guild.id}_${message.author.id}`, Date.now())
          }

  }
} 