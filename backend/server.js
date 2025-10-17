const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();

const SignRouter = require('../backend/Routes/Sign')
const LoginRouter = require('../backend/Routes/Login');
const UserRouter = require('./Routes/User')
const NewJobsRouter = require('./Routes/NewJobs')
const JobsRouter = require('./Routes/Jobs')
const AvatarRouter = require('./Routes/Avatar');
const DescRouter = require('./Routes/Desc')

const PORT = process.env.SERVER_PORT;

app.get('/', (req,res) => {
    res.send('/ path');
});

app.use('/sign' , SignRouter)
app.use('/login', LoginRouter)
app.use('/user', UserRouter)
app.use('/new-jobs', NewJobsRouter)
app.use('/jobs', JobsRouter )
app.use('/avatar', AvatarRouter )
app.use('/upload-desc', DescRouter )


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});