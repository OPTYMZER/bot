module.exports = {
    meta: {
        name: "emotelist",
        aliases: ["emojilist", "emojis", "emotes"],
        usage: "emotelist",
        description: "Lista svih emote-a",
        hasArgs: false,
        category: 'user',
        perms: {
            require: false
        },
    },
    pokreni: async (scope, message, args, cfg, discord) => {
 message.delete({ timeout: 1000 });
        let Emojis = "";
        let EmojisAnimated = "";
        let EmojiCount = 0;
        let Animated = 0;
        let OverallEmojis = 0;
        function Emoji(id) {
          return scope.emojis.cache.get(id).toString();
        }
        if (Animated === 0) Animated = "Nema ih";
        message.guild.emojis.cache.forEach(emoji => {
          OverallEmojis++;
          if (emoji.animated) {
            Animated++;
            EmojisAnimated += Emoji(emoji.id);
          } else {
            EmojiCount++;
            Emojis += Emoji(emoji.id);
          }
        });

        message.channel.send(
            new discord.MessageEmbed()
          .setAuthor(`Lista emotikona u ${message.guild.name}.`, message.guild.iconURL())
          .setDescription(`> ${cfg.emojis.arrow} **Ukupan broj emotikona**: (__${OverallEmojis}__) 
          ${cfg.emojis.arrow} **Animirani emotikoni**:\n${EmojisAnimated}
          ${cfg.emojis.arrow} **Normalni emotikoni**:\n${Emojis}`)
          .setColor(cfg.emojis.main)
        );
      
    }
}