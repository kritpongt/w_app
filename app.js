const express = require('express')
const path = require('path')
const app = express()
const LoggerMiddleware = (req, res, next) => {
    console.log(``)
    next();
}
app.use(LoggerMiddleware)
app.use(express.json())

app.use('/js', express.static(path.join(__dirname,'./js')))
app.use('/css', express.static(path.join(__dirname,'./css')))
app.use('/img', express.static(path.join(__dirname,'./img')))
app.use('/webapp/templates/zyxel/default_wp', express.static(path.join(__dirname,'./webapp/templates/zyxel/default_wp')))
app.use('/webapp/templates/zyxel/default_wp/css', express.static(path.join(__dirname,'./webapp/templates/zyxel/default_wp/css')))
app.use('/webapp/templates/mywebpage', express.static(path.join(__dirname,'./webapp/templates/mywebpage')))

app.get('/', async(req, res) => {
    res.sendFile(path.join(__dirname, 'main.html'))
})

const server = app.listen(3000, function(){
    const port = server.address().port
    console.log('Server is running, Listening on port :',port)
})

module.exports = app
