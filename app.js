const nodemailer = require('nodemailer');
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



// app.get('/', (req, res) => {
//     res.render('PaginaInicial');
// });
app.post('/pedido', async (req, res) => {
    let { name, email, nameSite, message } = req.body;
    let transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: 'augustohs.site@gmail.com',
            pass: 'B3yonc&4'
        }
    });
    let Email = await transporter.sendMail({
        from: `${name} <augustohs.site@gmail.com>`,
        to: 'augustohide@gmail.com',
        subject: `Site ${nameSite} do cliente ${email}`,
        text: `${message}`
    });
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.render('PaginaInicial');
})




const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log(`Serving on port ${port}!!!`);
});