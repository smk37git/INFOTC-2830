const express = require('express')
const app = express()
const path = require('path')
const http = require('http')
const mongoose = require('mongoose')
const dotenv = require('dotenv')
const expressLayouts = require('express-ejs-layouts')

// ROUTES
const notesRoutes = require('./routes/notes')
// OR
import userRoutes from './routes/notes'

dotenv.config()


// VIEWS
app.set("view engine", "ejs")
app.set("views", path.join(__dirname, "views"))
app.set("layout", "layout")
app.use(expressLayouts)


// PUBLIC
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.urlencoded({ extended: true }))
app.use(express.json() )



mongoose.connect(process.env.MONGO_URI, { useNewUrlParse: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err))

const port = 3000

app.get('/', (req, res) => res.send('Hello World!'))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))