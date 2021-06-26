const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()

    let suggestion = args.join(" ");

    if(!args.join(" ")) return client.missingArguments(client.command, client.l.utilities.suggest.usage)

    var confirm = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.utilities.suggest.sent)
        .setFooter(client.l.utilities.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
    const fail = await message.channel.send(confirm);setTimeout(() => {fail.delete()}, 6000); 

    let suggestEmbed = new Discord.MessageEmbed()
        .setTitle(client.l.utilities.suggest.new)
        .setColor(client.config.colour)
        .setDescription(suggestion)
        .setThumbnail(client.user.displayAvatarURL())
        .setFooter(client.l.utilities.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        .setTimestamp(message.createdAt)

    client.suggestionChannel.send(suggestEmbed).then(function (message) {message.react(`✅`).then(() => {message.react(`❎`)})})

    client.log(client.l.utilities.suggest.log, `${client.l.gen.logs.user} ${message.author} (${message.author.id})\n${client.l.gen.logs.channel} ${message.channel}\n${client.l.gen.logs.suggestion} ${suggestion}`)

}

// © Zeltux Discord Bot | Do Not Copy