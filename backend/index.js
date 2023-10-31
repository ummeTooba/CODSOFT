const connectToMongo = require('./db');
const express = require('express')

connectToMongo();
const app = express()
const port = 5000



app.use(express.json())

//Available routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/employer', require('./routes/employer'));
app.use('/api/ejob', require('./routes/ejob'));




app.listen(port, () => {
  console.log(`Career hub backend listening on port ${port}`)
})
