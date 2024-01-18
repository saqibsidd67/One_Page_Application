const express = require('express') // Importing express
const router = express.Router() //Creating express router

const org = process.env.ORG //Importing ORG from .env file

//DH: Importing data model schema for services
const { services } = require('../models/models')

//DH: GET all services for org speciiied in .env
router.get('/', (req, res, next) => {
  services
    .find({ orgs: org }, (error, data) => {
      if (error) {
        return next(error)
      } else {
        return res.json(data)
      }
    })
    .sort({ updatedAt: -1 })
})

//DH: GET single service by Object ID
router.get('/id/:id', (req, res, next) => {
  services.findOne({ _id: req.params.id, orgs: org }, (error, data) => {
    if (error) {
      return next(error)
    } else if (!data) {
      res.status(400).send('Service not found')
    } else {
      res.json(data)
    }
  })
})

//DH: GET service entries based on search query either by name or description
router.get('/search', (req, res, next) => {
  const dbQuery = { orgs: org }
  switch (req.query.searchBy) {
    case 'name':
      dbQuery.name = { $regex: `^${req.query.name}`, $options: 'i' }
      break
    case 'description':
      dbQuery.description = { $regex: `^${req.query.description}`, $options: 'i' }
      break
    default:
      return res.status(400).send('invalid searchBy')
  }
  services.find(dbQuery, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

//DH - POST new service entry
router.post('/', (req, res, next) => {
  const newService = req.body
  newService.orgs = [org]
  services.create(newService, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})

// DH - PUT update service
router.put('/update/:id', (req, res, next) => {
  services.findByIdAndUpdate(req.params.id, req.body, (error, data) => {
    if (error) {
      return next(error)
    } else {
      res.json(data)
    }
  })
})


module.exports = router //Exporting router
