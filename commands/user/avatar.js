module.exports = {
    meta: {
        name: "avatar",
        usage: "avatar @korisnik",
        description: "Avatar",
        hasArgs: false,
        category: 'user',
        perms: {
            require: false
        },
    },
    pokreni: async (scope, message, args, cfg, discord) => {
 message.delete({ timeout: 1000 });
    if (!message.mentions.users.size) {
      return message.channel.send(
        new discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Avatar`, scope.user.displayAvatarURL())
        .setImage(message.author.avatarURL({ format: 'png', dynamic: true, size: 1024 }))
        .setDescription(`\`📷\` Avatar korisnika **${message.author.tag}**`)
        .setColor(cfg.colors.main)
        .setTimestamp()
      );
    }
    var user = message.mentions.users.first();
    message.channel.send(
      new discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Avatar`, scope.user.displayAvatarURL())
      .setImage(user.displayAvatarURL({ format: 'png', dynamic: true, size: 1024 }))
      .setDescription(`\`📷\` Avatar korisnika **${user.tag}**`)
      .setColor(cfg.colors.main)
      .setTimestamp()
    );

    }
}