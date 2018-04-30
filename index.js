const express = require('express')
const app = express()


app.use('/turnorder', express.static('.'));
app.listen(3000, () => console.log('https://localhost:3000'));
