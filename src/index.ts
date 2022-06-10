import express from 'express'
import itemsRouter from './routes/routes'

const PORT = process.env.PORT || 3000

const HOSTNAME = process.env.HOSTNAME || 'http://localhost'

const app = express()

app.get('/', (req,res) => {
    res.send('Welcome\n')
})

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api', itemsRouter)

app.use((req,res) => {
    res.status(404)
})

app.listen(PORT, () =>{
    console.log('up!')
})