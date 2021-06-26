module.exports = {
 meta: {
     name: "bite",
     aliases: ["ujedi", "ugrizi"],
     usage: "[osoba]",
     description: "Ujedete željenog korisnika",
     hasArgs: false,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {
      
      let h = Math.floor(Math.random() * 8)
      let gif = ``
      let peder = message.mentions.users.first();

      if (!peder) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Bite`, scope.user.avatarURL())
          .setColor(cfg.colors.no)
          .setDescription(`${cfg.emojis.no} Ne mozete da ujedete vazduh.`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTimestamp()
          );
      } else if (peder == message.author) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Bite`, scope.user.avatarURL())
          .setColor(cfg.emojis.no)
          .setDescription(`${cfg.emojis.no} Ne mozete ujesti sami sebe.`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTimestamp()
          );
      } else {
      if (gif == ``) 
        return message.channel.send(
          new discord.MessageEmbed()
          .setDescription(`${message.author} je ujeo/la ${peder}`)
          .setColor(cfg.colors.main)
          .setImage(gif)
          .setFooter(`A-aaaaaa...`)
          );
      };
      
    }
}