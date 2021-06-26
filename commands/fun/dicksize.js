module.exports = {
 meta: {
     name: "dicksize",
     aliases: ["dick", "penis"],
     usage: "[osoba]",
     description: "Veličina vašeg penisa",
     hasArgs: false,
     category: "fun",
     devOnly: false,
     perms: {
        require: false
     },
 },
    pokreni: async (scope, message, args, cfg, discord) => {
    let velicine = [
        'B=D \n\\💬 **Komentar**: Kritična situacija nemam šta reći :C',
        'B==D \n\\💬 **Komentar**: Slabo slabo :/',
        'B===D \n\\💬 **Komentar**: Šta da ti kažem znaš i sam valjda.',
        'B====D \n\\💬 **Komentar**: Predpostavljam da si prvi razred?',
        'B=====D \n\\💬 **Komentar**: Moraš malo više desanku da forsiraš!',
        'B======D \n\\💬 **Komentar**: Okej veličina za tvoje godine.',
        'B=======D \n\\💬 **Komentar**: Može bolje bracki, ali i ovo je okej.',
        'B========D \n\\💬 **Komentar**: Ovo je prosečna veličina.',
        'B=========D \n\\💬 **Komentar**: Sa ovom veličinom možete zadovoljiti prosečnu sponzorušu.',
        'B==========D \n\\💬 **Komentar**: Odlično, svaka čast!',
        'B===========D \n\\💬 **Komentar**: Uff ovo je ekstra, ali može bolje!',
        'B============D \n\\💬 **Komentar**: Dobar si dobar.',
        'B=============D \n\\💬 **Komentar**: Ako mene pitaš, ovo je odlična veličina!',]
        let index = (Math.floor(Math.random() * Math.floor(velicine.length)));
        let user = message.guild.member(message.mentions.users.first())
        if(!args[0]) return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - DickSize`, scope.user.avatarURL())
          .setColor(cfg.colors.main)
          .setDescription(`\\👤 **Korisnik**: ${message.author.tag}\n\\🍆 **Veličina**: ${velicine[index]}`)
          .setThumbnail(message.author.avatarURL())
          .setTimestamp()
          .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
        );
        if (message.mentions.users.first()) return message.channel.send(
          new discord.MessageEmbed()
          .setAuthor(`${scope.user.username} - DickSize`, scope.user.avatarURL())
          .setColor(cfg.colors.main)
          .setDescription(`\\👤 **Korisnik**: ${user.user.tag}:\n\\🍆 **Veličina**: ${velicine[index]}`)
          .setThumbnail(message.mentions.users.first().avatarURL())
          .setTimestamp()
          .setFooter(`${message.author.username}#${message.author.discriminator}`, message.author.avatarURL())
        );
    }
}