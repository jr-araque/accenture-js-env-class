const express = require('express')
const app = express()

app.get('/', (req, res) => res.redirect(301, 'https://accn-lessons.herokuapp.com/'))

app.listen( process.env.PORT , (err) => {
    if (err) console.log(err)
    else console.log('Application started on port ' + process.env.PORT)
})
