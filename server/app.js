const express = require('express');
const ENV = require('dotenv');
const mongoose = require('mongoose');

ENV.config();

const app = express();
const cors = require('cors');
const port = process.env.PORT;

mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`, {useNewUrlParser: true, useUnifiedTopology: true});

const userRouter = require('./routers/user.router');
const activityRouter = require('./routers/activity.router');
const projectRouter = require('./routers/project.router');
const projectMemberRouter = require('./routers/project-member.router');

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());

app.use('/user', userRouter);
app.use('/activity', activityRouter);
app.use('/pm', projectMemberRouter);
app.use('/project', projectRouter);

app.get('*', (req, res) => {
    res.status(404).json({
        message: 'not found'
    })
})

app.listen(port, () => {
    console.log(`server run in here ${port}`)
})