module.exports = {
    meta: {
        name: "gayrate",
        usage: "[osoba]",
        description: "Bot vam iskazuje gej procenat",
        hasArgs: false,
        category: "fun",
        perms: {
            require: false
        },
    },
    pokreni: async (scope, message, args, cfg, discord) => {
    
    let procenat = Math.floor(Math.random() * 100);
    let user = message.guild.member(message.mentions.users.first())
    if(!user) {
      return message.channel.send(
        new discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Gayrate`, scope.user.avatarURL())
        .setColor(cfg.colors.main)
        .setDescription(`\\🏳️‍🌈 Vi ste **${procenat}%** gej.`)
        .setThumbnail(message.author.avatarURL())
        .setTimestamp()
        .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
      );
    } else {
      return message.channel.send(
        new discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Gayrate`, scope.user.avatarURL())
        .setColor(cfg.colors.main)
        .setDescription(`\\🏳️‍🌈 ${user.user.tag} je **${procenat}%** gej.`)
        .setThumbnail(user.user.avatarURL())
        .setTimestamp()
        .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
      );
    } 
    }
}