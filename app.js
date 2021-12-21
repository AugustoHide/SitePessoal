const express = require('express');
const app = express();

const path = require('path');

const viewPath = path.join(__dirname, '/views');
app.set('view engine', 'ejs');
app.set('views', viewPath);
app.use(express.static(path.join(__dirname, 'public')));
// const cons = require('consolidate');

// app.engine('html', cons.swig)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'html');




app.get('/', (req, res) => {
    res.render('PaginaInicial');
})



app.listen('3000', () => {
    console.log('Serving on port 3000!!!');
});