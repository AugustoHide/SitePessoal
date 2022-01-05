const nodemailer = require('nodemailer');
const express = require('express');
const app = express();

const path = require('path');

const viewPath = path.join(__dirname, '/views');
app.set('view engine', 'ejs');
app.set('views', viewPath);
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele
    if ((req.headers["x-forwarded-proto"] || "").endsWith("http")) //Checa se o protocolo informado nos headers é HTTP
        res.redirect(`https://${req.hostname}${req.url}`); //Redireciona pra HTTPS
    else //Se a requisição já é HTTPS
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado
});



// app.get('/', (req, res) => {
//     res.render('PaginaInicial');
// });
app.post('/pedido', (req, res) => {
    console.log(req.params);
    res.send(req.body);
    // let transporter = nodemailer.createTransport({
    //     host: 'smtp.gmail.com',
    //     port: 587,
    //     secure: true,
    //     auth: {
    //         user: 'augustohs.site@gmail.com',
    //         pass: 'B3yonc&4'
    //     }
    // });
    // let email = await transporter.sendMail({
    //     from: '',
    //     to: '',
    //     subject: '',
    //     text: ''
    // });

});

app.get('/', (req, res) => {
    res.render('PaginaInicial');
})




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}!!!`);
});