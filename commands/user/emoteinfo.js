module.exports = {
    meta: {
        name: "emoteinfo",
        usage: "emoteinfo ime",
        description: "Informacija od emote-u",
        hasArgs: false,
        category: 'user',
        perms: {
            require: false
        },
    },
    pokreni: async (scope, message, args, cfg, discord) => {
 message.delete({ timeout: 1000 });
     let emoji;
  if (
    args[0] &&
    hasNumber(args[0]) &&
    args[0].match(/^\d+|\d+\b|\d+(?=\w)/g)[0]
  ) {
    let bc = args[0].match(/^\d+|\d+\b|\d+(?=\w)/g)[0];
    emoji = scope.emojis.cache.get(bc);

    const emoteurl = emoji.url;

    return message.channel.send(
new discord.MessageEmbed()

      .setAuthor("Emote Info ", emoteurl)
      .setDescription(`
${cfg.emojis.arrow} Ime **-** ${emoji.name}
${cfg.emojis.arrow} ID **-** ${emoji.id}
${cfg.emojis.arrow} Napravljen **-** ${emoji.createdAt.toDateString()}
${cfg.emojis.arrow} Animiran **-** ${
      emoji.animated
        ? `${cfg.emojis.yes}`
        : `${cfg.emojis.no}`
    }
`)
      .setColor(cfg.colors.main)
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL()));
  } else {

  return message.channel.send(
new discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Emote info`, scope.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.no} Morate uneti emoji sa servera.`)
      .setColor(cfg.colors.no)
      .setTimestamp()
      .setFooter(message.author.tag, message.author.displayAvatarURL()));
  }
      function hasNumber(myString) {
  return /\d/.test(myString);
}
      
    }
}