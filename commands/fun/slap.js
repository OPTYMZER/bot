module.exports = {
 meta: {
     name: "slap",
     aliases: ["osamari"],
     usage: "[osoba]",
     description: "Udarite šamar željenom korisniku",
     hasArgs: false,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {
      
      let h = Math.floor(Math.random() * 15)
      let gif = `https://scopebot.xyz/scope-api/assets/gifs/Slap/${h}.gif`
      let peder = message.mentions.users.first();

      if (!peder) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Slap`, scope.user.avatarURL())
          .setColor(cfg.colors.no)
          .setDescription(`${cfg.emojis.no} Ne možete da ošamariš vazduh.`)
          .setFooter(message.author.username, message.author.avatarURL()) // ocu testam ovo menjaj ot slobodno kasnije
          .setTimestamp()
          );
      } else if (peder == message.author) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Slap`, scope.user.avatarURL())
          .setColor(cfg.emojis.no)
          .setDescription(`${cfg.emojis.no} Ne mozete ošamariti sami sebe.`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTimestamp()
          );
      } else {
        if (gif == `https://scopebot.xyz/scope-api/assets/gifs/Slap/0.gif`) gif = "https://scopebot.xyz/scope-api/assets/gifs/Slap/1.gif"
        return message.channel.send(
          new discord.MessageEmbed()
          .setDescription(`${message.author} je ošamario/la ${peder}`)
          .setColor(cfg.colors.main)
          .setImage(gif)
          .setFooter(`W-waa... Why?`)
          );
      };
      
    }
}