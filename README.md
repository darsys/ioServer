# ioServer

This project was developed to create a rest API for controlling the GPIO on a raspberry pi.
GPIO are accessed using express (with routing) for a simple web server that locally calls pigpio to interact with the pi gpio hardware

Current functionality:
* Get ioServer info:
    - get http://myservername/gpio/ gets software version information
    - get http://myservername/gpio/info gets software version information
* Get all pin states:
    - get http://myservername/gpio lists the mode, state and init status from all pins
* Get digital pin state:
    - get http://myservername/gpio/digital/15 gets mode, state and init status from pin 15
* Set a *pin* to a digital output *state*:
    - put http://myservername/gpio/digital/12/1 sets pin 12 to ON
    - put http://myservername/gpio/digital/12 with json paylod {state: 0} sets pin 12 to OFF
    - put http://myservername/gpio/digital/ with json paylod {pin: 12, state: 1} sets pin 12 to ON
* Pulse a *pin* to a *state* for a *duration* in milliseconds:
    - put http://myservername/gpio/pulse/12/1/100 sets pin 12 to ON for 100 ms then to OFF
    - put http://myservername/gpio/pulse/12/0 with json paylod {duration: 200} sets pin 12 to OFF for 200 ms then ON
    - put http://myservername/gpio/pulse/12 with json paylod {state: 1, duration: 150} sets pin 12 to ON for 150 ms then OFF
* Set a *pin* to output pwm *dutycycle* (0-255):
    - put http://myservername/gpio/pwm/6/127 starts a pwm output on pin 6 with a ~50% duty cycle
    - put http://myservername/gpio/pwm/6 with json paylod {dutycycle: 64} starts a pwm output on pin 6 with a ~25% duty cycle
    - put http://myservername/gpio/pwm with json paylod {pin: 6, dutycycle: 230} starts a pwm output on pin 6 with a ~90% duty cycle


## Getting Started

On rasbian (basically debian) here are the basics to install and run the service

pigpio needs to installed and running locally for the service to work [see here](http://abyz.me.uk/rpi/pigpio/download.html)

    sudo apt-get update
    sudo apt-get install pigpio

Clone or download the repo, npm install and npm start

    git clone https://github.com/darsys/ioServer.git
    cd ioserver
    sudo npm install
    sudo npm start

The server should be running the local addresses port 3000 and the output should be on the console

    wget https://localhost:3000/gpio/info

For systemd (I use debian) I have included a systemd service file in the systemd folder. I just symlink this into the /etc/systemd/system folder

    ln repo_download_location/systemd/ioserver.service /etc/systemd/system/ioserver.service

Then enable and start the service

    sudo systemctl enable ioserver
    sudo systemctl start ioserver


## Built With

* [pigpio](https://github.com/joan2937/pigpio) - pigpio is a C library for the Raspberry which allows control of the General Purpose Input Outputs (GPIO).
* [pigpio node wrapper](https://github.com/fivdi/pigpio) - A wrapper for the pigpio C library to enable fast GPIO, PWM, servo control, state change notification and interrupt handling with Node.js on the Raspberry Pi Zero, 1, 2, 3 or 4.
* [express](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.


## Contributing

Please read [CONTRIBUTING.md](contributing.md) for details on our code of conduct, and the process for submitting pull requests to us.


## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 


## Authors

* **Damon Vincent** - *Initial work*


## License

This project is licensed under the GPL 3.0 License - see the [LICENSE.md](LICENSE.md) file for details


## Acknowledgments

* Hat tip to anyone whose code was used
