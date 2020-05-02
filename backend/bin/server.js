import cors from 'cors';
import config from '../config/index';
// const config = require('../config/index');
// const cors = require('cors')('use strict');

const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// router for modules
const usersRouter = require('../src/modules/user/router/users');
const managerRouter = require('../src/modules/manager/router/manager');
const adminRouter = require('../src/modules/admin/router/admin');
const projectRouter = require('../src/modules/project/router/project');
const bugRouter = require('../src/modules/bugs/router/bugs');
const emulatorRouter = require('../src/modules/appiumRuns/router/appium');
const deviceFarmRouter = require('../src/modules/deviceFarm/router/deviceFarm');

// database connections
require('../src/models/mongoDB/index');
require('../src/models/sqlDB/index');

const app = express();
const { port } = config;
const { frontendUrl } = config;
// console.log(config);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/public/', express.static('./public/'));
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());

// use cors to allow cross origin resource sharing
app.use(cors({ origin: '*', credentials: false }));
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Methods', 'GET,HEAD,OPTIONS,POST,PUT,DELETE');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers',
  );
  res.setHeader('Cache-Control', 'no-cache');
  next();
});

// base routes for modules
app.use('/users', usersRouter);
app.use('/manager', managerRouter);
app.use('/admin', adminRouter);
app.use('/project', projectRouter);
app.use('/bugs',bugRouter);
app.use('/emulators', emulatorRouter);
app.use('/devicefarm', deviceFarmRouter);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
  // console.log('404 Not Found');
});

// error handler
app.use((err, req, res) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.listen(config.port, () => console.log(`MTaaS application server listening on ${port}`));
module.exports = app;
