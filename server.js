// Carrega as variáveis de ambiente do arquivo .env
require('dotenv').config();

const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const port = 3000; // Porta em que o servidor vai rodar

// Middlewares
app.use(cors()); // Permite requisições de outras origens (seu front-end)
app.use(express.json()); // Permite que o servidor entenda JSON

// Rota para receber o post do formulário
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    // Configuração do "transporter" do Nodemailer usando o serviço do Gmail
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER, // Seu email do arquivo .env
            pass: process.env.EMAIL_PASS  // Sua senha de app do arquivo .env
        }
    });

    // Configuração do email que será enviado
    const mailOptions = {
        from: `"${name}" <${email}>`, // Remetente (mostra o nome e email da pessoa)
        to: process.env.EMAIL_USER,    // Para quem o email será enviado (você)
        subject: `Novo Contato de ${name}`,
        html: `
            <h3>Nova mensagem recebida do seu site!</h3>
            <p><strong>Nome:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <hr>
            <p><strong>Mensagem:</strong></p>
            <p>${message}</p>
        `
    };

    // Envio do email
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            return res.status(500).send('Algo deu errado. ' + error.message);
        }
        console.log('Email enviado: ' + info.response);
        res.status(200).send('Email enviado com sucesso!');
    });
});

// Inicia o servidor
app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});