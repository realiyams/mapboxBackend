var express = require('express')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var fs = require('fs')
var axios = require('axios')

var indexRouter = require('./routes/index')

var app = express()

const { building } = require('./database/model')
const mongoose = require('./database/connection')

require('dotenv').config()

app.use(logger('dev'))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))
app.use('/images', express.static(path.join(__dirname, 'public', 'images')))

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*')
  res.setHeader('Access-Control-Allow-Methods', 'GET')
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization')
  next()
})

app.use((req, res, next) => {
  req.db = mongoose
  next()
})

let buildingsData = []

app.get('/api/buildings', async (req, res, next) => {
  try {
    const buildings = await building.find()
    buildingsData = buildings
    res.json(buildings)
  } catch (error) {
    next(err)
  }
})

async function getDirections(start, end, mode) {
  const response = await axios.get(`https://api.mapbox.com/directions/v5/mapbox/${mode}/${start};${end}?alternatives=true&continue_straight=true&geometries=geojson&language=id&overview=simplified&steps=true&access_token=${process.env.ACCESS_TOKEN}`)
    
  const data = response.data

  if (data.code === 'NoRoute') {
    throw new Error('No route found')
  }

  return data
}

app.get('/api/buildings/direction', async (req, res, next) => {
  try {
    const { start, destination } = req.query
    const startLocation = buildingsData.find(building => building.name === start)
    const destinationLocation = buildingsData.find(building => building.name === destination)

    if (!startLocation || !destination) {
      res.status(404).json({ message: 'Building not found' })
      return
    }

    const walkingDirections = await getDirections(
      `${startLocation.coordinate[0]},${startLocation.coordinate[1]}` , 
      `${destinationLocation.coordinate[0]},${destinationLocation.coordinate[1]}`, 
      'walking'
    )
    res.json(walkingDirections)
  } catch (error) {
    next(error)
  }
})

app.get('/api/:buildingName/images', (req, res) => {
  let buildingName = req.params.buildingName

  const imagesDir = path.join(__dirname, 'public', 'images', buildingName)
  const images = fs.readdirSync(imagesDir).map(filename => {
    const filepath = path.join(imagesDir, filename)
    const stats = fs.statSync(filepath)
    return {
      name: filename,
      size: stats.size,
      url: `http://${req.hostname}:${process.env.PORT}/images/${buildingName}/${filename}`
    }
  })
  res.json(images)
})

app.use('/', indexRouter)

module.exports = app
