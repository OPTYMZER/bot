const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    if(client.config.ticketSystem === "off") return;
    message.delete()

    const notATicketChannel = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.tick.onlyInTicketChannel)   
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))

    if (!message.channel.name.startsWith(`ticket-`)) {
        const fail = await message.channel.send(notATicketChannel);setTimeout(() => {fail.delete()}, 6000);return}

    let everyone = message.guild.roles.cache.find(x => x.name === "@everyone");
    let member = message.guild.members.cache.get(message.channel.topic.split("-")[0])

    message.guild.channels.create(`vticket-${member.user.username.toLowerCase()}`, {type: 'voice',
    topic: message.author.id}).then(c => {

    let roles = []
    client.config.canSeeTicket.forEach(role => roles.push(client.findRole(role)))

    flag = false
    roles.forEach(role => {c.createOverwrite(role, {CONNECT: true, SPEAK: true, VIEW_CHANNEL: true})})

    c.createOverwrite(everyone, {CONNECT: false, SPEAK: false, VIEW_CHANNEL: false})
    c.createOverwrite(member, {CONNECT: true, SPEAK: true, VIEW_CHANNEL: true})
    c.setParent(client.ticketCategory)

    let openEmbed = new Discord.MessageEmbed()
        .setTitle(client.l.tick.voiceTicket.created)
        .setDescription(client.l.tick.voiceTicket.location.replace('%LOCATION%',c))
        .setColor(client.config.colour)
        .setFooter(client.l.tick.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
    message.channel.send(openEmbed)

    let log = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(client.l.tick.voiceTicket.log)
        .setDescription(`${client.l.gen.logs.user} ${message.author} (${message.author.id})\n${client.l.gen.logs.channel}  ${message.channel}\n${client.l.gen.logs.voiceTicket}  ${c}`)
        .setTimestamp(message.createdAt)
    client.logChannel.send(log)

    })

}

// © Zeltux Discord Bot | Do Not Copy



