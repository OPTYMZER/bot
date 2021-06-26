const db = require("quick.db");
const ms = require("ms");
const Discord = require('discord.js')
module.exports = {
 meta: {
     name: "giveaway",
     aliases: ["gw"],
     description: "Započinjete novu nagradnu igru",
     usage: '[#kanal] | [trajanje] | [pobednici] | [nagrada]',
     hasArgs: true,
     category: "giveaway",
     devOnly: false,
     perms: {
        require: true,
        permissions: ["MANAGE_GUILD"]
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {

    let prefix = db.get(`newprefix_${message.guild.id}`)
    if(prefix === null) prefix = "."
        
        
 let giveawayChannel = message.mentions.channels.first();
     let giveawayDuration = args[1];
      
        
     if (!giveawayDuration || isNaN(ms(giveawayDuration))) {
        return message.channel.send(
         new Discord.MessageEmbed()
         .setAuthor(`${scope.user.username} - Giveaway`, scope.user.displayAvatarURL())
         .setDescription(`:white_small_square: Morate unjeti vrijeme trajanja giveaway-a!`)
         .setColor("BLUE")
         .setFooter(message.author.username, message.author.displayAvatarURL())
         .setTimestamp()
        )
      }
     
      let giveawayNumberWinners = args[2];
 
      if(isNaN(giveawayNumberWinners) || (parseInt(giveawayNumberWinners) <= 0)) {
        return message.channel.send(
         new Discord.MessageEmbed()
         .setAuthor(`${scope.user.username} - Giveaway`, scope.user.displayAvatarURL())
         .setDescription(`:white_small_square: Morate unjeti broj pobjednika.`)
         .setColor("BLUE")
         .setFooter(message.author.username, message.author.displayAvatarURL())
         .setTimestamp()
        )
       }
 
       let giveawayPrize = args.slice(3).join(' ');
 
       if(!giveawayPrize) {
        return message.channel.send(
         new Discord.MessageEmbed()
         .setAuthor(`${scope.user.username} - Giveaway`, scope.user.displayAvatarURL())
         .setDescription(`:white_small_square: Morate unjeti nagradu.`)
         .setColor("BLUE")
         .setFooter(message.author.username, message.author.displayAvatarURL())
         .setTimestamp()
            )
        }
         scope.giveawaysManager.start(giveawayChannel, {
         time: ms(giveawayDuration),
         prize: giveawayPrize,
         winnerCount: giveawayNumberWinners,
         hostedBy: message.author,
         messages: {
             giveaway: `\\🎉 ${message.guild} | **NAGRADNA IGRA** - __Počinje__`,
             giveawayEnded: `\\🎉 ${message.guild} | **NAGARDNA IGRA** - __Završena__`,
             timeRemaining: "Vrijeme preostalo: **{duration}**!",
             inviteToParticipate: "Reagujte sa 🎉 da sudjelujete!",
             winMessage: "Čestitam, {winners}! vi ste pobjedili **{prize}**!",
             embedFooter: "Giveaways",
             noWinner: "Giveaway otkazan, nema dovoljno prijavljenih korisnika.",
             hostedBy: "Sponzor: {user}",
             winners: "Pobjednik(ci)",
             endedAt: "Završen u",
             units: {
                 seconds: "sekundi",
                 minutes: "minuta",
                 hours: "sati",
                 days: "dana",
                 pluralS: false
             }
         }
     });
 
     message.channel.send(`${cfg.emojis.arrow} Nagradna igra je počela u kanalu ${giveawayChannel}`);
      
  }
}