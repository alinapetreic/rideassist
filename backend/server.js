const express = require('express')
const cors = require('cors')
const path = require('path')

require('dotenv').config()

const app = express()
const port = process.env.PORT || 8000

app.use(cors())
app.use(express.json())
app.use('/static', express.static(path.join(__dirname, 'public')))

const codeRouter = require('./routes/code')
const usersRouter = require('./routes/users')
const studentsRouter = require('./routes/students')
const commentsRouter = require('./routes/comments')
const questionsRouter = require('./routes/questions')
const trainingRouter = require('./routes/training')
const generatorsRouter = require('./routes/generators')
const authenticationRouter = require('./routes/authentication')
const trainingQuestionsRouter = require('./routes/training-questions')
const laboratoryQuestionsRouter = require('./routes/laboratories-questions')

const errorHandler = require('./middleware/errorMiddleware')

app.use('/auth', authenticationRouter)
app.use('/api/code', codeRouter)
app.use('/api/users', usersRouter)
app.use('/api/students', studentsRouter)
app.use('/api/training', trainingRouter)
app.use('/api/comments', commentsRouter)
app.use('/api/questions', questionsRouter)
app.use('/api/generate', generatorsRouter)
app.use('/api/training-questions', trainingQuestionsRouter)
app.use('/api/laboratories-questions', laboratoryQuestionsRouter)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`)
});