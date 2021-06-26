const weather = require("weather-js");

module.exports = {
 meta: {
     name: "weather",
     aliases: ["vreme"],
     usage: "[mesto]",
     description: "Vreme mraleu",
     hasArgs: false,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {
      
      let error1 = new discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Weather`, scope.user.displayAvatarURL())
        .setDescription(`${cfg.emojis.no} Morate uneti lokaciju.`)
        .setColor(cfg.colors.no)
        .setTimestamp()
        .setFooter(message.member.displayName, message.author.displayAvatarURL());

      weather.find(
        {
          search: args.join(" "),
          degreeType: "C"
        },

        function(err, result) {
          if (err) console.log(err);
          if (result === undefined || result.length === 0) {
            message.channel.send(error1);
            return;
          }
          let current = result[0].current;
          let location = result[0].location;
          const embed = new discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Weather`, scope.user.displayAvatarURL())
            .setThumbnail(current.imageUrl)
            .setColor(cfg.colors.main)
            .setDescription(`> \\🔎 Lokacija: **${current.observationpoint}**

            \\❓ **Vrsta**: ${location.degreetype}
            \\🎚️ **Temperatura**: ${current.temperature}/${current.feelslike} C°
            \\💨 **Vetrovi**: ${current.winddisplay}
            \\💧 **Vlažnost**: ${current.humidity}%`)
            .setTimestamp()
            .setFooter(`${message.member.displayName}`, message.author.displayAvatarURL());
          message.channel.send({
            embed
          });
        }
      );
      
    }
}