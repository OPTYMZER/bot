const db = require("quick.db");
module.exports = {
 meta: {
     name: "warn",
     usage: '[@korisnik | ID] [razlog]',
     description: "Upozorite željenog korisnika na serveru",
     hasArgs: true,
     category: "staff",
     devOnly: false,
     perms: {
        require: true,
        permissions: ["MANAGE_MESSAGES"]
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
       message.delete({ timeout: 1000 });
      let prefix = await db.fetch(`newprefix_${message.guild.id}`);
      if (prefix === null) prefix = ".";

        let warnMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
        if (!warnMember) return message.channel.send(
        new Discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Warn`, scope.user.displayAvatarURL())
        .setColor(cfg.colors.no)
        .setDescription(`${cfg.emojis.no} Navedite validnog korisnika.\n${cfg.emojis.yes} ${prefix}warn [\`@korisnik | ID\`] [\`razlog\`]`)
        .setFooter(message.author.username, message.author.displayAvatarURL())
        .setTimestamp());
        if (warnMember.id === message.member.id) return message.channel.send( 
        new Discord.MessageEmbed()
        .setColor(cfg.colors.no)
        .setAuthor(`${scope.user.username} - Warn`, scope.user.displayAvatarURL())
        .setDescription(`${cfg.emojis.no} Ne možete upozoriti sami sebe.`)
        .setFooter(message.author.username, message.author.displayAvatarURL())
        .setTimestamp())
        
        let reason = args.slice(1).join(" ")

        if (warnMember.roles.highest.comparePositionTo(message.guild.me.roles.highest) >= 0) return message.channel.send( 
        new Discord.MessageEmbed()
        .setColor(cfg.colors.no)
        .setAuthor(`${scope.user.username} - Warn`, scope.user.displayAvatarURL())
        .setDescription(`${cfg.emojis.no} Ne možete upozoriti korisnika koji veći role od vas.`)
        .setFooter(message.author.username, message.author.displayAvatarURL())
        .setTimestamp())
        if (warnMember.hasPermission("MANAGE_MESSAGES") || warnMember.hasPermission("ADMINISTRATOR") || warnMember.user.bot) return message.channel.send( 
        new Discord.MessageEmbed()
        .setColor(cfg.colors.no)
        .setAuthor(`${scope.user.username} - Warn`, scope.user.displayAvatarURL())
        .setDescription(`${cfg.emojis.no} Ne možete upozoriti korisnika koji ima \`MANAGE_MESSAGES\` permisiju.`)
        .setFooter(message.author.username, message.author.displayAvatarURL())
        .setTimestamp())
      try {
        const sembed2 = new Discord.MessageEmbed()
            .setColor(cfg.colors.main)
            .setDescription(`${cfg.emojis.arrow} Pozdrav, upravo ste upozoreni na ${message.guild.name} zbog **${reason || "Nema razloga"}**`)
        warnMember.send(sembed2)
      } catch {

      }
          if (reason) {
            message.channel.send(
              new Discord.MessageEmbed()
                .setColor(cfg.colors.yes)
                .setAuthor(`${scope.user.username} - Warn`, scope.user.displayAvatarURL())
                .setDescription(`${cfg.emojis.yes} **${warnMember.user.tag}** je upozoren/a zbog **${reason}**`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()
            );
          } else {
            message.channel.send(
              new Discord.MessageEmbed()
                .setColor(cfg.colors.yes)
                .setAuthor(`${scope.user.username} - Ban`, scope.user.displayAvatarURL())
                .setDescription(`${cfg.emojis.yes} **${warnMember.user.tag}** je upozoren/a.`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()
            );
            }
            db.add(`warns_${message.guild.id}_${warnMember.id}`, 1);
           let logs = await db.fetch(`logschannel_${message.guild.id}`);
            if (logs === null) {
              return;
            }

            const modlog = scope.channels.cache.get(logs.id);

        const sembed = new Discord.MessageEmbed()
                .setAuthor(`${message.guild.name} - Ban Logs`, message.guild.iconURL())
                .setColor(cfg.colors.main)
                .setThumbnail(warnMember.user.displayAvatarURL())
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .addField("\\🔨 Sankcija", "Warn", true)
                .addField("\\👥 Korisnik", warnMember.user.tag, true)
                .addField("\\🆔 ID", `${warnMember.id}`, true)
                .addField("\\👔 Staff", message.author.tag, true)
                .addField("\\📰 Razlog", `${reason || "Nema razloga"}`, true)
                .addField("\\⏰ Vreme", message.createdAt.toDateString(), true)
                .setTimestamp();

            modlog.send(sembed)
    }
}