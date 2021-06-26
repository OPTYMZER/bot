const { readdirSync } = require('fs');
const signale = require('signale');

module.exports = (scope) => {
  const citaj = dirs => {
    const eventi = readdirSync(`${process.cwd()}/events/${dirs}`).filter(d => d.endsWith('js'));
    for(let event of eventi) {
      const scopeEvent = require(`${process.cwd()}/events/${dirs}/${event}`);
      let event_ime = event.split('.')[0];
      scope.on(event_ime, scopeEvent.bind(null, scope));
      signale.success(`Ucitan event: ${event_ime}`)
    }
  }
    ["client", "guild"].forEach(e => citaj(e));
}