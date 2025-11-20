const express = require('express');
const path = require('path');
const morgan = require('morgan');
const logger = require('./middleware/logger');
const coursesRouter = require('./routes/courses');
const usersRouter = require('./routes/users');

const app = express();
const PORT = 4000;

// View engine
app.set('view engine','ejs');
app.set('views', path.join(__dirname,'views'));

// Morgan + custom logger
app.use(morgan('combined'));
app.use(logger);

// Body parsers
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.get('/',(req,res)=>res.send('Welcome to SkillSphere LMS API'));

app.use('/courses', coursesRouter);
app.use('/users', usersRouter);

app.use((req,res)=>res.status(404).json({error:'Not Found'}));

app.listen(PORT,()=>console.log(`Running on http://localhost:${PORT}`));
