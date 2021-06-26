const db = require("quick.db");
const ms = require("parse-ms");
module.exports = {
 meta: {
     name: "work",
     aliases: ["wrk"],
     description: "Radite određeni posao za novac",
     hasArgs: false,
     category: "economy",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
    let randomJobs = [
    "trgovac",
    "frizer",
    "gradjevinac",
    "čistač",
    "nastavnik",
    "bolničar",
    "policajac",
    "vatrogasac",
    "taksista",
    "veterinar",
    "blagajnik",
    "prevodilac",
    "arhitekta",
    "farmaceut",
    "novinar",
    "analiticar",
    "psiholog",
    "doktor",
    "producent",
    "fotograf",
    "mesar",
    "vodoinstalater",
    "konobar",
    "batler",
    "špijun",
    "kaskader",
    "elektroinstalater",
    "računovođa",
    "kuvar"
    ];

let poso = randomJobs[Math.floor(Math.random() * randomJobs.length)]

    let user = message.author;
    let author = await db.fetch(`work_${message.guild.id}_${user.id}`)
    let timeout = 500000;

    if (author !== null && timeout - (Date.now() - author) > 0) {
      let time = ms(timeout - (Date.now() - author));
      message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Work`, scope.user.displayAvatarURL())
        .setDescription(`${cfg.emojis.no} Već ste radili, pričekajte još **${time.seconds}** sekundi`)
        .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
        .setColor(cfg.colors.no)
        .setTimestamp()
      );
    } else {
      let bal = db.fetch(`money_${message.guild.id}_${user.id}`);
      if (bal === null) bal = 0;
      let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`);
      if (bank === null) bank = 0;
      let allBalance = parseInt(bal) + parseInt(bank);
      let amount = Math.floor(Math.random() * 300) + 1;

  
 let transakcije = db.fetch(`transakcije_${message.guild.id}_${message.author.id}`) || [];
    transakcije.unshift(`[**+ $${amount}**] Dobijeno radeći kao **${poso}**`); //nope
    db.set(`transakcije_${message.guild.id}_${message.author.id}`, transakcije);

      message.channel.send(
      new Discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Work`, scope.user.displayAvatarURL())
        .setDescription(`${cfg.emojis.yes} Radili ste kao **${poso}** i zaradili ste **$${amount}**! `)
        .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
        .setColor(cfg.colors.yes)
        .setTimestamp()
      );
      db.add(`money_${message.guild.id}_${message.author.id}`, amount);
      db.set(`work_${message.guild.id}_${user.id}`, Date.now())


    };
  }
}