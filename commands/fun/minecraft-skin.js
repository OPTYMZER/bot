module.exports = {
 meta: {
     name: "minecraft-skin",
     aliases: ["mcskin", "mc-skin"],
     usage: "[nickname]",
     description: "majnkaraft skin brateu",
     hasArgs: true,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {

      const bodyyy = `https://mc-heads.net/avatar/${args[0]}/256.png`
      const bodyy = `https://mc-heads.net/body/${args[0]}`
      const body = `https://minotar.net/skin/${args[0]}`
      message.channel.send(
      new discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Minecraft Skin`, scope.user.displayAvatarURL())
        .setTimestamp()
        .setColor(cfg.colors.main)
        .setImage(bodyy)
        .setThumbnail(bodyyy)
        .setDescription(`\\🗂️ Skin korisnika **${args[0]}**.\n${cfg.emojis.arrow} Možete skinuti skin klikom na [ovaj link](${body})`)
      );

    }    
}
