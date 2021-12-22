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

app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP
        res.redirect(`https://${req.hostname}${req.url}`); //Redireciona pra HTTPS
    else //Se a requisição já é HTTPS
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado
});



app.get('/', (req, res) => {
    res.render('PaginaInicial');
});

// app.get('/', (req, res) => {
//     const locals = { title: 'Express with AMP Optimizer' };
//     res.render('PaginaInicial', locals, async (err, html) => {
//         const optimizedHtml = await ampOptimizer.transformHtml(html);
//         res.send(optimizedHtml);
//     });
// })


const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}!!!`);
});