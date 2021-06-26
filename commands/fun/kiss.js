module.exports = {
 meta: {
     name: "kiss",
     aliases: ["poljubi"],
     usage: "[osoba]",
     description: "Poljubite željenog korisnika",
     hasArgs: false,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {
      
      let h = Math.floor(Math.random() * 18)
      let gif = `https://scopebot.xyz/scope-api/assets/gifs/Kiss/${h}.gif`
      let peder = message.mentions.users.first();

      if (!peder) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Kiss`, scope.user.avatarURL())
          .setColor(cfg.colors.no)
          .setDescription(`${cfg.emojis.no} Ne mozete da poljubite vazduh.`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTimestamp()
          );
      } else if (peder == message.author) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Kiss`, scope.user.avatarURL())
          .setColor(cfg.emojis.no)
          .setDescription(`${cfg.emojis.no} Ne možete poljubiti sami sebe.`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTimestamp()
          );
      } else {
        if (gif == `https://scopebot.xyz/scope-api/assets/gifs/Kiss/0.gif`) gif = "https://scopebot.xyz/scope-api/assets/gifs/Kiss/1.gif"
        return message.channel.send(
          new discord.MessageEmbed()
          .setDescription(`${message.author} je poljubio/la ${peder}`)
          .setColor(cfg.colors.main)
          .setImage(gif)
          .setFooter(`M-mm...`)
          );
      };
      
    }
}