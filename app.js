
const express = require('express');
const app = express();

const path = require('path');

const viewPath = path.join(__dirname, '/views');
app.set('view engine', 'ejs');
app.set('views', viewPath);
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }))

app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP
        res.redirect(`https://${req.hostname}${req.url}`); //Redireciona pra HTTPS
    else //Se a requisição já é HTTPS
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado
});



app.get('/', (req, res) => {
    res.send('Site em manutenção entre mais tarde');
})




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}!!!`);
});