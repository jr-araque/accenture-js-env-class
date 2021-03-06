const express = require('express')

const app = express()
const websocketRouter = express.Router();

const OPTS = {
    root: __dirname,
    headers: {
        'x-timestamp': Date.now(),
        'x-sent': true
    }
}

// Serving up the public static folder
app.use(express.static('public'))

app.get('/', function (req,res) {
    res.sendFile('src/client.html', OPTS, (err) => {
        if (err) console.log(err)
    })
})

app.get('/master', (req,res) => {
    if (req.headers.host !== 'localhost:3000') res.sendStatus(401, 'Master presentation accesible only on localhost'); // Limit to only work on local environment
    res.sendFile('src/master.html', OPTS, (err) => {
        if (err) console.log(err)
    })
})

app.listen( process.env.PORT , (err) => {
    if (err) console.log(err)
    else {
        const HOST = (!process.env.HOST) ? "http://localhost" : process.env.HOST
        console.log('Application started on... ' + HOST + ":" + process.env.PORT)
    } 
})