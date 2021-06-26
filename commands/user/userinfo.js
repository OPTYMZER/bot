let db = require("quick.db");
const moment = require("moment");
module.exports = {
  meta: {
      name: "userinfo",
      aliases: ["profile"],
      usage: "userinfo",
      description: "Informacije o memberu",
      hasArgs: false,
      category: 'user',
      perms: {
          require: false
      },
  },
  pokreni: async (scope, message, args, cfg, discord) => {
 message.delete({ timeout: 1000 });
  let user = message.mentions.members.first() || message.member;

var game;
if (!user.presence.activities) {
  game = "Nema.";
} else {
  game = user.presence.activities;
}

let roles = await db
  .all()
  .filter(data => data.ID.startsWith(`shop_${message.guild.id}_`))
  .sort((a, b) => JSON.parse(a.data).slot - JSON.parse(b.data).slot);

let content = "";

for (let i = 0; i < roles.length; i++) {
  let role = message.guild.roles.cache.get(JSON.parse(roles[i].data).id);
 // let role = message.guild.roles.cache.get(JSON.parse(roles[i].data.id));
  if (role) {
    content += `<@&${role.id}> `;
  }
}
let shopr = await db.fetch(`shopbb_${message.guild.id}_${user.id}`);
let shopb = db.get(`${message.guild.id}.${user.id}.shopb`);
let shopbTag = shopb ? `<@&${shopb}>` : "Nema";
let shopTag = shopb ? `<@&${shopb.join(">, <@&")}>` : "Nema";

var status = `${user.presence.status}`
// var napravljen = `${user.user.createdAt.toLocaleString()}`
//  var usao = `${user.user.joinedAt.toLocaleString()}`;

if (status === "online") {
  status = "(**1**) Online";
}
if (status === "offline") {
  status = "(**4**) Offline";
}
if (status === "dnd") {
  status = "(**3**) Do Not Disturb";
}
if (status === "idle") {
  status = "(**2**) Idle";
}
if (status === "streaming") {
  status = "(**5**) Streaming";
}

message.channel.send(
  new discord.MessageEmbed()
   .setAuthor(`${user.user.tag} - User Info`, user.user.displayAvatarURL())
   .setThumbnail(user.user.displayAvatarURL())
   .setDescription(`
\\⏰ **Nalog Napravljen**: 
${cfg.emojis.arrow} ${moment(user.user.createdAt).format("MMM Do YYYY")}

\\👋 **Ušao/la na server**:
${cfg.emojis.arrow} ${moment(user.joinedAt).format("MMM Do YYYY")}

\\🆔 **ID Korisnika**: 
${cfg.emojis.arrow} ${user.user.id}

\\📚 **Tag korisnika**:
${cfg.emojis.arrow} #${user.user.discriminator}

\\🤖 **Bot nalog**:
${cfg.emojis.arrow} ${user.scope ? `${cfg.emojis.yes}` : `${cfg.emojis.no}`}

\\🛒 **Rankovi iz prodavnice**
${cfg.emojis.arrow} ${shopTag}`)
    .setColor(cfg.colors.main)
    .setTimestamp()
    .setFooter(message.author.username, message.author.displayAvatarURL({format: "png", size: 32, dynamic: true})))
  

    }
}