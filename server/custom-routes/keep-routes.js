let Keeps = require('../models/keep')
let Vaults = require('../models/vault')

export default {
  getPublicKeeps: {
    path: '/publickeeps',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Get all public keeps'
      Keeps.find({ public: true })
        .then(keeps => {
          res.send(handleResponse(action, keeps))
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getSpecificKeep: {
    path: '/keep/:id',
    reqType: 'get',
    method(req, res, next){
      let action = 'Find specific keep'
      Keeps.findById(req.params.id).populate({ path: 'userId', select: '_id name' })
        .then(keep => {
          keep.views += 1
          keep.save()
            .then(savedKeep => {
              res.send(handleResponse(action, savedKeep))
            })
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  createKeep: {
    path: '/keep/:vaultId',
    reqType: 'post',
    method(req, res, next){
      let action = 'Create keep'
      Keeps.create(req.body)
        .then(keep => {
          Vaults.findById(req.params.vaultId)
            .then(vault => {
              vault.keeps.push(keep._id)
              vault.save()
                .then(savedVault => {
                  res.send(handleResponse(action, keep))
                })
            })
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