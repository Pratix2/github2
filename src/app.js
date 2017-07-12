const express = require('express')
const cors = require('cors')
const oxrApi = require('./oxr')
const { yelpAPI } = require('./yelp')
const { fusionQuery } = require('./yelp')
const app = express()
const router = express.Router()
const getSymbolFromCurrency = require('currency-symbol-map')
 
function handleError(err, res) {
  console.error(err)
  res.render(`error`, { error: err })
}

app.set('view engine', 'pug')
app.use(express.static("./public"))
app.use(cors())

app.get('/', (req, res) => {
  res.render('index', { title: 'My Website', message: 'Hello there!'})
});
  
app.get('/about-us', (req, res) => {
  res.render('about', {title: 'About Us'})
})
  
app.get('/contact-us', (req, res) => {
  res.render('contact', {title: 'Contact Us'})
})

app.get('/other', (req, res) => {
  res.render('other', {title: "Other"})
})

app.get(`/exchange-rate`, (req, res) => {
  if (Object.keys(req.query).length === 0) {
    res.render('exchange-rate', {
      title: 'Exchange Rate',
      rates: [],
      form: {}, 
      getSymbolFromCurrency
    })
  }
  oxrApi(req.query).then(result => {
    res.render('exchange-rate', { title: 'Exchange Rate', rates: result, form: req.query, getSymbolFromCurrency })
  }).catch(err => handleError(err, res))
})

app.get(`/yelp-api`, (req, res) => {
  if (req.headers.accept === `application/json`) {
    yelpAPI(req.query).then(data => {
      res.send(data)
    }).catch(err => {
      res.send(err)
    })
  } else {
    if (Object.keys(req.query).length === 0) {
      res.render('yelp-api', {
        title: 'Yelp API',
        businesses: [],
        form: {}
      })
    }
    yelpAPI(req.query).then(data => {
      res.render('yelp-api', { title: 'Yelp API', businesses: data.businesses, form: req.query })
    }).catch(err => handleError(err, res))
  }
})

app.get('/vue-demo', (req, res) => {
  res.render('vue-demo', { title: "Vue Demo"})
})

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})