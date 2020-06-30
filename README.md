# ioServer

This is a basic network server for access to the gpio on the raspberry pi. 
GPIO are accessed using a rest api (based on express) that leverages pigpio to interact with the hardware

Current functionality:
* List all pin states: http://myservername/gpio gets mode, state and init status from all pins
* Get Pin State: http://myservername/gpio/15 gets mode, state and init status from pin 15
* Set Pin Output State: 
    http://myservername/gpio/12/1 sets pin 12 to ON
* Pulse Pin to a State for a Duration: http://myservername/gpio/6/1/1500 sets pin 6 ON for 1500ms then OFF
* Get ioServer info: http://myservername/gpio/info gets mode, state and init status from all pins

## Getting Started

Project should only be should used with caution as it is alpha and in development. If you can't figure it out you probably should not use it yet.

## Built With

* [pigpio](https://github.com/joan2937/pigpio) - pigpio is a C library for the Raspberry which allows control of the General Purpose Input Outputs (GPIO).
* [pigpio node wrapper](https://github.com/fivdi/pigpio) - A wrapper for the pigpio C library to enable fast GPIO, PWM, servo control, state change notification and interrupt handling with Node.js on the Raspberry Pi Zero, 1, 2, 3 or 4.
* [express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
## Contributing

Please read [CONTRIBUTING.md](https://github.com/darsys/ioServer/Contributing.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **Damon Vincent** - *Initial work*

## License

This project is licensed under the GPL 3.0 License - see the [LICENSE.md](LICENSE.md) file for details

## Acknowledgments

* Hat tip to anyone whose code was used
