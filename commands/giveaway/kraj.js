const db = require("quick.db");
const ms = require("ms");
module.exports = {
  meta: {
    name: "end",
    aliases: ["kraj", "zavrsi"],
    description: "Bot završava nagradnu igru",
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

    let giveaway =
      scope.giveawaysManager.giveaways.find(g => g.prize === args.join(" ")) ||
      scope.giveawaysManager.giveaways.find(g => g.messageID === args[0]);

    if (!giveaway) {
      return message.channel.send(
        `${cfg.emojis.no}` +
          " Giveaway pod ID `" +
          args.join(" ") +
          "` nije pronađen."
      );
    }

    scope.giveawaysManager
      .edit(giveaway.messageID, {
        setEndTimestamp: Date.now()
      })

      .then(() => {
        message.channel.send(
          `${cfg.emojis.yes}` +
            " Giveaway se zavšava za " +
            scope.giveawaysManager.options.updateCountdownEvery / 1000 +
            " sekundi"
        );
      })
      .catch(e => {
        if (
          e.startsWith(
            `Giveaway sa message ID ${giveaway.messageID} je već završen.`
          )
        ) {
          message.channel.send(
            `${cfg.emojis.no}` + " Naveden giveaway je već završen"
          );
        } else {
          console.error(e);
          message.channel.send(cfg.emojis.no + " An error occured...");
        }
      });
  }
};
