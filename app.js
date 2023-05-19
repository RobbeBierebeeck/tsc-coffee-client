const express = require('express');
const gpio = require('rpi-gpio');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const app = express();
/*
// Define the port to run on
gpio.setup(12, gpio.DIR_OUT, false);

// the possible states of the pin
const on = () => { gpio.write(12, true, function(err) { if (err) throw err; console.log('Written to pin'); }); }

const off = ()=> { gpio.write(12, false, function(err) { if (err) throw err; console.log('Written to pin'); }); }

*/
const poorCoffee = () => {
    console.log('poor coffee')

    timeout()
}

// set timeout that can be triggered by the noCoffee function
const timeout = () => {
   //stop the setIntervall for 2 minutes
    clearInterval(interval)
    // set the timeout for 2 minutes
    setTimeout(() => {
        // restart the interval
        interval = setInterval(fetchData, 5000)
    }   , 120000)

}


const fetchData = async () => {
    const response = await fetch('https://globalclassroom.bierebeeck.be/status.php');
    const data = await response.json();
    data.status === true ? poorCoffee() : console.log('no coffee')
}

fetchData()

//fetch the data every 5 seconds
let interval = setInterval(fetchData, 5000)


const server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

