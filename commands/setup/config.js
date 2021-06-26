const db = require("quick.db");
module.exports = {
 meta: {
     name: "config",
     aliases: ["configuracija", "konfiguracija"],
     description: "Konfiguracija servera",
     hasArgs: false,
     category: "setup",
     devOnly: false,
     perms: {
        require: true,
        permissions: ["MANAGE_GUILD"]
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
  let prefix = db.get(`newprefix_${message.guild.id}`);
  if (prefix === null) prefix = "**.** (Default)";
  if (prefix === ".") {
    prefix = "**.** (Default)";
  }
  let logs = db.get(`lchannel_${message.guild.id}`);
  if (logs === null) logs = "Nije Postavljeno";
  let logsTag = logs.id ? `<#${logs.id}>` : "Nije Postavljeno";

  let Pages = [
  new Discord.MessageEmbed()
    .setAuthor(`${scope.user.username} - Config`, scope.user.displayAvatarURL())
    .addField("\\🔧 Server prefix", `${cfg.emojis.arrow} ${prefix}`)
    .addField("\\⚙️ Logs", `${cfg.emojis.arrow} ${logsTag}`)
    .setColor(cfg.colors.main)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setTimestamp(),
      new Discord.MessageEmbed()
    .setAuthor(`${scope.user.username} - Config`, scope.user.displayAvatarURL())
    .setDescription(`2 page bracki`)
    .setColor(cfg.colors.main)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setTimestamp(),
     new Discord.MessageEmbed()
    .setAuthor(`${scope.user.username} - Config`, scope.user.displayAvatarURL())
    .setDescription(`3 page bracki`)
    .setColor(cfg.colors.main)
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setTimestamp(),
  ];

  let pageI = 0;
  let msg = await message.channel.send(Pages[pageI]);
  await msg.react("⏪");
  await msg.react("⏩");
  let backFilter = (reaction, user) =>
    (reaction.emoji.name === "⏪") & (user.id === message.author.id);
  let forwardFilter = (reaction, user) =>
    (reaction.emoji.name === "⏩") & (user.id === message.author.id);

  let back = msg.createReactionCollector(backFilter, {
    time: 12000000
  });
  let forward = msg.createReactionCollector(forwardFilter, {
    time: 12000000
  });

  back.on("collect", r => {
    r.users.remove(message.author);
    if (pageI === 0) return;
    pageI--;
    msg.edit(Pages[pageI]);
  });

  forward.on("collect", r => {
    r.users.remove(message.author);
    if (pageI === Pages.length - 1) return;
    pageI++;
    msg.edit(Pages[pageI]);
  });
  return;
}
}
