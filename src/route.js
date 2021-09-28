const express = require('express');
const question = require('./controllers/QuestionController');
const room = require('./controllers/RoomController');

const route = express.Router();


route.get('/teste', (req, res) => {
    res.render("index")
});

route.get('/', (req, res) => res.render('index', {page: 'enter-room'}));
route.get('/create-pass', (req, res) => res.render('index',{page: 'create-pass'}));

route.post('/create-room', room.create);
route.get('/room/:room', room.open);
route.post('/room', room.enter);

route.post('/question/create/:room', question.create)
route.post('/question/:room/:question/:action', question.index);

module.exports = route;
