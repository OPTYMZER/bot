const figlet = require("figlet");
module.exports = {
 meta: {
     name: "ascii",
     usage: "[tekst]",
     description: "Prebacujete tekst u ascii format",
     hasArgs: true,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {
    let maxLen = 100;
    if(args.join(' ').length > maxLen) return message.channel.send(`${maxLen} je maksimalan broj karaktera!`) 
    if (!args[0]) return message.channel.send(
    new discord.MessageEmbed()
      .setAuthor(`${scope.user.username} - Ascii`, scope.user.displayAvatarURL())
      .setColor(cfg.colors.red)
      .setDescription(`${cfg.colors.x}` + " Morate uneti neki tekst.")
      .setTimestamp()
      .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL)
    ); 



  
  figlet(`${args.join(' ')}`, function(err, data) {
      if (err) {
          console.log('Theres a mistake...');
          console.dir(err);
          return;
      }
   
      message.channel.send(`${data}`, {code: 'AsciiArt'});
  });
      
    }
}