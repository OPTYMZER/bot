module.exports = {
    meta: {
        name: "reverse",
        usage: "[tekst]",
        description: "Bot izbacuje tekst napisan unazad",
        hasArgs: true,
        category: 'fun',
        perms: {
            require: false
        },
    },
    pokreni: async (scope, message, args, cfg, discord) => {
    function opletiUnazad(rec){
      return rec.split("").reverse().join("");
    };
    message.channel.send(
      new discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Reverse`, scope.user.avatarURL())
      .setColor(cfg.colors.main)
      .setDescription(`\\✏️ **Normalan unos** ${args.join(" ")}\n\\🔁 **Unos unazad:** ${opletiUnazad(args.join(" "))}`)
      .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
      .setTimestamp()
    );
    }
}
