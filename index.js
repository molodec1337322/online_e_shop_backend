require("dotenv").config()
const express = require("express")
const sequelize = require("./db")
const models = require('./models/models')
const cors = require("cors")
const fileUploud = require('express-fileupload')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const PORT = process.env.PORT || 5000

const app = express()

app.use(cors())
app.use(express.json())
app.use(fileUploud({}))
app.use('/api', router)

app.use(errorHandler)

const start = async () => {
    try{
        console.log(process.env.PORT)
        await sequelize.authenticate()
        await sequelize.sync()

        app.listen(PORT, () => console.log(`Server started on port:${PORT}`))
    }
    catch (e){
        console.log(e)
    }
}

start()
