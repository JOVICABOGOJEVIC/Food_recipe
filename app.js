const express = require('express')
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');
require('dotenv').config();
const { v1: uuidv1 } = require('uuid');
const userRoutes = require('./routes/user')
const categoryRoutes = require('./routes/category')
const userIdRoutes = require('./routes/userId')
const recipeRoutes = require('./routes/recipe')

const app = express()


mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true 
}).then(() =>console.log('DB CONECTED'));

app.use(bodyParser.json())
app.use(morgan('dev'))
app.use(cookieParser())
app.use(expressValidator())

app.use('/api',userRoutes)
app.use('/api',userIdRoutes)
app.use('/api',categoryRoutes)
app.use('/api',recipeRoutes)

const port = process.env.PORT || 8000

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})