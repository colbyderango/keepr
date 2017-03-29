let Keeps = require('../models/keep')
let Vaults = require('../models/vault')

export default {
  getUserKeeps: {
    path: '/mykeeps',
    reqType: 'get',
    method(req, res, next) {
      let action = 'Get all my keeps'
      Keeps.find({ userId: req.session.uid })
        .then(keeps => {
          res.send(handleResponse(action, keeps))
        })
        .catch(error => {
          return next(handleResponse(action, null, error))
        })
    }
  },
  getUserVaults: {
    path: '/myvaults',
    reqType: 'get',
    method(req, res, next){
      let action = 'Get all my vaults'
      Vaults.find({ userId: req.session.uid })
        .then(vaults => {
          res.send(handleResponse(action, vaults))
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