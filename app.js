const express = require('express');
const gpio = require('rpi-gpio');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));

const app = express();
const pinNumber = 12;

gpio.setup(pinNumber, gpio.DIR_OUT, () => {
    console.log(`GPIO pin ${pinNumber} is ready.`);
});

const poorCoffee = () => {
    console.log('Pouring coffee...');
    gpio.write(pinNumber, true, (err) => {
        if (err) throw err;
        console.log(`GPIO pin ${pinNumber} is ON.`);
    });

    // Wait for 1 sec before turning off the coffee machine
    setTimeout(() => {
        gpio.write(pinNumber, false, (err) => {
            if (err) throw err;
            console.log(`GPIO pin ${pinNumber} is OFF.`);
        });
    }, 1000 );

    //stop fetching data for 1 minute
    clearInterval(interval);
    setTimeout(() => {
        interval = setInterval(fetchData, 5000);
    } , 60000);

};

const fetchData = async () => {
    try {
        const response = await fetch('https://globalclassroom.bierebeeck.be/status.php');
        const data = await response.json();
        data.status === true ? poorCoffee() : gpio.write(pinNumber, false);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};

let interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds

const server = app.listen(3000, () => {
    const host = server.address().address;
    const port = server.address().port;
    console.log(`Server listening at http://${host}:${port}`);
});
