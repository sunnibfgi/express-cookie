const http = require('http')
const express = require('express')
const path = require('path')
const logger = require('morgan')
const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

const router = express.Router()

const app = express()
const cycle = 60 * 60 * 24 * 7

app.use(logger())
app.use(cookieParser(':)'))
app.use(bodyParser.urlencoded({
	extended: false
}))

app.disable('x-powered-by')
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 7000)

router.get('/', function(req, res) {
	res.render('index', {
		email: req.cookies.email ? req.cookies.email : ''
	})
})

router.post('/email', function(req, res) {
	res.cookie('email', req.body.email, {
		maxAge: cycle
	})
	res.render('email', {
		email: req.body.email
	})
})

app.use('/', router)

app.use(function(req, res, next) {
	res.status(404).send('Not Found!')
})

http.createServer(app)
.listen(app.get('port'), function() {
	console.log(`server running at ${app.get('port')} port`)
})