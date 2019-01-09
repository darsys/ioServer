const pigpio = require('pigpio')
const Gpio = pigpio.Gpio;

//define default pin settings 
const default_mode = Gpio.OUTPUT
const default_pullUpDown = Gpio.PUD_OFF
const default_edge = Gpio.EITHER_EDGE
const default_timeout = 0
const default_alert = false

class gpioHandler {

    constructor() {
        this.gpios = []
    }

    systemInfo() {
        var versions = require('../package.json');
        var info = { ioServerVersion: versions.version,
            HardwareRevision: pigpio.hardwareRevision().toString(16) }
        var deps = versions['dependencies']
        for (var key in deps) {
            info[key] =  deps[key].substr(1)
        }
        return info
    }

    pinList() {
        var pinInfos = []
        for (let gpioNo = Gpio.MIN_GPIO; gpioNo <= Gpio.MAX_GPIO; gpioNo += 1) {
            var init = false
            if (gpioNo in this.gpios) init = true
            const gpio = new Gpio(gpioNo);
            pinInfos[gpioNo] = this.pinInfo(gpioNo)
        }
        return pinInfos
    }

    initPin(pin, mode = default_mode, 
                            pullUpDown = default_pullUpDown
                            ) {
        const newPin = new Gpio(pin, {mode: mode, pullUpDown: pullUpDown})
        this.gpios[pin] = newPin
        return this.gpios[pin]
    }

    pinInfo(pin) {
        var p, init
        if (pin in this.gpios) {
            p = this.gpios[pin]
            init = true
        }
        else {
            p =new Gpio(pin)
            init = false
        }
        return {GPIO: pin, mode: p.getMode(), state: p.digitalRead(), init: init}
    }

    setPin(pin,state) {
        if (!(pin in this.gpios)) this.initPin(pin)
        this.gpios[pin].digitalWrite(state)
        return this.pinInfo(pin)
    }
}

module.exports = new  gpioHandler