const db = require("quick.db");
module.exports = {
 meta: {
     name: "shop",
     aliases: ["shop"],
     description: "Stvari koje možete kupiti",
     hasArgs: false,
     category: "economy",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {
      
      let roles = await db
        .all()
        .filter(data => data.ID.startsWith(`shop_${message.guild.id}_`))
        .sort((a, b) => JSON.parse(a.data).slot - JSON.parse(b.data).slot);
      
      if (roles === null || roles.length < 1) return message.channel.send(
        new discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Shop`, scope.user.displayAvatarURL())
        .setColor(cfg.colors.no)
        .setDescription(`${cfg.emojis.no} Trenutno nema itema u prodavnici.`)
        .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
        .setTimestamp()
      );

      let content = "";

      for (let i = 0; i < roles.length; i++) {
        let role = message.guild.roles.cache.get(JSON.parse(roles[i].data).id);
        if (role) {
          content +=
           `> \\🛒 **${message.guild.name}** - Prodavnica\n\n` +
            "> " +
            `(**${JSON.parse(roles[i].data).slot}**)  `
             +
            `<@&${role.id}>` +
            ` ${cfg.emojis.arrow} ` +
            `**$${JSON.parse(roles[i].data).cena.toLocaleString()}**` +
            "\n";
        }
      }

      message.channel.send(
        new discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Shop`, scope.user.displayAvatarURL())
        .setColor(cfg.colors.main)
        .setDescription(content)
        .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
        .setTimestamp()
      );

  }
} 