const express = require('express')
const path = require('path')

const app = express()
const port = 3000


app.use(express.static(path.join(__dirname, 'static')))



app.get('/', (req, res)=> {
    
    res.sendFile(path.join(__dirname, 'templates/index.html')) 
})




app.listen(port, ()=> {
    console.log(`Server is listening on http://127.0.0.1:${port}`);
})
