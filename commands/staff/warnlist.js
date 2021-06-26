const db = require("quick.db");
module.exports = {
 meta: {
     name: "warnlist",
     aliases: ['wlist', 'warns'],
     description: "Pogledajte listu upozorenih korisnika na serveru",
     hasArgs: false,
     category: "staff",
     devOnly: false,
     perms: {
        require: true,
        permissions: ["ADMINISTRATOR"]
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
         message.delete({ timeout: 1000 });
        let warns = await db
        .all()
        .filter(data => data.ID.startsWith(`warns_${message.guild.id}`))
        .sort((a, b) => b.data - a.data);
      let content = "";
    
      for (let i = 0; i < warns.length; i++) {
        let user =
          scope.users.cache.get(warns[i].ID.split("_")[2]) ||
          (await scope.users.fetch(warns[i].ID.split("_")[2]));
        let warn = await db.fetch(warns[i].ID);
        content += `${cfg.emojis.arrow} ${user} - Broj upozorenja: **${warn}**\n`;
      }
      let embed = new Discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Warn list`, scope.user.displayAvatarURL())
        .setThumbnail(message.guild.iconURL())
        .setDescription(`${content}`)
        .setColor(cfg.colors.main)
        .setFooter(message.member.displayName, message.author.displayAvatarURL())
        .setTimestamp();
      message.channel.send(embed); 
    }
}