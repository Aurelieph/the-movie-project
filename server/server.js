const express = require('express')
const morgan = require('morgan');
const app = express()

app.use(morgan('tiny'));
app.get('/fetch', function (req, res) {
  res.status(200).json({message:'Hello World'})
})

app.listen(8000)