const Discord = require('discord.js')
module.exports = {
 meta: {
     name: "nuke",
     usage: '[kanal]',
     description: "Kloniraj odredjeni kanal",
     hasArgs: true,
     category: "",
     devOnly: true,
     perms: {
        require: true,
        permissions: ["MANAGE_MESSAGES"]
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
         message.delete({ timeout: 1000 });
    let reason = args.join(" ") || "Nema razloga"
        if(!message.channel.deletable) {
            return message.reply("Ovaj kanal ne moze biti nuke-an!")
        }
        let newchannel = await message.channel.clone()
        await message.channel.delete()
        let embed = new Discord.MessageEmbed()
        .setTitle("Channel Nuked")
        .setDescription(reason)
        .setImage('https://media0.giphy.com/media/oe33xf3B50fsc/200.gif')
        await newchannel.send(embed)
    }
}