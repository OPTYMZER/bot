const db = require("quick.db");
const ms = require('parse-ms');
module.exports = {
 meta: {
     name: "weekly",
     aliases: ["tjedno","nedeljno"],
     description: "Uzimate nedeljnu novčanu nagradu",
     hasArgs: false,
     category: "economy",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
      
        let timeout = 604800000 
        let amount = 5000
    
        let weekly = await db.fetch(`weekly_${message.guild.id}_${message.author.id}`);
    
        if (weekly !== null && timeout - (Date.now() - weekly) > 0) {
            let time = ms(timeout - (Date.now() - weekly));

            message.channel.send(new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Weekly`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.no} Već ste preuzeli **nedeljnu nagradu**. \n${cfg.emojis.arrow} Možete je uzeti ponovo za: **${time.days}** dana, **${time.hours}** sati, **${time.minutes}** minuta & **${time.seconds}** sekundi`)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            )

        } else {
    
            db.add(`money_${message.guild.id}_${message.author.id}`, amount)
            db.set(`weekly_${message.guild.id}_${message.author.id}`, Date.now())
             
            let bal = await db.fetch(`money_${message.guild.id}_${message.author.id}`)
    
         let transakcije = db.fetch(`transakcije_${message.guild.id}_${message.author.id}`) || [];
         transakcije.unshift(`[**+ $${amount}**] Preuzeli ste nedeljnu nagradu.`); 
         db.set(`transakcije_${message.guild.id}_${message.author.id}`, transakcije);

         message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Weekly`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.yes} Uzeli ste nedeljnu nagradu u iznosu od **$${amount}**. \n${cfg.emojis.arrow} Novo stanje: **$${bal}**`)
            .setColor(cfg.colors.yes)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
         );
       
        }

  }
} 