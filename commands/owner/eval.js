const delay = require("delay");
module.exports = {
  meta: {
    name: "eval",
    aliases: ["ev", "evaluate", "execute", "exec"],
    usgae: "<code>",
    description: "Izvrsava node.js kod",
    hasArgs: false,
    category: 'owner',
    devOnly: true,
    perms: {
      require: false
    },
  },
  pokreni: async (scope, message, args, cfg, discord) => {
    
    switch (args[args.length -1]) {
    case '--python':
        return message.channel.send("soonTM");
        break;
    case '--java':
        return message.channel.send("soonTM");
        break;
    default:
        evaluate();
        break;
    };
    
    function evaluate() {
        const parsedCode = args.join(" ");
        const kodMrale = kod => {
            if (typeof(kod) === "string") return kod.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
            return kod;
        }
        
       /*if (args[0] === "bole.exe") {
          async function krkaj() {
            let content = "";
            let kurcina = 15;
            kurcina--;
            for (let i = kurcina; i > 0; i--) {
              content = `\`\`\`Program se pokrece za: >> ${i} <<\`\`\``;
              await delay(1000);
              message.channel.send(content);
            }
          }
          function zavrsi() {
          message.channel.send(new discord.MessageEmbed().setImage("https://media.giphy.com/media/l49JTq7Y8dlwNM9zi/giphy.gif"));
          let bole = message.guild.members.cache.get("528882182991904768");
          bole.send(`Postovani, upravo ste banovani sa servera Ketijev bubreznjak zbog neprimernog i necivilizovanog ponasanja. Zbog trenutnih okolnosti, uprkos pravilima, ne mozete traziti unban sa servera. Hvala.\n\n - Staff Team`).then(() =>
          message.guild.members.ban(bole, { reason: "kancer" })).catch(() => null)
          message.channel.send("@everyone NEMA VISE BOLETA YESHHH")
          }
          return krkaj().then(() => {setTimeout(zavrsi, 12000); })
        };*/
        
        if (!parsedCode == '') {
             try {
                const hasToken = /(token)/ig;
                const isEnv = /(process.env)/ig;
                if (message.content.match(hasToken, 'i') || message.content.match(isEnv, 'i')) return message.channel.send('kurac');

                let evaluated = eval(parsedCode);

                if (typeof evaluated !== "string") evaluated = require("util").inspect(evaluated);

                const successEmbed = new discord.MessageEmbed()
                .setColor(cfg.colors.main)
                .setAuthor(`${scope.user.username} - Eval`, scope.user.avatarURL())
                .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
                .addField(`:inbox_tray: Input`, `\`\`\`js\n${parsedCode}\n\`\`\``)
                .addField(`:outbox_tray: Output`, `\`\`\`js\n ${JSON.stringify(kodMrale(evaluated))}\n\`\`\``)
                .setTimestamp()
                return message.channel.send(successEmbed)
            } catch (err) {
                const errorEmbed = new discord.MessageEmbed()
                .setColor(cfg.colors.main)
                .setAuthor(`${scope.user.username} - Eval`, scope.user.avatarURL())
                .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
                .addField(`:inbox_tray: Input`, `\`\`\`js\n${parsedCode}\n\`\`\``)
                .addField(`:x: Error`, `\`\`\`\n${kodMrale(err)}\n\`\`\``)
                .setTimestamp()
                return message.channel.send(errorEmbed)
            }
        } else {
            return message.channel.send("Unesi code debeli");
        }
      }
  }
}