const db = require("quick.db");
module.exports = {
 meta: {
     name: "coinflip",
     aliases: ["cf", "coinf"],
     usage: '[pismo/glava] | [novac]',
     description: "Igrajte glava/psimo igru",
     hasArgs: false,
     category: "economy",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {

      let prefix = await db.fetch(`newprefix_${message.guild.id}`);
      if (prefix === null) prefix = ".";
      let flip = args[0];
      let amount = parseInt(args[1]);
    
      let bal = db.fetch(`money_${message.guild.id}_${message.author.id}`);
    
      if (
        !flip ||
        ![
          "Pismo",
          "Glava",
          "pismo",
          "glava",
        ].includes(flip)
      ) {
        message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Coinflip`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.no} Morate napisati na šta se kladite. \n${cfg.emojis.arrow} Koristite: ${prefix}coinflip \`[glava/pismo | količina]\``)
          .setColor(cfg.colors.no)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
        return;
      }
    
      if (!amount) {
        message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Coinflip`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.no} Morate uneti odredjenu cifru.`)
          .setColor(cfg.colors.no)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
        return;
      }
    
      if (amount < 0) {
        message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Coinflip`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.no} Navedena cifra mora biti veća od nule.`)
          .setColor(cfg.colors.no)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
        return;
      }
      if (isNaN(amount)) {
        message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Coinflip`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.no} Morate uneti validnu cifru.`)
          .setColor(cfg.colors.no)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
        return;
      }
      if (bal < amount) {
        return message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Coinflip`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.no} Nemate toliko novca na računu!`)
          .setColor(cfg.colors.no)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
      }
    
      const random = ["pismo", "glava"];
      const output = random[Math.floor(Math.random() * 2)];
      if (flip.toLowerCase() === output.toLowerCase()) {
 
 let transakcije = db.fetch(`transakcije_${message.guild.id}_${message.author.id}`) || [];
         transakcije.unshift(`[**+ $${amount}**] Dobili ste novac na CoinFlip.`); 
         db.set(`transakcije_${message.guild.id}_${message.author.id}`, transakcije);


        db.add(`money_${message.guild.id}_${message.author.id}`, Number(amount));
        var gamble = {
          output: "win",
          newbalance: bal + amount
        };
      } else {

        let transakcije = db.fetch(`transakcije_${message.guild.id}_${message.author.id}`) || [];
         transakcije.unshift(`[**- $${amount}**] Izgubili ste novac na CoinFlip.`); 
         db.set(`transakcije_${message.guild.id}_${message.author.id}`, transakcije);

        db.subtract(`money_${message.guild.id}_${message.author.id}`, amount);
        var gamble = {
          output: "lost",
          newbalance: bal - amount
        };
      }
      {
        message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Coinflip`, scope.user.displayAvatarURL())
          .setDescription(
            `> **Rezultat**: ${gamble.output === "win" ? `Čestitke, pobedili ste!` : `Izgubili ste, više sreće drugi put!`}\n\n${cfg.emojis.arrow} Kladili ste se u **$${amount}**\n${cfg.emojis.arrow} Novo stanje: **$${gamble.newbalance}**`)
          .setColor(cfg.colors.main)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
        return;
      }  

  }
}