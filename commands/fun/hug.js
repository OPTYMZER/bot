module.exports = {
 meta: {
     name: "hug",
     aliases: ["zagrli"],
     usage: "[osoba]",
     description: "Zagrlite željenog korisnika",
     hasArgs: false,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {
      
      let h = Math.floor(Math.random() * 18)
      let gif = `https://scopebot.xyz/scope-api/assets/gifs/Hug/${h}.gif`
      let peder = message.mentions.users.first();

      if (!peder) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Hug`, scope.user.avatarURL())
          .setColor(cfg.colors.no)
          .setDescription(`${cfg.emojis.no} Ne mozete da zagrlite vazduh.`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTimestamp()
          );
      } else if (peder == message.author) {
        return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - Hug`, scope.user.avatarURL())
          .setColor(cfg.emojis.no)
          .setDescription(`${cfg.emojis.no} Ne možete zagrliti sami sebe.`)
          .setFooter(message.author.username, message.author.avatarURL())
          .setTimestamp()
          );
      } else {
        if (gif == `https://scopebot.xyz/scope-api/assets/gifs/Hug/0.gif`) gif = "https://scopebot.xyz/scope-api/assets/gifs/Hug/1.gif"
        return message.channel.send(
          new discord.MessageEmbed()
          .setDescription(`${message.author} je zagrlio/la ${peder}`)
          .setColor(cfg.colors.main)
          .setImage(gif)
          .setFooter(`H-haaa...`)
          );
      };
      
    }
}