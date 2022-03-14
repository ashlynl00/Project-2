//our controllers file
// Dependencies
const express = require('express')
const router = express.Router()
const app = express();

// ask what these are for!!
// app.use(express.json())
// app.use(express.urlencoded({extended: true}))

// Models
//add schema variable
const hrUsers = require("../Models/employee");

// IndexRoute
router.get('/', async(req, res)=>{
  res.render('employees/index.ejs', {
    employee: employee
  })
})

// NewRoute
router.get('/new', (req, res)=>{
  res.render('employees/new.ejs')
})

// ShowRoute
router.get('/:id', async (req, res)=>{
  res.render('employees/show.ejs', {
})

// Createroute
router.post('/', (req, res)=>{
  res.redirect('/employees')
})

// Editroute
router.get('/:id/edit', (req, res)=>{
    res.render('employees/edit.ejs')
})

// UpdateRoute
router.put('/:id', (req, res)=>{
    res.redirect(`/employees/${req.params.id}`)
})

// DeleteRoute
router.delete('/:id', (req, res)=>{
    res.redirect('/employees')
    })
})

module.exports = router;