const discord = require('discord.js');
const scope = new discord.Client();
require('dotenv').config();

const a = ["aliases", "commands"];
a.forEach(h => scope[h] = new discord.Collection());
["events", "commands"].forEach((h) => require(`./handlers/${h}`)(scope));

const { GiveawaysManager } = require("discord-giveaways");
scope.giveawaysManager = new GiveawaysManager(scope, {
  storage: "./data/giveaways.json",
  updateCountdownEvery: 2000,
  default: {
    botsCanWin: false,
    exemptPermissions: ["MANAGE_MESSAGES", "ADMINISTRATOR"],
    embedColor: "#FF0000",
    reaction: "🎉"
  }
});

scope.login(`ODUyODY2NjU0MTE5NjU3NTA1.YMND9w.Q85THbBa3oLbFeX50zQ59XsNdNA`);