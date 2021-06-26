const db = require("quick.db");
module.exports = {
 meta: {
     name: "kick",
     usage: '[@korisnik | ID] [razlog]',
     description: "Kickujete željenog korisnika sa servera",
     hasArgs: true,
     category: "staff",
     devOnly: false,
     perms: {
        require: true,
        permissions: ["KICK_MEMBERS"]
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
       message.delete({ timeout: 1000 });
      let prefix = await db.fetch(`newprefix_${message.guild.id}`);
      if (prefix === null) prefix = ".";


            let kickMember = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args[0].toLocaleLowerCase()) || message.guild.members.cache.find(ro => ro.displayName.toLowerCase() === args[0].toLocaleLowerCase());
            if (!kickMember) return message.channel.send(
              new Discord.MessageEmbed()
                .setAuthor(`${scope.user.username} - Kick`, scope.user.displayAvatarURL())
                .setColor(cfg.colors.no)
                .setDescription(`${cfg.emojis.no} Navedite validnog korisnika.\n${cfg.emojis.yes} ${prefix}kick [\`@korisnik | ID\`] [\`razlog\`]`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()
            );
      
            if (kickMember === message.member) return message.channel.send(
              new Discord.MessageEmbed()
                .setAuthor(`${scope.user.username} - Kick`, scope.user.displayAvatarURL())
                .setColor(cfg.colors.no)
                .setDescription(`${cfg.emojis.no} Ne možete kickati sebe.`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()
            );

            var reason = args.slice(1).join(" ");

            if (!kickMember.bannable) return message.channel.send(
              new Discord.MessageEmbed()
                .setAuthor(`${scope.user.username} - Kick`, scope.user.displayAvatarURL())
                .setColor(cfg.colors.no)
                .setDescription(`${cfg.emojis.no} Ne možete banovati tog korisnika.`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()

            )
            try {
            kickMember.send(`Dobili ste kick sa **${message.guild.name}**  zbog (**${reason || "Nema razloga"}**)`).then(() =>
                message.guild.members.kick(kickMember, { days: 7, reason: reason })).catch(() => null)
            } catch {
                message.guild.members.kick(kickMember, { days: 7, reason: reason })
            }
            if (reason) {
            message.channel.send(
              new Discord.MessageEmbed()
                .setColor(cfg.colors.yes)
                .setAuthor(`${scope.user.username} - Kick`, scope.user.displayAvatarURL())
                .setDescription(`${cfg.emojis.yes} **${kickMember.user.tag}** je kickovan/a sa servera zbog (**${reason}**)`)
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .setTimestamp()
            );
            } else {
            message.channel.send(
              new Discord.MessageEmbed()
                .setColor(cfg.colors.yes)
                .setAuthor(`${scope.user.username} - Kick`, scope.user.displayAvatarURL())
                .setDescription(`${cfg.emojis.yes} **${kickMember.user.tag}** je kickovan/a sa servera.`)
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
                .setAuthor(`${message.guild.name} - Kick Logs`, message.guild.iconURL())
                .setColor(cfg.colors.main)
                .setThumbnail(kickMember.user.displayAvatarURL())
                .setFooter(message.author.username, message.author.displayAvatarURL())
                .addField("\\🔨 Sankcija", "Kick", true)
                .addField("\\👥 Korisnik", kickMember.user.tag, true)
                .addField("\\🆔 ID", `${kickMember.id}`, true)
                .addField("\\👔 Staff", message.author.tag, true)
                .addField("\\📰 Razlog", `${reason || "**Nema razloga**"}`, true)
                .addField("\\⏰ Vreme", message.createdAt.toDateString(), true)
                .setTimestamp();

            modlog.send(embed)
      
    }
}