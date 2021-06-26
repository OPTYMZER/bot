const db = require("quick.db");
module.exports = {
 meta: {
     name: "addtoshop",
     aliases: ["ats"],
     usage: "<role> <cena>",
     description: "Dodaj role u shop",
     hasArgs: false,
     category: "economy",
     devOnly: false,
     perms: {
        require: true,
        permissions: ["ADMINISTRATOR"]
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {

      let prefix = db.fetch(`newprefix_${message.guild.id}`)
      if(prefix === null) prefix = "."

      let items = await db
        .all()
        .filter(data => data.ID.startsWith(`shop_${message.guild.id}_`));
        if (items !== null && items.length === 20) return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Addtoshop`, scope.user.displayAvatarURL())
          .setColor(cfg.colors.no)
          .setDescription(`${cfg.emojis.no} Na serveru je dostignut maksimalan broj itema u prodavnici.`)
          .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
          .setTimestamp()
        );
        if (items === null) items = { length: 0 };
      let role = message.mentions.roles.first() || message.guild.roles.cache.get(args[0]);
    if (!role) return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Addtoshop`, scope.user.displayAvatarURL())
          .setColor(cfg.colors.no)
          .setDescription(`${cfg.emojis.no} Unesite item & cenu.\n${cfg.emojis.arrow} Koristite: ${prefix}addtoshop \`[@role | Role ID] [cena]\``)
          .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
          .setTimestamp()
        );

      let cena = args[1];
        if (!cena) return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Addtoshop`, scope.user.displayAvatarURL())
          .setColor(cfg.colors.no)
          .setDescription(`${cfg.emojis.no} Unesite item & cenu.\n${cfg.emojis.arrow} Koristite: ${prefix}addtoshop \`[@role | Role ID] [cena]\``)
          .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
          .setTimestamp()
        );
        if (isNaN(cena) || cena < 500 || cena > 100000) return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Addtoshop`, scope.user.displayAvatarURL())
          .setColor(cfg.colors.no)
          .setDescription(`${cfg.emojis.no} Cena itema mora biti manja od **$100,000** & veća od **$500**.\n${cfg.emojis.arrow} Koristite: ${prefix}addtoshop \`[@role | Role ID] [cena]\``)
          .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
          .setTimestamp()
        );
      let slot = 0;
        for (let i = 1; i < 21; i++) {
          let shop = await db.fetch(`shop_${message.guild.id}_${i}`);
          if (shop === null) {
            slot = i;
            break;
          };
        };
      let roleinfo = {
        id: role.id,
        cena: cena,
        slot: slot
      };
      db.set(`shop_${message.guild.id}_${slot}`, roleinfo);
      message.channel.send(
        new discord.MessageEmbed()
      	.setAuthor(`${scope.user.username} - Addtoshop`, scope.user.displayAvatarURL())
        .setColor(cfg.colors.yes)
        .setDescription(`${cfg.emojis.yes} Dodali ste role ${role} u prodavnicu.\n${cfg.emojis.arrow} Cena: **$${cena}** \n${cfg.emojis.arrow} Pozicija: **#${slot}**`)
        .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
        .setTimestamp()
      );
      
    }
}