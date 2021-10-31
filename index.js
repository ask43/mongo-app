const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const Handlebars = require('handlebars')
const {
  allowInsecurePrototypeAccess
} = require('@handlebars/allow-prototype-access')
const exphbs = require('express-handlebars')
const todoRoutes = require('./routes/todos')

const PORT = process.env.PORT || 3000
const app = express()
const hbs = exphbs.create({
  defaultLayout: 'main',
  extname: 'hbs',
  handlebars: allowInsecurePrototypeAccess(Handlebars)
})

app.engine('hbs', hbs.engine)
app.set('view engine', 'hbs') //Указываем шаблонизатор
app.set('views', 'views')

app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, 'public')))

app.use(todoRoutes)

async function start() {
  try {
    await mongoose.connect(
      'mongodb+srv://askar:P1645TE17Q@cluster0.vjoss.mongodb.net/todos',
      {
        useNewUrlParser: true
      }
    )
    app.listen(PORT, () =>
      console.log(`Example app listening on port ${PORT}!`)
    )
  } catch (error) {
    console.log(error)
  }
}
start()
