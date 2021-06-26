const db = require("quick.db");
module.exports = {
 meta: {
     name: "clear",
     usage: '100',
     description: "Obrišite određeni broj poruka",
     hasArgs: true,
     category: "staff",
     devOnly: false,
     perms: {
        require: true,
        permissions: ["MANAGE_MESSAGES"]
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
       message.delete({ timeout: 1000 });
     if (!args[0]) {
    message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Clear`, scope.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.no}` + " Morate uneti broj poruka!")
      .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
      .setColor(cfg.colors.no)
      .setTimestamp()
    );
    return;
  }

  if (isNaN(args[0])) {
      message.channel.send(
        new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Clear`, scope.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.no}` + " Morate uneti validan broj poruka!")
      .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
      .setColor(cfg.colors.no)
      .setTimestamp()
      );

    return;
  }

  await message.delete();

  const fetched = await message.channel.messages.fetch({ limit: args[0] });

  await message.channel.bulkDelete(fetched).catch(err => {
    console.error(err);
  });

  let logs = await db.fetch(`lchannel_${message.guild.id}`);
  if (logs === null) {
    return;
  }

  const modlog = scope.channels.cache.get(logs.id);

  modlog.send(
    new Discord.MessageEmbed()
    .setAuthor(`${message.guild} - Clear Logs`, message.guild.iconURL())
    .setDescription(`\`✂️\` **${message.author.username}** je izbrisao **${args[0]}** poruka.
    ${scope.dot} Kanal: ${message.channel} (**${message.channel.id}**)`)
    .setThumbnail(message.author.avatarURL())
    .setFooter(message.member.displayName, message.author.displayAvatarURL())
    .setColor(cfg.colors.main)
    .setTimestamp()
  );

  message.channel.send(
    new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Clear`, scope.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.y} Izbrisali ste __**${args[0]}**__ poruka.`)
      .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
      .setColor(cfg.colors.yes)
      .setTimestamp()
  );
      
    }
}