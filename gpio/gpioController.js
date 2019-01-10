const ioS = require('./gpioServer')

exports.server_info = function(req, res, next) {
    var myError = false;
    if (myError) {
      const error = new Error('Error getting all gpios')
      error.httpStatusCode = 400
      return next(error)
    }
    res.json(ioS.systemInfo());
  }

  exports.list_all_gpios = function(req, res, next) {
    var myError = false;
    if (myError) {
      const error = new Error('Error getting all gpios')
      error.httpStatusCode = 400
      return next(error)
    }
    res.json(ioS.pinList());
  }

  exports.read_a_gpio = function(req, res, next) {
  const gpioID = req.params.id
  if (!gpioID) {
    const error = new Error('Missing GPIO ID')
    error.httpStatusCode = 400
    return next(error)
  }
  res.json(ioS.pinInfo(gpioID))
 }
  
 exports.update_a_gpio = function(req, res, next) {
  const gpioID = req.params.id
  const state = req.params.state
  if (!gpioID) {
    const error = new Error('Missing GPIO ID')
    error.httpStatusCode = 400
    return next(error)
  }
  res.json(ioS.setPin(gpioID, state))
}

exports.gpioPulse = function(req, res, next) {
  const gpioID = req.params.id
  const state = req.params.state
  const duration = req.params.duration
  if (!gpioID) {
    const error = new Error('Missing GPIO ID')
    error.httpStatusCode = 400
    return next(error)
  }
  res.json(ioS.setPulse(gpioID, state, duration))
}