const db = require("quick.db");
module.exports = {
 meta: {
     name: "drop",
     aliases: ["drop"],
     usage: '[novac/role]',
     description: "Stvorite drop nekog ranka ili novca",
     hasArgs: false,
     category: "economy",
     devOnly: false,
     perms: {
        require: true,
        permissions: ["ADMINISTRATOR"]
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
    
      let vrsta = args[0];
    
      let prefix = db.get(`newprefix_${message.guild.id}`);
      if (prefix === null) prefix = ".";
    
      if (!vrsta) return message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Drop`, scope.user.displayAvatarURL())
        .setDescription(
          `${cfg.emojis.no} Morate izabrati **role** ili **novac**. \n${cfg.emojis.arrow} ${prefix}drop \`[uloga | @role]\`\n${cfg.emojis.arrow} ${prefix}drop \`[novac | suma]\``)
        .setColor(cfg.colors.no)
        .setTimestamp()
        .setFooter(message.member.displayName, message.author.displayAvatarURL())
      );
      if (
        vrsta === "uloga" ||
        vrsta === "role" ||
        vrsta === "rank" ||
        vrsta === "rol"
      ) {
        let uloga = message.mentions.roles.first();

        if (!uloga) return message.channel.send(
            new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Drop`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.no} Morate **tagovati** role.`)
          .setColor(cfg.colors.no)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );

        message.delete();
        let embed = new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Drop`, scope.user.displayAvatarURL())
          .setDescription(`\\📦 **Vrsta dropa**: Uloga\n\\👤 **Uloga**: <@&${uloga.id}> \n\\🎁 **TIP**: Da pokupite bačeni role kliknite na reakciju, srećno svima!`)
          .setColor(cfg.colors.main)
          .setFooter(`Drop nestaje nakon 30 sekundi`, message.guild.iconURL())
          .setTimestamp();
        let msg = await message.channel.send(embed);
        await msg.react("🎁");
        const filter = (reaction, user) =>
          reaction.emoji.name === "🎁" && user.id !== scope.user.id;
        const collector = msg.createReactionCollector(filter, { time: 60000 });
        let timelimit = true;
        let collected = false;
        collector.on("collect", (reaction, reactionCollector) => {
          reaction.users.cache.forEach(user => {
            if (user.id !== scope.user.id) {
              let member = message.guild.members.cache.get(user.id);
              if (member.roles.cache.has(uloga.id)) return;
              if (!collected) {
                collected = true;
                msg.reactions.removeAll();
                let takenEmbed = new Discord.MessageEmbed()
                .setAuthor(`${scope.user.username} - Drop`, scope.user.displayAvatarURL())
                .setDescription(`${cfg.emojis.yes} **${user.tag}** je preuzeo ulogu iz dropa, više sreće drugi put!`)
                .setColor(uloga.color)
                .setTimestamp()
                .setFooter(user.displayName, user.displayAvatarURL())
    
                member
                  .roles.add(uloga)
                  .then(() => {
                    msg.edit(takenEmbed);
                    timelimit = false;
                  })
                  .catch(() => {});
              }
            }
          });
        });
        collector.on("end", collected => {
          if (timelimit) {
            let expiredEmbed = new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Drop`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.no} Vreme za reakciju je isteklo.`)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            msg.edit(expiredEmbed);
            msg.reactions.removeAll();
          }
        });
      } else if (
        vrsta === "novac" ||
        vrsta === "eco" ||
        vrsta === "balance" ||
        vrsta === "money"
      ) {
        let novac = args[1];
    
        if (!novac) return message.channel.send(
            new Discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Drop`, scope.user.displayAvatarURL())
        .setDescription(
            `${cfg.emojis.no} Morate uneti određenu cifru.\n ${cfg.emojis.arrow} Max: \`[$500000 | Min: $1]\``)
        .setColor(cfg.colors.no)
        .setTimestamp()
        .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );

        if (isNaN(novac) || novac < 1 || novac > 500000)
          return message.channel.send(
            new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Drop`, scope.user.displayAvatarURL())
            .setDescription(
            `${cfg.emojis.no} Morate uneti određenu cifru.\n ${cfg.emojis.arrow} Max: \`[$500000 | Min: $1]\``)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
          );

        message.delete();

        let msg = await message.channel.send(
            new Discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Drop`, scope.user.displayAvatarURL())
          .setDescription(`\\📦 **Vrsta**: Novac\n\\👤 **Novac**: $${novac.toLocaleString()} \n\\🎁 **TIP**: Da pokupite bačeni novac kliknite na reakciju, srećno svima!`)
        .setColor(cfg.colors.main)
        .setFooter(`Drop nestaje nakon 60 sekundi`, message.guild.iconURL())
        .setTimestamp()
        );

        await msg.react("🎁");
        const filter = (reaction, user) =>
          reaction.emoji.name === "🎁" && user.id !== scope.user.id;
        const collector = msg.createReactionCollector(filter, { time: 60000 });
        let timelimit = true;
        let collected = false;
        collector.on("collect", (reaction, reactionCollector) => {
          reaction.users.cache.forEach(user => {
            if (user.id !== scope.user.id) {
              if (!collected) {
                collected = true;
                msg.reactions.removeAll();
                let takenEmbed = new Discord.MessageEmbed()
                .setAuthor(`${scope.user.username} - Drop`, scope.user.displayAvatarURL())
                .setDescription(`${cfg.emojis.yes} **${user.tag}** je preuzeo novac iz dropa, više sreće drugi put!`)
                .setColor(cfg.colors.main)
                .setTimestamp()
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
                db.add(`money_${message.guild.id}_${user.id}`, novac);
                msg.edit(takenEmbed);
                timelimit = false;
         let transakcije = db.fetch(`transakcije_${message.guild.id}_${message.author.id}`) || [];
         transakcije.unshift(`[**+ $${novac.toLocaleString()}**] Pokupili ste drop.`); 
         db.set(`transakcije_${message.guild.id}_${message.author.id}`, transakcije);

              }
            }
          });
        });
        collector.on("end", collected => {
          if (timelimit) {
            let expiredEmbed = new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Drop`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.no} Isteklo je vreme za reakciju.`)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            msg.edit(expiredEmbed);
            msg.reactions.removeAll();
          }
        });
      } else
        message.channel.send({
          embed: {
            description: `${cfg.emojis.arrow} Morate izabrati **role** ili **novac**`,
            color: 0xf3ff74
          }
        });

  }
} 