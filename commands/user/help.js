const db = require('quick.db')
module.exports = {
    meta: {
        name: "help",
        usage: "[kategorija]",
        description: "Lista komandi",
        hasArgs: false,
        category: 'user',
        perms: {
            require: false
        },
    },
    pokreni: async (scope, message, args, cfg, discord) => {
 message.delete({ timeout: 1000 });
 let prefix = await db.fetch(`newprefix_${message.guild.id}`);
  if (prefix === null) prefix = ".";

      const cmdMap = scope.commands;
      if (!args.length) {
        const helpEmbed = new discord.MessageEmbed()
        .setColor(cfg.colors.main)
        .setAuthor(`${scope.user.username} komande`, scope.user.avatarURL())
        .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
        .setTimestamp()
        .setThumbnail(scope.user.avatarURL())
        
        cfg.kategorije.forEach(kategorija => {
          if (kategorija == 'owner' && message.author.id !== "379738998207283209" && message.author.id !== "294225541316476928" && message.author.id !== "464744770624028692" && message.author.id !== "253932552253865985") return;
          
          helpEmbed.addField(`${cfg.kategorijeEmoji[kategorija]} ${kategorija.charAt(0).toUpperCase() + kategorija.slice(1)} komande`, `${cfg.emojis.arrow} \`${prefix}help ${kategorija}\``)
        });
        return message.channel.send(helpEmbed);
      }
      switch (args[0]) {
        case `${args[0]}`:
          if (args[0] == 'owner' && message.author.id !== "379738998207283209" && message.author.id !== "294225541316476928" && message.author.id !== "464744770624028692" && message.author.id !== "253932552253865985") {
            return message.channel.send("Nisi vlasnik bota.")
          } else {
            let kurcina = '';
            cmdMap.forEach(cmd => {
              if (cmd.meta.category == args[0]) {
                let cmdUsage = cmd.meta.usage;
                let cmdDesc = cmd.meta.description;
                if (!cmdDesc || !cmdDesc.length) cmdDesc = '/';
                if (!cmdUsage || !cmdUsage.length) cmdUsage = '';
                kurcina += (`\`${prefix}${cmd.meta.name} ${cmdUsage}\` - ${cmdDesc.charAt(0).toUpperCase() + cmdDesc.slice(1)}\n`);
              }
          });
          
          const katEmbed = new discord.MessageEmbed()
          .setColor(cfg.colors.main)
          .setAuthor(`${args[0].charAt(0).toUpperCase() + args[0].slice(1)} komande`, scope.user.avatarURL())
          .setDescription(kurcina)
          .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
          .setTimestamp()
          
          return message.channel.send(katEmbed);
        }
      }
    }
}