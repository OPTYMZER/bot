const db = require("quick.db");
module.exports = {
 meta: {
     name: "ban",
     usage: '[@korisnik | ID] [razlog]',
     description: "Banujte željenog korisnika sa servera",
     hasArgs: true,
     category: "staff",
     devOnly: false,
     perms: {
        require: true,
        permissions: ["BAN_MEMBERS"]
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
       message.delete({ timeout: 1000 });
      let prefix = await db.fetch(`newprefix_${message.guild.id}`);
      if (prefix === null) prefix = ".";

            if (!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send(
            new Discord.MessageEmbed()
              .setAuthor(`${scope.user.username} - Ban`, scope.user.displayAvatarURL())
              .setColor(cfg.colors.no)
              .setDescription(`${cfg.emojis.no} Botu je potrebna \`BAN_MEMBERS\` permisija.`)
              .setFooter(message.author.username, message.author.displayAvatarURL())
             .setTimestamp()
            );

            let banMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!banMember) return message.channel.send(
              new Discord.MessageEmbed()
                .setAuthor(`${scope.user.username} - Ban`, scope.user.displayAvatarURL())
                .setColor(cfg.colors.no)
                .setDescription(`${cfg.emojis.no} Navedite validnog korisnika.\n${cfg.emojis.yes} ${prefix}ban [\`@korisnik | ID\`] [\`razlog\`]`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()
            );
      
            if (banMember === message.member) return message.channel.send(
              new Discord.MessageEmbed()
                .setAuthor(`${scope.user.username} - Ban`, scope.user.displayAvatarURL())
                .setColor(cfg.colors.no)
                .setDescription(`${cfg.emojis.no} Ne možete banovati sebe.`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()
            );

            var reason = args.slice(1).join(" ");

            if (!banMember.bannable) return message.channel.send(
              new Discord.MessageEmbed()
                .setAuthor(`${scope.user.username} - Ban`, scope.user.displayAvatarURL())
                .setColor(cfg.colors.no)
                .setDescription(`${cfg.emojis.no} Ne možete banovati tog korisnika.`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()

            )
            try {
            banMember.send(`Dobili ste ban sa **${message.guild.name}**  zbog (**${reason || "Nema razloga"}**)`).then(() =>
                message.guild.members.ban(banMember, { days: 7, reason: reason })).catch(() => null)
            } catch {
                message.guild.members.ban(banMember, { days: 7, reason: reason })
            }
            if (reason) {
            message.channel.send(
              new Discord.MessageEmbed()
                .setColor(cfg.colors.yes)
                .setAuthor(`${scope.user.username} - Ban`, scope.user.displayAvatarURL())
                .setDescription(`${cfg.emojis.yes} **${banMember.user.tag}** je banovan/a sa servera zbog (**${reason}**)`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()
            );
            } else {
            message.channel.send(
              new Discord.MessageEmbed()
                .setColor(cfg.colors.yes)
                .setAuthor(`${scope.user.username} - Ban`, scope.user.displayAvatarURL())
                .setDescription(`${cfg.emojis.yes} **${banMember.user.tag}** je banovan/a sa servera.`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()
            );
            }


            let logs = await db.fetch(`logschannel_${message.guild.id}`);
            if (logs === null) {
              return;
            }

            const modlog = scope.channels.cache.get(logs.id);

            const embed = new Discord.MessageEmbed()
                .setAuthor(`${message.guild.name} - Ban Logs`, message.guild.iconURL())
                .setColor(cfg.colors.main)
                .setThumbnail(banMember.user.displayAvatarURL())
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .addField("\\🔨 Sankcija", "Ban", true)
                .addField("\\👥 Korisnik", banMember.user.tag, true)
                .addField("\\🆔 ID", `${banMember.id}`, true)
                .addField("\\👔 Staff", message.author.tag, true)
                .addField("\\📰 Razlog", `${reason || "**Nema razloga**"}`, true)
                .addField("\\⏰ Vreme", message.createdAt.toDateString(), true)
                .setTimestamp();

            modlog.send(embed)
      
    }
}