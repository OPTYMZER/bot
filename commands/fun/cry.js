module.exports = {
 meta: {
     name: "cry",
     aliases: ["placi"],
     description: "Plačete",
     hasArgs: false,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {
      
      let h = Math.floor(Math.random() * 14)
      let gif = `https://scopebot.xyz/scope-api/assets/gifs/Cry/${h}.gif`
      if (gif == `https://scopebot.xyz/scope-api/assets/gifs/Cry/0.gif`) gif = "https://scopebot.xyz/scope-api/assets/gifs/Cry/1.gif"
        message.channel.send(
          new discord.MessageEmbed()
          .setDescription(`${message.author} plače :(`)
          .setColor(cfg.colors.main)
          .setImage(gif)
          .setFooter(`W-waaaa...`)
          );
      
    }
}