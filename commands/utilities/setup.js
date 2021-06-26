const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    
    let ownerID = message.guild.ownerID

    let ownerOnly = new Discord.MessageEmbed()
        .setAuthor("Zeltux Setup","https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")
        .setColor(`#FF0062`)
        .setTitle(`🚫 Only The Owner Of The Server Can Run This Command! 🚫`)
        .setFooter(`© Zeltux | Owned by Matt | Developed by Matt & Azono\n${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`,"https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")

    if(message.author.id != ownerID){return message.channel.send(ownerOnly)}

    let setUp = new Discord.MessageEmbed()
        .setAuthor("Zeltux Setup","https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")
        .setColor(`#FF0062`)
        .setTitle(`Thanks for purchasing Zeltux`)
        .setDescription(`Make sure to checkout the [setup guide](https://github.com/Craftymatt2/Zeltux/wiki/Setup) to see what I create/remove!`)
        .setFooter(`© Zeltux | Owned by Matt | Developed by Matt & Azono\n${client.config.serverName} Utilities ➤ Command ran by ${message.author.username}`,"https://cdn.discordapp.com/attachments/632238663094370366/632916675808854026/profile.png")

    message.channel.send(setUp)

    // Create Roles

    let createBasicRole = async function(roleName) {
        await message.guild.roles.create({ data: {
            name: roleName,
            permissions:["SEND_MESSAGES","SEND_TTS_MESSAGES","CREATE_INSTANT_INVITE","CHANGE_NICKNAME","VIEW_CHANNEL","EMBED_LINKS","ATTACH_FILES","READ_MESSAGE_HISTORY","MENTION_EVERYONE","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","USE_VAD"]
        }})
    }

    // Verified
    if(client.config.verificationSystem === "on"){
        if(!client.findRole(client.config.verificationRole)){
            await message.guild.roles.create({ data: {
                name: client.config.verificationRole,
                permissions:["SEND_MESSAGES","SEND_TTS_MESSAGES","CREATE_INSTANT_INVITE","CHANGE_NICKNAME","VIEW_CHANNEL","EMBED_LINKS","ATTACH_FILES","READ_MESSAGE_HISTORY","MENTION_EVERYONE","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","USE_VAD"]
            }})
        }
    }

    // Muted
    if(!client.findRole(client.config.mutedRole)){
        await message.guild.roles.create({ data: {
            name: client.config.mutedRole,
            permissions:["CREATE_INSTANT_INVITE","CHANGE_NICKNAME","VIEW_CHANNEL","EMBED_LINKS","ATTACH_FILES","READ_MESSAGE_HISTORY","MENTION_EVERYONE","USE_EXTERNAL_EMOJIS","ADD_REACTIONS","CONNECT","SPEAK","USE_VAD"]
        }})
    }

    // All Permission Roles
    var roles = []
    for(var key in client.cmds){
        await client.cmds[key].permissions.forEach(async role => {
            if(!client.findRole(role)) {
                if(!roles.includes(role)){
                    createBasicRole(role)
                    roles.push(role)
                }
            }
        })
    }

    var checkAndCreateRole = function(location) {
        location.forEach(role => {            
            if(!client.findRole(role))  {
                if(!roles.includes(role)){
                    createBasicRole(role)
                    roles.push(role)
                }
            }
        })
    }

    checkAndCreateRole(client.config.canSeeApplication)
    checkAndCreateRole(client.config.canSeeClosedTicket)
    checkAndCreateRole(client.config.canSeeRaisedTicket)
    checkAndCreateRole(client.config.canSeeTicket)
    checkAndCreateRole(client.config.swearBypass)
    checkAndCreateRole(client.config.inviteBypass)
    checkAndCreateRole(client.config.viewVerifyChannel)
    checkAndCreateRole(client.config.talkInVerifyChannel)
    checkAndCreateRole(client.config.viewLogsChannel)
    checkAndCreateRole(client.config.exemptFromPunishments)

    const everyone = message.guild.roles.cache.find(x => x.name === "@everyone");

    // Create Logs Channel
    if(!client.findChannel(client.config.logChannel)){
        await message.guild.channels.create(`${client.config.logChannel}`, {type: 'text'})
    }
    let logChannel = client.findChannel(client.config.logChannel)
    await logChannel.createOverwrite(everyone, {SEND_MESSAGES: false, VIEW_CHANNEL: false})
    client.config.viewLogsChannel.forEach(async role => {
        let myRole = client.findRole(role)
        await logChannel.createOverwrite(myRole, {SEND_MESSAGES: false, VIEW_CHANNEL: true})
    })    

    // Create Welcome Channel
    if(client.config.joinLeaveMessage === "on"){
        if(!client.findChannel(client.config.joinLeaveChannel)){
            await message.guild.channels.create(`${client.config.joinLeaveChannel}`, {type: 'text'})
        }
        let joinLeaveChannel = client.findChannel(client.config.joinLeaveChannel)
        await joinLeaveChannel.createOverwrite(everyone, {SEND_MESSAGES: false, VIEW_CHANNEL: false})
    }

    // Create Verification Channel
    if(client.config.verificationSystem === "on"){
        if(!client.findChannel(client.config.verificationChannel)){
            await message.guild.channels.create(`${client.config.verificationChannel}`, {type: 'text'})
        }
        let verificationChannel = client.findChannel(client.config.verificationChannel)
        await verificationChannel.createOverwrite(everyone, {SEND_MESSAGES: true, VIEW_CHANNEL: true})
    }

    // Create Level Channel
    if(client.config.levelSystem === "on"){
        if(!client.config.levelChannel === "current"){
            if(!client.findChannel(client.config.levelChannel)){
                await message.guild.channels.create(`${client.config.levelChannel}`, {type: 'text'})
            }
            let levelChannel = client.findChannel(client.config.levelChannel)
            await levelChannel.createOverwrite(everyone, {SEND_MESSAGES: false, VIEW_CHANNEL: false})
        }
    }

    // Create Application Channel
    if(client.config.applicationsystem === "on"){
        if(!client.findChannel(client.config.applicationChannel)){
            await message.guild.channels.create(`${client.config.applicationChannel}`, {type: 'text'})
        }
        let applicationChannel = client.findChannel(client.config.applicationChannel)
        await applicationChannel.createOverwrite(everyone, {SEND_MESSAGES: false, VIEW_CHANNEL: false})
    }

    // Create Report Channel
    if(`${client.config.reportChannel}` != `${client.config.logChannel}`){
        if(!client.findChannel(client.config.reportChannel)){
            await message.guild.channels.create(`${client.config.reportChannel}`, {type: 'text'})
        }
        let reportChannel = client.findChannel(client.config.reportChannel)
        await reportChannel.createOverwrite(everyone, {SEND_MESSAGES: false, VIEW_CHANNEL: false})
    }

    // Create Suggestion Channel
    if(`${client.config.suggestionChannel}` != `${client.config.logChannel}`){
        if(!client.findChannel(client.config.suggestionChannel)){
            await message.guild.channels.create(`${client.config.suggestionChannel}`, {type: 'text'})
        }
        let suggestionChannel = client.findChannel(client.config.suggestionChannel)
        await suggestionChannel.createOverwrite(everyone, {SEND_MESSAGES: false, VIEW_CHANNEL: false})
    }

    // Create Bug Report
    if(`${client.config.bugChannel}` != `${client.config.logChannel}`){
        if(!client.findChannel(client.config.bugChannel)){
            await message.guild.channels.create(`${client.config.bugChannel}`, {type: 'text'})
        }
        let bugChannel = client.findChannel(client.config.bugChannel)
        await bugChannel.createOverwrite(everyone, {SEND_MESSAGES: false, VIEW_CHANNEL: false})
    }

    // Create Application Category
    if(client.config.applicationsystem === "on"){
        if(!client.findChannel(client.config.applicationCategory)){
            await message.guild.channels.create(`${client.config.applicationCategory}`, {type: 'text'})
        }
        let applicationCategory = client.findChannel(client.config.applicationCategory)
        await applicationCategory.createOverwrite(everyone, {SEND_MESSAGES: false, VIEW_CHANNEL: false})
    }

    // Create Ticket Category
    if(client.config.ticketSystem === "on"){
        if(!client.findChannel(client.config.ticketCategory)){
            await message.guild.channels.create(`${client.config.ticketCategory}`, {type: 'category'})
        }
        let ticketCategory = client.findChannel(client.config.ticketCategory)
        await ticketCategory.createOverwrite(everyone, {SEND_MESSAGES: false, VIEW_CHANNEL: false})
    }
    
    if(client.config.verificationSystem === "on"){
        // Set Channel Perms For Everyone
        message.guild.channels.cache.forEach(async channel => { 
            await channel.createOverwrite(everyone, {SEND_MESSAGES: true, VIEW_CHANNEL: false})
        })
        
        // Set Channel Perms For Verified Group
        message.guild.channels.cache.forEach(async channel => { 
            var verificationRole = client.findRole(client.config.verificationRole)
            await channel.createOverwrite(verificationRole, {SEND_MESSAGES: true, VIEW_CHANNEL: true})
        })

        // Everyone can talk in verification channel
        await client.verificationChannel.createOverwrite(everyone, {SEND_MESSAGES: true, VIEW_CHANNEL: true})
    }

    // Set Channel Perms For Muted Group
    message.guild.channels.cache.forEach(async channel => { 
        var mutedRole = client.findRole(client.config.mutedRole)
        await channel.createOverwrite(mutedRole, {SEND_MESSAGES: false, VIEW_CHANNEL: null})
    })

}

// © Zeltux Discord Bot | Do Not Copy