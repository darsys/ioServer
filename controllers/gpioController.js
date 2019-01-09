const Gpio = require('pigpio').Gpio

exports.server_info = function(req, res, next) {
    var myError = false;
    if (myError) {
      const error = new Error('Error getting all gpios')
      error.httpStatusCode = 400
      return next(error)
    }
    const ioS = req.app.get('ioServer')
    res.json(ioS.getInfo());
  }

  exports.list_all_gpios = function(req, res, next) {
    const ioS = req.app.get('ioServer')
    var myError = false;
    if (myError) {
      const error = new Error('Error getting all gpios')
      error.httpStatusCode = 400
      return next(error)
    }
    res.json(ioS.listGPIO());
  }

  exports.read_a_gpio = function(req, res, next) {
  const gpioID = req.params.id
  if (!gpioID) {
    const error = new Error('Missing GPIO ID')
    error.httpStatusCode = 400
    return next(error)
  }
  const ioS = req.app.get('ioServer')
  res.json(ioS.getGPIO(gpioID))
 }
  
 exports.update_a_gpio = function(req, res, next) {
  const gpioID = req.params.id
  const state = req.params.state
  if (!gpioID) {
    const error = new Error('Missing GPIO ID')
    error.httpStatusCode = 400
    return next(error)
  }
  const ioS = req.app.get('ioServer')
  res.json(ioS.setGPIO(gpioID, state))
}