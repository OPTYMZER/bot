const db = require("quick.db");
module.exports = {
 meta: {
     name: "variables",
     aliases: ["varijable", "var"],
     usage: '',
     description: "Lista svih varijabli",
     hasArgs: false,
     category: "setup",
     devOnly: false,
     perms: {
        require: true,
        permissions: ["ADMINISTRATOR"]
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {

 message.channel.send(
new Discord.MessageEmbed()
         .setAuthor(`Scope | Variables`, scope.user.displayAvatarURL())

         .setDescription(`
     {member} - Taguje korisnika u poruci ( ${message.author} )
     {member.tag} - U poruci pise ime i tag korisnika ( ${message.author.tag} )
     {server} - Ime servera ( ${message.guild.name} )
     {memberCount} - Broj Membera ( ${message.guild.members.cache.size} )
`)
        .setColor(cfg.colors.main)
        .setTimestamp()
        .setFooter(message.author.username, message.author.displayAvatarURL({format: "png", size: 32, dynamic: true})))
      
  }
}