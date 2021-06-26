module.exports = {
    meta: {
        name: "emit",
        aliases: ["event-emit"],
        usage: "<event>",
        description: "Emituje event",
        hasArgs: false,
        category: 'owner',
        devOnly: true,
        perms: {
            require: false
        },
    },
    pokreni: async (scope, message, args) => {
        scope.emit(args[0], message.member);
    }
}
