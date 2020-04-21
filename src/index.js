require('./models/User')
require('./models/Symptom')
const express = require('express');
const mongoose = require('mongoose')
const bodyParser = require('body-parser');
const authRoutes = require('./routes/authRoutes');
const symptomRoutes = require('./routes/symptomRoutes');

const requireAuth = require('./middlewares/requireAuth')
const app = express();

app.use(bodyParser.json());
app.use(authRoutes)
app.use(symptomRoutes)

const mongodbURI = 'mongodb+srv://admin:passwordpassword@cluster0-dbkia.mongodb.net/test?retryWrites=true&w=majority'

mongoose.connect(mongodbURI, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected', ()=>{
    console.log('Connected to Mongo instance')
});

mongoose.connection.on('error', (err)=>{
    console.error('Error connecting to mongo instance',err)
})
app.get('/', requireAuth, (req,res)=>{
    res.send(`Your email: ${req.user.email}`);
});

app.listen(3000,()=>{
    console.log('Listening on port 3000')
});