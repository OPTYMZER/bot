const { readdirSync } = require('fs');
const signale = require('signale');
const cfg = require('../data/config.json');
module.exports = (scope) => {
  const citaj = dirs => {
    const komande = readdirSync(`${process.cwd()}/commands/${dirs}`).filter(d => d.endsWith('.js'));
    for (let komanda of komande) {
      let siEmDi = require(`${process.cwd()}/commands/${dirs}/${komanda}`);
      scope.commands.set(siEmDi.meta.name, siEmDi);
      if (siEmDi.meta.aliases) siEmDi.meta.aliases.forEach(a => scope.aliases.set(a, siEmDi.meta.name));
      let imeKomande = komanda.split('.')[0];
      signale.success(`Ucitana komanda: ${imeKomande}`);
    }
  }
  cfg.kategorije.forEach(h => citaj(h));
}