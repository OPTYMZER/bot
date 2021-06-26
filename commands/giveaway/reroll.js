const db = require("quick.db");
const ms = require("ms");
module.exports = {
  meta: {
    name: "reroll",
    aliases: [],
    description: "Bot bira drugog pobednika",
    usage: "[ID Poruke]",
    hasArgs: true,
    category: "giveaway",
    devOnly: false,
    perms: {
      require: true,
      permissions: ["MANAGE_GUILD"]
    }
  },
  pokreni: async (scope, message, args, cfg, Discord) => {


    let giveaway =  scope.giveawaysManager.giveaways.find((g) => g.prize === args.join(' ')) || scope.giveawaysManager.giveaways.find((g) => g.messageID === args[0]);

    if(!giveaway){
        return message.channel.send(`${cfg.emojis.no}` + ' Giveaway pod ID `'+ args.join(' ') +'` nije pronađen.');
    }

    scope.giveawaysManager.reroll(giveaway.messageID, {
    messages: {
        congrat: ":tada: Novi pobednik(ci) : {winners}! Čestitam!",
        error: `${cfg.emojis.no} Nagradna igra je otkazana jer nije učestvovao dovoljan broj korisnika.`
    }
})

    .catch((e) => {
        if(e.startsWith(`${cfg.emojis.no} Nagradna igra pod ID **${giveaway.messageID}** nije završena.`)){
            message.channel.send(`${cfg.emojis.no} Nagardna igra mora biti **ZAVRŠENA** kako bi bot izabrao novog pobednika.`);
        } else {
            console.error(e);
        }
    });
  }
};
