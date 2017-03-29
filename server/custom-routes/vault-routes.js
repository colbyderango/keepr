let Keeps = require('../models/keep')
let Vaults = require('../models/vault')

export default {
  keepToVault: {
    path: '/vault/:id/keep',
    reqType: 'put',
    method(req, res, next){
      let action = 'Post keep to vault'
      Vaults.findById(req.params.id)
        .then(vault => {
          vault.keeps.push(req.body.keepId)
          vault.save()
            .then(savedVault => {
              Keeps.findById(req.body.keepId)
                .then(keep => {
                  keep.timesVaulted += 1
                  keep.save()
                    .then(keep => {
                      res.send(handleResponse(action, savedVault))
                    })
                })
            })
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  removeKeep: {
    path: '/vault/:id/removekeep',
    reqType: 'put',
    method(req, res, next){
      let action = 'Remove keep from vault'
      Vaults.findById(req.params.id)
        .then(vault => {
          let index = vault.keeps.indexOf(req.body.keepId)
          vault.keeps.splice(index, 1)
          vault.save()
            .then(savedVault => {
              res.send(handleResponse(action, savedVault))
            })
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getSpecificVault: {
    path: '/vault/:id',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find specific vault'
      Vaults.findById(req.params.id).populate('keeps')
        .then(vault => {
          res.send(handleResponse(action, vault))
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  }
}


function handleResponse(action, data, error) {
  var response = {
    action: action,
    data: data
  }
  if (error) {
    response.error = error
  }
  return response
}