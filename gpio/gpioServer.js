const pigpio = require('pigpio')
const Gpio = pigpio.Gpio;

//define default pin settings 
const default_mode = Gpio.OUTPUT
const default_pullUpDown = Gpio.PUD_OFF
const default_edge = Gpio.EITHER_EDGE
const default_timeout = 0
const default_alert = false

//Array for Gpio Objects
var gpios = []

exports.getInfo = function() {
    
    var versions = require('./package.json');
    var info = { ioServerVersion: versions.version,
        HardwareRevision: pigpio.hardwareRevision().toString(16) }
    var deps = versions['dependencies']
    for (var key in deps) {
        info[key] =  deps[key].substr(1)
    }
    return info
}

exports.listGPIO = function() {
    var pinInfo = []
    for (let gpioNo = Gpio.MIN_GPIO; gpioNo <= Gpio.MAX_GPIO; gpioNo += 1) {
        var init = false
        if (gpioNo in gpios) init = true
        const gpio = new Gpio(gpioNo);
        pinInfo[gpioNo] = {
         GPIO: gpioNo, mode: gpio.getMode(), state: gpio.digitalRead(), init: init
        }
    }
    return pinInfo
}

function initGPIO (pin, mode = default_mode, 
                        pullUpDown = default_pullUpDown
                        ) {
    const newPin = new Gpio(pin, {mode: mode, pullUpDown: pullUpDown})
    gpios[pin] = newPin
    return gpios[pin]
}

exports.setGPIO = function(pin,state) {
    if (!(pin in gpios)) initGPIO(pin)
    gpios[pin].digitalWrite(state)
    return {GPIO: pin, mode: gpios[pin].getMode(), state: gpios[pin].digitalRead(), init: true}
}

exports.getGPIO = function(pin, state) {
    if (!(pin in gpios)) initGPIO(pin)
    return {GPIO: pin, mode: gpios[pin].getMode(), state: gpios[pin].digitalRead(), init: true}
}