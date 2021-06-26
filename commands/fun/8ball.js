module.exports = {
 meta: {
     name: "8ball",
     usage: "[pitanje]",
     description: "Postavljate pitanje botu",
     hasArgs: true,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {      
      if (!args[0]) return message.channel.send(
      new discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - 8ball`, scope.user.displayAvatarURL())
        .setDescription(`${cfg.emojis.arrow} Unesite pitanje.`)
        .setColor(cfg.colors.main)
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
      );
      let replies = [
        "Da.",
        "Ne.",
        "Ne znam.",
        "Pitaj ponovo kasnije.",
        "Jao, kakvo ugodno pitanje!",
        "Oh, to je nepristojno pitanje! Pitaj me opet.",
        "Teško mi je verovati da ni ti ne znaš...",
        "Oh whoaoaw :open_mouth: Sjajno pitanje.",
        "Ma ti si kralj.",
        "Totalno.",
        "Naravno.",
        "Uvek."
      ];

      let result = Math.floor(Math.random() * replies.length);
      let question = args.slice(0).join(" ");

      message.channel.send(
      new discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - 8ball`, scope.user.displayAvatarURL())
        .setColor(cfg.colors.main)
        .addField(`${cfg.emojis.arrow} Pitanje`, question)
        .addField(`${cfg.emojis.arrow} Odgovor`, replies[result])
        .setFooter(`${message.author.tag}`, message.author.displayAvatarURL())
        .setTimestamp()
      );
    }
}