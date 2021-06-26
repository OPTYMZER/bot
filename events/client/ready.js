module.exports = async scope => {
  scope.user.setActivity(`${scope.users.cache.size} members`, {type: 'WATCHING'})
}