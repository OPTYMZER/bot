const querystring = require('querystring');
const db = require("quick.db");
const fetch = require('node-fetch');
module.exports = {
 meta: {
     name: "urban",
     usage: "[rec]",
     description: "Pronadji znacenje neke reci",
     hasArgs: false,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {

      let prefix = await db.fetch(`newprefix_${message.guild.id}`);
      if (prefix === null) prefix = ".";
      
      if (!args.length) {
        return message.channel.send(
          new discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Urban`, scope.user.displayAvatarURL())
            .setColor(cfg.colors.no)
            .setDescription(`${cfg.emojis.no} Navedite reč za pretragu.\n${cfg.emojis.arrow} Koristite: ${prefix}urban \`[reč]\``)
            .setFooter(message.author.username, message.author.displayAvatarURL())
            .setTimestamp()
        )
      }
      const trim = (str, max) => (str.length > max ? `${str.slice(0, max - 3)}...` : str);
      const query = querystring.stringify({ term: args.join(' ') });

      const { list } = await fetch(`https://api.urbandictionary.com/v0/define?${query}`).then(response => response.json());

      if (!list.length) {
        return message.channel.send(`${cfg.emojis.no} Nema rezultata za reč: **${args.join(' ')}**.`);
      }

      const [answer] = list;

      const embed = new discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Urban`, scope.user.displayAvatarURL())
        .setColor(cfg.colors.main)
        .setTitle(answer.word)
        .setURL(answer.permalink)
        .addFields(
          { name: '> \\📖 Definicija', value: trim(answer.definition.replace(/\[/g, '').replace(/\]/g, ''), 1024) },
          { name: '> \\💎 Primer', value: trim(answer.example.replace(/\[/g, '').replace(/\]/g, ''), 1024) },
          { name: '> \\🏆 Rating', value: `\`${answer.thumbs_up}👍|${answer.thumbs_down}👎\`` },
        );
      message.channel.send(embed);

    }
}
