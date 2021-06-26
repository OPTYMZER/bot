const db = require("quick.db");
const ms = require('parse-ms');
module.exports = {
 meta: {
     name: "daily",
     aliases: ["dnevno"],
     description: "Uzimate dnevnu novčanu nagradu",
     hasArgs: false,
     category: "economy",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
    let timeout = 86400000 
    let amount = 1500
    let daily = await db.fetch(`daily_${message.guild.id}_${message.author.id}`);
    if (daily !== null && timeout - (Date.now() - daily) > 0) {
      let time = ms(timeout - (Date.now() - daily));
      message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Daily`, scope.user.displayAvatarURL())
        .setDescription(`${cfg.emojis.no} Već ste preuzeli **dnevnu nagradu**. \n${cfg.emojis.yes} Možete je uzeti ponovo za: **${time.hours}** sati, **${time.minutes}** minuta & **${time.seconds}** sekundi`)
        .setColor(cfg.colors.no)
        .setTimestamp()
        .setFooter(message.member.displayName, message.author.displayAvatarURL())
      );
    } else {
    db.add(`money_${message.guild.id}_${message.author.id}`, amount)
    db.set(`daily_${message.guild.id}_${message.author.id}`, Date.now())

   
         let transakcije = db.fetch(`transakcije_${message.guild.id}_${message.author.id}`) || [];
         transakcije.unshift(`[**+ $${amount.toLocaleString()}**] Preuzeli ste dnevnu nagradu.`); 
         db.set(`transakcije_${message.guild.id}_${message.author.id}`, transakcije);

    let bal = await db.fetch(`money_${message.guild.id}_${message.author.id}`)
    message.channel.send(
     new Discord.MessageEmbed()
     .setAuthor(`${scope.user.username} - Daily`, scope.user.displayAvatarURL())
     .setDescription(`${cfg.emojis.yes} Uzeli ste dnevnu nagradu u iznosu od **$${amount}**. \n${cfg.emojis.arrow} Novo stanje: **$${bal.toLocaleString()}**`)
     .setColor(cfg.colors.yes)
     .setTimestamp()
     .setFooter(message.member.displayName, message.author.displayAvatarURL())
    );   
    }
  }
}