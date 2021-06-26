module.exports = {
 meta: {
     name: "poke",
     aliases: ["bocni"],
     usage: "[osoba]",
     description: "Bocnite željenog korisnika",
     hasArgs: false,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {
      
      let h = Math.floor(Math.random() * 10)
      let gif = `https://scopebot.xyz/scope-api/assets/gifs/Poke/${h}.gif`
      let peder = message.mentions.users.first();

      if (!peder) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Poke`, scope.user.avatarURL())
          .setColor(cfg.colors.no)
          .setDescription(`${cfg.emojis.no} Ne možete da bocnete vazduh.`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTimestamp()
          );
      } else if (peder == message.author) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Poke`, scope.user.avatarURL())
          .setColor(cfg.emojis.no)
          .setDescription(`${cfg.emojis.no} Ne možete bocnuti sami sebe.`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTimestamp()
          );
      } else {
        if (gif == `https://scopebot.xyz/scope-api/assets/gifs/Poke/0.gif`) gif = "https://scopebot.xyz/scope-api/assets/gifs/Poke/1.gif"
        return message.channel.send(
          new discord.MessageEmbed()
          .setDescription(`${message.author} je bocnuo/la ${peder}`)
          .setColor(cfg.colors.main)
          .setImage(gif)
          .setFooter(`W-what :?`)
          );
      };
      
    }
}