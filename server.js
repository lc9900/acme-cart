const express = require('express');
const app = express();
const nunjucks = require('nunjucks');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const utils = require('./utils');
const orderRouter = require('./routes/orders');
const db = require('./db');

app.set("view engine", "html");
nunjucks.configure('views', {
    express: app,
    noCache: true
});

app.use('/vendors', express.static(path.join(__dirname, 'node_modules')));
app.use(bodyParser.urlencoded({extended: false}));
// app.use(bodyParser.json());

app.use(methodOverride('_method'));

var port = process.env.PORT || 3000;

app.listen(3000, () => {
    utils.inform('Webserver is listening on port ' + port);
    db.syncAndSeed(); // Failure in db sync doesn't need to be reflected into the error.html since it's strictly backend
});



app.get('/', (req, res) => {
    res.render('index');
})

app.use('/orders', orderRouter);

app.use((error, req, res, next) => {
    res.render('error', {error: error});
})
