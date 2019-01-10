var express = require('express')
var router = express.Router()

var gpioController = require('./gpioController')

router.get('/', gpioController.list_all_gpios)
router.get('/info', gpioController.server_info)
router.get('/:id', gpioController.read_a_gpio)
router.put('/:id/:state', gpioController.update_a_gpio)
router.put('/:id/:state/:duration', gpioController.gpioPulse)

module.exports = router