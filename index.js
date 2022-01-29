const express = require('express')
const request = require('request-promise')
const bodyParser = require('body-parser')
const axios = require("axios");

const app = express()
const PORT = process.env.PORT || 5000

// const apiKey = ''

const generateScraperUrl = (apiKey) => `https://api.scraperapi.com?api_key=${apiKey}&autoparse=true`

app.use(bodyParser.urlencoded({extended: false}))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('Amazon Scraper API')
})

/**
 * -  GET Product Information
 */
app.get('/products/:productId', async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query
  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/dp/${productId}`)
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

/**
 * -  GET Product Reviews
 */
app.get('/products/:productId/reviews', async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query
  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/product-reviews/${productId}`)
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

/**
 * -  GET Product Offers
 */
app.get('/products/:productId/offers', async (req, res) => {
  const { productId } = req.params
  const { api_key } = req.query
  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/gp/offer-listing/${productId}`)
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

/**
 * -  GET Search Result
 */
app.get('/search/:searchQuery', async (req, res) => {
  const { searchQuery } = req.params
  const { api_key } = req.query
  try {
    const response = await request(`${generateScraperUrl(api_key)}&url=https://www.amazon.com/s?k=${searchQuery}`)
    res.json(JSON.parse(response))
  } catch (error) {
    res.json(error)
  }
})

/**
 * -  GET TEST
 */
app.get('/test', async (req, res) => {
  try {
    const url = 'http://api.scraperapi.com?api_key=&autoparse=true&url=https://2ip.ru'
    // const url = 'https://api.scraperapi.com?api_key=&autoparse=true&url=https://www.amazon.com/s?k=winterhat'
    const response = await axios.get(url)
    res.send(response)
    // res.send(response)
  } catch (error) {
    res.json(error)
  }
})

app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
