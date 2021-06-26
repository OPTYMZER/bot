let db = require("quick.db");
const Discord = require('discord.js')
module.exports = {
    meta: {
        name: "suggest",
        aliases: ["predlog", "predlozi"],
        usage: "suggest dodajte nešta cool",
        description: "Predloži nešto što bi htio da se ubaci u bota",
        hasArgs: false,
        category: 'user',
        perms: {
            require: false
        },
    },
    pokreni: async (scope, message, args, cfg, discord) => {

   if (!args[0]) return message.channel.send(
    new Discord.MessageEmbed()
    .setAuthor("❌ GREŠKA", message.guild.iconURL())
    .setDescription(`<a:NO:852897576705720320> Unesite neki tekst.`)
    .setColor(cfg.colors.no)
    .setTimestamp()
    .setFooter(`${message.author.username}#${message.author.discriminator}`,message.author.avatarURL())
   );
   message.delete({ timeout: 1000 });
 
 
   let logs = await db.fetch(`logschannel_${message.guild.id}`);
            if (logs === null) {
              return;
            }
 const modlog = scope.channels.cache.get(logs.id);
   var noEmoji = "<a:NO:852897576705720320>";
   var yesEmoji = "<a:YES:852897347347939328>";
 
   let msg = await modlog.send(
    new discord.MessageEmbed()
    .setAuthor(message.guild.name + " | Sugestija", message.guild.iconURL())
    .addField(`${cfg.emojis.arrow} Autor`, `${message.author.tag}`)
    .addField(`${cfg.emojis.arrow} Predlog`, args.join(" "))
    .setColor(cfg.colors.main)
    .setTimestamp()
    .setFooter(message.author.username, message.author.displayAvatarURL({format: "png", size: 32, dynamic: true}))
   );
 
   await msg.react("✅");
   await msg.react("❌");
 
   message.delete({ timeout: 1000 });
    }
}