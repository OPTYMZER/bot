const db = require("quick.db");
module.exports = {
 meta: {
     name: "buy",
     aliases: ["kupi"],
     usage: "[slot]",
     description: "Kupite nešto iz prodavnice",
     hasArgs: true,
     category: "economy",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {

        let slot = args[0];
        if (!slot) return message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Buy`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.no} Morate uneti slot.`)
          .setColor(cfg.colors.no)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
      
        if (isNaN(slot) || slot < 1 || slot > 30)
          return message.channel.send(
            new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Buy`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.no} Morate uneti validan slot.`)
          .setColor(cfg.colors.no)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
          );
        let novac = await db.fetch(`money_${message.guild.id}_${message.author.id}`);
        if (novac === null) novac = 0;
        let items = await db
          .all()
          .filter(data => data.ID.startsWith(`shop_${message.guild.id}_`))
          .sort((a, b) => JSON.parse(a.data.slot) - JSON.parse(b.data.slot));
      
        if (items === null || items.length < 1) return message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Buy`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.arrow} Prodavnica je trenutno prazna.`)
          .setColor(cfg.colors.no)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
        let shop = await db.fetch(`shop_${message.guild.id}_${slot}`);
      
        if (shop === null) return message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Buy`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.no} Ne postoji item pod **#${slot}** slotom.`)
          .setColor(cfg.colors.no)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
      
        if (shop.cijena > novac) return message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Buy`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.no} Nemate dovoljno novca za taj item.`)
          .setColor(cfg.colors.no)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
        let role = message.guild.roles.cache.get(shop.id);

        if (!role) return message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Buy`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.no} Taj item ne postoji u shopu.`)
          .setColor(cfg.colors.no)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
      
        if (message.member.roles.cache.has(role.id)) return message.channel.send(
          new Discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Buy`, scope.user.displayAvatarURL())
          .setDescription(`${cfg.emojis.no} Već imate taj item.`)
          .setColor(cfg.colors.no)
          .setTimestamp()
          .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
        const m = role.id;
        db.push(`${message.guild.id}.${message.author.id}.shopb`, m);
      
        let shopb = db.get(`${message.guild.id}.${message.author.id}.shopb`);
      
        if (shopb === m) {
          let newshopb = shopb.pop(m);
          db.push(`${message.guild.id}.${message.author.id}.shopb`, newshopb);
        }
      
        message.member
          .roles.add(role)
          .then(() => {
            db.subtract(
              `money_${message.guild.id}_${message.author.id}`,
              shop.cijena
            );
            let shopb = role.id;
            let shopbTag = `<@&${shopb}>`

           return message.channel.send(
              new Discord.MessageEmbed()
              .setAuthor(`${scope.user.username} - Buy`, scope.user.displayAvatarURL())
              .setDescription(`${cfg.emojis.yes} Kupili ste ulogu <@&${role.id}> po ceni od **$${shop.cijena}**.`)
              .setColor(cfg.colors.yes)
              .setTimestamp()
              .setFooter(message.member.displayName, message.author.displayAvatarURL())
            );

         let transakcije = db.fetch(`transakcije_${message.guild.id}_${message.author.id}`) || [];
         transakcije.unshift(`[**- $${shop.cijena}**] Kupili ste role <@&${role.id}> iz prodavnice.`); 
         db.set(`transakcije_${message.guild.id}_${message.author.id}`, transakcije);

          })
          .catch(err => {
            console.log(err);
           // message.channel.send(`${cfg.emojis.no} Bot vam ne može dati tu ulogu jer je njegov role **ispod** navedenog.\n${cfg.emojis.arrow} **TIP**: Podignite role od bota na **vrh** ili iznad rankova koji su u prodavnici.`);
          });
  }
}