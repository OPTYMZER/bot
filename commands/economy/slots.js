const db = require("quick.db");
module.exports = {
 meta: {
     name: "slots",
     aliases: ["slot","sl"],
     usage: '[novac]',
     description: "Igrajte igru na Slots Mašini",
     hasArgs: false,
     category: "economy",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
      
        const slotItems = [":cherries:", ":apple:", ":watermelon:",":strawberry:", "🍋", "🍐", "🥭", "🍍", "🍑"];

        let user = message.author;
        let moneydb = await db.fetch(`money_${message.guild.id}_${user.id}`)
        let money = parseInt(args[0]);
        let win = false;
        let prefix = await db.fetch(`newprefix_${message.guild.id}`)
        if(prefix === null) prefix = '.'        
    
        if (message.content.includes("-")) {
            return message.channel.send(new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Slots`, scope.user.displayAvatarURL())
            .setDescription(`${cfg.emojis.arrow} Navedena cifra mora biti veća od nule.`)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            );
          }
    
        if (!money) return message.channel.send(
            new Discord.MessageEmbed()
                 .setAuthor(`${scope.user.username} - Slots`, scope.user.displayAvatarURL())
                .setDescription(`${cfg.emojis.no} Morate uneti odredjenu cifru. \n${cfg.emojis.arrow} Koristite: ${prefix}slots \`[novac]\``)
                .setColor(cfg.colors.no)
                .setTimestamp()
                .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );

        if (money > moneydb) return message.channel.send(
            new Discord.MessageEmbed()
        .setAuthor(`${scope.user.username} - Slots`, scope.user.displayAvatarURL())
        .setDescription(`${cfg.emojis.no} Nemate toliko novca u novčaniku.`)
        .setColor(cfg.colors.no)
        .setTimestamp()
        .setFooter(message.member.displayName, message.author.displayAvatarURL())
        );
      
        let m = await message.channel.send(
          new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Slots`, scope.user.displayAvatarURL())
            .addField(`${cfg.emojis.arrow}` + ' Rezultat:', `===========\n| <a:slots:783106312078229524> | <a:slots:783106312078229524> | <a:slots:783106312078229524> |\n| <a:slots:783106312078229524> | <a:slots:783106312078229524> | <a:slots:783106312078229524> |\n| <a:slots:783106312078229524> | <a:slots:783106312078229524> | <a:slots:783106312078229524> |\n===========`)
          /////  .setDescription(`<a:slots:783106312078229524> | <a:slots:783106312078229524> | <a:slots:783106312078229524>\n<a:slots:783106312078229524> | <a:slots:783106312078229524> | <a:slots:783106312078229524>\n<a:slots:783106312078229524> | <a:slots:783106312078229524> | <a:slots:783106312078229524>`)
            .setColor(cfg.colors.yes)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
        )

          let number = []
          for (let i = 0; i < 3; i++) { number[i] = Math.floor(Math.random() * slotItems.length); }
          if (number[0] == number[1] && number[1] == number[2]) { 
              money *= 12
              win = true;
          } else if (number[0] == number[1] || number[0] == number[2] || number[1] == number[2]) { 
              money *= 3
              win = true;
          }
          function opleti() {
          if (win) {
            m.edit(new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Slots`, scope.user.displayAvatarURL())
            .addField(`${cfg.emojis.arrow}` + ' Rezultat:', `===========\n| ${slotItems[Math.floor(Math.random() * slotItems.length)]} | ${slotItems[Math.floor(Math.random() * slotItems.length)]} | ${slotItems[Math.floor(Math.random() * slotItems.length)]} |\n| ${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]} |\n| ${slotItems[Math.floor(Math.random() * slotItems.length)]} | ${slotItems[Math.floor(Math.random() * slotItems.length)]} | ${slotItems[Math.floor(Math.random() * slotItems.length)]} |\n===========`, true)
            .addField(`${cfg.emojis.yes} Dobili ste:`, `**$${money.toLocaleString()}**`)
            .setColor(cfg.colors.yes)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            )

            db.add(`money_${message.guild.id}_${user.id}`, money)
 
         let transakcije = db.fetch(`transakcije_${message.guild.id}_${message.author.id}`) || [];
         transakcije.unshift(`[**+ $${money}**] Dobili ste novac na Slots mašini.`); 
         db.set(`transakcije_${message.guild.id}_${message.author.id}`, transakcije);

        } else {
            m.edit(new Discord.MessageEmbed()
            .setAuthor(`${scope.user.username} - Slots`, scope.user.displayAvatarURL())
            .addField(`${cfg.emojis.arrow}` + ' Rezultat:', `===========\n| ${slotItems[Math.floor(Math.random() * slotItems.length)]} | ${slotItems[Math.floor(Math.random() * slotItems.length)]} | ${slotItems[Math.floor(Math.random() * slotItems.length)]} |\n| ${slotItems[number[0]]} | ${slotItems[number[1]]} | ${slotItems[number[2]]} |\n| ${slotItems[Math.floor(Math.random() * slotItems.length)]} | ${slotItems[Math.floor(Math.random() * slotItems.length)]} | ${slotItems[Math.floor(Math.random() * slotItems.length)]} |\n===========`, true)
            .addField(`${cfg.emojis.no} Izgubili ste:`, `**$${money.toLocaleString()}**`)
            .setColor(cfg.colors.no)
            .setTimestamp()
            .setFooter(message.member.displayName, message.author.displayAvatarURL())
            )
            db.subtract(`money_${message.guild.id}_${user.id}`, money)

         let transakcije = db.fetch(`transakcije_${message.guild.id}_${message.author.id}`) || [];
         transakcije.unshift(`[**- $${money.toLocaleString()}**] Izgubili ste novac na Slots mašini.`); 
         db.set(`transakcije_${message.guild.id}_${message.author.id}`, transakcije);
        }   
      }
          setTimeout(opleti, 5000);
      

        
  }
} 