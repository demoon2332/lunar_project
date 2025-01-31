import createError from 'http-errors';
import express from 'express';
import path from 'path';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import session from 'express-session';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import './src/dbconnect.js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import hbs from 'hbs';
import { logError, logInfo } from './src/services/logger/logger.js';


dotenv.config();

// *** Main Page***
import indexRouter from './src/routes/index.js';

//**GreenStoreApi
import indexGreenStoreRouter from './src/routes/greenStoreApi/index.js';

//**OKR Api
import okrIndexRouter from './src/routes/okr/index.js';

//**Game 
import GameRouter from './src/routes/game/games.js';

//Tarot Api
import tarotRouter from './src/routes/tarot/index.js';

// BingoGame
import bingoGameRouter from './src/routes/bingoGame/index.js';

// LunaFolio
import lunafolioRouter from './src/routes/lunarfolio/index.js';

// Form-Servey router
import formRouter from './src/routes/form/index.js';

//Event note app (replace the schedule app )
import eventNoteRouter from './src/routes/eventNoteApp/index.js'


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// view engine setup
app.set('views', path.join(__dirname, './src/views'));
app.set('view engine', 'hbs');

hbs.registerPartials(path.join(__dirname, './src/views','partials'))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser('nobita'));
app.use(session({
  secret: 'lunar',
  saveUninitialized: true,
  resave: true
}));
app.use(express.static(path.join(__dirname, 'public')));
app.use('/storage',express.static(path.join(__dirname, 'public')));
app.use(cors())

app.use((req,res, next)=>{
  res.locals.flash = req.session.flash
  delete req.session.flash
  next()
})

const limiter = rateLimit({
	windowMs: 5 * 60 * 1000,
	max: 1000, 
	standardHeaders: true, 
	legacyHeaders: false,
})

app.use(limiter)
//main routes
app.use('/', indexRouter);

// greenstore routes
app.use('/greenstore',indexGreenStoreRouter);


// okr routes
app.use('/okr',okrIndexRouter);

// game routes
app.use('/game',GameRouter)

//tarot routes
app.use('/tarot',tarotRouter)

// bingo routes (Loto game)
app.use('/bingoGame',bingoGameRouter)

// lunafolio
app.use('/lunafolio',lunafolioRouter)

app.use('/form',formRouter)

app.use('/event',eventNoteRouter)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  // next(createError(404));
  res.render('error')
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  logError(err.message, err.stack);
  console.log("Error stack: ",err.stack)
  res.render('error');
});

// these cover below code can be remove after run production (because port have been used in ./bin/www)

const port = process.env.PORT || 3000
app.listen(port, () => {
  logInfo("Server started on port ${port}");
  console.log(`Server started on port ${port}`);
});
// 

export default app;
