import express from 'express';
const app = express();
import fetch from 'node-fetch';


const fetchData =async () => {

    const response = await fetch('https://api.github.com/users/github');
    const data = await response.json();

}

fetchData()

//fetch the data every 5 seconds
setInterval(fetchData, 5000);


const server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

