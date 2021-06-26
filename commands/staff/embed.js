const db = require("quick.db");
module.exports = {
 meta: {
     name: "embed",
     usage: 'text',
     description: "Pošaljite poruku u embedu",
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
 if(!args[0]) {
    message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Embed`, scope.user.displayAvatarURL())
      .setDescription(`${cfg.emojis.no} Morate uneti neki tekst!`)
      .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
      .setColor(cfg.colors.no)
      .setTimestamp()
    );
    return;
  }
  
  var argsInEmbed = args.join(" ");
  
  message.channel.send(
    new Discord.MessageEmbed()
    .setDescription(argsInEmbed)
    .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
    .setColor(cfg.colors.main)
    .setTimestamp()
  );
  
  setTimeout(() => {
    message.delete({ timeout: 500 });
  }, 500);

      
    }
}