const db = require("quick.db");
const ms = require("ms");
module.exports = {
 meta: {
     name: "mute",
    usage: '[@korisnik | ID] [vreme] [razlog]',
     description: "Utišajte željenog korisnika",
     hasArgs: true,
     category: "staff",
     devOnly: false,
     perms: {
        require: true,
        permissions: ["MUTE_MEMBERS"]
     },
 },
    pokreni: async (scope, message, args, cfg, Discord) => {
       message.delete({ timeout: 1000 });
  let isMUTE = false;
  
  let mute = await db.fetch(`${message.guild.id}_muterole`);
  if(mute) {
    let MUTErole = message.guild.roles.cache.get(mute);
    if(MUTErole) {
      if(message.guild.roles.cache.has(mute)) isMUTE = true;
    }
  }

let muteUser = message.guild.member(
message.mentions.users.first() || message.guild.members.cache.get(args[0])
);
if (!muteUser)
message.channel.send(
  new Discord.MessageEmbed()
  .setAuthor("❌ GREŠKA", message.guild.iconURL())
  .setDescription(`${cfg.emojis.arrow} Morate tagovati nekoga. `)
  .setColor(cfg.colors.no)
  .setTimestamp()
  .setFooter(message.member.displayName, message.author.displayAvatarURL())
);


let prefix = await db.fetch(`newprefix_${message.guild.id}`);
if (prefix === null) prefix = ".";

let reason = args.slice(2).join(" ");

let length = args[1];
if (!length)
  return message.channel.send(
    `${cfg.emojis.arrow} Koristite: **${prefix}mute @korisnik <vrijeme> <razlog>**`
  );
message.delete({ timeout: 500 }).catch();

  if(isMUTE) {
	
    let mute = await db.fetch(`${message.guild.id}_muterole`);
      let muterolex = message.guild.roles.cache.get(mute);

    let logs = await db.fetch(`lchannel_${message.guild.id}`);
    if (logs === null) {
      return;
    }
  
    const modlog = scope.channels.cache.get(logs.id);
   modlog.send(
    new Discord.MessageEmbed()
    .setAuthor(scope.user.username + " | Mute Logs", scope.user.displayAvatarURL())
    .addField(`${cfg.emojisarrow}` + " Member", `${muteUser.user.tag}`, true)
    .addField(`${cfg.emojis.arrow}` + " Staff", `${message.author.tag}`)
    .addField(`${cfg.emojis.arrow}` + "  Razlog ", `${reason}`, true)
    .addField(`${cfg.emojis.arrow}` + "  Trajanje", `${length}`)
    .setTimestamp()
    .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
    .setThumbnail(muteUser.user.avatarURL())
    .setColor(cfg.colors.main)
   ).then(() => {
     // message.delete();
      muteUser.send(`${cfg.emojis.arrow} ${message.author.tag} vas je **utišao** na **${length}** zbog: **${reason}**`)
        .catch(err => console.log(err));

     message.channel.send(
      Discord.MessageEmbed()
      .setAuthor("✅ USPEŠNO", message.guild.iconURL())
      .setDescription(`${cfg.emojis.arrow}` + ` ${message.author.tag} je **utišao** ${muteUser.user.tag} na **${length}** zbog **${reason}**` )
      .setTimestamp()
      .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
      .setColor(cfg.colors.yes)
     );
    });
              
    await muteUser.roles.add(muterolex.id);
  
    setTimeout(function() {
      muteUser.roles.remove(muterolex.id);
  
  
       modlog.send(
        new Discord.MessageEmbed()
        .setAuthor(scope.user.username + " | UnMute Logs", scope.user.displayAvatarURL())
        .addField(`${cfg.emojis.arrow}` + " Member", `${muteUser.user.tag}`, true)
        .addField(`${cfg.emojis.arrow}` + " Staff", `${scope.user.tag}`)
        .addField(`${cfg.emojis.arrow}` + "  Razlog ", `Istekao`, true)
        .setTimestamp()
        .setThumbnail(muteUser.user.avatarURL())
        .setColor(cfg.colors.main)
       ).then(() => {
        muteUser.send(`${cfg.emojis.arrow} Vaš mute je **istekao** na **${message.guild.name}**. Sada možete da pišete.`)
          .catch(err => console.log(err));
      });
    }, ms(length));
	}
  else {

    let muterole = message.guild.roles.cache.find(r => r.name === "Muted 🔇");
    if (!muterole) {
      try {
        muterole = await message.guild.roles.create({
          name: "Muted 🔇",
          color: "#5c5c5c",
          permissions: []
        });
  
        message.guild.channels.cache.forEach(async (channel, id) => {
          await channel.overwritePermissions(muterole, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
      } catch (e) {
        console.log(e.stack);
      }
    }

  let logs = await db.fetch(`lchannel_${message.guild.id}`);
  if (logs === null) {
    return;
  }

  const modlog = scope.channels.cache.get(logs.id);
  modlog.send(
    new Discord.MessageEmbed()
    .setAuthor(scope.user.username + " | Mute Logs", scope.user.displayAvatarURL())
    .addField(`${cfg.emojis.arrow}` + " Member", `${muteUser.user.tag}`, true)
    .addField(`${cfg.emojis.arrow}` + " Staff", `${message.author.tag}`)
    .addField(`${cfg.emojis.arrow}` + "  Razlog ", `${reason}`, true)
    .addField(`${cfg.emojis.arrow}` + "  Trajanje", `${length}`)
    .setTimestamp()
    .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
    .setThumbnail(muteUser.user.avatarURL())
    .setColor(cfg.colors.main)
  ).then(() => {
   // message.delete();
    muteUser.send(`${cfg.emojis.arrow} ${message.author.tag} vas je **utišao** na **${length}** zbog: **${reason}**`)
      .catch(err => console.log(err));

    message.channel.send(
      new Discord.MessageEmbed()
      .setAuthor("✅ USPEŠNO", message.guild.iconURL())
      .setDescription( `${cfg.emojis.arrow}` + ` ${message.author.tag} je **utišao** ${muteUser.user.tag} na **${length}** zbog **${reason}**`)
      .setTimestamp()
      .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.displayAvatarURL())
      .setColor(cfg.colors.yes)
    );
      });

  await muteUser.roles.add(muterole.id);

  setTimeout(function() {
    muteUser.roles.remove(muterole.id);

   modlog.send(
    new Discord.MessageEmbed()
    .setAuthor(scope.user.username + " | UnMute Logs", scope.user.displayAvatarURL())
    .addField(`${cfg.emojis.arrow}` + " Member", `${muteUser.user.tag}`, true)
    .addField(`${cfg.emojis.arrow}` + " Staff", `${scope.user.tag}`)
    .addField(`${cfg.emojis.arrow}` + "  Razlog ", `Istekao`, true)
    .setTimestamp()
    .setThumbnail(muteUser.user.avatarURL())
    .setColor(cfg.colors.main)
   ).then(() => {
    muteUser.send(`${cfg.emojis.arrow} Vaš mute je **istekao** na **${message.guild.name}**. Sada možete da pišete.`)
      .catch(err => console.log(err));
  });

  }, ms(length));
  return;
	}
      
    }
}