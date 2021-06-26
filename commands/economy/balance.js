const db = require("quick.db");
module.exports = {
 meta: {
     name: "balance",
     aliases: ["bal", "money"],
     description: "Stanje računa",
     hasArgs: false,
     category: "economy",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {
    let user = message.mentions.members.first() || message.author;
    let bal = db.fetch(`money_${message.guild.id}_${user.id}`);
    if (bal === null) bal = 0;
    let bank = await db.fetch(`bank_${message.guild.id}_${user.id}`);
    if (bank === null) bank = 0;
    let allBalance = parseInt(bal) + parseInt(bank);
    let transakcije = db.fetch(`transakcije_${message.guild.id}_${user.id}`) || [];
    let transakcijeMSG = "";

    for(const transakcija of transakcije.slice(0, 10)) {
      transakcijeMSG += `\n> ${transakcija}`
    } 

    if (user == message.author) {
      message.channel.send(
      new discord.MessageEmbed()
        .setColor(cfg.colors.main)
        .setAuthor(`${scope.user.username} - Balance`, scope.user.displayAvatarURL())
        .setDescription(`${cfg.emojis.arrow} Stanje korisnika **${user.tag}** \n\n > \\💸 Novčanik: **$${bal.toLocaleString()}** \n> \\💳 Banka: **$${bank.toLocaleString()}** \n> \\💰 Ukupno: **$${allBalance.toLocaleString()}**\n\n${cfg.emojis.arrow} **TRANSAKCIJE**:${transakcijeMSG}`)
        .setThumbnail(`${user.displayAvatarURL()}`)
        .setTimestamp()
        .setFooter(message.member.displayName, message.author.displayAvatarURL())
      );
    } else {
      let transakcije = db.fetch(`transakcije_${message.guild.id}_${user.id}`) || [];
      let transakcijeMSG = "";
      for(const transakcija of transakcije.slice(0, 10)) {
        transakcijeMSG += `\n> ${transakcija}`
    }; 

      message.channel.send(
      new discord.MessageEmbed()
        .setColor(cfg.colors.main)
        .setAuthor(`${scope.user.username} - Balance`, scope.user.displayAvatarURL())
        .setDescription(`${cfg.emojis.arrow} Stanje korisnika **${user.user.tag}** \n\n > \\💸 Novčanik: **$${bal.toLocaleString()}** \n> \\💳 Banka: **$${bank.toLocaleString()}** \n> \\💰 Ukupno: **$${allBalance.toLocaleString()}**\n\n${cfg.emojis.arrow} **TRANSAKCIJE**:${transakcijeMSG}`)
        .setThumbnail(`${user.user.displayAvatarURL()}`)
        .setTimestamp()
        .setFooter(message.member.displayName, message.author.displayAvatarURL())
      );
    }
  }
}