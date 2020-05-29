const pigpio = require('pigpio')
const Gpio = pigpio.Gpio;

//define default pin settings 
const default_mode = Gpio.OUTPUT
const default_pullUpDown = Gpio.PUD_ON
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
        console.log('get pin info ' + pin)
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
        console.log('set pin ' + pin + " to " + state)
        return this.pinInfo(pin)
    }

    setPulse(pin,state,duration) {
        if (!(pin in this.gpios)) this.initPin(pin)
        var thePin = this.gpios[pin]
        thePin.digitalWrite(state)
        console.log('set pin ' + pin + " to " + state + ' for ' + duration)
        setTimeout(function(){
            thePin.digitalWrite(1-state)
            console.log('set pin ' + pin + " to " + (1-state))
          }, duration)
    }
    
    setPWM(pin,dutyCycle,frequency=0) {
        if (!(pin in this.gpios)) this.initPin(pin)
        var thePin = this.gpios[pin]
        thePin.pwmWrite(dutyCycle)
        console.debug('set pin ' + pin + " to pwm with duty cycle " + dutyCycle)
    }
}

module.exports = new  gpioHandler