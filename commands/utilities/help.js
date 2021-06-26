const Discord = require("discord.js");

exports.run = async (client, message, args) => {
    message.delete()
    
    let p = client.config.prefix

    let pages = [

[
"💰 Economy",
`\`${p}bal\` ➜ Check how much money you have
\`${p}top\` ➜ Check the money leaderboard
\`${p}work <job>\` ➜ Work to get more money
\`${p}shop\` ➜ Display the role shop
\`${p}buy <rank>\` ➜ Buy a role
\`${p}withdraw <amount>\` ➜ Withdraw money from the bank
\`${p}deposit <amount>\` ➜ Deposit money into the bank`
],

[
"🎲 Fun & Games",
`\`${p}8ball <future>\` ➜ Tell the future
\`${p}flip\` ➜ Flip a coin
\`${p}hug <user>\` ➜ Hug a user
\`${p}joke\` ➜ Tell a joke
\`${p}meme\` ➜ Show a meme
\`${p}numbergen\` ➜ Generate a random number
\`${p}rate <topic>\` ➜ Rate a topic
\`${p}poll <topic>\` ➜ Create a poll
\`${p}roll\` ➜ Roll a die
\`${p}rps\` ➜ Rock! Paper! Scissors!
\`${p}slap <user>\` ➜ Slap someone
\`${p}xmas\` ➜ How many days till Christmas!`
],
[
"🎉 Giveaways",
`\`${p}gcreate\` ➜ Start a giveaway
\`${p}gdelete\` ➜ Delete a giveaway
\`${p}greroll\` ➜ Re-roll a giveaway
\`${p}gend\` ➜ End a giveaway`
],
[
"🔢 Levels",
`\`${p}leaderboard\` ➜ View the servers leaderboard
\`${p}level [user]\` ➜ Check your level`
],
[
"🔒 Moderation",
`\`${p}ban <user> <reason>\` ➜ Ban a user
\`${p}clear <amount> [user]\` ➜ Clear a user
\`${p}kick <user> <reason>\` ➜ Kick a user
\`${p}lockdown <time>\` ➜ Lockdown a channel
\`${p}mute <user>\` ➜ Mute a user
\`${p}report <user> <reason>\` ➜ Report a user
\`${p}say <message>\` ➜ Say a message
\`${p}shout <message>\` ➜ Shout a message
\`${p}slowmode <time>\` ➜ Slowmode a channel
\`${p}speak <message>\` ➜ Speak a message
\`${p}tempmute <user> <time> <reason>\` ➜ Tempoarily mute a user
\`${p}unban <user>\` ➜ Un-Ban a user
\`${p}unmute <user>\` ➜ Unmute a user
\`${p}warn <user> <reason>\` ➜ Warn a user`
],
[
"🎵 Music",
`\`${p}leave\` ➜ Leave the voice channel
\`${p}pause\` ➜ Pause a song
\`${p}play <link/song name>\` ➜ Play a YouTube song
\`${p}queue\` ➜ View the song queue
\`${p}resume\` ➜ Resume paused music
\`${p}search\` ➜ Search for a song
\`${p}skip\` ➜ Skip a song
\`${p}volume\` ➜ Change the volume of the song
\`${p}voteskip\` ➜ Vote to skip a song`
],
[
"🎟️ Tickets",
`\`${p}add <user>\` ➜ Add a user to a ticket
\`${p}close\` ➜ Close a ticket
\`${p}delete\` ➜ Delete a ticket
\`${p}forcedelete\` ➜ Forcedelete a ticket
\`${p}lower\` ➜ Lower the priority of a ticket
\`${p}new <reason>\` ➜ Create a new ticket
\`${p}notice\` ➜ Give a ticket a 24 hour notice
\`${p}raise\` ➜ Raise the priority of a ticket
\`${p}remove <user>\` ➜ Remove a user from a ticket
\`${p}reopen\` ➜ Reopen the ticket
\`${p}ticketpanel\` ➜ Create a panel to open tickets
\`${p}transcript\` ➜ Send the transcript to the channel
\`${p}voiceticket\` ➜ Create a corresponding voice ticket` 
],
[
"📋 Utilities",
`\`${p}addrole <user> <role>\` ➜ Add a role to a user
\`${p}announce <message>\` ➜ Announce a message
\`${p}apply\` ➜ Create an application
\`${p}bot\` ➜ Show the bot details
\`${p}botlinks\` ➜ Show links for the bot
\`${p}bugreport <bug>\` ➜ Create a bug report
\`${p}channelinfo [#channel]\` ➜ Show channel info
\`${p}donate\` ➜ Get the link to the donor store
\`${p}help\` ➜ Show this help menu
\`${p}hexcolour\` ➜ Find a colour by hex code
\`${p}invites [user]\` ➜ Check how many invites you have
\`${p}latency\` ➜ Check the bots connection
\`${p}links\` ➜ Show the server links
\`${p}lmgtfy <question>\` ➜ Let me google that for you!
\`${p}ping\` ➜ Pong!
\`${p}pwdgen\` ➜ Generate a password
\`${p}removerole <user> <role>\` ➜ Remove a role from a user
\`${p}roleinfo [@role]\` ➜ View info on a role
\`${p}rr\` ➜ Setup reaction roles
\`${p}serverinfo\` ➜ Look at server stats
\`${p}setup\` ➜ Setup the bot
\`${p}social\` ➜ Show social media links
\`${p}suggest <suggestion>\` ➜ Create a suggestion
\`${p}toascii\` ➜ Convert text to ascii
\`${p}usercount\` ➜ Check the servers user count
\`${p}userinfo [@user]\` ➜ Check out a user
\`${p}weather <location>\` ➜ Check the weather`
]
]

    const embed = new Discord.MessageEmbed()
      .setColor(client.config.colour)            
      .setFooter(client.l.utilities.footer.replace('%SERVERNAME%', client.config.serverName).replace('%USER%', message.author.username))
      .setTitle(client.l.utilities.help.help.replace('%SERVERNAME%', client.config.serverName))
      .setDescription(`${client.l.utilities.help.react}\n
💰 ➜ ${client.l.utilities.help.reactions.economy}
🎲 ➜ ${client.l.utilities.help.reactions.fun}
🎉 ➜ ${client.l.utilities.help.reactions.giveaways}
🔢 ➜ ${client.l.utilities.help.reactions.levels}
🔒 ➜ ${client.l.utilities.help.reactions.moderation}
🎵 ➜ ${client.l.utilities.help.reactions.music}
🎟️ ➜ ${client.l.utilities.help.reactions.tickets}
📋 ➜ ${client.l.utilities.help.reactions.utilities}
`)

    message.channel.send(embed).then(msg => {

        msg.react('💰').then(r => {
        msg.react('🎲').then(r => {
        msg.react('🎉').then(r => {
        msg.react('🔢').then(r => {
        msg.react('🔒').then(r => {
        msg.react('🎵').then(r => {
        msg.react('🎟️').then(r => {
        msg.react('📋').then(r => {

          const economyFilter = (reaction, user) => reaction.emoji.name === '💰' && user.id === message.author.id
          const funFilter = (reaction, user) => reaction.emoji.name === '🎲' && user.id === message.author.id
          const giveawaysFilter = (reaction, user) => reaction.emoji.name === '🎉' && user.id === message.author.id
          const levelFilter = (reaction, user) => reaction.emoji.name === '🔢' && user.id === message.author.id
          const moderationFilter = (reaction, user) => reaction.emoji.name === '🔒' && user.id === message.author.id
          const musicFilter = (reaction, user) => reaction.emoji.name === '🎵' && user.id === message.author.id
          const ticketsFilter = (reaction, user) => reaction.emoji.name === '🎟️' && user.id === message.author.id
          const utilitiesFilter = (reaction, user) => reaction.emoji.name === '📋' && user.id === message.author.id

          let myTime = 600000

          const economy = msg.createReactionCollector(economyFilter, {time: myTime })
          const fun = msg.createReactionCollector(funFilter, {time: myTime })
          const giveaways = msg.createReactionCollector(giveawaysFilter, {time: myTime })
          const level = msg.createReactionCollector(levelFilter, {time: myTime })
          const moderation = msg.createReactionCollector(moderationFilter, {time: myTime })
          const music = msg.createReactionCollector(musicFilter, {time: myTime })
          const tickets = msg.createReactionCollector(ticketsFilter, {time: myTime })
          const utilitites = msg.createReactionCollector(utilitiesFilter, {time: myTime })

          function changePage(pages, page, embed, r){
            r.users.remove(message.author)
            embed.setTitle(pages[page][0])
            embed.setDescription(pages[page][1])
            msg.edit(embed)
          }

          economy.on('collect', r => {changePage(pages, 0, embed, r)})
          fun.on('collect', r => {changePage(pages, 1, embed, r)})
          giveaways.on('collect', r => {changePage(pages, 2, embed, r)})
          level.on('collect', r => {changePage(pages, 3, embed, r)})
          moderation.on('collect', r => {changePage(pages, 4, embed, r)})
          music.on('collect', r => {changePage(pages, 5, embed, r)})
          tickets.on('collect', r => {changePage(pages, 6, embed, r)})
          utilitites.on('collect', r => {changePage(pages, 7, embed, r)})

      })
      })
      })
      })
      })  
      })
      })
      })
      })
}

// © Zeltux Discord Bot | Do Not Copy