module.exports = {
 meta: {
     name: "fight",
     aliases: ["tuci"],
     usage: "[osoba]",
     description: "Potucite se sa željenim korisnikom",
     hasArgs: false,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {
      
      let h = Math.floor(Math.random() * 17)
      let gif = `https://scopebot.xyz/scope-api/assets/gifs/Fight/${h}.gif`
      let peder = message.mentions.users.first();

      if (!peder) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Fight`, scope.user.avatarURL())
          .setColor(cfg.colors.no)
          .setDescription(`${cfg.emojis.no} Ne mozete da se potučete sa vazduhom.`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTimestamp()
          );
      } else if (peder == message.author) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Fight`, scope.user.avatarURL())
          .setColor(cfg.emojis.no)
          .setDescription(`${cfg.emojis.no} Ne možete da se potučete sami sa sobom.`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTimestamp()
          );
      } else {
        if (gif == `https://scopebot.xyz/scope-api/assets/gifs/Fight/0.gif`) gif = "https://scopebot.xyz/scope-api/assets/gifs/Fight/1.gif"
        return message.channel.send(
          new discord.MessageEmbed()
          .setDescription(`${message.author} se potukao/la sa ${peder}`)
          .setColor(cfg.colors.main)
          .setImage(gif)
          .setFooter(`K.O.`)
          );
      };
      
    }
}