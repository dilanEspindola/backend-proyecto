const express = require('express');
const nodemailer = require('nodemailer');
const { google } = require('googleapis');
const { oauth2 } = require('googleapis/build/src/apis/oauth2');
const { gmail } = require('googleapis/build/src/apis/gmail');

const router = express.Router();
const pool = require('../database');

router.get('/', async (req, res) => {
    const get = await pool.query('select * from comentarios');
    if (get.length < 1) {
        res.send('no hay resultados');
    } else {
        res.json(get);
    }
});

router.post('/', async (req, res) => {

    const {
        asunto,
        nombre_completo,
        correo,
        mensaje
    } = req.body;

    const contentHtml = `
    <h1>Mensaje</h1>
    <ul>
        <li>Asunto: ${asunto} </li>
        <li>Nombre: ${nombre_completo} </li>
        <li>Correo: ${correo} </li>
        <li>Mensaje: ${mensaje} </li>                        
    </ul>    
`;

    const clientID = '6723902174-9ne0jjunq4l3v0aoctdeu42uqs32v90q.apps.googleusercontent.com';
    const clientSECRET = '0EwzpC5BMnUj8i9sebPKbVOX';
    const refreshToken = '1//04AtByQeMMpUUCgYIARAAGAQSNwF-L9IrIbe0vZrajgtwpTaT46kctWhs7Ru8ehfHI4R0JaQQzmh855t8OWUJIas8EJ3hdr8pJPA';
    const redirectURI = 'https://developers.google.com/oauthplayground';

    const oAuth2Client = new google.auth.OAuth2(clientID, clientSECRET, redirectURI);
    oAuth2Client.setCredentials({ refresh_token: refreshToken });

    async function sendMail() {
        try {
            const acessToken = await oAuth2Client.getAccessToken();
            const transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                    type: "OAuth2",
                    user: 'cartooncliente@gmail.com',
                    clientId: clientID,
                    clientSecret: clientSECRET,
                    refreshToken: refreshToken,
                    accessToken: acessToken
                }
            });

            const options = {
                from: 'cartooncliente@gmail.com',
                to: 'cartooncliente@gmail.com',
                subject: "Mensaje",
                html: contentHtml
            }

            await pool.query('insert into comentarios set ?', [req.body]);

            const res = await transporter.sendMail(options);
            return res;
        } catch (error) {
            console.log(error)
        }
    }

    sendMail()
        .then(result => {
            res.render('mostrarMensaje.ejs', {
                position: "center",
                icon: "success",
                title: "Envio Exitoso 😀",
                showConfirmButton: true,
                timer: false,
                ruta: 'http://localhost:3000/contacto'
            });
        }).catch(error => console.error(error))
});

router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('delete from comentarios where id = ?', [id]);
        res.send('comentario eliminado');
    } catch (error) {
        console.log(error);
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await pool.query('delete from comentarios where id = ?', [id]);
        res.redirect('http://localhost:3000/admin/preguntas');
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;