const express = require('express');
const app = express();

const cors = require('cors');
const bodyParser = require('body-parser');

app.use(cors());
app.use(bodyParser.json());
require('dotenv').config();

const SignRouter = require('../backend/Routes/Sign')
const LoginRouter = require('../backend/Routes/Login');
const MyUserRouter = require('./Routes/MyUser');
const NewJobsRouter = require('./Routes/NewJobs')
const MyJobsRouter  = require('./Routes/MyJobs')
const JobsRouter = require('./Routes/Jobs')
const UploadAvatarRouter = require('./Routes/UploadAvatar');
const MyAvatarRouter = require('./Routes/MyAvatar');
const UploadDescRouter = require('./Routes/UploadDesc')

const PORT = process.env.SERVER_PORT;

app.get('/', (req,res) => {
    res.send('/ path');
});

app.use('/sign' , SignRouter)
app.use('/login', LoginRouter)
app.use('/my-user', MyUserRouter)
app.use('/new-jobs', NewJobsRouter)
app.use('/my-jobs', MyJobsRouter )
app.use('/jobs', JobsRouter )
app.use('/upload-avatar', UploadAvatarRouter )
app.use('/upload-desc', UploadDescRouter )
app.use('/my-avatar' , MyAvatarRouter)


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});