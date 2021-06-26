module.exports = {
 meta: {
     name: "pat",
     aliases: ["pomazi"],
     usage: "[osoba]",
     description: "Pomazite željenog korisnika",
     hasArgs: false,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {
      
      let h = Math.floor(Math.random() * 15)
      let gif = `https://scopebot.xyz/scope-api/assets/gifs/Pat/${h}.gif`
      let peder = message.mentions.users.first();

      if (!peder) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Pat`, scope.user.avatarURL())
          .setColor(cfg.colors.no)
          .setDescription(`${cfg.emojis.no} Ne možete da pomazite vazduh.`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTimestamp()
          );
      } else if (peder == message.author) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Pat`, scope.user.avatarURL())
          .setColor(cfg.emojis.no)
          .setDescription(`${cfg.emojis.no} Ne možete pomaziti sami sebe.`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTimestamp()
          );
      } else {
        if (gif == `https://scopebot.xyz/scope-api/assets/gifs/Pat/0.gif`) gif = "https://scopebot.xyz/scope-api/assets/gifs/Pat/1.gif"
        return message.channel.send(
          new discord.MessageEmbed()
          .setDescription(`${message.author} je pomazio/la ${peder}`)
          .setColor(cfg.colors.main)
          .setImage(gif)
          .setFooter(`Y-yeahhh...`)
          );
      };
      
    }
}