const express = require('express')
const oxrApi = require('./oxr')
const yelpApi = require('./yelp')
const app = express()
const router = express.Router()

function handleError(err, res) {
  console.error(err)
  res.render(`error`, { error: err })
}

app.set('view engine', 'pug')
app.use(express.static("./public"))

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
  oxrApi().then(result => {
    res.render('exchange-rate', { title: 'Exchange Rate', rates: result})
  }).catch(err => handleError(err, res))
})

app.get(`/yelp-api`, (req, res) => {
  yelpApi({
    term: "Fashion Stylist", 
    location: "New York, New York",
    limit: 10
  }).then(businesses => { 
    res.render('yelp-api', { title: 'Yelp Api', businesses })
  }).catch(err => handleError(err, res))
})

// app.get(`/exchange-rate-async`, async (req, res) => {
//   try {
//     const result = await oxrApi()
//     res.render('exchange-rate', { title: 'Exchange Rate', rates: result })
//   } catch (e) {
//     handleError(e, res)
//   }
// })

app.listen(3000, () => {
  console.log('Example app listening on port 3000!')
})