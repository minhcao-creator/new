const express = require('express')
const app = express()
var cors = require('cors')
const port = 3001

const adafruit = require('./controller/');

app.use(cors())

adafruit(app);

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})