let inline = true;
const verlvl = {
  NONE: "Nije postavljen",
  LOW: "Low (**Verifikovan Discord email**)",
  MEDIUM: "Medium (**Nalog mora biti stariji više od 5 minuta**)",
  HIGH: "(╯°□°）╯︵ ┻━┻ (**Mora biti 10 minuta na serveru**)",
  VERY_HIGH: "(ノಠ益ಠ)ノ彡┻━┻ (**Mora imati broj telefona povezan sa nalogom**)"
};

function checkDays(date) {
  let now = new Date();
  let diff = now.getTime() - date.getTime();
  let days = Math.floor(diff / 86400000);
  return "Pre " + days + (days == 1 ? " dan" : " dana") + " ";
}

module.exports = {
    meta: {
        name: "serverinfo",
        aliases: ["srwinfo"],
        usage: "serverinfo",
        description: "Informacije server",
        hasArgs: false,
        category: 'user',
        perms: {
            require: false
        },
    },
    pokreni: async (scope, message, args, cfg, discord) => {
 message.delete({ timeout: 1000 });
      const user = message.mentions.users.first() || message.author;
      let sicon = message.guild.iconURL();
      const verified =
        message.guild.verified !== true
          ? "<:error_scope:726850984235630693>"
          : "<:success_scope:726850984248213554>";
      const afk_channel =
        message.guild.afkChannel === null
          ? "<:nothing_scope:726850984051081217>"
          : message.guild.afkChannel;
    
    
      const regions = {
          brazil: 'Brazil',
          europe: 'Centralna Europa',
          hongkong: 'Hong Kong',
          india: 'India',
          japan: 'Japan',
          russia: 'Russia',
          singapore: 'Singapore',
          southafrica: 'South Africa',
          sydeny: 'Sydeny',
          'us-central': 'US Central',
          'us-east': 'US East',
          'us-west': 'US West',
          'us-south': 'US South'
    };
    
      message.channel.send(
        new discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Server Info`, scope.user.displayAvatarURL())
      .setDescription(`\`⏰\` **Server napravljen**: 
    ${cfg.emojis.arrow} ${message.guild.createdAt.toDateString()} ( **${checkDays(message.channel.guild.createdAt)}**)
    
    \`👑\` **Vlasnik servera**:
    ${cfg.emojis.arrow} <@${message.guild.ownerID}>
    
    \`📊\` **Kanali & rankovi**:
    ${cfg.emojis.arrow} **${message.guild.channels.cache.size}** kanala & **${message.guild.roles.cache.size}** rankova
    
    \`🌎\` **Region servera**:
    ${cfg.emojis.arrow}  ${regions[message.guild.region]}
    
    \`📛\` **Level moderacije**:
    ${cfg.emojis.arrow}  ${verlvl[message.guild.verificationLevel]}
    
    \`🎁\` **Nitro boost**:
    ${cfg.emojis.arrow}  Level **${message.guild.premiumTier}** (**${message.guild.premiumSubscriptionCount}** boostova)`)
      .setColor(cfg.colors.main)
      .setThumbnail(sicon)
      .setImage(message.guild.bannerURL({format: "png", size: 512}))
      .setTimestamp()
      .setFooter(message.author.username, message.author.displayAvatarURL({format: "png", size: 32, dynamic: true}))
      );

    }
}