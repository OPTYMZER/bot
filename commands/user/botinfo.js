module.exports = {
    meta: {
        name: "botinfo",
        usage: "botinfo",
        description: "Informacije bota",
        hasArgs: false,
        category: 'user',
        perms: {
            require: false
        },
    },
    pokreni: async (scope, message, args, cfg, discord) => {
 message.delete({ timeout: 1000 });
      let mesejdz = "";
      const totalSeconds = process.uptime();
      const days = Math.floor((totalSeconds % 31536000) / 86400);
      const hours = parseInt(totalSeconds / 3600) % 24;
      const minutes = parseInt(totalSeconds / 60) % 60;
      const seconds = Math.floor(totalSeconds % 60);
      mesejdz += days >= 1 ? `**${days}** dana, ` : "";
      mesejdz += hours < 10 ? `**${hours}** sati, ` : `**${hours}** sati, `;
      mesejdz += minutes < 10 ? `**${minutes}** minuta & ` : `**${minutes}** minuta & `;
      mesejdz += seconds < 10 ? `**${seconds}** sekundi` : ` **${seconds}** sekundi`;
    
    function getPBar(percent) {
        let thick = Math.floor(percent / 5);
        let thin = Math.ceil((100 - percent) / 10) * 2;
        let str = "_[_";
    
        for (let i = 0; i < thick; i++) str += "▰";
        for (let i = 0; i < thin; i++) str += "▱";
    
        str += "_]_";
    
        return str;
    };
    let usedMemory = process.memoryUsage().heapUsed / 1024 /1024;
    let totalMemory = 5000;
    let getp = ((usedMemory/totalMemory) * 5000).toFixed(2) + '%';
    
    function checkDays(date) {
      let now = new Date();
      let diff = now.getTime() - date.getTime();
      let days = Math.floor(diff / 86400000);
      return "Pre " + days + (days == 1 ? " dan" : " dana") + " ";
    }

      message.channel.send(
        new discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Bot info`, scope.user.displayAvatarURL())
        .addField(`\\🔨 Informacije`, `${cfg.emojis.arrow} Bot napravljen za Infinity™ \n${cfg.emojis.arrow} Developer: **CnOfficial#6331**`)
        .addField(`\\🤖 Status`, `${cfg.emojis.arrow} Napravljen: **June 11 2021** \n${cfg.emojis.arrow} Programski jezik: [discord.js](https://discord.js.org/)`)
        .addField(`\\📊 Statistika`, `${cfg.emojis.arrow} Serveri: **${scope.guilds.cache.size}** \n${cfg.emojis.arrow} Uptime: ${mesejdz}`)
        .addField(`\\🧮 Memorija`, `${cfg.emojis.arrow} Procenti: **${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed()}%**\n${cfg.emojis.arrow} Bar: ${getPBar(Math.round(usedMemory/totalMemory * 5000))}`)
        .setColor(cfg.colors.main)
        .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL())
      );
    }
}