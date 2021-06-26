module.exports = {
 meta: {
     name: "laugh",
     aliases: ["smeh"],
     description: "Smejte se",
     hasArgs: false,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {
      
      let h = Math.floor(Math.random() * 14)
      let gif = `https://scopebot.xyz/scope-api/assets/gifs/Laugh/${h}.gif`
      if (gif == `https://scopebot.xyz/scope-api/assets/gifs/Laugh/0.gif`) gif = "https://scopebot.xyz/scope-api/assets/gifs/Laugh/1.gif"
        message.channel.send(
          new discord.MessageEmbed()
          .setDescription(`${message.author} se smeje :)`)
          .setColor(cfg.colors.main)
          .setImage(gif)
          .setFooter(`Hahaha...`)
          );
      
    }
}