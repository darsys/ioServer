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
  var gpioID = req.params.id
  if (!gpioID) {
    console.log('Setting pin json body values.')
    gpioID = req.body.pin
    if (!gpioID) {
      const error = new Error('Missing GPIO ID')
      error.httpStatusCode = 400
      return next(error)
    }
  }
  res.json(ioS.pinInfo(gpioID))
}
  
exports.update_a_gpio = function(req, res, next) {
  console.log(req.body)
  var gpioID = req.params.gpio
  var state = req.params.state
  if (!gpioID) {
    console.log('Setting pin json body values.')
    gpioID = req.body.pin
    if (!gpioID) {
      const error = new Error('Missing GPIO ID')
      error.httpStatusCode = 400
      return next(error)
    }
  }
  if (!state) {
    console.log('Setting state to json body state value.')
    state = req.body.state
  }
  if (state != 1 && state != 0) {
    const error = new Error('Missing valid state value')
    error.httpStatusCode = 400
    return next(error)
  }
  res.json(ioS.setPin(gpioID, state))
}

exports.gpioPulse = function(req, res, next) {
  var gpioID = req.params.gpio
  var state = req.params.state
  var duration = req.params.duration
  if (!gpioID) {
    console.log('Setting pin json body values.')
    gpioID = req.body.pin
    if (!gpioID) {
      const error = new Error('Missing GPIO ID')
      error.httpStatusCode = 400
      return next(error)
    }
  }
  if (!state) {
    console.log('Setting state and duration to json body values.')
    state = req.body.state
    duration = req.body.duration
  }
  if (state != 1 && state != 0) {
    const error = new Error('Missing valid state value')
    error.httpStatusCode = 400
    return next(error)
  }
  res.json(ioS.setPulse(gpioID, state, duration))
}

exports.gpioPWM = function(req, res, next) {
  var gpioID = req.params.gpio
  var dutycycle = req.params.dutycycle
  if (!gpioID) {
    console.log('Setting pin json body values.')
    gpioID = req.body.pin
    if (!gpioID) {
      const error = new Error('Missing GPIO ID')
      error.httpStatusCode = 400
      return next(error)
    }
  }
  if (!dutycycle) {
    console.debug('Setting dutycycle to json body values.')
    dutycycle = req.body.dutycycle
  }
  if (!dutycycle || dutycycle < 0 || dutycycle > 255) {
    const error = new Error('Duty cycle is not valid.')
    error.httpStatusCode = 400
    return next(error)
  }
  console.debug('dutycycle', dutycycle)
  res.json(ioS.setPWM(gpioID, dutycycle))
}