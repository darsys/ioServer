const express = require('express')
const app = express()
app.use(express.json())
const router = express.Router()
router.use(express.json())

var gpioController = require('./gpioController')

router.get('/', gpioController.list_all_gpios)
router.get('/info', gpioController.server_info)
router.get('/digital/:gpio', gpioController.read_a_gpio)
router.put('/digital', gpioController.update_a_gpio)
router.put('/digital/:gpio', gpioController.update_a_gpio)
router.put('/digital/:gpio/:state', gpioController.update_a_gpio)
router.put('/pulse', gpioController.gpioPulse)
router.put('/pulse/:gpio', gpioController.gpioPulse)
router.put('/pulse/:gpio/:state', gpioController.gpioPulse)
router.put('/pulse/:gpio/:state/:duration', gpioController.gpioPulse)
router.put('/pwm', gpioController.gpioPWM)
router.put('/pwm/:gpio', gpioController.gpioPWM)
router.put('/pwm/:gpio/:dutycycle', gpioController.gpioPWM)

module.exports = router