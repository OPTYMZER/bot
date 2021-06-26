const Discord = require("discord.js");
const SQLite = require("better-sqlite3")
const sql = new SQLite('./data/udb.sqlite')

exports.run = async (client, message, args) => {
    message.delete()

    function getChan(chan) {
        if (!chan.includes('<#') && !chan.includes('>')) return undefined
        chan = chan.replace('<#', '')
        chan = chan.replace('>', '')
        chan = message.guild.channels.cache.find(c=>c.id===chan)
        return chan
    }
    function getRole(role) {
        if (!role.includes('<@&') && !role.includes('>')) return undefined
        role = role.replace('<@&', '')
        role = role.replace('>', '')
        role = message.guild.roles.cache.find(r=>r.id===role)
        return role
    }

    let embed = new Discord.MessageEmbed()
        .setColor(client.config.colour)
        .setTitle(`🌈 Reaction Role Setup`)
        .setDescription(`1. Tag the channel you wish to add the reaction to.`)
        .setFooter(client.l.utilities.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
        
    var rrEmbed = await message.channel.send(embed)

    var chn = undefined
    while(!chn){
        var response = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, {time: 10000000, max: 1})
        .then(async collected => {
    
            var collectedMessage = await collected.first()
            collectedMessage.delete()
            let collectedChannel = getChan(collectedMessage.content)

            if (collectedChannel !== undefined) {
                chn = collectedChannel
            }
            else {
                embed.setDescription(`🚫 That's not a valid channel! Try again!\n\nTag the channel you wish to add the reaction to.`) 
                rrEmbed.edit(embed)              
            }
            
        })
    }

    embed.setDescription(`2. Send the message ID of the message you wish to add the reaction to.`) 
    await rrEmbed.edit(embed)

    var msg = undefined
    while(!msg){
        var response = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, {time: 10000000, max: 1})
        .then(async collected => {
    
            var collectedMessage = await collected.first()
            collectedMessage.delete()

            mess = collectedMessage.content

            meg = await chn.messages.fetch(mess).catch(err => meg = undefined)

            if(!meg) meg = undefined

            if (meg !== undefined) {
                msg = meg
            }
            else {
                embed.setDescription(`🚫 That's not a valid message ID! Try again!\n\nSend the message ID of the message you wish to add the reaction to.`) 
                rrEmbed.edit(embed)              
            }
            
        })
    }

    embed.setDescription(`3. Mention the role you would like to give for this reaction.`) 
    await rrEmbed.edit(embed)

    var role = undefined
    while(!role){
        var response = await message.channel.awaitMessages(msg => msg.author.id === message.author.id, {time: 10000000, max: 1})
        .then(async collected => {
    
            var collectedMessage = await collected.first()
            collectedMessage.delete()
            let collectedRole = getRole(collectedMessage.content)

            if (collectedRole !== undefined) {
                role = collectedRole
            }
            else {
                embed.setDescription(`🚫 That's not a valid role! Try again!\n\nMention the role you would like to give for this reaction.`) 
                rrEmbed.edit(embed)              
            }
            
        })
    }

    embed.setDescription(`4. React to this message with the reaction you wish to use.`) 
    await rrEmbed.edit(embed)

    reaction = undefined
    while(!reaction){
        await rrEmbed.awaitReactions((reaction, user) => user.id == message.author.id, {time: 10000000, max:1})
        .then(async collected => {
            var collectedReaction = await collected.first()
            rrEmbed.reactions.removeAll()

            react = collectedReaction.emoji.name

            try {
                await msg.react(react)
                reaction = collectedReaction
            }
            catch {
                embed.setDescription(`🚫 That's not a valid reaction! Try again!\n\nReact to this message with the reaction you wish to use.`) 
                rrEmbed.edit(embed)              
            }

        })
    }

    embed.setDescription(`Setup completed.\n\nChannel - ${chn}\nMessage - ${msg}\nRole - ${role}\nReaction - ${reaction.emoji.name}\n\nReact with :x: to close.`) 
    await rrEmbed.edit(embed)
    
    addreactionrole = { message: `${msg.id}`, reaction: `${reaction.emoji.name}`, role: `${role.id}`}
    const insert = sql.prepare(`INSERT OR REPLACE INTO reactionrole (message, reaction, role) VALUES (@message, @reaction, @role);`)
    insert.run(addreactionrole)

    rrEmbed.react("❌")

    await rrEmbed.awaitReactions((reaction, user) => user.id == message.author.id && reaction.emoji.name === "❌", {time: 10000000, max:1})
    .then(async collected => {rrEmbed.delete()})  
    

}

// © Zeltux Discord Bot | Do Not Copy