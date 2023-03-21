import express from 'express'

const app = express()
const port = 8000

//Endpoint for a http request
app.get('/', (req, res) => {
  res.send('Hello world!')
})

app.listen(port, () => console.log(`Server started at ${port}`))
