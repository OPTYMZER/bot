const db = require("quick.db");
module.exports = {
 meta: {
     name: "removefromshop",
     aliases: ["rfs"],
     usage: "<slot>",
     description: "Ukloni role iz shopa",
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
        if (items === null) return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Removefromshop`, scope.user.displayAvatarURL())
          .setColor(cfg.colors.no)
          .setDescription(`${cfg.emojis.no} Trenutno nema itema u prodavnici.`)
          .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
          .setTimestamp()
        );
      let slot = args[0];
        if (isNaN(slot) || slot < 1 || slot > 20) return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Removefromshop`, scope.user.displayAvatarURL())
          .setColor(cfg.colors.no)
          .setDescription(`${cfg.emojis.no} Slot mora biti veći od **1** a manji od **20**.`)
          .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
          .setTimestamp()
        );


      let role = await db.fetch(`shop_${message.guild.id}_${slot}`);
        if (role === null) return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Removefromshop`, scope.user.displayAvatarURL())
          .setColor(cfg.colors.no)
          .setDescription(`${cfg.emojis.no} Ne postoji item pod slotom **#${args[0]}** u prodavnici.`)
          .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
          .setTimestamp()
        )
        else {
          db.delete(`shop_${message.guild.id}_${slot}`);
          message.channel.send(
            new discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Removefromshop`, scope.user.displayAvatarURL())
            .setColor(cfg.colors.yes)
            .setDescription(`${cfg.emojis.yes} Uklonili ste role <@&${role.id}> iz prodavnice.\n${cfg.emojis.arrow} Pozicija: **#${slot}**`)
            .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
            .setTimestamp()
          );
        };
      
    }
}