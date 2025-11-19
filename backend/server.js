const express = require('express');//importing express
const app = express();//creating server

const cors = require('cors');//importing cors
const corsOptions = require('./config/corsOptions');//importing cors options

require('dotenv').config();//importing dotenv

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));//using middlewares

const PORT = process.env.SERVER_PORT;//defining server port from dotenv file

const SavedRouter = require('./Routes/Saved');
const AppliedRouter = require('./Routes/Applied');
const AcceptDeclineRouter = require('./Routes/AcceptDecline');
const SignRouter = require('./Routes/Sign')
const LoginRouter = require('./Routes/Login');
const UserRouter = require('./Routes/User')
const JobsRouter = require('./Routes/Jobs')
const AvatarRouter = require('./Routes/Avatar');
const DescRouter = require('./Routes/Desc');
const TagsRouter = require('./Routes/Tags');
const TechRouter = require('./Routes/Technologies');
const RoleRouter = require('./Routes/Role');
const isProfileFinishedRouter = require('./Routes/isProfileFinished');//importing routes


app.use('/sign' , SignRouter);
app.use('/login', LoginRouter);
app.use('/user', UserRouter);
app.use('/jobs', JobsRouter );
app.use('/avatar', AvatarRouter );
app.use('/desc', DescRouter );
app.use('/tags', TagsRouter);
app.use('/technologies' , TechRouter);
app.use('/roles', RoleRouter);
app.use('/is-profile-finished', isProfileFinishedRouter);
app.use('/saved', SavedRouter);
app.use('/applied' , AppliedRouter);
app.use('/accept-decline', AcceptDeclineRouter);//defining routes


app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
});//returning server url (to check if backend works on every mount)