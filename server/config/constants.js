const actions = {
  create: 'Create',
  update: 'Update',
  remove: 'Remove',
  find: 'Find',
  findAll: 'Find All'
}

const models = {
  user: {
    name: 'User',
    endpoint: 'users',
    preventDefaultApi: true,
    useCustomRoutes: true
  },
  vault: {
    name: 'Vault',
    endpoint: 'vaults',
    useCustomRoutes: true
  },
  keep: {
    name: 'Keep',
    endpoint: 'keeps',
    useCustomRoutes: true
  }
}


export  {
  actions,
  models
}